import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, MapPin, ArrowLeft, X } from 'lucide-react';
import { resizeMedia } from '../utils/mediaUtils';

export default function EventForm({ onSubmit, onBack, initialEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    endDate: '',
    location: '',
    description: '',
  });
  const [mediaPreview, setMediaPreview] = useState(null);
  const [error, setError] = useState(null);
  const [community, setCommunity] = useState('Indiranagar Run Club');
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);

  useEffect(() => {
    if (initialEvent) {
      setFormData({
        title: initialEvent.title,
        date: initialEvent.date,
        endDate: initialEvent.endDate || '',
        location: initialEvent.location,
        description: initialEvent.description,
      });
      setCommunity(initialEvent.community);
      if (initialEvent.media) {
        setMediaPreview(initialEvent.media.data);
      }
    }
  }, [initialEvent]);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleMediaChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const resizedMedia = await resizeMedia(file);
      setMediaPreview(resizedMedia);
      setFormData(prev => ({
        ...prev,
        media: file
      }));
    } catch (err) {
      setError('Failed to process media file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    const event = {
      id: initialEvent?.id || crypto.randomUUID(),
      title: formData.title,
      date: formData.date,
      endDate: formData.endDate,
      location: formData.location,
      description: formData.description,
      community,
      media: mediaPreview ? {
        type: 'image',
        data: mediaPreview
      } : undefined
    };

    onSubmit(event);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={onBack} className="text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">
          {initialEvent ? 'Edit Event' : 'Create New Event'}
        </h1>
        <div className="w-6" />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm flex items-center justify-between">
            {error}
            <button onClick={() => setError(null)} className="text-red-500">
              <X size={16} />
            </button>
          </div>
        )}

        <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center relative">
          {mediaPreview ? (
            <div className="relative w-full h-full">
              <img
                src={mediaPreview}
                alt="Event"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setMediaPreview(null);
                  setFormData(prev => ({ ...prev, media: undefined }));
                }}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/1837/1837526.png" 
                  alt="Add Photo"
                  className="w-full h-full object-contain"
                />
              </div>
              <label
                htmlFor="media-upload"
                className="inline-flex items-center text-blue-600 cursor-pointer"
              >
                <span className="mr-1">Add Photo</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMediaChange}
                className="hidden"
                id="media-upload"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Select Community</label>
            <div className="relative">
              <button
                type="button"
                className="w-full px-4 py-2 text-left border rounded-lg flex items-center justify-between"
                onClick={() => setShowCommunityDropdown(!showCommunityDropdown)}
              >
                <span>{community}</span>
                {showCommunityDropdown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {showCommunityDropdown && (
                <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
                  {['Indiranagar Run Club', 'Delhi Royal Enfield Riders', 'BHag Club'].map((name) => (
                    <div
                      key={name}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setCommunity(name);
                        setShowCommunityDropdown(false);
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Event Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="10K Run in Indiranagar"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Starts</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Ends</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Location</label>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 pl-10 border rounded-lg"
                placeholder="Choose location"
                required
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Add Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Add a brief description to let attendees know what your event is all about."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          {initialEvent ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}