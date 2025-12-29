import { useState } from 'react';
import { Scissors, CreditCard, Smartphone, ArrowRight, ArrowLeft, Check, IndianRupee } from 'lucide-react';

interface TailorPaymentProps {
  registrationFee: number;
  onSuccess: () => void;
  onBack: () => void;
}

export function TailorPayment({ registrationFee, onSuccess, onBack }: TailorPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'phonepe' | 'card' | null>(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    { id: 'gpay' as const, name: 'Google Pay', icon: '📱', color: 'bg-blue-50 border-blue-500' },
    { id: 'phonepe' as const, name: 'PhonePe', icon: '💜', color: 'bg-purple-50 border-purple-500' },
    { id: 'card' as const, name: 'Card Payment', icon: '💳', color: 'bg-green-50 border-green-500' },
  ];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
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
            <div className="flex-1 h-2 bg-purple-600 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Step 3 of 3: Payment</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Registration Payment
                </h2>
                <p className="text-gray-600">
                  Complete your payment to start receiving orders
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-gray-800">Select Payment Method</h3>
                <div className="grid grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === method.id
                          ? method.color
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{method.icon}</div>
                      <p className="text-xs font-semibold text-gray-700">{method.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Details Form */}
              <form onSubmit={handlePayment} className="space-y-6">
                {/* UPI Payment */}
                {(paymentMethod === 'gpay' || paymentMethod === 'phonepe') && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {paymentMethod === 'gpay' ? 'Google Pay' : 'PhonePe'}
                          </p>
                          <p className="text-sm text-gray-600">Secure UPI Payment</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Enter UPI ID
                        </label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                          required
                        />
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Instant payment confirmation</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Payment */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Debit / Credit Card</p>
                          <p className="text-sm text-gray-600">All major cards accepted</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Card Number */}
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                            maxLength={19}
                            required
                          />
                        </div>

                        {/* Cardholder Name */}
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                            placeholder="NAME ON CARD"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {/* Expiry */}
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                              maxLength={5}
                              required
                            />
                          </div>

                          {/* CVV */}
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">
                              CVV
                            </label>
                            <input
                              type="password"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').substring(0, 3) })}
                              placeholder="123"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                              maxLength={3}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pay Button */}
                {paymentMethod && (
                  <button
                    type="submit"
                    disabled={processing}
                    className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group ${
                      processing
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl'
                    }`}
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay ₹{registrationFee}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                )}
              </form>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure payment powered by industry-standard encryption
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4">Payment Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Registration Fee</span>
                  <span className="flex items-center">
                    <IndianRupee className="w-4 h-4" />
                    {registrationFee}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Processing Fee</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-gray-800">
                  <span>Total Amount</span>
                  <span className="flex items-center text-purple-600">
                    <IndianRupee className="w-5 h-5" />
                    {registrationFee}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-purple-800 mb-2">What's Included:</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Profile verification & listing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Unlimited bookings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Business dashboard access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Customer support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                <p className="text-xs text-yellow-800">
                  <strong>One-time payment:</strong> This fee covers your lifetime registration on Tailor Arena.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
