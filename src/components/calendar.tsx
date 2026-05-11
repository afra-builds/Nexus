import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const CalendarComponent: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [showSlotForm, setShowSlotForm] = useState(false);
  const [newSlot, setNewSlot] = useState({
    title: 'Available',
    start: '',
    end: ''
  });

  // Handle date click - add availability slot
  const handleDateClick = (info: any) => {
    setNewSlot({
      title: 'Available',
      start: info.dateStr,
      end: info.dateStr
    });
    setShowSlotForm(true);
  };

  // Save availability slot
  const saveSlot = () => {
    if (newSlot.start && newSlot.end) {
      const newEvent = {
        id: Date.now().toString(),
        title: newSlot.title,
        start: newSlot.start,
        end: newSlot.end,
        backgroundColor: '#10b981',
        borderColor: '#10b981'
      };
      setEvents([...events, newEvent]);
      setShowSlotForm(false);
      setNewSlot({ title: 'Available', start: '', end: '' });
    }
  };

  // Handle meeting request (demo)
  const handleMeetingRequest = () => {
    alert('Meeting request sent to investor!');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Meeting Calendar</h2>
        <button
          onClick={handleMeetingRequest}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Request Meeting
        </button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        events={events}
        dateClick={handleDateClick}
        editable={true}
        selectable={true}
        height="auto"
      />

      {/* Availability Slot Form Modal */}
      {showSlotForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Add Availability Slot</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={newSlot.start.split('T')[0]}
                onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value, end: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSlotForm(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveSlot}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Requests Section */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-3">Meeting Requests</h3>
        <div className="border rounded-lg p-4">
          <p className="text-gray-600">No pending meeting requests</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;