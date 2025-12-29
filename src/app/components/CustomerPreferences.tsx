import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface CustomerPreferencesProps {
  onComplete: () => void;
  onBack?: () => void;
}

export function CustomerPreferences({ onComplete, onBack }: CustomerPreferencesProps) {
  const [selectedDressTypes, setSelectedDressTypes] = useState<string[]>([]);
  const [selectedStitchingNeeds, setSelectedStitchingNeeds] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedAlterations, setSelectedAlterations] = useState<string[]>([]);

  const dressTypes = [
    { id: 'shirt', name: 'Shirts', emoji: '👔', color: 'from-blue-400 to-blue-500' },
    { id: 'pant', name: 'Pants', emoji: '👖', color: 'from-indigo-400 to-indigo-500' },
    { id: 'suit', name: 'Suits', emoji: '🤵', color: 'from-purple-400 to-purple-500' },
    { id: 'saree', name: 'Saree Blouse', emoji: '👗', color: 'from-pink-400 to-pink-500' },
    { id: 'kurta', name: 'Kurta', emoji: '🧥', color: 'from-orange-400 to-orange-500' },
    { id: 'lehenga', name: 'Lehenga', emoji: '👘', color: 'from-rose-400 to-rose-500' },
    { id: 'gown', name: 'Gown', emoji: '💃', color: 'from-fuchsia-400 to-fuchsia-500' },
    { id: 'dress', name: 'Dress', emoji: '👗', color: 'from-violet-400 to-violet-500' },
  ];

  const stitchingNeeds = [
    { id: 'new', name: 'New Stitching', icon: '✨' },
    { id: 'alter', name: 'Alterations', icon: '✂️' },
    { id: 'repair', name: 'Repairs', icon: '🔧' },
    { id: 'custom', name: 'Custom Design', icon: '🎨' },
  ];

  const styles = [
    { id: 'traditional', name: 'Traditional', icon: '🏛️' },
    { id: 'modern', name: 'Modern', icon: '⚡' },
    { id: 'casual', name: 'Casual', icon: '👕' },
    { id: 'formal', name: 'Formal', icon: '🎩' },
    { id: 'party', name: 'Party Wear', icon: '🎉' },
    { id: 'ethnic', name: 'Ethnic', icon: '🪔' },
  ];

  const alterations = [
    { id: 'hem', name: 'Hemming' },
    { id: 'resize', name: 'Resizing' },
    { id: 'fit', name: 'Fitting' },
    { id: 'zip', name: 'Zipper Replacement' },
  ];

  const toggleSelection = (array: string[], setArray: (arr: string[]) => void, id: string) => {
    if (array.includes(id)) {
      setArray(array.filter(item => item !== id));
    } else {
      setArray([...array, id]);
    }
  };

  const handleSubmit = () => {
    // At least one selection in dress types required
    if (selectedDressTypes.length > 0) {
      onComplete();
    }
  };

  const isFormValid = selectedDressTypes.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">Your Preferences</h1>
          <p className="text-sm text-gray-500 mt-1">Tell us what you're looking for</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-gray-700">Details</span>
          </div>
          <div className="w-12 h-0.5 bg-purple-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <span className="text-sm font-medium text-gray-700">Preferences</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 space-y-8">
        {/* Dress Types */}
        <div>
          <div className="mb-4">
            <h2 className="font-bold text-gray-800 mb-1">What do you want to get stitched? *</h2>
            <p className="text-sm text-gray-500">Select all that apply</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {dressTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleSelection(selectedDressTypes, setSelectedDressTypes, type.id)}
                className={`relative p-4 rounded-2xl border-2 transition-all ${
                  selectedDressTypes.includes(type.id)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-200'
                }`}
              >
                <div className="text-center space-y-2">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mx-auto text-2xl shadow-sm`}>
                    {type.emoji}
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">{type.name}</p>
                </div>
                {selectedDressTypes.includes(type.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Stitching Needs */}
        <div>
          <div className="mb-4">
            <h2 className="font-bold text-gray-800 mb-1">What services do you need?</h2>
            <p className="text-sm text-gray-500">Optional - helps us filter better</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stitchingNeeds.map((need) => (
              <button
                key={need.id}
                type="button"
                onClick={() => toggleSelection(selectedStitchingNeeds, setSelectedStitchingNeeds, need.id)}
                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  selectedStitchingNeeds.includes(need.id)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-200'
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                  {need.icon}
                </div>
                <span className="font-semibold text-gray-800 text-sm flex-1 text-left">{need.name}</span>
                {selectedStitchingNeeds.includes(need.id) && (
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Styles */}
        <div>
          <div className="mb-4">
            <h2 className="font-bold text-gray-800 mb-1">Preferred Styles</h2>
            <p className="text-sm text-gray-500">Select your favorite styles</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {styles.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => toggleSelection(selectedStyles, setSelectedStyles, style.id)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedStyles.includes(style.id)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-200'
                }`}
              >
                <div className="text-center space-y-1">
                  <div className="text-2xl">{style.icon}</div>
                  <p className="text-xs font-semibold text-gray-700">{style.name}</p>
                </div>
                {selectedStyles.includes(style.id) && (
                  <div className="mt-1 flex items-center justify-center">
                    <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Alterations */}
        <div>
          <div className="mb-4">
            <h2 className="font-bold text-gray-800 mb-1">Common Alterations</h2>
            <p className="text-sm text-gray-500">What alterations do you often need?</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {alterations.map((alt) => (
              <button
                key={alt.id}
                type="button"
                onClick={() => toggleSelection(selectedAlterations, setSelectedAlterations, alt.id)}
                className={`px-4 py-2.5 rounded-full border-2 transition-all font-semibold text-sm ${
                  selectedAlterations.includes(alt.id)
                    ? 'border-purple-500 bg-purple-500 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-purple-200'
                }`}
              >
                {alt.name}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
          <p className="text-sm text-gray-700">
            💡 <strong>Tip:</strong> These preferences help us show you the most relevant tailors. You can always change them later in settings.
          </p>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            isFormValid
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg active:scale-[0.99]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Complete Setup
          <ArrowRight className="w-5 h-5" />
        </button>
        {!isFormValid && (
          <p className="text-center text-xs text-gray-500 mt-2">
            Please select at least one dress type to continue
          </p>
        )}
      </div>
    </div>
  );
}