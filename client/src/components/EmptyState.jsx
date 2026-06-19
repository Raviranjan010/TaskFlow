import React from 'react';
import { CheckCircle, ClipboardList, Plus, Sparkles } from 'lucide-react';

const EmptyState = ({ filter, onAddTask }) => {
  const isCompleted = filter === 'completed';
  const isPending = filter === 'pending';

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-stone-300/80 bg-white/45 p-8 text-center">
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-full bg-[#d97706]/15 blur-xl" />
        <div className="brand-mark relative flex h-16 w-16 items-center justify-center rounded-2xl text-[#92400e]">
          {isCompleted ? (
            <CheckCircle size={34} />
          ) : isPending ? (
            <Sparkles size={34} />
          ) : (
            <ClipboardList size={34} />
          )}
        </div>
      </div>

      <h3 className="font-serif text-2xl text-[#1c1917]">
        {isPending ? 'The queue is clear' : 'No tasks here'}
      </h3>
      
      <p className="mb-6 mt-2 max-w-[300px] text-sm leading-6 text-stone-500">
        {isCompleted 
          ? 'No completed tasks yet.' 
          : isPending 
            ? 'All caught up! No pending tasks.' 
            : 'Add your first task to get started.'}
      </p>

      {filter === 'all' && (
        <button
          onClick={onAddTask}
          className="copper-button inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition active:scale-[0.98] cursor-pointer"
        >
          <Plus size={16} />
          Add a Task
        </button>
      )}
    </div>
  );
};

export default EmptyState;
