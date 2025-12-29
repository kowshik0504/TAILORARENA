import { useState } from 'react';
import { Scissors, Store, Home, ArrowRight, ArrowLeft, IndianRupee } from 'lucide-react';

interface TailorWorkTypeProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function TailorWorkType({ onNext, onBack }: TailorWorkTypeProps) {
  const [workType, setWorkType] = useState<'shop' | 'home' | null>(null);
  const [paymentChoice, setPaymentChoice] = useState<'now' | 'later' | null>(null);

  const workTypes = [
    {
      id: 'shop' as const,
      title: 'I have a Shop',
      description: 'You operate from a physical shop location',
      icon: Store,
      fee: 150,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
    },
    {
      id: 'home' as const,
      title: 'I work from Home',
      description: 'You provide services from your home',
      icon: Home,
      fee: 200,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
    },
  ];

  const selectedWorkType = workTypes.find(w => w.id === workType);

  const handleContinue = () => {
    if (workType && paymentChoice) {
      onNext({ workType, paymentChoice, fee: selectedWorkType?.fee });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full p-2">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Tailor Registration
            </h1>
          </div>
          <div className="w-9"></div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-purple-600 rounded-full"></div>
            <div className="flex-1 h-2 bg-purple-600 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Step 2 of 3: Work Type Selection</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Select Your Work Type
            </h2>
            <p className="text-gray-600">
              Choose where you provide tailoring services
            </p>
          </div>

          {/* Work Type Selection */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {workTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = workType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => setWorkType(type.id)}
                  className={`relative p-8 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? `${type.bgColor} border-${type.id === 'shop' ? 'blue' : 'purple'}-500 shadow-lg`
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Checkmark */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}

                  <div className="text-center">
                    <div className={`w-20 h-20 ${type.id === 'shop' ? 'bg-blue-100' : 'bg-purple-100'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-10 h-10 ${type.id === 'shop' ? 'text-blue-600' : 'text-purple-600'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{type.title}</h3>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    
                    {/* Fee Badge */}
                    <div className={`inline-flex items-center gap-1 px-4 py-2 rounded-full ${type.id === 'shop' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'} font-semibold`}>
                      <IndianRupee className="w-4 h-4" />
                      <span>{type.fee}</span>
                      <span className="text-sm">Registration Fee</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Registration Fee Display */}
          {selectedWorkType && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Registration Fee</p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center gap-1">
                    <IndianRupee className="w-7 h-7" />
                    {selectedWorkType.fee}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">One-time payment</p>
                  <p className="text-sm font-semibold text-purple-600">
                    {workType === 'shop' ? 'Shop-based service' : 'Home-based service'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Options */}
          {selectedWorkType && (
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-gray-800 text-lg mb-4">Payment Options</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Pay Now */}
                <button
                  onClick={() => setPaymentChoice('now')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    paymentChoice === 'now'
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${
                      paymentChoice === 'now'
                        ? 'border-purple-600 bg-purple-600'
                        : 'border-gray-300'
                    }`}>
                      {paymentChoice === 'now' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800 mb-1">Pay Now</h4>
                      <p className="text-sm text-gray-600">
                        Complete registration instantly and start receiving orders immediately
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                          ✓ Instant Activation
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Pay Later */}
                <button
                  onClick={() => setPaymentChoice('later')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    paymentChoice === 'later'
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${
                      paymentChoice === 'later'
                        ? 'border-purple-600 bg-purple-600'
                        : 'border-gray-300'
                    }`}>
                      {paymentChoice === 'later' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800 mb-1">Pay Later</h4>
                      <p className="text-sm text-gray-600">
                        Payment will be collected when you receive your first order
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                          Flexible Payment
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!workType || !paymentChoice}
            className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group ${
              workType && paymentChoice
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {paymentChoice === 'now' ? 'Continue to Payment' : 'Continue to Location'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Info Note */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-yellow-600">💡</span>
            </div>
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Registration Fee Benefits</p>
              <p>This one-time fee helps us maintain quality standards, verify tailors, and provide better services to customers. Your profile will be visible to thousands of potential customers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
