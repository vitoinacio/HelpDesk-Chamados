const PriorityIndicator = ({ priority }: { priority: string }) => {
  const colors: Record<'baixa' | 'media' | 'alta', string> = {
    baixa: 'bg-green-200 text-green-800',
    media: 'bg-yellow-200 text-yellow-800',
    alta: 'bg-red-200 text-red-800',
  };

  const key = priority.toLowerCase() as 'baixa' | 'media' | 'alta';

  const color = colors[key] || 'bg-gray-200 text-gray-800';

  return (
    <span
      className={`${color} inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold capitalize`}
      aria-label={`Prioridade ${priority}`}
    >
      {priority}
    </span>
  );
};

export default PriorityIndicator;
