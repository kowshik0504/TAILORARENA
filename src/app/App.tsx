import { useState } from 'react';
import { Splash } from './components/Splash';
import { LoginSignup } from './components/LoginSignup';
import { SignUp } from './components/SignUp';
import { ForgotPassword } from './components/ForgotPassword';
import { RoleSelection } from './components/RoleSelection';
import { CustomerDetails } from './components/CustomerDetails';
import { CustomerPreferences } from './components/CustomerPreferences';
import { CustomerHome } from './components/CustomerHome';
import { TailorProfile } from './components/TailorProfile';
import { BookingSlot } from './components/BookingSlot';
import { Payment } from './components/Payment';
import { BookingConfirmation } from './components/BookingConfirmation';
import { TailorDashboard } from './components/TailorDashboard';
import { TailorRegistration } from './components/TailorRegistration';
import { AdminDashboard } from './components/AdminDashboard';
import { ServiceManagement } from './components/ServiceManagement';

export type Screen = 
  | 'splash' 
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'role'
  | 'customer-details'
  | 'customer-preferences'
  | 'customer-home' 
  | 'tailor-profile' 
  | 'tailor-details'
  | 'booking' 
  | 'payment' 
  | 'customer-payment'
  | 'confirmation'
  | 'tailor-dashboard'
  | 'tailor-registration'
  | 'tailor-personal-details'
  | 'tailor-work-type'
  | 'tailor-payment'
  | 'location-permission'
  | 'service-management'
  | 'admin-dashboard';

export type UserRole = 'customer' | 'tailor' | 'admin';

export interface Tailor {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distance: number;
  specialization: string;
  price: number;
  serviceType: string;
  location: string;
  phone: string;
  experience: number;
  services: {
    name: string;
    price: number;
  }[];
  availability: string[];
}

export interface Booking {
  id: string;
  tailorName: string;
  service: string;
  date: string;
  time: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [selectedTailor, setSelectedTailor] = useState<Tailor | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    if (role === 'customer') {
      navigateTo('customer-details');
    } else if (role === 'tailor') {
      navigateTo('tailor-registration');
    } else if (role === 'admin') {
      navigateTo('admin-dashboard');
    }
  };

  const handleTailorSelect = (tailor: Tailor) => {
    setSelectedTailor(tailor);
    navigateTo('tailor-profile');
  };

  const handleBookingComplete = (data: any) => {
    setBookingData(data);
    navigateTo('confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'splash' && <Splash onComplete={() => navigateTo('login')} />}
      {currentScreen === 'login' && (
        <LoginSignup 
          onSuccess={() => navigateTo('customer-home')}
          onSignUpClick={() => navigateTo('signup')}
          onForgotPassword={() => navigateTo('forgot-password')}
        />
      )}
      {currentScreen === 'signup' && (
        <SignUp 
          onSuccess={() => navigateTo('role')}
          onLoginClick={() => navigateTo('login')}
        />
      )}
      {currentScreen === 'forgot-password' && (
        <ForgotPassword 
          onSuccess={() => navigateTo('login')}
          onBack={() => navigateTo('login')}
        />
      )}
      {currentScreen === 'role' && <RoleSelection onSelect={handleRoleSelect} />}
      {currentScreen === 'customer-details' && (
        <CustomerDetails 
          onComplete={() => navigateTo('customer-home')}
          onBack={() => navigateTo('role')}
          onPreferences={() => navigateTo('customer-preferences')}
        />
      )}
      {currentScreen === 'customer-preferences' && (
        <CustomerPreferences 
          onComplete={() => navigateTo('customer-home')}
          onBack={() => navigateTo('customer-details')}
        />
      )}
      {currentScreen === 'customer-home' && (
        <CustomerHome 
          onTailorSelect={handleTailorSelect} 
          onNavigate={navigateTo}
        />
      )}
      {currentScreen === 'tailor-profile' && selectedTailor && (
        <TailorProfile 
          tailor={selectedTailor} 
          onBack={() => navigateTo('customer-home')}
          onBookNow={() => navigateTo('booking')}
        />
      )}
      {currentScreen === 'booking' && selectedTailor && (
        <BookingSlot 
          tailor={selectedTailor}
          onBack={() => navigateTo('tailor-profile')}
          onContinue={(data) => {
            setBookingData(data);
            navigateTo('payment');
          }}
        />
      )}
      {currentScreen === 'payment' && (
        <Payment 
          bookingData={bookingData}
          onBack={() => navigateTo('booking')}
          onSuccess={handleBookingComplete}
        />
      )}
      {currentScreen === 'confirmation' && (
        <BookingConfirmation 
          bookingData={bookingData}
          onDone={() => navigateTo('customer-home')}
        />
      )}
      {currentScreen === 'tailor-registration' && (
        <TailorRegistration 
          onComplete={() => navigateTo('tailor-dashboard')}
          onBack={() => navigateTo('role')}
        />
      )}
      {currentScreen === 'tailor-dashboard' && (
        <TailorDashboard onNavigate={navigateTo} />
      )}
      {currentScreen === 'admin-dashboard' && (
        <AdminDashboard onNavigate={navigateTo} />
      )}
      {currentScreen === 'service-management' && (
        <ServiceManagement onNavigate={navigateTo} />
      )}
    </div>
  );
}