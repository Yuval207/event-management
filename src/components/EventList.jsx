import React from 'react';
import { Settings, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function EventList({ 
  events, 
  onAddEvent, 
  onEditEvent,
  onDeleteEvent,
  activeTab, 
  onTabChange 
}) {
  const [activeMenu, setActiveMenu] = React.useState(null);

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-xl font-semibold">Delhi NCR</h1>
          <p className="text-sm text-gray-600">Welcome to the tribe!</p>
        </div>
        <Settings className="text-gray-600" size={24} />
      </div>

      <div className="flex space-x-8 p-4 border-b">
        <button 
          className={`pb-2 font-medium ${
            activeTab === 'events' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600'
          }`}
          onClick={() => onTabChange('events')}
        >
          Events
        </button>
        <button 
          className={`pb-2 font-medium ${
            activeTab === 'communities' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600'
          }`}
          onClick={() => onTabChange('communities')}
        >
          Communities
        </button>
      </div>

      {activeTab === 'events' ? (
        <div className="grid grid-cols-2 gap-4 p-4">
          {events.map((event) => (
            <div key={event.id} className="rounded-lg overflow-hidden shadow-sm border relative">
              {event.media && (
                <div className="aspect-[4/3]">
                  <img
                    src={event.media.data}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-600 mb-1">
                    <img
                      src="https://placekitten.com/20/20"
                      alt={event.community}
                      className="w-4 h-4 rounded-full mr-1"
                    />
                    <span>By {event.community}</span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === event.id ? null : event.id)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <MoreVertical size={16} className="text-gray-600" />
                    </button>
                    {activeMenu === event.id && (
                      <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border z-10">
                        <button
                          onClick={() => {
                            onEditEvent(event);
                            setActiveMenu(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            onDeleteEvent(event.id);
                            setActiveMenu(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600 flex items-center gap-2"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="font-medium text-sm mb-1">{event.title}</h3>
                <div className="text-xs text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-1">⏰</span>
                    Tomorrow, {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">📍</span>
                    {event.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-600">
          Communities tab content
        </div>
      )}

      <button
        onClick={onAddEvent}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}