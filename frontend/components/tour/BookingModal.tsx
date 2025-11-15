'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tour } from '@/types/tour';
import { useAuth } from '@/contexts/AuthContext';
import { createBooking } from '@/lib/booking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour;
}

export default function BookingModal({ isOpen, onClose, tour }: BookingModalProps) {
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    adults: 1,
    children: 0,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Pre-fill form with user data if authenticated
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
        email: user.email,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if user is authenticated
    if (!isAuthenticated) {
      if (confirm('Rezervasyon yapmak için giriş yapmanız gerekiyor. Giriş sayfasına yönlendirilmek ister misiniz?')) {
        router.push('/giris');
      }
      return;
    }

    if (!token) {
      setError('Oturum bulunamadı. Lütfen tekrar giriş yapın.');
      return;
    }

    setLoading(true);

    try {
      const totalParticipants = parseInt(formData.adults.toString()) + parseInt(formData.children.toString());

      await createBooking(token, {
        tour: tour.id,
        numberOfParticipants: totalParticipants,
        contactName: formData.name,
        contactEmail: formData.email,
        contactPhone: formData.phone,
        specialRequests: formData.message || undefined,
        participantDetails: {
          adults: formData.adults,
          children: formData.children,
        },
      });

      setSuccess(true);

      // Redirect to bookings page after 2 seconds
      setTimeout(() => {
        router.push('/rezervasyonlarim');
        onClose();
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rezervasyon oluşturulamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const totalPrice = tour.price ? tour.price * formData.adults : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full md:max-w-2xl bg-white dark:bg-gray-900 rounded-t-3xl md:rounded-2xl shadow-2xl max-h-[90vh] md:max-h-[85vh] overflow-hidden animate-slideUp md:animate-fadeIn">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-br from-primary to-green-600 px-6 py-5 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">
                Rezervasyon Yap
              </h2>
              <p className="text-white/90 text-sm line-clamp-1">
                {tour.adventure?.title || 'Tur'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Kapat"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] md:max-h-[calc(85vh-80px)]">
          {/* Success Message */}
          {success && (
            <div className="p-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <span className="material-symbols-outlined text-6xl text-green-600">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                  Rezervasyon Oluşturuldu!
                </h3>
                <p className="text-green-700 dark:text-green-300 mb-4">
                  Rezervasyon talebiniz başarıyla alındı. Rezervasyonlarım sayfasına yönlendiriliyorsunuz...
                </p>
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  <span>Yönlendiriliyor...</span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          {!success && (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">error</span>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}
            {/* Tour Info Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {tour.startDate && (
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Başlangıç Tarihi</div>
                    <div className="font-semibold text-[#111811] dark:text-white">
                      {new Date(tour.startDate).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                )}
                {tour.endDate && (
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Bitiş Tarihi</div>
                    <div className="font-semibold text-[#111811] dark:text-white">
                      {new Date(tour.endDate).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                )}
                {tour.price && (
                  <div className="col-span-2">
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Kişi Başı Fiyat</div>
                    <div className="font-bold text-primary text-lg">
                      {tour.price.toLocaleString('tr-TR')} {tour.currency || 'TRY'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#111811] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                İletişim Bilgileri
              </h3>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111811] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111811] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111811] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+90 5XX XXX XX XX"
                  />
                </div>
              </div>
            </div>

            {/* Participant Count */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#111811] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">groups</span>
                Katılımcı Sayısı
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="adults" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                    Yetişkin
                  </label>
                  <select
                    id="adults"
                    name="adults"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111811] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="children" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                    Çocuk
                  </label>
                  <select
                    id="children"
                    name="children"
                    value={formData.children}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111811] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                Ek Notlar (Opsiyonel)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111811] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Özel istekleriniz veya sorularınız varsa buraya yazabilirsiniz..."
              />
            </div>

            {/* Price Summary */}
            {tour.price && (
              <div className="bg-gradient-to-br from-primary/10 to-green-600/10 dark:from-primary/20 dark:to-green-600/20 rounded-xl p-5 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#111811] dark:text-white font-medium">
                    Toplam Tutar
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({formData.adults} Yetişkin)
                  </span>
                </div>
                <div className="text-3xl font-bold text-primary">
                  {totalPrice.toLocaleString('tr-TR')} {tour.currency || 'TRY'}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  * Nihai fiyat rezervasyon onayında belirlenecektir
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Rezervasyon Oluşturuluyor...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">check_circle</span>
                  {isAuthenticated ? 'Rezervasyon Yap' : 'Giriş Yap ve Rezervasyon Yap'}
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              {isAuthenticated
                ? 'Rezervasyonunuz onaylandıktan sonra email ile bilgilendirileceksiniz.'
                : 'Rezervasyon yapmak için giriş yapmanız gerekmektedir.'
              }
            </p>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}
