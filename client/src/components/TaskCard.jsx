import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Calendar, Check, GripVertical, Pencil, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onEdit }) => {
  const { toggleComplete, deleteTask } = useTasks();

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`task-card group rounded-2xl p-4 transition-all duration-200 sm:p-5 ${task.isCompleted ? 'opacity-80' : ''}`}>
      <div className="flex items-start gap-4">
      <button 
        onClick={() => toggleComplete(task._id)}
          className="mt-0.5 shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label={task.isCompleted ? 'Mark task pending' : 'Mark task completed'}
      >
        {task.isCompleted ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#166534] text-white shadow-lg shadow-green-900/20">
              <Check size={17} strokeWidth={3} />
          </div>
        ) : (
            <div className="h-8 w-8 rounded-full border-2 border-[#c46205] bg-white/80 shadow-inner transition-colors hover:bg-[#fff7ed]" />
        )}
      </button>

      <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className={`text-base font-semibold leading-tight text-[#1c1917] ${task.isCompleted ? 'line-through decoration-stone-400 text-stone-400' : ''}`}>
          {task.title}
        </h3>
            <GripVertical size={17} className="hidden shrink-0 text-stone-300 transition group-hover:text-stone-500 sm:block" />
          </div>

        {task.description && (
            <p className={`mt-1 line-clamp-2 text-sm leading-6 text-[#78716c] ${task.isCompleted ? 'text-stone-400' : ''}`}>
            {task.description}
          </p>
        )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {task.dueDate && (
              <div className="flex w-fit items-center gap-1.5 rounded-lg bg-[#fef3c7] px-2.5 py-1 text-xs font-semibold text-[#92400e]">
                <Calendar size={13} />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
            <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${task.isCompleted ? 'bg-green-50 text-[#166534]' : 'bg-orange-50 text-[#92400e]'}`}>
              {task.isCompleted ? 'Completed' : 'In progress'}
            </span>
          </div>
      </div>

        <div className="flex shrink-0 items-center gap-1">
        {!task.isCompleted && (
          <button 
            onClick={() => onEdit(task)}
              className="rounded-lg p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-800 cursor-pointer"
              aria-label="Edit task"
          >
              <Pencil size={16} />
          </button>
        )}
        <button 
          onClick={() => deleteTask(task._id)}
            className="rounded-lg p-2 text-[#b91c1c] transition hover:bg-red-50 hover:text-red-900 cursor-pointer"
            aria-label="Delete task"
        >
            <Trash2 size={16} />
        </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
