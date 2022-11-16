import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FC } from 'react';
import { DateRange } from '../Booking';
import { IBooking } from '../../../models/IBooking';
import login from '../../../pages/api/login';

interface BookingCalendarProps {
  date: DateRange;
  setDate: any,
  busyDates: IBooking[]
}

const BookingCalendar: FC<BookingCalendarProps> = ({ date, setDate, busyDates }) => {
  //console.log(busyDates);
  console.log(new Date(busyDates[0].startDate));
//Mon Nov 28 2022 00:00:00 GMT+0500 (Екатеринбург, стандартное время)
  return (
    <div>
      <Calendar
        value = {date}
        onChange = {setDate}
        selectRange
        tileDisabled={({activeStartDate, date, view}) => {
          let i = !!(view === 'month' && busyDates.find(d => new Date(d.startDate) === date || new Date(d.endDate) === date))
          let j = busyDates.find(d => new Date(d.startDate) === date || new Date(d.endDate) === date)
          console.log(date === new Date(busyDates[0].startDate));
          return i
        }}
      />
    </div
    >
  );
};

export default BookingCalendar;
