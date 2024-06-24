import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const onChange = (newDate) => {
    if (newDate >= new Date().setHours(0, 0, 0, 0)) {
      setDate(newDate);
      setSelectedDate(newDate.toDateString());
    }
  };

  const addEvent = () => {

    const today = new Date().setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate).setHours(0, 0, 0, 0);

    if (selected < today) {
        alert("Cannot add events to previous dates.");
        return;
      }

    if (events[selectedDate]) {
      console.log('Event Already Add this Date');
    } else {
      const event = prompt('Enter event details:');
      if (event) {
        setEvents({
          ...events,
          [selectedDate]: event,
        });
      }
    }
  };

  const deleteEvent = () => {
    const updatedEvents = { ...events };
    delete updatedEvents[selectedDate];
    setEvents(updatedEvents);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && events[date.toDateString()]) {
      return <span className="event-dot"></span>;
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date < today) {
        return 'gray-previous-date';
      }

      if (date.getDay() === 0) {
        return 'red-sunday';
      }

      return 'black-date';
    }
    return null;
  };

  const handleDayClick = (date) => {
    const dateString = date.toDateString();
    setSelectedDate(dateString);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <Calendar
          onChange={onChange}
          value={date}
          tileContent={tileContent}
          tileClassName={tileClassName}
          onClickDay={handleDayClick}
        />
      </div>
        {selectedDate && (
        <div className="events-wrapper">
          <h2>Events</h2>
          <div>
            <p>{selectedDate}</p>
            {events[selectedDate] ? (
              <div>
                <p>{events[selectedDate]}</p>
                <button onClick={deleteEvent}>Delete Event</button>
              </div>
            ) : (
              <button onClick={addEvent}>Add Event</button>
            )}
          </div>
        </div>
      )}
      </div>
  );
};

export default MyCalendar;
