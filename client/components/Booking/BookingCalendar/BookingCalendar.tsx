import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FC } from 'react';
import { DateRange } from '../Booking';
import { IBooking } from '../../../models/IBooking';

interface BookingCalendarProps {
  date: DateRange;
  setDate: any,
  busyDates: IBooking[]
}

const BookingCalendar: FC<BookingCalendarProps> = ({ date, setDate, busyDates }) => {
  return (
    <div>
      <Calendar
        value = {date}
        onChange = {setDate}
        selectRange
        tileDisabled = {({ date, view }) => {
          const tileDate = date.getTime();
          return !!(view === 'month' &&
            busyDates &&
            (busyDates.find(d => new Date(d.startDate).getTime() <= tileDate && new Date(d.endDate).getTime() >= tileDate))
            || tileDate <= Date.now());
        }}
      />
    </div
    >
  );
};

export default BookingCalendar;
