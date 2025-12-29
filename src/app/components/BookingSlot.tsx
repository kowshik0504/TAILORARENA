import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, ArrowRight, Check } from 'lucide-react';
import { Tailor } from '../App';

interface BookingSlotProps {
  tailor: Tailor;
  onBack: () => void;
  onContinue: (data: any) => void;
}

export function BookingSlot({ tailor, onBack, onContinue }: BookingSlotProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: date.toISOString().split('T')[0],
    };
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ];

  const handleContinue = () => {
    if (selectedDate && selectedTime && selectedService) {
      const service = tailor.services.find(s => s.name === selectedService);
      onContinue({
        tailor: tailor.name,
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        amount: service?.price || 0,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Book Appointment</h1>
            <p className="text-purple-100">{tailor.name}</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <span className="text-sm">Select Service</span>
          </div>
          <div className="flex-1 h-1 bg-white/30 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              selectedService ? 'bg-white text-purple-600' : 'bg-white/30 text-white'
            }`}>
              2
            </div>
            <span className={`text-sm ${selectedService ? '' : 'text-purple-200'}`}>Date & Time</span>
          </div>
          <div className="flex-1 h-1 bg-white/30 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              selectedDate && selectedTime ? 'bg-white text-purple-600' : 'bg-white/30 text-white'
            }`}>
              3
            </div>
            <span className={`text-sm ${selectedDate && selectedTime ? '' : 'text-purple-200'}`}>Confirm</span>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Select Service */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold">1</span>
            </div>
            Select Service
          </h2>
          <div className="space-y-3">
            {tailor.services.map((service) => (
              <button
                key={service.name}
                onClick={() => setSelectedService(service.name)}
                className={`w-full p-4 rounded-xl border-2 transition text-left ${
                  selectedService === service.name
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedService === service.name
                        ? 'border-purple-600 bg-purple-600'
                        : 'border-gray-300'
                    }`}>
                      {selectedService === service.name && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{service.name}</p>
                      <p className="text-sm text-gray-500">Professional service</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">₹{service.price}</p>
                    <p className="text-xs text-gray-500">per item</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Select Date */}
        {selectedService && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              Select Date
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {dates.map((date) => (
                <button
                  key={date.fullDate}
                  onClick={() => setSelectedDate(date.fullDate)}
                  className={`p-3 rounded-xl border-2 transition ${
                    selectedDate === date.fullDate
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <div className="text-center">
                    <p className={`text-xs mb-1 ${selectedDate === date.fullDate ? 'text-purple-600' : 'text-gray-500'}`}>
                      {date.day}
                    </p>
                    <p className={`text-lg font-bold ${selectedDate === date.fullDate ? 'text-purple-600' : 'text-gray-800'}`}>
                      {date.date}
                    </p>
                    <p className={`text-xs ${selectedDate === date.fullDate ? 'text-purple-600' : 'text-gray-500'}`}>
                      {date.month}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Select Time */}
        {selectedDate && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              Select Time Slot
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => {
                const isAvailable = tailor.availability.includes(time);
                return (
                  <button
                    key={time}
                    onClick={() => isAvailable && setSelectedTime(time)}
                    disabled={!isAvailable}
                    className={`p-3 rounded-xl border-2 transition ${
                      !isAvailable
                        ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : selectedTime === time
                        ? 'border-purple-600 bg-purple-50 text-purple-600'
                        : 'border-gray-200 hover:border-purple-200 text-gray-800'
                    }`}
                  >
                    <div className="text-center">
                      <Clock className={`w-4 h-4 mx-auto mb-1 ${
                        !isAvailable ? 'text-gray-300' : selectedTime === time ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <p className="text-sm font-semibold">{time}</p>
                      {!isAvailable && (
                        <p className="text-xs text-gray-400 mt-1">Booked</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Booking Summary */}
        {selectedService && selectedDate && selectedTime && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="font-bold text-gray-800 mb-4">Booking Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Service</span>
                <span className="font-semibold text-gray-800">{selectedService}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold text-gray-800">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-semibold text-gray-800">{selectedTime}</span>
              </div>
              <div className="border-t border-purple-200 pt-3 flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-bold text-purple-600 text-lg">
                  ₹{tailor.services.find(s => s.name === selectedService)?.price}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      {selectedService && selectedDate && selectedTime && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition flex items-center justify-center gap-2 group"
          >
            Continue to Payment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
