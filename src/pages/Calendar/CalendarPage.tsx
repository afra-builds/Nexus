import React, { useState } from 'react';
import { Clock, Check, X, Calendar, Video } from 'lucide-react';

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const [meetings, setMeetings] = useState([
    { id: 1, title: 'Investment Discussion', date: '2026-05-25', time: '2:00 PM', status: 'pending', requester: 'Michael Rodriguez' },
    { id: 2, title: 'Product Demo', date: '2026-05-26', time: '11:00 AM', status: 'accepted', requester: 'Sarah Johnson' },
  ]);

  const [availability, setAvailability] = useState([
    '2026-05-23', '2026-05-24', '2026-05-25'
  ]);

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'accepted': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Accepted</span>;
      case 'pending': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>;
      case 'declined': return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Declined</span>;
      default: return null;
    }
  };

  const handleDateClick = (day: number) => {
    const date = `2026-05-${day.toString().padStart(2, '0')}`;
    setSelectedDate(new Date(2026, 4, day));
    setShowModal(true);
  };

  const sendMeetingRequest = () => {
    if (!meetingTitle) return;
    const newMeeting = {
      id: meetings.length + 1,
      title: meetingTitle,
      date: selectedDate?.toISOString().split('T')[0] || '',
      time: '10:00 AM',
      status: 'pending',
      requester: 'You'
    };
    setMeetings([...meetings, newMeeting]);
    setMeetingTitle('');
    setShowModal(false);
    alert('Meeting request sent!');
  };

  const acceptMeeting = (id: number) => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, status: 'accepted' } : m));
  };

  const declineMeeting = (id: number) => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, status: 'declined' } : m));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meeting Scheduler</h1>
        <p className="text-gray-500">Schedule and manage your meetings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">May 2026</h2>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-sm font-medium text-gray-500 py-2">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array(5).fill(null).map((_, i) => (
              <div key={`empty-${i}`} className="h-24 p-1"></div>
            ))}
            {daysInMonth.map(day => {
              const dateStr = `2026-05-${day.toString().padStart(2, '0')}`;
              const hasMeeting = meetings.some(m => m.date === dateStr);
              const isAvailable = availability.includes(dateStr);
              return (
                <div
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`h-24 border rounded-lg p-1 cursor-pointer hover:bg-blue-50 transition-colors
                    ${hasMeeting ? 'bg-blue-100' : isAvailable ? 'bg-green-50' : 'bg-white'}`}
                >
                  <span className="text-sm font-medium">{day}</span>
                  {hasMeeting && <Calendar size={12} className="text-blue-600 mt-1" />}
                  {isAvailable && !hasMeeting && <Clock size={12} className="text-green-600 mt-1" />}
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-100 rounded"></div> Meeting scheduled</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-50 rounded border"></div> Available slot</div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Clock size={18} className="text-yellow-500" />
              Pending Requests ({meetings.filter(m => m.status === 'pending').length})
            </h2>
            {meetings.filter(m => m.status === 'pending').length === 0 ? (
              <p className="text-gray-400 text-sm">No pending requests</p>
            ) : (
              meetings.filter(m => m.status === 'pending').map(meeting => (
                <div key={meeting.id} className="border rounded-lg p-3 mb-2">
                  <p className="font-medium text-sm">{meeting.title}</p>
                  <p className="text-xs text-gray-500">{meeting.date} at {meeting.time}</p>
                  <p className="text-xs text-gray-500">From: {meeting.requester}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => acceptMeeting(meeting.id)} className="flex-1 px-2 py-1 bg-green-500 text-white text-xs rounded">Accept</button>
                    <button onClick={() => declineMeeting(meeting.id)} className="flex-1 px-2 py-1 bg-red-500 text-white text-xs rounded">Decline</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Video size={18} className="text-blue-500" />
              Confirmed Meetings ({meetings.filter(m => m.status === 'accepted').length})
            </h2>
            {meetings.filter(m => m.status === 'accepted').map(meeting => (
              <div key={meeting.id} className="border rounded-lg p-3 mb-2">
                <p className="font-medium text-sm">{meeting.title}</p>
                <p className="text-xs text-gray-500">{meeting.date} at {meeting.time}</p>
                <button className="mt-2 text-xs text-blue-600 hover:underline">Join Meeting →</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-5">
            <h3 className="font-semibold text-lg mb-4">Schedule Meeting</h3>
            <p className="text-sm text-gray-600 mb-3">{selectedDate?.toDateString()}</p>
            <input
              type="text"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              placeholder="Meeting title"
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />
            <div className="flex gap-3">
              <button onClick={sendMeetingRequest} className="flex-1 py-2 bg-blue-600 text-white rounded-lg">Send Request</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;