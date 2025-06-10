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
    } catch {
      setError('Não foi possível abrir o chamado. Tente novamente.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-6 max-w-md mx-auto"
      noValidate
    >
      <h2 className="text-2xl font-extrabold text-indigo-900 text-center">
        Abrir Novo Chamado
      </h2>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md select-text"
          role="alert"
        >
          <strong className="font-semibold">Ops!</strong>{' '}
          <span>{error}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="description"
          className="block text-gray-800 font-semibold mb-2"
        >
          Descrição do Chamado:
        </label>
        <textarea
          id="description"
          placeholder="Descreva seu problema ou solicitação em detalhes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-gray-300 shadow-sm p-3 text-gray-800 resize-y
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition duration-200"
          rows={5}
          required
        />
      </div>

      <div>
        <label
          htmlFor="priority"
          className="block text-gray-800 font-semibold mb-2"
        >
          Prioridade:
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'baixa' | 'media' | 'alta')}
          className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 text-gray-800
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition duration-200"
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg
                   shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50
                   transition transform hover:scale-105"
      >
        Abrir Chamado
      </button>
    </form>
  );
}

