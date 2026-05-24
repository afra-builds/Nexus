import React, { useState } from 'react';

interface PasswordStrengthProps {
  password: string;
  onChange?: (value: string) => void;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, onChange }) => {
  const [localPassword, setLocalPassword] = useState(password || '');

  const calculateStrength = (pwd: string): { score: number; label: string; color: string } => {
    let score = 0;
    
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { score, label: 'Medium', color: 'bg-yellow-500' };
    return { score: 5, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = calculateStrength(localPassword);
  const widthPercent = (strength.score / 5) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalPassword(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="space-y-2">
      <input
        type="password"
        value={localPassword}
        onChange={handleChange}
        placeholder="Enter password"
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${strength.color} transition-all duration-300`}
          style={{ width: `${widthPercent}%` }}
        />
      </div>
      
      <p className="text-sm">
        Password Strength: <span className={`font-medium ${
          strength.label === 'Weak' ? 'text-red-600' :
          strength.label === 'Medium' ? 'text-yellow-600' :
          'text-green-600'
        }`}>{strength.label}</span>
      </p>
      
      <ul className="text-xs text-gray-500 space-y-1 mt-2">
        <li className={localPassword.length >= 8 ? 'text-green-600' : ''}>
          ✓ At least 8 characters
        </li>
        <li className={/[A-Z]/.test(localPassword) ? 'text-green-600' : ''}>
          ✓ Uppercase letter
        </li>
        <li className={/[0-9]/.test(localPassword) ? 'text-green-600' : ''}>
          ✓ Number
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrength;