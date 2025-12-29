import { UserRole } from '../App';
import { User, Scissors } from 'lucide-react';

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
}

export function RoleSelection({ onSelect }: RoleSelectionProps) {
  const roles = [
    {
      id: 'customer' as UserRole,
      title: 'Customer',
      description: 'Find tailors and book services',
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 'tailor' as UserRole,
      title: 'Tailor',
      description: 'Offer services and manage bookings',
      icon: Scissors,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Choose Your Role</h1>
          <p className="mt-2 text-gray-600">Select how you want to use Tailor Arena</p>
        </div>
      </div>

      {/* Role Cards */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => onSelect(role.id)}
                className={`${role.bgColor} rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border-2 border-transparent hover:border-purple-300`}
              >
                <div className={`${role.iconBg} w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className={`w-12 h-12 ${role.iconColor}`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-3">{role.title}</h3>
                <p className="text-gray-600 text-lg mb-6">{role.description}</p>
                <div className={`h-1.5 rounded-full bg-gradient-to-r ${role.color} opacity-80`}></div>
                
                {/* Features */}
                <div className="mt-6 space-y-2 text-left">
                  {role.id === 'customer' ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>Find nearby tailors</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>Compare prices & reviews</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>Book appointments online</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>Get more customers</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>Manage bookings easily</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>Grow your business</span>
                      </div>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Note */}
      <div className="p-6 text-center">
        <p className="text-sm text-gray-500">
          You can change your role later from settings
        </p>
      </div>
    </div>
  );
}