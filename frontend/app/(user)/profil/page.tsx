'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile } from '@/lib/auth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, token } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/giris');
    }
  }, [authLoading, isAuthenticated, router]);

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (!token) {
        throw new Error('Oturum bulunamadı');
      }

      await updateProfile(token, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      });

      setMessage({ type: 'success', text: 'Profiliniz başarıyla güncellendi!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Profil güncellenemedi' });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111811] dark:text-white mb-2">
            Profil Ayarları
          </h1>
          <p className="text-[#638863] dark:text-gray-400">
            Hesap bilgilerinizi güncelleyin
          </p>
        </div>

        {/* Profile Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">
                  {message.type === 'success' ? 'check_circle' : 'error'}
                </span>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                E-posta
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-[#638863] dark:text-gray-400 rounded-lg cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-[#638863] dark:text-gray-400">
                E-posta adresiniz değiştirilemez
              </p>
            </div>

            {/* Username (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={user?.username || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-[#638863] dark:text-gray-400 rounded-lg cursor-not-allowed"
              />
            </div>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                  Ad
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Adınız"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                  Soyad
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Soyadınız"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                Telefon
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="+90 555 555 55 55"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Kaydediliyor...
                  </span>
                ) : (
                  'Değişiklikleri Kaydet'
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-[#111811] dark:text-white rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>

        {/* Account Info */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-bold text-[#111811] dark:text-white mb-4">
            Hesap Bilgileri
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#638863] dark:text-gray-400">Hesap Durumu:</span>
              <span className={`font-medium ${user?.confirmed ? 'text-green-600' : 'text-yellow-600'}`}>
                {user?.confirmed ? '✓ Onaylı' : '⚠ Onay Bekliyor'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#638863] dark:text-gray-400">Üyelik Tipi:</span>
              <span className="font-medium text-[#111811] dark:text-white">Standart</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
