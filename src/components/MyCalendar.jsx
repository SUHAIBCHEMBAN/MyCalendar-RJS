import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents'));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  const saveEventsToLocalStorage = (updatedEvents) => {
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };

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
      alert('Cannot add events to previous dates.');
      return;
    }

    const event = prompt('Enter event details:');
    if (event) {
      const updatedEvents = {
        ...events,
        [selectedDate]: event,
      };
      setEvents(updatedEvents);
      saveEventsToLocalStorage(updatedEvents);
    }
  };

  const deleteEvent = () => {
    if (!selectedDate || !events[selectedDate]) {
      return;
    }

    const updatedEvents = { ...events };
    delete updatedEvents[selectedDate];
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
    setSelectedDate(null); // Clear selectedDate after deletion
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

