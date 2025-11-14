const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface Booking {
  id: number;
  documentId: string;
  tour: {
    id: number;
    slug: string;
    startDate: string;
    endDate: string;
    price: number;
    currency: string;
    adventure?: {
      title: string;
      slug: string;
    };
  };
  user: {
    id: number;
    username: string;
    email: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  numberOfParticipants: number;
  participantDetails?: any;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests?: string;
  totalPrice?: number;
  currency: string;
  bookingReference: string;
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingData {
  tour: number; // tour ID
  numberOfParticipants: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests?: string;
  participantDetails?: any;
}

/**
 * Create a new booking
 */
export async function createBooking(token: string, data: CreateBookingData): Promise<Booking> {
  const res = await fetch(`${STRAPI_URL}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Rezervasyon oluşturulamadı');
  }

  const response = await res.json();
  return response.data;
}

/**
 * Get user's bookings
 */
export async function getUserBookings(token: string): Promise<Booking[]> {
  const res = await fetch(`${STRAPI_URL}/api/bookings?populate[tour][populate][0]=adventure&filters[user][id][$eq]=$me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Rezervasyonlar alınamadı');
  }

  const response = await res.json();
  return response.data || [];
}

/**
 * Get a single booking
 */
export async function getBooking(token: string, documentId: string): Promise<Booking> {
  const res = await fetch(`${STRAPI_URL}/api/bookings/${documentId}?populate[tour][populate][0]=adventure`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Rezervasyon bulunamadı');
  }

  const response = await res.json();
  return response.data;
}

/**
 * Cancel a booking
 */
export async function cancelBooking(token: string, documentId: string): Promise<Booking> {
  const res = await fetch(`${STRAPI_URL}/api/bookings/${documentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        status: 'cancelled',
      },
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Rezervasyon iptal edilemedi');
  }

  const response = await res.json();
  return response.data;
}

/**
 * Format booking status in Turkish
 */
export function getStatusLabel(status: Booking['status']): string {
  const labels = {
    pending: 'Beklemede',
    confirmed: 'Onaylandı',
    cancelled: 'İptal Edildi',
    completed: 'Tamamlandı',
  };
  return labels[status] || status;
}

/**
 * Get status color
 */
export function getStatusColor(status: Booking['status']): string {
  const colors = {
    pending: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
    confirmed: 'text-green-600 bg-green-50 dark:bg-green-900/20',
    cancelled: 'text-red-600 bg-red-50 dark:bg-red-900/20',
    completed: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
  };
  return colors[status] || 'text-gray-600 bg-gray-50';
}

/**
 * Format date in Turkish
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
