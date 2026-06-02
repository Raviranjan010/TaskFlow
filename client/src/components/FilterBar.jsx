import React from 'react';
import { useTasks } from '../context/TaskContext';

const FilterBar = () => {
  const { filter, setFilter, tasks, pendingCount, completedCount } = useTasks();

  const totalCount = tasks.length;

  const buttons = [
    { id: 'all', label: 'All', count: totalCount },
    { id: 'pending', label: 'Pending', count: pendingCount },
    { id: 'completed', label: 'Completed', count: completedCount },
  ];

  return (
    <div className="flex gap-2.5 mb-6">
      {buttons.map((btn) => {
        const isActive = filter === btn.id;
        return (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${isActive ? 'bg-[#D97706] text-white border-[#D97706]' : 'bg-transparent text-[#78716C] border-[#D6CFC6] hover:bg-stone-50'}`}
          >
            <span>{btn.label}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#B45309] text-white' : 'bg-stone-100 text-stone-600'}`}>
              {btn.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
