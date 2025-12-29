import { useState } from 'react';
import { Users, Scissors, DollarSign, AlertCircle, CheckCircle2, XCircle, Eye, Search, Filter, TrendingUp, Package } from 'lucide-react';
import { Screen } from '../App';

interface AdminDashboardProps {
  onNavigate: (screen: Screen) => void;
}

interface PendingTailor {
  id: string;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  experience: number;
  specialization: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockPendingTailors: PendingTailor[] = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    email: 'ramesh@example.com',
    phone: '+91 98765 43210',
    shopName: 'Kumar Tailoring',
    experience: 8,
    specialization: "Men's & Women's Wear",
    submittedDate: '2025-12-20',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Lakshmi Devi',
    email: 'lakshmi@example.com',
    phone: '+91 98765 43211',
    shopName: 'Fashion Studio',
    experience: 12,
    specialization: 'Bridal & Designer Wear',
    submittedDate: '2025-12-19',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Vijay Prakash',
    email: 'vijay@example.com',
    phone: '+91 98765 43212',
    shopName: 'Elite Tailors',
    experience: 6,
    specialization: 'Formal & Casual Wear',
    submittedDate: '2025-12-21',
    status: 'pending'
  }
];

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'users' | 'analytics'>('overview');
  const [pendingTailors, setPendingTailors] = useState(mockPendingTailors);
  const [selectedTailor, setSelectedTailor] = useState<PendingTailor | null>(null);

  const stats = {
    totalUsers: 1247,
    totalTailors: 156,
    pendingVerifications: pendingTailors.filter(t => t.status === 'pending').length,
    totalRevenue: 125430
  };

  const handleVerification = (tailorId: string, status: 'approved' | 'rejected') => {
    setPendingTailors(pendingTailors.map(t => 
      t.id === tailorId ? { ...t, status } : t
    ));
    setSelectedTailor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-orange-100 mt-1">Tailor Arena Management</p>
            </div>
            <button className="px-6 py-2 bg-white/20 backdrop-blur rounded-xl hover:bg-white/30 transition">
              Settings
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Users className="w-8 h-8" />
                <TrendingUp className="w-5 h-5 text-green-300" />
              </div>
              <p className="text-3xl font-bold mb-1">{stats.totalUsers}</p>
              <p className="text-sm text-orange-100">Total Users</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Scissors className="w-8 h-8" />
                <TrendingUp className="w-5 h-5 text-green-300" />
              </div>
              <p className="text-3xl font-bold mb-1">{stats.totalTailors}</p>
              <p className="text-sm text-orange-100">Active Tailors</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <AlertCircle className="w-8 h-8" />
                <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                  {stats.pendingVerifications}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1">{stats.pendingVerifications}</p>
              <p className="text-sm text-orange-100">Pending Verifications</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <DollarSign className="w-8 h-8" />
                <TrendingUp className="w-5 h-5 text-green-300" />
              </div>
              <p className="text-3xl font-bold mb-1">₹{stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-orange-100">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview' as const, label: 'Overview', icon: TrendingUp },
            { id: 'verification' as const, label: 'Verifications', icon: CheckCircle2 },
            { id: 'users' as const, label: 'Users', icon: Users },
            { id: 'analytics' as const, label: 'Analytics', icon: Package }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
                {tab.id === 'verification' && stats.pendingVerifications > 0 && (
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                    {stats.pendingVerifications}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 text-xl mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { text: 'New tailor registration', time: '5 mins ago', type: 'tailor' },
                  { text: 'New user signup', time: '12 mins ago', type: 'user' },
                  { text: 'Booking completed', time: '1 hour ago', type: 'booking' },
                  { text: 'Payment received', time: '2 hours ago', type: 'payment' },
                  { text: 'Tailor verified', time: '3 hours ago', type: 'verified' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'tailor' ? 'bg-purple-100' :
                      activity.type === 'user' ? 'bg-blue-100' :
                      activity.type === 'booking' ? 'bg-green-100' :
                      activity.type === 'payment' ? 'bg-yellow-100' : 'bg-orange-100'
                    }`}>
                      {activity.type === 'tailor' && <Scissors className="w-5 h-5 text-purple-600" />}
                      {activity.type === 'user' && <Users className="w-5 h-5 text-blue-600" />}
                      {activity.type === 'booking' && <Package className="w-5 h-5 text-green-600" />}
                      {activity.type === 'payment' && <DollarSign className="w-5 h-5 text-yellow-600" />}
                      {activity.type === 'verified' && <CheckCircle2 className="w-5 h-5 text-orange-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{activity.text}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-800 text-xl mb-4">Platform Statistics</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <span className="text-gray-700">Today's Bookings</span>
                    <span className="font-bold text-blue-600">47</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                    <span className="text-gray-700">Completed Today</span>
                    <span className="font-bold text-green-600">32</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                    <span className="text-gray-700">Active Sessions</span>
                    <span className="font-bold text-purple-600">156</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                    <span className="text-gray-700">Today's Revenue</span>
                    <span className="font-bold text-orange-600">₹8,450</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-100">
                <h3 className="font-bold text-gray-800 mb-2">System Health</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-700">All systems operational</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Server Load</span>
                      <span className="font-semibold">32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Database</span>
                      <span className="font-semibold">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="space-y-6">
            {/* Pending Verifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-gray-800 text-xl">Pending Verifications</h2>
                <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold">
                  {pendingTailors.filter(t => t.status === 'pending').length} Pending
                </span>
              </div>

              <div className="space-y-4">
                {pendingTailors.filter(t => t.status === 'pending').map((tailor) => (
                  <div key={tailor.id} className="p-5 bg-amber-50 border-2 border-amber-200 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {tailor.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{tailor.name}</h3>
                          <p className="text-sm text-gray-600">{tailor.shopName}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedTailor(tailor)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition font-semibold"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Experience</p>
                        <p className="font-semibold text-gray-800">{tailor.experience} years</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Specialization</p>
                        <p className="font-semibold text-gray-800">{tailor.specialization}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <p className="font-semibold text-gray-800">{tailor.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Submitted</p>
                        <p className="font-semibold text-gray-800">{tailor.submittedDate}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleVerification(tailor.id, 'approved')}
                        className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleVerification(tailor.id, 'rejected')}
                        className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Processed */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 text-xl mb-4">Recently Processed</h2>
              <div className="space-y-3">
                {pendingTailors.filter(t => t.status !== 'pending').map((tailor) => (
                  <div key={tailor.id} className={`p-4 rounded-xl ${
                    tailor.status === 'approved' ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{tailor.name}</p>
                        <p className="text-sm text-gray-600">{tailor.shopName}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full font-semibold ${
                        tailor.status === 'approved' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {tailor.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-800 text-xl">User Management</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Priya Sharma', email: 'priya@example.com', type: 'Customer', joined: '2025-12-15', status: 'Active' },
                    { name: 'Rajesh Kumar', email: 'rajesh@example.com', type: 'Tailor', joined: '2025-12-10', status: 'Active' },
                    { name: 'Arjun Reddy', email: 'arjun@example.com', type: 'Customer', joined: '2025-12-18', status: 'Active' },
                    { name: 'Lakshmi Devi', email: 'lakshmi@example.com', type: 'Tailor', joined: '2025-12-12', status: 'Active' }
                  ].map((user, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.type === 'Tailor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{user.joined}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-orange-600 hover:underline font-semibold">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 text-xl mb-4">Booking Trends</h2>
              <div className="h-64 flex items-end justify-around gap-2">
                {[65, 80, 75, 90, 85, 95, 88].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-600">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 text-xl mb-4">Revenue Distribution</h2>
              <div className="space-y-4">
                {[
                  { category: 'Stitching Services', percentage: 45, color: 'bg-purple-500' },
                  { category: 'Alterations', percentage: 25, color: 'bg-indigo-500' },
                  { category: 'Designer Wear', percentage: 20, color: 'bg-blue-500' },
                  { category: 'Others', percentage: 10, color: 'bg-cyan-500' }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">{item.category}</span>
                      <span className="font-semibold text-gray-800">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${item.color} h-3 rounded-full transition-all`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
