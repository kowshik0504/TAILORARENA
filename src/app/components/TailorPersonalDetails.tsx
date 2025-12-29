import { useState } from 'react';
import { Scissors, User, Phone, Home, MapPin, Upload, FileText, Camera, ArrowRight, ArrowLeft } from 'lucide-react';

interface TailorPersonalDetailsProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function TailorPersonalDetails({ onNext, onBack }: TailorPersonalDetailsProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    shopName: '',
    houseNumber: '',
    streetName: '',
    area: '',
    city: '',
    idProof: null as File | null,
    tailorPhoto: null as File | null,
    machinePhoto: null as File | null,
    shopPhoto: null as File | null,
  });

  const handleFileUpload = (field: string, file: File | null) => {
    if (file && file.size > 10 * 1024 * 1024) {
      alert('File size should not exceed 10MB');
      return;
    }
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
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
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Step 1 of 3: Personal Details</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Personal Details
            </h2>
            <p className="text-gray-600">
              Please provide your information for verification
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-5">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                <User className="w-5 h-5 text-purple-600" />
                Basic Information
              </h3>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    required
                  />
                </div>
              </div>

              {/* Shop Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Shop Name <span className="text-gray-500 text-xs">(Optional - Leave blank if working from home)</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Home className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    placeholder="Enter shop name (if applicable)"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-5 pt-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Address Information
              </h3>

              <div className="grid md:grid-cols-2 gap-5">
                {/* House Number */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    House/Building Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.houseNumber}
                    onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                    placeholder="Enter house/building number"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    required
                  />
                </div>

                {/* Street Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Street Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.streetName}
                    onChange={(e) => setFormData({ ...formData, streetName: e.target.value })}
                    placeholder="Enter street name"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    required
                  />
                </div>

                {/* Area */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Area/Locality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="Enter area/locality"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    required
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Enter city"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Identity Verification */}
            <div className="space-y-5 pt-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Identity Verification
              </h3>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600">ℹ️</span>
                </div>
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Secure & Private</p>
                  <p>Government ID is required for verification only and will not be publicly displayed. Maximum file size: 10MB (PDF format)</p>
                </div>
              </div>

              {/* Government ID Upload */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Government ID (Aadhaar / Voter ID / Driving License) <span className="text-red-500">*</span>
                </label>
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 transition cursor-pointer bg-gray-50 hover:bg-purple-50">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-700">
                      {formData.idProof ? formData.idProof.name : 'Upload Government ID (PDF)'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Max 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload('idProof', e.target.files?.[0] || null)}
                    className="hidden"
                    required
                  />
                </label>
              </div>
            </div>

            {/* Photo Uploads */}
            <div className="space-y-5 pt-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                <Camera className="w-5 h-5 text-purple-600" />
                Photo Uploads
              </h3>

              <div className="grid md:grid-cols-3 gap-5">
                {/* Tailor Photo */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Your Photo <span className="text-red-500">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 transition cursor-pointer bg-gray-50 hover:bg-purple-50">
                    <Camera className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-xs text-center px-2 font-medium text-gray-600">
                      {formData.tailorPhoto ? '✓ Uploaded' : 'Upload Photo'}
                    </p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('tailorPhoto', e.target.files?.[0] || null)}
                      className="hidden"
                      required
                    />
                  </label>
                </div>

                {/* Machine Photo */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Machine Photo <span className="text-red-500">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 transition cursor-pointer bg-gray-50 hover:bg-purple-50">
                    <Camera className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-xs text-center px-2 font-medium text-gray-600">
                      {formData.machinePhoto ? '✓ Uploaded' : 'Upload Photo'}
                    </p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('machinePhoto', e.target.files?.[0] || null)}
                      className="hidden"
                      required
                    />
                  </label>
                </div>

                {/* Shop Photo */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Shop Photo <span className="text-gray-500 text-xs">(if applicable)</span>
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 transition cursor-pointer bg-gray-50 hover:bg-purple-50">
                    <Camera className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-xs text-center px-2 font-medium text-gray-600">
                      {formData.shopPhoto ? '✓ Uploaded' : 'Upload Photo'}
                    </p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('shopPhoto', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Continue to Work Type
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
