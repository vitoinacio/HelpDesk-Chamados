import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function TicketForm({ onCreate }: { onCreate: () => void }) {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'baixa' | 'media' | 'alta'>('baixa');
  const [error, setError] = useState('');
  const { token } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) {
      setError('A descrição é obrigatória.');
      return;
    }
    try {
      await axios.post(
        `${API_URL}/tickets`,
        { description, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDescription('');
      setPriority('baixa');
      setError('');
      onCreate();
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError('Não foi possível abrir o chamado. Tente novamente.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Abrir Novo Chamado</h2>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Ops!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
          Descrição do Chamado:
        </label>
        <textarea
          id="description"
          placeholder="Descreva seu problema ou solicitação em detalhes..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
          rows={4}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="priority" className="block text-gray-700 text-sm font-semibold mb-2">
          Prioridade:
        </label>
        <select
          id="priority"
          value={priority}
          onChange={e => setPriority(e.target.value as 'baixa' | 'media' | 'alta')}
          className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200 transform hover:scale-105"
      >
        Abrir Chamado
      </button>
    </form>
  );
}
