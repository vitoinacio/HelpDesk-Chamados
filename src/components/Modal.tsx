import PriorityIndicator from "./PriorityIndicator";
import StatusIndicator from "./StatusIndicator";
import type { TicketAdmin } from "./TicketAdminList";

const Modal = ({
  isOpen,
  onClose,
  ticket,
  onStatusChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketAdmin | null;
  onStatusChange: (id: number, status: 'pendente' | 'resolvido') => void;
}) => {
  if (!isOpen || !ticket) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl relative">
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 id="modal-title" className="text-2xl font-bold mb-4 text-gray-900">
          Detalhes do Chamado #{ticket.id}
        </h2>

        <section className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Descrição</h3>
            <p className="whitespace-pre-line text-gray-700">
              {ticket.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Prioridade</h3>
              <PriorityIndicator priority={ticket.priority} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Status</h3>
              <StatusIndicator status={ticket.status} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Criado por</h3>
            <p className="text-gray-700">{ticket.email}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Criado em</h3>
            <p className="text-gray-700">
              {new Date(ticket.created_at).toLocaleString()}
            </p>
          </div>
        </section>

        <footer className="mt-8 flex justify-end gap-3">
          {ticket.status.toLowerCase() === 'pendente' ? (
            <button
              onClick={() => {
                onStatusChange(ticket.id, 'resolvido');
                onClose();
              }}
              className="inline-flex items-center px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition transform hover:scale-105"
            >
              Marcar como Resolvido
            </button>
          ) : (
            <button
              onClick={() => {
                onStatusChange(ticket.id, 'pendente');
                onClose();
              }}
              className="inline-flex items-center px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition transform hover:scale-105"
            >
              Marcar como Pendente
            </button>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
          >
            Fechar
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Modal;