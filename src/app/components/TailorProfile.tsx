import { TailorDetails } from './TailorDetails';
import { Tailor } from '../App';

interface TailorProfileProps {
  tailor: Tailor;
  onBack: () => void;
  onBookNow: () => void;
}

export function TailorProfile({ tailor, onBack, onBookNow }: TailorProfileProps) {
  return <TailorDetails tailor={tailor} onBack={onBack} onBookNow={onBookNow} />;
}
