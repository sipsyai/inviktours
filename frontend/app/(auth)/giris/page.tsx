'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    identifier: '', // email or username
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      router.push('/'); // Redirect to home after login
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
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
            Hesabınıza Giriş Yapın
          </h2>
          <p className="mt-2 text-center text-sm text-[#638863] dark:text-gray-400">
            veya{' '}
            <Link
              href="/kayit"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              yeni hesap oluşturun
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
            {/* Email */}
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                E-posta
              </label>
              <input
                id="identifier"
                name="identifier"
                type="email"
                autoComplete="email"
                required
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="ornek@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#111811] dark:text-white mb-2">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-[#111811] dark:text-white bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#638863] dark:text-gray-400">
                Beni hatırla
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Şifremi unuttum
              </a>
            </div>
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
                  Giriş yapılıyor...
                </span>
              ) : (
                'Giriş Yap'
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
