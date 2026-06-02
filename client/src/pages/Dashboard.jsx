import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import Sidebar from '../components/Sidebar';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import EmptyState from '../components/EmptyState';
import { Menu, Plus } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex">
      {/* Sidebar navigation */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-[220px]">
        {/* Top Navbar */}
        <header className="h-14 px-6 border-b border-[#E0D9CF] bg-white flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-1.5 text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            <Menu size={20} />
          </button>
          <div className="text-xs font-semibold text-stone-500 tracking-wider">
            TASCOVA
          </div>
        </header>

        {/* Dashboard Panels */}
        <main className="p-6 max-w-4xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#1C1917] m-0">
              {getGreeting()}, {user?.name}
            </h1>
            <p className="text-xs text-stone-400 mt-1">Here is a summary of your workspace.</p>
          </div>

          {/* Metric Status Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white border border-[#E0D9CF] rounded-xl p-4">
              <span className="text-[10px] font-semibold text-[#78716C] tracking-wider">PENDING TASKS</span>
              <p className="text-2xl font-semibold text-[#D97706] mt-1">{pendingCount}</p>
            </div>
            <div className="bg-white border border-[#E0D9CF] rounded-xl p-4">
              <span className="text-[10px] font-semibold text-[#78716C] tracking-wider">COMPLETED TASKS</span>
              <p className="text-2xl font-semibold text-[#16A34A] mt-1">{completedCount}</p>
            </div>
          </div>

          {/* Task Operations */}
          <FilterBar />

          {/* Task Grid/List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-6 h-6 border-2 border-[#D97706] border-t-transparent rounded-full animate-spin"></div>
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
        </main>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleOpenAddModal}
        className="fixed bottom-6 right-6 w-13 h-13 rounded-full bg-[#D97706] hover:bg-[#B45309] text-white flex items-center justify-center transition-all shadow-md active:scale-95 z-20 cursor-pointer"
        style={{ width: '52px', height: '52px' }}
      >
        <Plus size={24} />
      </button>

      {/* Add / Edit Task Modal Overlay */}
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
