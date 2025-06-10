const StatusIndicator = ({ status }: { status: string }) => {
  const colors: Record<'pendente' | 'resolvido', string> = {
    pendente: 'bg-orange-200 text-orange-800',
    resolvido: 'bg-blue-200 text-blue-800',
  };

  const key = status.toLowerCase() as 'pendente' | 'resolvido';

  const color = colors[key] || 'bg-gray-200 text-gray-800';

  return (
    <span
      className={`${color} inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold capitalize`}
      aria-label={`Status ${status}`}
    >
      {status}
    </span>
  );
};

export default StatusIndicator;
