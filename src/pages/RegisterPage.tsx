import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await axios.post(`${API_URL}/auth/register`, { email, password });
      setSuccess('Conta criada com sucesso! Você será redirecionado para o login.');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/login'), 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || 'Erro ao criar conta. Tente novamente.');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-cyan-800 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Registrar</h1>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-sm"
            role="alert"
          >
            <strong className="font-bold">Erro:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 text-sm"
            role="alert"
          >
            <strong className="font-bold">Sucesso!</strong>
            <span className="block sm:inline ml-2">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Crie uma senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:scale-105"
          >
            Registrar
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Já tem conta?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition duration-200">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
