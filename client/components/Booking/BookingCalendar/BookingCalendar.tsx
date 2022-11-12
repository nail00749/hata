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
  console.log(new Date(busyDates[0].startDate).getTime());
  return (
    <div>
      <Calendar
        value = {date}
        onChange = {setDate}
        selectRange
        tileDisabled = {({ date, view }) => {
          return !!(view === 'month' && busyDates.find(d => new Date(d.startDate).getTime() <= date.getTime() && new Date(d.endDate).getTime() >= date.getTime()));
        }}
      />
    </div
    >
  );
};

export default BookingCalendar;
