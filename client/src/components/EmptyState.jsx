import React from 'react';
import { ClipboardList, CheckCircle } from 'lucide-react';

const EmptyState = ({ filter, onAddTask }) => {
  const isCompleted = filter === 'completed';
  const isPending = filter === 'pending';

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white border border-[#E0D9CF] rounded-xl min-h-[260px]">
      {isCompleted ? (
        <CheckCircle className="text-[#D97706] w-12 h-12 mb-4" />
      ) : (
        <ClipboardList className="text-[#D97706] w-12 h-12 mb-4" />
      )}

      <h3 className="text-sm font-semibold text-[#78716C] mb-1">
        No tasks here
      </h3>
      
      <p className="text-xs text-stone-400 max-w-[240px] mb-5 leading-normal">
        {isCompleted 
          ? 'No completed tasks yet.' 
          : isPending 
            ? 'All caught up! No pending tasks.' 
            : 'Add your first task to get started.'}
      </p>

      {filter === 'all' && (
        <button
          onClick={onAddTask}
          className="bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Add a Task
        </button>
      )}
    </div>
  );
};

export default EmptyState;
