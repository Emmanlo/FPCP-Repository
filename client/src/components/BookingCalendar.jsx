// src/components/BookingCalendar.jsx
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { isBefore } from 'date-fns';

const localizer = momentLocalizer(moment);

const BookingCalendar = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.WEEK);

  // ✅ Fetch events from backend on mount
  useEffect(() => {
    fetch('/api/facility-bookings')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(event => ({
          title: `${event.facility} - ${event.purpose}`,
          start: new Date(event.requested_datetime),
          end: new Date(new Date(event.requested_datetime).getTime() + 60 * 60 * 1000), // 1hr duration
        }));
        setEvents(formatted);
      })
      .catch(err => console.error('Error loading bookings:', err));
  }, []);

  // ✅ Select time slot to add a booking
  const handleSelectSlot = async ({ start, end }) => {
    if (isBefore(start, new Date())) {
      alert('Cannot book past dates');
      return;
    }

    const facility = prompt('Facility to be used:');
    const purpose = prompt('Purpose:');
    const requestedBy = prompt('Requested By:');
    if (!facility || !purpose || !requestedBy) return;

    const newBooking = {
      facility,
      purpose,
      requested_by: requestedBy,
      requested_datetime: start.toISOString(),
      approved_by: '',
      remarks: '',
      air_conditioning: false,
      projector_tv: false,
      kitchen_utensils: '',
      sound_system: '',
      chairs: '',
      tables: '',
      other_equipments: '',
    };

    try {
      const res = await fetch('/api/facility-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      });

      const saved = await res.json();

      // Add the new event to calendar
      setEvents(prev => [
        ...prev,
        {
          title: `${saved.facility} - ${saved.purpose}`,
          start: new Date(saved.requested_datetime),
          end: new Date(new Date(saved.requested_datetime).getTime() + 60 * 60 * 1000),
        },
      ]);
    } catch (err) {
      console.error('Error saving booking:', err);
    }
  };

  return (
    <div style={{ height: '80vh', padding: '1rem' }}>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        step={30}
        timeslots={2}
        date={currentDate}
        view={currentView}
        onNavigate={setCurrentDate}
        onView={setCurrentView}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        onSelectSlot={handleSelectSlot}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default BookingCalendar;
