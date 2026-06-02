import React, { useState, useEffect } from 'react';

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      {/* Backdrop overlay closer */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-[480px] bg-white border border-[#E0D9CF] rounded-xl p-7 shadow-lg z-10">
        <h2 className="text-base font-semibold text-[#1C1917] mb-5">
          {task ? 'Edit Task' : 'Add Task'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#78716C] tracking-wider mb-2">TITLE *</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
              className="w-full h-10 px-3 bg-white border border-[#D6CFC6] rounded-lg text-sm text-[#1C1917] focus:border-[#D97706] outline-none"
              placeholder="Design system update"
            />
            {error && <p className="text-xs text-[#B91C1C] mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#78716C] tracking-wider mb-2">DESCRIPTION</label>
            <textarea 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-white border border-[#D6CFC6] rounded-lg text-sm text-[#1C1917] focus:border-[#D97706] outline-none resize-none"
              placeholder="Detail out layout specifications..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#78716C] tracking-wider mb-2">DUE DATE</label>
            <input 
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-[#D6CFC6] rounded-lg text-sm text-[#1C1917] focus:border-[#D97706] outline-none"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#D6CFC6] rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
