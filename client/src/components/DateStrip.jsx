import React from 'react';
import moment from 'moment';
import './DateStrip.css';

const DateStrip = ({ currentDate, onDateSelect }) => {
  const start = moment().startOf('month').startOf('week');
  const end = moment().add(1, 'months').endOf('month').endOf('week');

  const days = [];
  let date = start.clone();

  while (date.isSameOrBefore(end, 'day')) {
    days.push(date.clone());
    date.add(1, 'day');
  }

  const isToday = (d) => moment().isSame(d, 'day');
  const isSelected = (d) => moment(currentDate).isSame(d, 'day');

  return (
    <div className="date-strip-container">
      {days.map((day, index) => {
        const showMonth =
          index === 0 || day.date() === 1 || !day.isSame(days[index - 1], 'month');

        return (
          <div key={day.format()} className="date-strip-day">
            {showMonth && (
              <div className="date-strip-month">{day.format('MMMM')}</div>
            )}
            <button
              className={`date-strip-button ${isToday(day) ? 'today' : ''} ${
                isSelected(day) ? 'selected' : ''
              }`}
              onClick={() => onDateSelect(day.toDate())}
            >
              <div>{day.format('ddd')}</div>
              <div>{day.format('D')}</div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DateStrip;
