import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        username: formData.email,
        password: formData.password
      }, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const { access_token } = response.data;

      if (!access_token) {
        alert('Inicio de sesión fallido: no se recibió token.');
        return;
      }

      localStorage.setItem('token', access_token);

      const profile = await axios.get('http://localhost:8000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      alert(`Bienvenido, ${profile.data.name}`);
      navigate('/dashboard');

    } catch (error: any) {
      if (error.response?.status === 401) {
        alert('Correo o contraseña incorrectos.');
      } else {
        alert('Error inesperado al iniciar sesión.');
      }
      console.error(error);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 p-8 bg-white rounded shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-4">Welcome Back 👋</h1>
          <p className="text-text-secondary leading-relaxed">
            Today is a new day. It's your day. You shape it.<br />
            Sign in to start managing your projects.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Example@email.com"
              className="w-full h-12 px-4 border border-divider rounded focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150 ease-in-out bg-bg-surface text-text-primary placeholder-text-secondary hover:shadow-sm"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="at least 8 characters"
              className="w-full h-12 px-4 pr-12 border border-divider rounded focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150 ease-in-out bg-bg-surface text-text-primary placeholder-text-secondary hover:shadow-sm"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-right">
            <button type="button" className="text-sm text-complement hover:text-complement-600 transition-colors">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary-600 text-black font-medium rounded transition-all duration-150 ease-in-out hover:shadow-md transform hover:scale-[1.02]"
          >
            Sign in
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-divider"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-bg-main text-text-secondary">Or</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="w-full h-10 bg-bg-surface border border-divider rounded flex items-center justify-center space-x-3 hover:shadow-sm transition-all duration-150 ease-in-out hover:bg-gray-50"
          >
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-text-primary font-medium">Sign in with Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('Facebook')}
            className="w-full h-10 bg-bg-surface border border-divider rounded flex items-center justify-center space-x-3 hover:shadow-sm transition-all duration-150 ease-in-out hover:bg-gray-50"
          >
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">f</span>
            </div>
            <span className="text-text-primary font-medium">Sign in with Facebook</span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-text-secondary">
            Don't you have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-complement hover:text-complement-600 font-medium transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-text-secondary">
            © 2025 ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
