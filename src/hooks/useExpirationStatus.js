import { useMemo } from 'react';

export default function useExpirationStatus(expiryDate) {
  return useMemo(() => {
    if (!expiryDate) {
      return { daysLeft: null, status: 'unknown' };
    }

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const expiry = new Date(expiryDate);
      expiry.setHours(0, 0, 0, 0);

      const diffTime = expiry - today;
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (daysLeft < 0) {
        return { daysLeft: 0, status: 'expired' };
      } else if (daysLeft === 0) {
        return { daysLeft: 0, status: 'today' };
      } else if (daysLeft <= 3) {
        return { daysLeft, status: 'expiring-soon' };
      } else if (daysLeft <= 7) {
        return { daysLeft, status: 'warning' };
      } else {
        return { daysLeft, status: 'good' };
      }
    } catch (error) {
      console.error('Error calculating expiration:', error);
      return { daysLeft: null, status: 'unknown' };
    }
  }, [expiryDate]);
}