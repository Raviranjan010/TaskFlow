import React from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckCircle2, Circle, ListFilter } from 'lucide-react';

const FilterBar = () => {
  const { filter, setFilter, tasks, pendingCount, completedCount } = useTasks();

  const totalCount = tasks.length;

  const buttons = [
    { id: 'all', label: 'All', count: totalCount, icon: ListFilter },
    { id: 'pending', label: 'Pending', count: pendingCount, icon: Circle },
    { id: 'completed', label: 'Completed', count: completedCount, icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((btn) => {
        const isActive = filter === btn.id;
        const Icon = btn.icon;
        return (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${isActive ? 'border-[#c46205] bg-[#fff7ed] text-[#92400e] shadow-sm' : 'border-stone-300/70 bg-white/50 text-stone-500 hover:bg-white hover:text-stone-800'}`}
          >
            <Icon size={14} />
            <span>{btn.label}</span>
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${isActive ? 'bg-[#92400e] text-white' : 'bg-stone-100 text-stone-600'}`}>
              {btn.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
