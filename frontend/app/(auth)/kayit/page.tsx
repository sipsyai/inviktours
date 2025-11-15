'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.passwordConfirm) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    setLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      });
      router.push('/'); // Redirect to home after registration
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kayıt olunamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#111811] dark:text-white">
            Yeni Hesap Oluşturun
          </h2>
          <p className="mt-2 text-center text-sm text-[#638863] dark:text-gray-400">
            veya{' '}
            <Link
              href="/giris"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              mevcut hesabınızla giriş yapın
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                Kullanıcı Adı *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="kullaniciadi"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                E-posta *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="ornek@email.com"
              />
            </div>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                  Ad
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Adınız"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                  Soyad
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="+90 555 555 55 55"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                Şifre *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-[#638863] dark:text-gray-400">En az 6 karakter</p>
            </div>

            {/* Password Confirm */}
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                Şifre Tekrar *
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                required
                value={formData.passwordConfirm}
                onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 mt-1 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-[#638863] dark:text-gray-400">
              <a href="#" className="text-primary hover:text-primary/80">Kullanım şartlarını</a> ve{' '}
              <a href="#" className="text-primary hover:text-primary/80">gizlilik politikasını</a> kabul ediyorum
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Hesap oluşturuluyor...
                </span>
              ) : (
                'Hesap Oluştur'
              )}
            </button>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-[#638863] dark:text-gray-400 hover:text-primary transition-colors"
          >
            ← Anasayfaya dön
          </Link>
        </div>
      </div>
    </div>
  );
}
