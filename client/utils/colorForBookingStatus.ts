import { BookingStatus } from '../models/BookingStatus';

export const colorForBookingStatus = (color: BookingStatus) => {
  switch (color) {
    case BookingStatus.REQUEST:
      return '';
    case BookingStatus.REJECT:
      return 'red';
    case BookingStatus.EXPIRED:
      return 'red';
    case BookingStatus.APPROVED:
      return 'green';
    case BookingStatus.AWAITINGRATE:
      return 'yellow';
    case BookingStatus.ENDED:
      return 'green';
  }
};
