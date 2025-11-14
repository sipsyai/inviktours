'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getUserBookings, Booking, getStatusLabel, getStatusColor, formatDate, cancelBooking } from '@/lib/booking';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function BookingsPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, token } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/giris');
    }
  }, [authLoading, isAuthenticated, router]);

  // Load bookings
  useEffect(() => {
    async function loadBookings() {
      if (!token) return;

      try {
        setLoading(true);
        const data = await getUserBookings(token);
        setBookings(data);
      } catch (err: any) {
        setError(err.message || 'Rezervasyonlar yüklenemedi');
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated && token) {
      loadBookings();
    }
  }, [isAuthenticated, token]);

  const handleCancelBooking = async (documentId: string) => {
    if (!token) return;
    if (!confirm('Bu rezervasyonu iptal etmek istediğinizden emin misiniz?')) return;

    try {
      setCancellingId(documentId);
      await cancelBooking(token, documentId);

      // Update local state
      setBookings(bookings.map(b =>
        b.documentId === documentId ? { ...b, status: 'cancelled' as const } : b
      ));
    } catch (err: any) {
      alert(err.message || 'Rezervasyon iptal edilemedi');
    } finally {
      setCancellingId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          <span>Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111811] dark:text-white mb-2">
            Rezervasyonlarım
          </h1>
          <p className="text-[#638863] dark:text-gray-400">
            Tüm rezervasyonlarınızı buradan görüntüleyebilirsiniz
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && !error && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-[#638863] dark:text-gray-400 mb-4">
              event_busy
            </span>
            <h3 className="text-xl font-bold text-[#111811] dark:text-white mb-2">
              Henüz rezervasyonunuz yok
            </h3>
            <p className="text-[#638863] dark:text-gray-400 mb-6">
              Heyecan verici maceralarımıza göz atın ve rezervasyon yapın
            </p>
            <Link
              href="/adventures"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <span>Maceralara Göz At</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        )}

        {/* Bookings List */}
        {bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex-1">
                    {/* Adventure Title */}
                    <Link
                      href={`/adventures/${booking.tour?.adventure?.slug || ''}`}
                      className="text-xl font-bold text-[#111811] dark:text-white hover:text-primary transition-colors mb-2 block"
                    >
                      {booking.tour?.adventure?.title || 'Macera'}
                    </Link>

                    {/* Tour Dates */}
                    <div className="flex items-center gap-2 text-[#638863] dark:text-gray-400 mb-3">
                      <span className="material-symbols-outlined text-sm">calendar_month</span>
                      <span className="text-sm">
                        {formatDate(booking.tour?.startDate)} - {formatDate(booking.tour?.endDate)}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-[#638863] dark:text-gray-400 block mb-1">Referans No</span>
                        <span className="font-mono text-[#111811] dark:text-white">{booking.bookingReference}</span>
                      </div>

                      <div>
                        <span className="text-[#638863] dark:text-gray-400 block mb-1">Katılımcı</span>
                        <span className="text-[#111811] dark:text-white">{booking.numberOfParticipants} kişi</span>
                      </div>

                      <div>
                        <span className="text-[#638863] dark:text-gray-400 block mb-1">Rezervasyon Tarihi</span>
                        <span className="text-[#111811] dark:text-white">{formatDate(booking.createdAt)}</span>
                      </div>

                      <div>
                        <span className="text-[#638863] dark:text-gray-400 block mb-1">Tutar</span>
                        <span className="font-bold text-[#111811] dark:text-white">
                          {booking.totalPrice || booking.tour?.price || 0} {booking.currency || 'TRY'}
                        </span>
                      </div>
                    </div>

                    {/* Special Requests */}
                    {booking.specialRequests && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-[#638863] dark:text-gray-400 block mb-1">Özel İstekler:</span>
                        <p className="text-sm text-[#111811] dark:text-white">{booking.specialRequests}</p>
                      </div>
                    )}
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col items-end gap-3">
                    {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusLabel(booking.status)}
                    </span>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/tours/${booking.tour?.slug}`}
                        className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 text-[#111811] dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Detaylar
                      </Link>

                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleCancelBooking(booking.documentId)}
                          disabled={cancellingId === booking.documentId}
                          className="px-4 py-2 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {cancellingId === booking.documentId ? 'İptal ediliyor...' : 'İptal Et'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
