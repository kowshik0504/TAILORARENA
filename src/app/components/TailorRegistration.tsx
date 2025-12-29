import { useState } from 'react';
import { TailorPersonalDetails } from './TailorPersonalDetails';
import { TailorWorkType } from './TailorWorkType';
import { TailorPayment } from './TailorPayment';
import { LocationPermission } from './LocationPermission';

interface TailorRegistrationProps {
  onComplete: () => void;
  onBack: () => void;
}

export function TailorRegistration({ onComplete, onBack }: TailorRegistrationProps) {
  const [step, setStep] = useState<'personal' | 'work-type' | 'payment' | 'location'>('personal');
  const [personalData, setPersonalData] = useState<any>(null);
  const [workTypeData, setWorkTypeData] = useState<any>(null);

  const handlePersonalDetailsComplete = (data: any) => {
    setPersonalData(data);
    setStep('work-type');
  };

  const handleWorkTypeComplete = (data: any) => {
    setWorkTypeData(data);
    if (data.paymentChoice === 'now') {
      setStep('payment');
    } else {
      setStep('location');
    }
  };

  const handlePaymentSuccess = () => {
    setStep('location');
  };

  const handleLocationComplete = () => {
    onComplete();
  };

  return (
    <>
      {step === 'personal' && (
        <TailorPersonalDetails
          onNext={handlePersonalDetailsComplete}
          onBack={onBack}
        />
      )}
      {step === 'work-type' && (
        <TailorWorkType
          onNext={handleWorkTypeComplete}
          onBack={() => setStep('personal')}
        />
      )}
      {step === 'payment' && workTypeData && (
        <TailorPayment
          registrationFee={workTypeData.fee}
          onSuccess={handlePaymentSuccess}
          onBack={() => setStep('work-type')}
        />
      )}
      {step === 'location' && (
        <LocationPermission
          onAllow={handleLocationComplete}
          userType="tailor"
        />
      )}
    </>
  );
}
