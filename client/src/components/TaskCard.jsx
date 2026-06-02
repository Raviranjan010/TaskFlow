import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Pencil, Trash2, Calendar } from 'lucide-react';

const TaskCard = ({ task, onEdit }) => {
  const { toggleComplete, deleteTask } = useTasks();

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white border border-[#E0D9CF] rounded-xl p-4 flex gap-4 items-start transition-all hover:border-[#D6CFC6]">
      {/* Circle Checkbox Checkmark */}
      <button 
        onClick={() => toggleComplete(task._id)}
        className="mt-0.5 shrink-0 transition-transform active:scale-95 cursor-pointer"
      >
        {task.isCompleted ? (
          <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-[1.5px] border-[#D97706] bg-white hover:bg-amber-50" />
        )}
      </button>

      {/* Center Details */}
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-semibold text-[#1C1917] truncate leading-tight ${task.isCompleted ? 'line-through text-stone-400' : ''}`}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className={`text-xs text-[#78716C] truncate mt-1 ${task.isCompleted ? 'text-stone-400' : ''}`}>
            {task.description}
          </p>
        )}

        {task.dueDate && (
          <div className="flex items-center gap-1.5 mt-2 text-[10px] font-medium text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 rounded-md w-fit">
            <Calendar size={12} />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 shrink-0 ml-2">
        {!task.isCompleted && (
          <button 
            onClick={() => onEdit(task)}
            className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <Pencil size={15} />
          </button>
        )}
        <button 
          onClick={() => deleteTask(task._id)}
          className="p-1.5 text-[#B91C1C] hover:text-red-900 transition-colors cursor-pointer"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
