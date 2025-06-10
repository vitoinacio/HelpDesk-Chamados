import { useState } from 'react';

export interface Ticket {
  id: number;
  description: string;
  priority: string;
  status: string;
  created_at: string;
}

interface Props {
  tickets: Ticket[];
}

export default function TicketList({ tickets }: Props) {
  const [modalTicket, setModalTicket] = useState<Ticket | null>(null);

  const getPriorityClasses = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'baixa':
        return 'bg-green-100 text-green-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'alta':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'bg-orange-100 text-orange-800';
      case 'resolvido':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  function truncate(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600 border border-gray-200 max-w-xl mx-auto">
        <p className="text-xl font-semibold mb-2">Nenhum chamado seu foi encontrado.</p>
        <p className="text-gray-500">Abra um novo chamado para vê-lo aqui.</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex flex-col p-6 cursor-default"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Chamado #{ticket.id}</h3>

            <p
              className="text-gray-700 mb-4 cursor-pointer select-text line-clamp-3"
              title="Clique para ver descrição completa"
              onClick={() => setModalTicket(ticket)}
            >
              {truncate(ticket.description, 100)}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold select-none ${getPriorityClasses(
                  ticket.priority,
                )}`}
              >
                Prioridade: {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold select-none ${getStatusClasses(
                  ticket.status,
                )}`}
              >
                Status: {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </span>
            </div>

            <time className="mt-auto text-sm text-gray-500 select-text" dateTime={ticket.created_at}>
              Criado em: {new Date(ticket.created_at).toLocaleString()}
            </time>
          </div>
        ))}
      </div>

      {/* Modal completo */}
      {modalTicket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setModalTicket(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-lg max-w-xl w-full p-6 mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Detalhes do Chamado #{modalTicket.id}</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-1">Descrição Completa</h4>
              <p className="text-gray-800 whitespace-pre-wrap">{modalTicket.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold select-none ${getPriorityClasses(
                  modalTicket.priority,
                )}`}
              >
                Prioridade: {modalTicket.priority.charAt(0).toUpperCase() + modalTicket.priority.slice(1)}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold select-none ${getStatusClasses(
                  modalTicket.status,
                )}`}
              >
                Status: {modalTicket.status.charAt(0).toUpperCase() + modalTicket.status.slice(1)}
              </span>

              <time className="text-sm text-gray-500 select-text" dateTime={modalTicket.created_at}>
                Criado em: {new Date(modalTicket.created_at).toLocaleString()}
              </time>
            </div>

            <button
              onClick={() => setModalTicket(null)}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

