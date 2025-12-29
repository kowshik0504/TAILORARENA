import { useState } from 'react';
import { Scissors, Mail, Phone, ArrowRight, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function ForgotPassword({ onSuccess, onBack }: ForgotPasswordProps) {
  const [step, setStep] = useState<'enter-contact' | 'verify-otp' | 'reset-password'>('enter-contact');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('verify-otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('reset-password');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b border-gray-100">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full p-2">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Tailor Arena
            </h1>
          </div>
          <div className="w-9"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            {/* Step 1: Enter Contact */}
            {step === 'enter-contact' && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Forgot Password?
                  </h2>
                  <p className="text-gray-600">
                    Enter your registered email or phone to receive OTP
                  </p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-6">
                  {/* Contact Method Selection */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setContactMethod('email')}
                      className={`flex-1 p-4 rounded-xl border-2 transition flex items-center gap-2 justify-center ${
                        contactMethod === 'email'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                    >
                      <Mail className={`w-5 h-5 ${contactMethod === 'email' ? 'text-purple-600' : 'text-gray-400'}`} />
                      <span className={`font-semibold ${contactMethod === 'email' ? 'text-purple-600' : 'text-gray-600'}`}>
                        Email
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('phone')}
                      className={`flex-1 p-4 rounded-xl border-2 transition flex items-center gap-2 justify-center ${
                        contactMethod === 'phone'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                    >
                      <Phone className={`w-5 h-5 ${contactMethod === 'phone' ? 'text-purple-600' : 'text-gray-400'}`} />
                      <span className={`font-semibold ${contactMethod === 'phone' ? 'text-purple-600' : 'text-gray-600'}`}>
                        Phone
                      </span>
                    </button>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      {contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        {contactMethod === 'email' ? (
                          <Mail className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Phone className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <input
                        type={contactMethod === 'email' ? 'email' : 'tel'}
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder={contactMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Send OTP Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    Send OTP
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </>
            )}

            {/* Step 2: Verify OTP */}
            {step === 'verify-otp' && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Verify OTP
                  </h2>
                  <p className="text-gray-600">
                    Enter the 6-digit code sent to
                  </p>
                  <p className="font-semibold text-purple-600 mt-1">{emailOrPhone}</p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-8">
                  {/* OTP Inputs */}
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-14 text-center border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-xl font-semibold"
                      />
                    ))}
                  </div>

                  {/* Resend OTP */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                    <button
                      type="button"
                      onClick={() => setStep('enter-contact')}
                      className="text-purple-600 font-semibold hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>

                  {/* Verify Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    Verify OTP
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </>
            )}

            {/* Step 3: Reset Password */}
            {step === 'reset-password' && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Reset Password
                  </h2>
                  <p className="text-gray-600">
                    Create a new password for your account
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-5">
                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        required
                        minLength={6}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        required
                      />
                    </div>
                    {newPassword && confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-xs text-red-500">Passwords do not match</p>
                    )}
                  </div>

                  {/* Reset Password Button */}
                  <button
                    type="submit"
                    disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
                    className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group ${
                      newPassword && confirmPassword && newPassword === confirmPassword
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Reset Password
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </>
            )}

            {/* Back to Login */}
            {step === 'enter-contact' && (
              <>
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-sm text-gray-500">OR</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="text-center">
                  <button
                    onClick={onBack}
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
