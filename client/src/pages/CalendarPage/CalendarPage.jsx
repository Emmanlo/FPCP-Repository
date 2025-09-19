import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css';
import DateStrip from '../../components/DateStrip';


const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const [newEvent, setNewEvent] = useState({
    facility: '',
    purpose: '',
    requested_by: '',
    requested_datetime: '',
    end_datetime: '',
    approved_by: '',
    remarks: '',
    air_conditioning: false,
    projector_tv: false,
    kitchen_utensils: '',
    sound_system: '',
    chairs: '',
    tables: '',
    other_equipments: '',
  });

  const facilityToClassName = (facility) =>
    facility
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '')
      .replace(/[^a-z0-9-]/g, '');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/facility-bookings');
        const data = await res.json();
        const formatted = data.map((item) => ({
          ...item,
          title: item.purpose,
          start: new Date(item.start_datetime), // Required by react-big-calendar
          end: new Date(item.end_datetime),     // Required by react-big-calendar
        }));
        setEvents(formatted);
      } catch (err) {
        console.error('Error loading bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  const handleSelectSlot = async ({ start }) => {
    if (moment(start).isBefore(moment(), 'day')) {
      alert("Can't book past days");
      return;
    }
  
    try {
      const response = await fetch('/api/facility-bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
  
      const savedEvent = await response.json();
  
      setNewEvent((prev) => ({
        ...prev,
        title: savedEvent.purpose,
        start: new Date(savedEvent.start_datetime),
        end: new Date(savedEvent.requested_end_datetime),
      }));
  
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching event:', error);
      alert('Error loading booking info.');
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setNewEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/facility-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) throw new Error('Failed to save booking');

      const savedEvent = await response.json();

      setEvents((prev) => [
        ...prev,
        {
          ...savedEvent,
          title: savedEvent.purpose,
          start: new Date(savedEvent.start_datetime),
          end: new Date(savedEvent.requested_end_datetime),
        },
      ]);

      setModalOpen(false);
      setNewEvent({
        facility: '',
        purpose: '',
        requested_by: '',
        start_datetime: '',
        end_datetime: '',
        approved_by: '',
        remarks: '',
        air_conditioning: false,
        projector_tv: false,
        kitchen_utensils: '',
        sound_system: '',
        chairs: '',
        tables: '',
        other_equipments: '',
      });
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="calendar-wrapper">
      {isMobile ? (
        <div className="mobile-calendar">
          <div className="calendar-wrapper">
          <DateStrip currentDate={date} onDateSelect={setDate} />
          </div>

          <div className="day-view">
            {Array.from({ length: 12 }).map((_, i) => {
              const hour = 8 + i;
              return (
                <div key={hour} className="hour-slot">
                  <span>{hour}:00</span>
                  <div className="slot-content">
                    {events
                      .filter(
                        (e) =>
                          moment(e.start).isSame(date, 'day') &&
                          moment(e.start).hour() === hour
                      )
                      .map((ev, idx) => (
                        <div key={idx} className="event-card">
                          {ev.title}
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          view={view}
          date={date}
          onView={setView}
          onNavigate={setDate}
          onSelectSlot={handleSelectSlot}
          views={['month', 'week', 'day']}
          style={{ height: '80vh' }}
        />
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={() => setModalOpen(false)} className="modal-close-btn">
        &times;
        </button>
        <h2>New Booking</h2>
        <form onSubmit={handleSubmit} className="calendar-form">
        <label>Facility to be used</label>
        <div className="facility-radio-group">
          {[
            'Crossroads Youth Center (CYC)',
            'FPCP Conference Room',
            'CYC Conference Room',
            'FPCP Training Room A',
            'FPCP Training Room B'
          ].map((facility) => (
            <label
              key={facility}
              className={`facility-radio ${facilityToClassName(facility)} ${
                newEvent.facility === facility ? 'selected' : ''
              }`}
            >
              <input
                type="radio"
                name="facility"
                value={facility}
                checked={newEvent.facility === facility}
                onChange={handleChange('facility')}
              />
              {facility}
            </label>
          ))}
        </div>

          <label>Purpose</label>
          <input required value={newEvent.purpose} onChange={handleChange('purpose')} />

          <label>Requested By</label>
          <input required value={newEvent.requested_by} onChange={handleChange('requested_by')} />

          <label>Start Date and Time</label>
          <input
            type="datetime-local"
            required
            value={newEvent.requested_datetime}
            onChange={handleChange('start_datetime')}
          />

          <label>End Date and Time</label>
          <input
            type="datetime-local"
            required
            value={newEvent.end_datetime}
            onChange={handleChange('end_datetime')}
          />

          <label>Approved By</label>
          <input value={newEvent.approved_by} onChange={handleChange('approved_by')} />

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={newEvent.air_conditioning}
                onChange={handleChange('air_conditioning')}
              />
              Air-conditioning
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={newEvent.projector_tv}
                onChange={handleChange('projector_tv')}
              />
              Projector/TV
            </label>
          </div>

          <label>Kitchen Utensils</label>
          <input value={newEvent.kitchen_utensils} onChange={handleChange('kitchen_utensils')} />

          <label>Sound System (Microphone)</label>
          <input value={newEvent.sound_system} onChange={handleChange('sound_system')} />

          <label>Chairs</label>
          <input value={newEvent.chairs} onChange={handleChange('chairs')} />

          <label>Tables</label>
          <input value={newEvent.tables} onChange={handleChange('tables')} />

          <label>Other Equipments</label>
          <input value={newEvent.other_equipments} onChange={handleChange('other_equipments')} />

          <label>Remarks</label>
          <textarea value={newEvent.remarks} onChange={handleChange('remarks')} />

          <button type="submit">Submit</button>
        </form>
      </Modal>
      <button
            className="floating-add-btn"
            aria-label="Add new booking"
            onClick={() => {
              setNewEvent((prev) => ({
                ...prev,
                requested_datetime: moment(date)
                  .set({ hour: 8, minute: 0 })
                  .format('YYYY-MM-DDTHH:mm'),
              }));
              setModalOpen(true);
            }}
          >
            <span className="plus-icon">+</span>
          </button>
    </div>
  );
};

export default CalendarPage;
