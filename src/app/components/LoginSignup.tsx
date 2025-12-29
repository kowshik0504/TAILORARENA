import { Login } from './Login';

interface LoginSignupProps {
  onSuccess: () => void;
  onSignUpClick: () => void;
  onForgotPassword: () => void;
}

export function LoginSignup({ onSuccess, onSignUpClick, onForgotPassword }: LoginSignupProps) {
  return <Login onSuccess={onSuccess} onSignUpClick={onSignUpClick} onForgotPassword={onForgotPassword} />;
}
