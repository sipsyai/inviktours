'use client';

import { useState } from 'react';
import { Tour } from '@/types/tour';
import { BookingButtonSettings } from '@/types/tour';
import FloatingBookingButton from './FloatingBookingButton';
import BookingModal from './BookingModal';

interface TourBookingWrapperProps {
  tour: Tour;
  bookingSettings?: BookingButtonSettings;
}

export default function TourBookingWrapper({ tour, bookingSettings }: TourBookingWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If booking button is disabled in settings, don't render anything
  if (bookingSettings && !bookingSettings.enabled) {
    return null;
  }

  return (
    <>
      <FloatingBookingButton
        onClick={() => setIsModalOpen(true)}
        buttonText={bookingSettings?.buttonText}
        buttonIcon={bookingSettings?.buttonIcon}
        position={bookingSettings?.position}
        showOnMobile={bookingSettings?.showOnMobile}
      />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tour={tour}
      />
    </>
  );
}
