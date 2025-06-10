/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import Modal from './Modal';
import StatusIndicator from './StatusIndicator';
import PriorityIndicator from './PriorityIndicator';

export interface TicketAdmin {
  id: number;
  description: string;
  priority: string;
  status: string;
  created_at: string;
  email: string;
}

interface Props {
  tickets: TicketAdmin[];
  onStatusChange: (id: number, status: 'pendente' | 'resolvido') => void;
}

export default function TicketAdminList({ tickets, onStatusChange }: Props) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'pendente' | 'resolvido'
  >('all');
  const [filterPriority, setFilterPriority] = useState<
    'all' | 'baixa' | 'media' | 'alta'
  >('all');
  const [modalTicket, setModalTicket] = useState<TicketAdmin | null>(null);

  const filteredTickets = useMemo(() => {
    const term = search.toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.description.toLowerCase().includes(term) ||
        ticket.email.toLowerCase().includes(term) ||
        ticket.id.toString().includes(term);

      const matchesStatus =
        filterStatus === 'all' || ticket.status === filterStatus;

      const matchesPriority =
        filterPriority === 'all' ||
        ticket.priority.toLowerCase() === filterPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, filterStatus, filterPriority]);

  return (
    <section className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <header className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-6 text-center sm:text-left text-gray-900">
          Gerenciamento de Chamados
        </h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-wrap gap-4 max-w-full mx-auto sm:mx-0 items-center justify-center sm:justify-start"
          role="search"
          aria-label="Busca de chamados"
        >
          <input
            type="search"
            placeholder="Buscar por descrição, email ou ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition text-gray-900"
            aria-label="Campo de busca"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="w-full sm:w-48 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition text-gray-900"
            aria-label="Filtro por status"
          >
            <option value="all">Todos os Status</option>
            <option value="pendente">Pendente</option>
            <option value="resolvido">Resolvido</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="w-full sm:w-48 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition text-gray-900"
            aria-label="Filtro por prioridade"
          >
            <option value="all">Todas as Prioridades</option>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </form>
      </header>

      {filteredTickets.length === 0 ? (
        <p className="text-center text-gray-500 text-lg max-w-3xl mx-auto">
          Nenhum chamado corresponde aos filtros aplicados.
        </p>
      ) : (
        <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTickets.map((ticket) => (
            <article
              key={ticket.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-200 hover:shadow-2xl transition-transform transform hover:-translate-y-1 focus-within:shadow-2xl focus-within:-translate-y-1 cursor-pointer"
              tabIndex={0}
              aria-labelledby={`ticket-title-${ticket.id}`}
              onClick={() => setModalTicket(ticket)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setModalTicket(ticket);
                }
              }}
            >
              <header>
                <h2
                  id={`ticket-title-${ticket.id}`}
                  className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 whitespace-pre-line"
                >
                  {ticket.description.length > 120
                    ? ticket.description.slice(0, 120) + '...'
                    : ticket.description}
                </h2>
              </header>

              <div className="flex justify-between items-center mt-6 mb-6 text-sm">
                <div className="flex gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Status</h3>
                    <StatusIndicator status={ticket.status} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Prioridade
                    </h3>
                    <PriorityIndicator priority={ticket.priority} />
                  </div>
                </div>
                <span className="text-gray-500">ID: #{ticket.id}</span>
              </div>

              <footer className="text-sm text-gray-600 border-t border-gray-200 pt-4">
                <p>
                  <strong>Criado por:</strong> {ticket.email}
                </p>
                <p>
                  <strong>Criado em:</strong>{' '}
                  {new Date(ticket.created_at).toLocaleString()}
                </p>
              </footer>
            </article>
          ))}
        </main>
      )}

      <Modal
        isOpen={modalTicket !== null}
        onClose={() => setModalTicket(null)}
        ticket={modalTicket}
        onStatusChange={onStatusChange}
      />
    </section>
  );
}
