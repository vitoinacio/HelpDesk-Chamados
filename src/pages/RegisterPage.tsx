import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = email.trim() !== '' && /^\S+@\S+\.\S+$/.test(email);
  const isPasswordValid = password.trim().length >= 1;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isEmailValid || !isPasswordValid) {
      setError('Informe um e-mail válido e senha.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/register`, { email, password });
      setSuccess('Conta criada com sucesso! Você será redirecionado para o login.');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/login'), 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 flex items-center justify-center px-6 py-12 font-inter">
      <section className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-900 mb-10 text-center tracking-tight">
          Crie sua conta
        </h1>

        {error && (
          <div
            className="mb-6 rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="mb-6 rounded-md bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm"
            role="alert"
          >
            {success}
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
              autoComplete="new-password"
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
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 text-sm">
          Já tem conta?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-800">
            Faça login
          </Link>
        </p>
      </section>
    </main>
  );
}
