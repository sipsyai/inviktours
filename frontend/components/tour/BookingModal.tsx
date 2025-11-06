'use client';

import { useState, useEffect } from 'react';
import { Tour } from '@/types/tour';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour;
}

export default function BookingModal({ isOpen, onClose, tour }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    adults: 1,
    children: 0,
    message: '',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement booking submission
    console.log('Booking data:', formData);
    alert('Rezervasyon talebiniz alındı! En kısa sürede size dönüş yapacağız.');
    onClose();
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
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              className="w-full bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">check_circle</span>
              Rezervasyon Talebi Gönder
            </button>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Rezervasyon talebinizi aldıktan sonra en kısa sürede size dönüş yapacağız.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
