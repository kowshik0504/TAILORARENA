import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Wallet, ArrowRight, Check } from 'lucide-react';

interface CustomerPaymentProps {
  bookingData: any;
  onBack: () => void;
  onSuccess: () => void;
}

export function CustomerPayment({ bookingData, onBack, onSuccess }: CustomerPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'phonepe' | 'card' | 'cash' | null>(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    { id: 'gpay' as const, name: 'Google Pay', icon: '📱', color: 'from-blue-500 to-cyan-500' },
    { id: 'phonepe' as const, name: 'PhonePe', icon: '💜', color: 'from-purple-500 to-pink-500' },
    { id: 'card' as const, name: 'Card', icon: '💳', color: 'from-green-500 to-emerald-500' },
    { id: 'cash' as const, name: 'Cash', icon: '💵', color: 'from-orange-500 to-amber-500' },
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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Payment</h1>
            <p className="text-purple-100">Complete your booking</p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 pb-28 space-y-6">
        {/* Booking Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4">Booking Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tailor</span>
              <span className="font-semibold text-gray-800">{bookingData?.tailor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service</span>
              <span className="font-semibold text-gray-800">{bookingData?.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-semibold text-gray-800">
                {bookingData?.date && new Date(bookingData.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}{' '}
                at {bookingData?.time}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="font-semibold text-gray-800">Total Amount</span>
              <span className="font-bold text-purple-600 text-lg">₹{bookingData?.amount}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4">Select Payment Method</h3>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`p-4 rounded-xl border-2 transition ${
                  paymentMethod === method.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{method.icon}</div>
                  <p className="text-sm font-semibold text-gray-700">{method.name}</p>
                  {paymentMethod === method.id && (
                    <div className="mt-2 flex items-center justify-center">
                      <Check className="w-4 h-4 text-purple-600" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Details Form */}
        {paymentMethod && paymentMethod !== 'cash' && (
          <form onSubmit={handlePayment} className="space-y-6">
            {/* UPI Payment */}
            {(paymentMethod === 'gpay' || paymentMethod === 'phonepe') && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {paymentMethod === 'gpay' ? 'Google Pay' : 'PhonePe'}
                    </p>
                    <p className="text-sm text-gray-600">UPI Payment</p>
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
            )}

            {/* Card Payment */}
            {paymentMethod === 'card' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pay Button */}
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
                  Pay ₹{bookingData?.amount}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Cash Payment */}
        {paymentMethod === 'cash' && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Cash Payment</p>
                <p className="text-sm text-gray-600">Pay at the tailor's location</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-700 mb-3">
                <strong>Payment Instructions:</strong>
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Visit the tailor at your scheduled time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Pay ₹{bookingData?.amount} in cash after service completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Get a receipt for your records</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSuccess()}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition flex items-center justify-center gap-2 group"
            >
              Confirm Booking
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Your payment is secure and encrypted
        </div>
      </div>
    </div>
  );
}
