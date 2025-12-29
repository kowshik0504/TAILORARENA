import { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Star, IndianRupee, Store, Home, Navigation, X } from 'lucide-react';
import { Tailor, Screen } from '../App';

interface CustomerHomeProps {
  onTailorSelect: (tailor: Tailor) => void;
  onNavigate: (screen: Screen) => void;
}

const mockTailors: Tailor[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 4.8,
    reviews: 124,
    distance: 0.5,
    specialization: 'Traditional Wear',
    price: 500,
    serviceType: 'shop',
    location: 'Jayanagar 4th Block, Bangalore',
    phone: '+91 98765 43210',
    experience: 15,
    services: [
      { name: 'Shirt Stitching', price: 500 },
      { name: 'Pant Stitching', price: 400 },
      { name: 'Suit Stitching', price: 2500 },
    ],
    availability: ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
  },
  {
    id: '2',
    name: 'Meena Textiles',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    rating: 4.9,
    reviews: 256,
    distance: 1.2,
    specialization: 'Blouse & Saree',
    price: 600,
    serviceType: 'shop',
    location: 'BTM Layout, Bangalore',
    phone: '+91 98765 43211',
    experience: 12,
    services: [
      { name: 'Saree Blouse', price: 800 },
      { name: 'Kurta', price: 600 },
      { name: 'Lehenga', price: 3500 },
    ],
    availability: ['09:00 AM', '11:00 AM', '03:00 PM', '05:00 PM'],
  },
  {
    id: '3',
    name: 'Suresh Tailoring',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    rating: 4.7,
    reviews: 89,
    distance: 2.0,
    specialization: 'Formal Wear',
    price: 450,
    serviceType: 'home',
    location: 'Koramangala, Bangalore',
    phone: '+91 98765 43212',
    experience: 10,
    services: [
      { name: 'Shirt', price: 450 },
      { name: 'Pant Alteration', price: 150 },
      { name: 'Blazer', price: 1800 },
    ],
    availability: ['10:00 AM', '12:00 PM', '03:00 PM'],
  },
  {
    id: '4',
    name: 'Fashion Studio',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    rating: 4.6,
    reviews: 178,
    distance: 3.5,
    specialization: 'Designer Wear',
    price: 800,
    serviceType: 'shop',
    location: 'Indiranagar, Bangalore',
    phone: '+91 98765 43213',
    experience: 20,
    services: [
      { name: 'Designer Blouse', price: 1200 },
      { name: 'Gown', price: 3000 },
      { name: 'Dress', price: 2000 },
    ],
    availability: ['11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'],
  },
  {
    id: '5',
    name: 'Perfect Fit Tailors',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    rating: 4.5,
    reviews: 95,
    distance: 1.8,
    specialization: 'Casual & Formal',
    price: 400,
    serviceType: 'home',
    location: 'HSR Layout, Bangalore',
    phone: '+91 98765 43214',
    experience: 8,
    services: [
      { name: 'Shirt', price: 400 },
      { name: 'Pant', price: 350 },
      { name: 'Kurta', price: 500 },
    ],
    availability: ['09:00 AM', '01:00 PM', '05:00 PM'],
  },
];

export function CustomerHome({ onTailorSelect, onNavigate }: CustomerHomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filters, setFilters] = useState({
    maxDistance: 5,
    maxPrice: 3000,
    minRating: 0,
    serviceType: 'all' as 'all' | 'shop' | 'home',
  });

  const categories = [
    { id: 'all', name: 'All', icon: '🏪' },
    { id: 'traditional', name: 'Traditional', icon: '🏛️' },
    { id: 'formal', name: 'Formal', icon: '🎩' },
    { id: 'designer', name: 'Designer', icon: '✨' },
    { id: 'casual', name: 'Casual', icon: '👕' },
  ];

  const filteredTailors = mockTailors.filter((tailor) => {
    const matchesSearch = tailor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tailor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistance = tailor.distance <= filters.maxDistance;
    const matchesPrice = tailor.price <= filters.maxPrice;
    const matchesRating = tailor.rating >= filters.minRating;
    const matchesServiceType = filters.serviceType === 'all' || tailor.serviceType === filters.serviceType;

    return matchesSearch && matchesDistance && matchesPrice && matchesRating && matchesServiceType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-6">
      {/* Header - Compact */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Tailor Arena</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              Bangalore, India
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
        </div>
      </div>

      {/* Search Bar - Below Header */}
      <div className="px-6 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for tailors, specializations..."
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition shadow-sm text-gray-800 placeholder:text-gray-400"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition ${
              showFilters ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-purple-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-semibold text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white mx-6 mt-4 rounded-2xl shadow-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Filters</h3>
            <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Distance Filter */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Distance: {filters.maxDistance} km
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={filters.maxDistance}
              onChange={(e) => setFilters({ ...filters, maxDistance: parseInt(e.target.value) })}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 km</span>
              <span>10 km</span>
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Max Price: ₹{filters.maxPrice}
            </label>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹200</span>
              <span>₹5000</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilters({ ...filters, minRating: rating })}
                  className={`flex-1 py-2 rounded-lg border-2 transition ${
                    filters.minRating === rating
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 text-gray-600 hover:border-purple-200'
                  }`}
                >
                  <div className="font-semibold">{rating === 0 ? 'Any' : `${rating}+`}</div>
                  {rating > 0 && <Star className="w-3 h-3 inline ml-1 fill-current" />}
                </button>
              ))}
            </div>
          </div>

          {/* Service Type Filter */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Service Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'all' as const, label: 'All', icon: Navigation },
                { value: 'shop' as const, label: 'Shop', icon: Store },
                { value: 'home' as const, label: 'Home', icon: Home },
              ].map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setFilters({ ...filters, serviceType: type.value })}
                    className={`p-3 rounded-xl border-2 transition flex flex-col items-center gap-1 ${
                      filters.serviceType === type.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${filters.serviceType === type.value ? 'text-purple-600' : 'text-gray-400'}`} />
                    <span className={`text-sm font-semibold ${filters.serviceType === type.value ? 'text-purple-600' : 'text-gray-600'}`}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => setFilters({ maxDistance: 5, maxPrice: 3000, minRating: 0, serviceType: 'all' })}
            className="w-full py-3 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Results Header */}
      <div className="px-6 mt-6 mb-4">
        <p className="text-gray-600">
          Found <span className="font-bold text-purple-600">{filteredTailors.length}</span> tailors near you
        </p>
      </div>

      {/* Tailor Cards */}
      <div className="px-6 space-y-4">
        {filteredTailors.map((tailor) => (
          <div
            key={tailor.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            <div className="flex gap-4 p-4">
              {/* Tailor Image */}
              <div className="relative flex-shrink-0">
                <img
                  src={tailor.image}
                  alt={tailor.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md">
                  {tailor.serviceType === 'shop' ? (
                    <Store className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Home className="w-4 h-4 text-purple-600" />
                  )}
                </div>
              </div>

              {/* Tailor Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-800 truncate">{tailor.name}</h3>
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg flex-shrink-0 ml-2">
                    <Star className="w-3 h-3 text-green-600 fill-current" />
                    <span className="text-sm font-semibold text-green-700">{tailor.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-2">{tailor.specialization}</p>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {tailor.distance} km
                  </span>
                  <span>•</span>
                  <span>{tailor.reviews} reviews</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-purple-700 font-semibold">
                    <IndianRupee className="w-4 h-4" />
                    <span>{tailor.price}+</span>
                    <span className="text-xs text-gray-500 font-normal">starting</span>
                  </div>
                  <button
                    onClick={() => onTailorSelect(tailor)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-semibold text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredTailors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">No tailors found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({ maxDistance: 5, maxPrice: 3000, minRating: 0, serviceType: 'all' });
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:shadow-lg transition font-semibold"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}