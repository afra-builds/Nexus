import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const TwoFactorAuthPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Demo OTP check
    setTimeout(() => {
      if (otp === '123456') {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'investor') {
          navigate('/dashboard/investor');
        } else {
          navigate('/dashboard/entrepreneur');
        }
      } else {
        setError('Invalid code. Use 123456');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center">
            <Shield size={28} className="text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          2FA Verification
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the 6-digit verification code
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-500 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full text-center text-2xl tracking-widest border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                Demo code: <span className="font-bold">123456</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={otp.length !== 6 || isLoading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuthPage;