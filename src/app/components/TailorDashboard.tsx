import { useState } from 'react';
import { Calendar, DollarSign, Users, Settings, Bell, CheckCircle2, Clock, XCircle, Star, TrendingUp, Package, Plus, Edit2, Trash2, Scissors } from 'lucide-react';
import { Screen, Booking } from '../App';

interface TailorDashboardProps {
  onNavigate: (screen: Screen) => void;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    tailorName: 'Customer: Priya Sharma',
    service: 'Saree Blouse Stitching',
    date: '2025-12-22',
    time: '10:00 AM',
    amount: 800,
    status: 'pending'
  },
  {
    id: '2',
    tailorName: 'Customer: Arjun Reddy',
    service: 'Shirt Stitching',
    date: '2025-12-23',
    time: '02:00 PM',
    amount: 500,
    status: 'confirmed'
  },
  {
    id: '3',
    tailorName: 'Customer: Sneha Patel',
    service: 'Pant Alteration',
    date: '2025-12-21',
    time: '11:00 AM',
    amount: 200,
    status: 'completed'
  },
  {
    id: '4',
    tailorName: 'Customer: Rahul Kumar',
    service: 'Suit Stitching',
    date: '2025-12-24',
    time: '03:00 PM',
    amount: 2500,
    status: 'confirmed'
  }
];

export function TailorDashboard({ onNavigate }: TailorDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'earnings'>('overview');
  const [bookings, setBookings] = useState(mockBookings);

  const stats = {
    todayBookings: bookings.filter(b => b.date === '2025-12-21').length,
    totalEarnings: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.amount, 0),
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    rating: 4.8
  };

  const handleBookingAction = (bookingId: string, action: 'accept' | 'reject') => {
    setBookings(bookings.map(b => 
      b.id === bookingId 
        ? { ...b, status: action === 'accept' ? 'confirmed' : 'cancelled' }
        : b
    ) as Booking[]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Tailor Dashboard</h1>
            <p className="text-purple-100 mt-1">Rajesh Tailors</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <Calendar className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">{stats.todayBookings}</p>
            <p className="text-sm text-purple-100">Today's Bookings</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <DollarSign className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">₹{stats.totalEarnings}</p>
            <p className="text-sm text-purple-100">Total Earnings</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <Clock className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">{stats.pendingBookings}</p>
            <p className="text-sm text-purple-100">Pending Requests</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <Star className="w-6 h-6 mb-2" />
            <p className="text-2xl font-bold">{stats.rating}</p>
            <p className="text-sm text-purple-100">Your Rating</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto">
        {[
          { id: 'overview' as const, label: 'Overview', icon: TrendingUp },
          { id: 'bookings' as const, label: 'Bookings', icon: Package },
          { id: 'earnings' as const, label: 'Earnings', icon: DollarSign }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="px-6 space-y-4">
        {activeTab === 'overview' && (
          <>
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition">
                  <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">Manage Slots</p>
                </button>
                <button className="p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                  <Package className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">Update Services</p>
                </button>
                <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
                  <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">View Profile</p>
                </button>
                <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition">
                  <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">Earnings</p>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { text: 'New booking from Priya Sharma', time: '5 mins ago', type: 'booking' },
                  { text: 'Payment received - ₹500', time: '1 hour ago', type: 'payment' },
                  { text: 'New review: 5 stars', time: '2 hours ago', type: 'review' },
                  { text: 'Booking completed', time: '3 hours ago', type: 'completed' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'booking' ? 'bg-purple-100' :
                      activity.type === 'payment' ? 'bg-green-100' :
                      activity.type === 'review' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'booking' && <Calendar className="w-5 h-5 text-purple-600" />}
                      {activity.type === 'payment' && <DollarSign className="w-5 h-5 text-green-600" />}
                      {activity.type === 'review' && <Star className="w-5 h-5 text-yellow-600" />}
                      {activity.type === 'completed' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {/* Pending Bookings */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">Pending Requests</h2>
              <div className="space-y-3">
                {bookings.filter(b => b.status === 'pending').map((booking) => (
                  <div key={booking.id} className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-800">{booking.tailorName}</p>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                      </div>
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Pending
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>📅 {booking.date}</span>
                      <span>🕐 {booking.time}</span>
                      <span className="font-semibold text-purple-600">₹{booking.amount}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBookingAction(booking.id, 'accept')}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleBookingAction(booking.id, 'reject')}
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirmed Bookings */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">Confirmed Bookings</h2>
              <div className="space-y-3">
                {bookings.filter(b => b.status === 'confirmed').map((booking) => (
                  <div key={booking.id} className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{booking.tailorName}</p>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Confirmed
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📅 {booking.date}</span>
                      <span>🕐 {booking.time}</span>
                      <span className="font-semibold text-purple-600">₹{booking.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <>
            {/* Earnings Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 border-2 border-purple-100">
              <h2 className="font-bold text-gray-800 mb-4">This Month's Earnings</h2>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-purple-600">₹{stats.totalEarnings}</p>
                <p className="text-sm text-gray-600 mt-1">Total earnings</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="font-semibold text-gray-800">{bookings.filter(b => b.status === 'completed').length}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{bookings.filter(b => b.status === 'confirmed').length}</p>
                  <p className="text-xs text-gray-500">Upcoming</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{bookings.filter(b => b.status === 'pending').length}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">Transaction History</h2>
              <div className="space-y-3">
                {bookings.filter(b => b.status === 'completed').map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-800">{booking.service}</p>
                      <p className="text-sm text-gray-600">{booking.tailorName}</p>
                      <p className="text-xs text-gray-500 mt-1">{booking.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+₹{booking.amount}</p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-around max-w-2xl mx-auto">
          <button className="flex flex-col items-center gap-1 text-purple-600">
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-600 transition">
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">Bookings</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-600 transition">
            <DollarSign className="w-6 h-6" />
            <span className="text-xs font-medium">Earnings</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-600 transition">
            <Users className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}