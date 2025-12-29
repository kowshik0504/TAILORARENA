import { useState } from 'react';
import { Scissors, Plus, Edit2, Trash2, Save, X, IndianRupee } from 'lucide-react';
import { Screen } from '../App';

interface Service {
  id: string;
  dressType: string;
  stitchCost: number;
  alterationCost: number;
}

interface ServiceManagementProps {
  onNavigate: (screen: Screen) => void;
}

const initialServices: Service[] = [
  { id: '1', dressType: 'Shirt', stitchCost: 500, alterationCost: 150 },
  { id: '2', dressType: 'Pant', stitchCost: 400, alterationCost: 120 },
  { id: '3', dressType: 'Saree Blouse', stitchCost: 800, alterationCost: 200 },
  { id: '4', dressType: 'Kurta', stitchCost: 600, alterationCost: 180 },
  { id: '5', dressType: 'Suit', stitchCost: 2500, alterationCost: 500 },
];

export function ServiceManagement({ onNavigate }: ServiceManagementProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newService, setNewService] = useState({ dressType: '', stitchCost: '', alterationCost: '' });

  const handleAdd = () => {
    if (newService.dressType && newService.stitchCost && newService.alterationCost) {
      const service: Service = {
        id: Date.now().toString(),
        dressType: newService.dressType,
        stitchCost: parseInt(newService.stitchCost),
        alterationCost: parseInt(newService.alterationCost),
      };
      setServices([...services, service]);
      setNewService({ dressType: '', stitchCost: '', alterationCost: '' });
      setIsAdding(false);
    }
  };

  const handleEdit = (id: string, field: keyof Service, value: string | number) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => onNavigate('tailor-dashboard')} className="mb-4 flex items-center gap-2 text-white/80 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Service Management</h1>
              <p className="text-purple-100">Manage your stitching services and pricing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 mt-6 space-y-6">
        {/* Business Info Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-gray-800">Rajesh Tailors</h2>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                📍 Jayanagar, Bangalore
              </p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Edit2 className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800">Your Services</h3>
              <p className="text-sm text-gray-600 mt-1">{services.length} services available</p>
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Dress Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stitch Cost
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Alteration Cost
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Add New Service Row */}
                {isAdding && (
                  <tr className="bg-purple-50">
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={newService.dressType}
                        onChange={(e) => setNewService({ ...newService, dressType: e.target.value })}
                        placeholder="Enter dress type"
                        className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={newService.stitchCost}
                          onChange={(e) => setNewService({ ...newService, stitchCost: e.target.value })}
                          placeholder="0"
                          className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={newService.alterationCost}
                          onChange={(e) => setNewService({ ...newService, alterationCost: e.target.value })}
                          placeholder="0"
                          className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={handleAdd}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setIsAdding(false);
                            setNewService({ dressType: '', stitchCost: '', alterationCost: '' });
                          }}
                          className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Existing Services */}
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50 transition">
                    {editingId === service.id ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={service.dressType}
                            onChange={(e) => handleEdit(service.id, 'dressType', e.target.value)}
                            className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <IndianRupee className="w-4 h-4 text-gray-400" />
                            <input
                              type="number"
                              value={service.stitchCost}
                              onChange={(e) => handleEdit(service.id, 'stitchCost', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <IndianRupee className="w-4 h-4 text-gray-400" />
                            <input
                              type="number"
                              value={service.alterationCost}
                              onChange={(e) => handleEdit(service.id, 'alterationCost', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Scissors className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="font-semibold text-gray-800">{service.dressType}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-gray-700">
                            <IndianRupee className="w-4 h-4" />
                            <span className="font-semibold">{service.stitchCost}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-gray-700">
                            <IndianRupee className="w-4 h-4" />
                            <span className="font-semibold">{service.alterationCost}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setEditingId(service.id)}
                              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(service.id)}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600">💡</span>
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Pricing Tips</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Set competitive prices to attract more customers</li>
                <li>Update prices regularly based on market trends</li>
                <li>Offer special discounts for bulk orders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}