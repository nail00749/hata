import { BookingStatus } from '../models/BookingStatus';

export const localeBookingStatus = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.REQUEST:
      return 'Запрос';
    case BookingStatus.APPROVED:
      return 'Принят';
    case BookingStatus.REJECT:
      return 'Отклонен';
    case BookingStatus.EXPIRED:
      return 'Истек';
    case BookingStatus.AWAITINGRATE:
      return 'Ждет оценки';
    case BookingStatus.ENDED:
      return 'Завершен';
    case BookingStatus.CANCEL:
      return 'Отменен';

  }
};
