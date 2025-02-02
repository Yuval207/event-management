const STORAGE_KEY = 'events';

export const saveEvents = (events) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export const getEvents = () => {
  const events = localStorage.getItem(STORAGE_KEY);
  return events ? JSON.parse(events) : [];
};

export const addEvent = (event) => {
  const events = getEvents();
  events.push(event);
  saveEvents(events);
};

export const updateEvent = (updatedEvent) => {
  const events = getEvents();
  const index = events.findIndex(event => event.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
    saveEvents(events);
  }
};

export const deleteEvent = (eventId) => {
  const events = getEvents();
  const filteredEvents = events.filter(event => event.id !== eventId);
  saveEvents(filteredEvents);
};