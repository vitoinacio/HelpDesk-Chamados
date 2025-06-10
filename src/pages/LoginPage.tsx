import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setIsAdmin } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = email.trim() !== '' && /^\S+@\S+\.\S+$/.test(email);
  const isPasswordValid = password.trim().length >= 1;

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!isEmailValid || !isPasswordValid) {
      setError('Informe um e-mail válido e senha com pelo menos 6 caracteres.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      setToken(res.data.token);
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      setIsAdmin(payload.is_admin);
      localStorage.setItem('is_admin', payload.is_admin);
      localStorage.setItem('User', email);
      navigate('/tickets');
    } catch {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 flex items-center justify-center px-6 py-12 font-inter">
      <section className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-900 mb-10 text-center tracking-tight">
          Acesse sua conta
        </h1>

        {error && (
          <div
            className="mb-6 rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemplo@seuemail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              required
              className={`w-full px-5 py-3 rounded-xl border text-gray-900 placeholder-gray-400
                transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                ${email.length > 0 && !isEmailValid ? 'border-red-500' : 'border-gray-300'}
              `}
            />
            {email.length > 0 && !isEmailValid && (
              <p className="mt-1 text-red-600 text-xs">Informe um email válido</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              required
              className={`w-full px-5 py-3 rounded-xl border text-gray-900 placeholder-gray-400
                transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                ${password.length > 0 && !isPasswordValid ? 'border-red-500' : 'border-gray-300'}
              `}
            />
            {password.length > 0 && !isPasswordValid && (
              <p className="mt-1 text-red-600 text-xs">Senha deve ter pelo menos 6 caracteres</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isEmailValid || !isPasswordValid}
            className={`w-full py-3 rounded-xl text-white font-semibold
              bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300
              transition disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 text-sm">
          Não tem conta?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-800">
            Registre-se
          </Link>
        </p>
      </section>
    </main>
  );
}
