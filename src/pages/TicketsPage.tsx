/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import TicketForm from '../components/TicketForm';
import TicketList, { type Ticket } from '../components/TicketList';
import TicketAdminList, { type TicketAdmin } from '../components/TicketAdminList';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function TicketsPage() {
  const { token, setToken, isAdmin, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [adminTickets, setAdminTickets] = useState<TicketAdmin[]>([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState<string>('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const storedIsAdmin = localStorage.getItem('is_admin') === 'true';
    setIsAdmin(storedIsAdmin);
    const storedUser = localStorage.getItem('User');
    if (storedUser) setUser(storedUser);

    fetchTickets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAdmin]);

  async function fetchTickets() {
    try {
      const url = `${API_URL}/tickets`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (isAdmin) {
        setAdminTickets(res.data);
      } else {
        setTickets(res.data);
      }
      setError('');
    } catch (err: any) {
      console.error('Erro ao carregar chamados:', err.response?.data || err.message);
      setError('Erro ao carregar chamados');
      setToken('');
      navigate('/login');
    }
  }

  async function handleStatusChange(id: number, status: 'pendente' | 'resolvido') {
    try {
      await axios.patch(
        `${API_URL}/tickets/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTickets();
      setError('');
    } catch (err: any) {
      console.error('Erro ao atualizar status:', err.response?.data || err.message);
      setError('Erro ao atualizar status');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('User');
    setToken('');
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-indigo-50 p-6 flex flex-col">
      <header className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-900 select-none">Chamados</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
          {user && (
            <p className="text-gray-800 font-semibold whitespace-nowrap">
              Logado como{' '}
              <span className="text-indigo-700 underline decoration-indigo-400 decoration-2">
                {user}
              </span>
              {isAdmin && (
                <span className="ml-3 px-3 py-0.5 rounded-full bg-indigo-200 text-indigo-900 text-xs font-bold uppercase tracking-wide select-text">
                  Admin
                </span>
              )}
            </p>
          )}
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-60 transition transform hover:scale-[1.03]"
            aria-label="Sair do sistema"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full flex flex-col lg:grid lg:grid-cols-3 gap-8 flex-grow">
        {error && (
          <div
            className="lg:col-span-3 mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md select-text shadow-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {!isAdmin && (
          <section className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <TicketForm onCreate={fetchTickets} />
          </section>
        )}

        <section
          className={`${
            isAdmin ? 'lg:col-span-3' : 'lg:col-span-2'
          } bg-white rounded-lg shadow-md p-6 flex flex-col`}
        >
          {isAdmin ? (
            <TicketAdminList tickets={adminTickets} onStatusChange={handleStatusChange} />
          ) : (
            <TicketList tickets={tickets} />
          )}
        </section>
      </main>
    </div>
  );
}


