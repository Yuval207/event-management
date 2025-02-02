import React, { useState, useEffect } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { getEvents, addEvent, updateEvent, deleteEvent } from './utils/storage';

function App() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('events');
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const handleCreateEvent = (event) => {
    if (editingEvent) {
      updateEvent(event);
    } else {
      addEvent(event);
    }
    setEvents(getEvents());
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
      setEvents(getEvents());
    }
  };

  const handleAddEventClick = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleBackToList = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  if (showForm) {
    return (
      <EventForm 
        onSubmit={handleCreateEvent} 
        onBack={handleBackToList}
        initialEvent={editingEvent}
      />
    );
  }

  return (
    <EventList 
      events={events} 
      onAddEvent={handleAddEventClick}
      onEditEvent={handleEditEvent}
      onDeleteEvent={handleDeleteEvent}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}

export default App;