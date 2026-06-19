import React, { useState, useEffect } from 'react';
import { CalendarDays, Check, FileText, X } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, task, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
    setError('');
  }, [task, isOpen]);

  // Handle Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    onSave({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="paper-panel relative z-10 w-full max-w-[520px] overflow-hidden rounded-2xl p-6 sm:p-7">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-stone-500 transition hover:bg-white/70 hover:text-stone-900 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="mb-6 pr-10">
          <div className="brand-mark mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-[#92400e]">
            <Check size={23} strokeWidth={2.7} />
          </div>
          <h2 className="font-serif text-3xl text-[#1c1917]">
            {task ? 'Refine task' : 'Add a task'}
          </h2>
          <p className="mt-1 text-sm text-stone-500">Make it specific enough that future you knows exactly what to do.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Title *</label>
            <div className="relative">
              <FileText size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input 
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (e.target.value.trim()) setError('');
                }}
                className="input-field h-12 w-full rounded-xl pl-10 pr-3 text-sm"
                placeholder="Design system update"
              />
            </div>
            {error && <p className="text-xs text-[#B91C1C] mt-1">{error}</p>}
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Description</label>
            <textarea 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field w-full resize-none rounded-xl p-3 text-sm"
              placeholder="Detail out layout specifications..."
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Due date</label>
            <div className="relative">
              <CalendarDays size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input 
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input-field h-12 w-full rounded-xl pl-10 pr-3 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stone-300/80 bg-white/50 px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="copper-button rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition active:scale-[0.98] cursor-pointer"
            >
              {task ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
