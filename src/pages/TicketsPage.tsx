import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import TicketForm from '../components/TicketForm';
import TicketList, { type Ticket } from '../components/TicketList';
import TicketAdminList, {
  type TicketAdmin,
} from '../components/TicketAdminList';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function TicketsPage() {
  const { token, setToken, isAdmin, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [adminTickets, setAdminTickets] = useState<TicketAdmin[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const storedIsAdmin = localStorage.getItem('is_admin') === 'true';
    setIsAdmin(storedIsAdmin);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(
        'Erro ao carregar chamados:',
        err.response?.data || err.message,
      );
      setError('Erro ao carregar chamados');
      setToken('');
      navigate('/login');
    }
  }

  async function handleStatusChange(
    id: number,
    status: 'pendente' | 'resolvido',
  ) {
    try {
      await axios.patch(
        `${API_URL}/tickets/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchTickets();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(
        'Erro ao atualizar status:',
        err.response?.data || err.message,
      );
      setError('Erro ao atualizar status');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    setToken('');
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => handleLogout()}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-200"
          >
            Sair
          </button>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Chamados
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!isAdmin && <TicketForm onCreate={fetchTickets} />}
        {isAdmin ? (
          <TicketAdminList
            tickets={adminTickets}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <TicketList tickets={tickets} />
        )}
      </div>
    </div>
  );
}
