import { CustomerPayment } from './CustomerPayment';

interface PaymentProps {
  bookingData: any;
  onBack: () => void;
  onSuccess: () => void;
}

export function Payment({ bookingData, onBack, onSuccess }: PaymentProps) {
  return <CustomerPayment bookingData={bookingData} onBack={onBack} onSuccess={onSuccess} />;
}
