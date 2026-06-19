import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import Sidebar from '../components/Sidebar';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import EmptyState from '../components/EmptyState';
import { CalendarDays, Flame, Menu, Plus, Sparkles, Target } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, filter, loading, pendingCount, completedCount, addTask, updateTask } = useTasks();
  
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleOpenAddModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    let success = false;
    if (selectedTask) {
      success = await updateTask(selectedTask._id, taskData);
    } else {
      success = await addTask(taskData);
    }
    if (success) {
      setIsModalOpen(false);
    }
  };

  const totalCount = pendingCount + completedCount;
  const completionRate = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="app-shell min-h-screen flex overflow-x-hidden">
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen} 
      />

      <div className="flex-1 lg:pl-[280px]">
        <header className="sticky top-0 z-20 h-16 px-4 sm:px-6 border-b border-stone-300/60 bg-[#f7f1e7]/82 backdrop-blur-xl flex items-center justify-between">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-full text-stone-700 hover:bg-white/70 hover:text-stone-950 transition cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
            <span className="hidden sm:inline">{today}</span>
            <span className="h-1 w-1 rounded-full bg-[#c46205]" />
            <span>{totalCount} tasks</span>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="copper-button hidden sm:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition active:scale-[0.98] cursor-pointer"
          >
            <Plus size={17} />
            Add Task
          </button>
        </header>

        <main className="px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl">
            <section className="paper-panel relative overflow-hidden rounded-[1.25rem] p-5 sm:p-8">
              <div className="absolute right-6 top-6 hidden h-32 w-32 rounded-full border border-[#c46205]/20 lg:block" />
              <div className="absolute right-16 top-16 hidden h-16 w-16 rounded-full border border-[#166534]/20 lg:block" />
              <div className="relative grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ded4c5] bg-white/58 px-3 py-1 text-xs font-semibold text-[#92400e]">
                    <Sparkles size={14} />
                    Focus mode is ready
                  </div>
                  <h1 className="max-w-3xl font-serif text-3xl leading-tight text-[#1c1917] sm:text-5xl">
                    {getGreeting()}, {user?.name || 'there'}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
                    A calm command center for the work that matters. Sort the day, finish the next small thing, and let the rest get quieter.
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-300/60 bg-[#1c1917] p-4 text-[#fffaf2] shadow-2xl">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-stone-400">
                    <span>Today</span>
                    <Target size={16} className="text-[#fef3c7]" />
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-4xl font-semibold">{completionRate}%</p>
                      <p className="text-xs text-stone-400">completion rate</p>
                    </div>
                    <div className="text-right text-xs text-stone-300">
                      <p>{pendingCount} pending</p>
                      <p>{completedCount} completed</p>
                    </div>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#fef3c7] via-[#d97706] to-[#166534] transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-stone-300/70 bg-white/58 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
                  <span>Pending</span>
                  <Flame size={17} className="text-[#d97706]" />
                </div>
                <p className="mt-3 text-3xl font-semibold text-[#92400e]">{pendingCount}</p>
              </div>
              <div className="rounded-2xl border border-stone-300/70 bg-white/58 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
                  <span>Completed</span>
                  <Sparkles size={17} className="text-[#166534]" />
                </div>
                <p className="mt-3 text-3xl font-semibold text-[#166534]">{completedCount}</p>
              </div>
              <div className="rounded-2xl border border-stone-300/70 bg-white/58 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
                  <span>Date</span>
                  <CalendarDays size={17} className="text-stone-700" />
                </div>
                <p className="mt-3 text-lg font-semibold text-[#1c1917]">{today}</p>
              </div>
            </div>

            <section className="mt-6 rounded-[1.25rem] border border-stone-300/70 bg-[#fffaf2]/72 p-4 shadow-[0_18px_50px_rgba(28,25,23,0.08)] backdrop-blur sm:p-5">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-[#1c1917]">Your task board</h2>
                  <p className="text-sm text-stone-500">Tap a circle to move a task through the day.</p>
                </div>
                <FilterBar />
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="h-10 w-10 rounded-full border-2 border-[#d97706] border-t-transparent animate-spin" />
                </div>
              ) : tasks.length === 0 ? (
                <EmptyState filter={filter} onAddTask={handleOpenAddModal} />
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <TaskCard 
                      key={task._id} 
                      task={task} 
                      onEdit={handleOpenEditModal} 
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      <button
        onClick={handleOpenAddModal}
        className="copper-button fixed bottom-6 right-5 z-30 flex items-center justify-center rounded-full text-white transition active:scale-95 sm:hidden cursor-pointer"
        style={{ width: '52px', height: '52px' }}
        aria-label="Add task"
      >
        <Plus size={24} />
      </button>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Dashboard;
