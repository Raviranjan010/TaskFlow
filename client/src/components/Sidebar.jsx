import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, CheckCircle, Circle, LayoutDashboard, ListTodo, LogOut, Settings, UserRound } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();
  const { filter, setFilter } = useTasks();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const navItems = [
    { id: 'all', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pending', label: 'Pending', icon: Circle },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <aside className={`ink-panel fixed top-0 bottom-0 left-0 w-[280px] flex flex-col justify-between px-4 py-5 z-40 transition-transform duration-300 lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="brand-mark flex h-9 w-9 items-center justify-center rounded-lg text-[#92400e]">
              <Check size={20} strokeWidth={2.8} />
            </div>
            <div>
              <span className="block font-serif text-2xl leading-none text-[#fffaf2]">Tascova</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#fef3c7]/80">TaskFlow</span>
            </div>
          </div>

          {user && (
            <div className="mb-7 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
              <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d97706] text-sm font-bold text-white shadow-lg shadow-black/20">
                {getInitials(user.name)}
              </div>
              <div className="overflow-hidden">
                  <p className="truncate text-sm font-semibold leading-tight text-[#fffaf2]">{user.name}</p>
                  <p className="mt-1 truncate text-[11px] text-stone-400">{user.email}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-stone-300">
                <div className="rounded-lg bg-black/20 px-3 py-2">
                  <span className="block text-stone-500">Mode</span>
                  Focus
                </div>
                <div className="rounded-lg bg-black/20 px-3 py-2">
                  <span className="block text-stone-500">View</span>
                  Board
                </div>
              </div>
            </div>
          )}

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = filter === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setFilter(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all cursor-pointer ${isActive ? 'bg-white/12 text-[#fffaf2] shadow-inner' : 'text-stone-400 hover:bg-white/[0.07] hover:text-[#fffaf2]'}`}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${isActive ? 'bg-[#fffaf2] text-[#92400e]' : 'bg-white/[0.06] text-stone-300 group-hover:text-[#fef3c7]'}`}>
                    <Icon size={17} />
                  </span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#fef3c7]" />}
                </button>
              );
            })}
          </nav>

          <div className="my-6 h-px bg-white/12" />

          <div className="space-y-2">
            <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-400 transition-all hover:bg-white/[0.07] hover:text-[#fffaf2] cursor-pointer">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-stone-300 group-hover:text-[#fef3c7]">
                <UserRound size={17} />
              </span>
              Profile
            </button>
            <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-400 transition-all hover:bg-white/[0.07] hover:text-[#fffaf2] cursor-pointer">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-stone-300 group-hover:text-[#fef3c7]">
                <Settings size={17} />
              </span>
              Settings
            </button>
          </div>
        </div>

        <div>
          <div className="mb-4 rounded-2xl border border-[#fef3c7]/15 bg-[#fef3c7]/8 p-4">
            <div className="mb-3 flex items-center gap-2 text-[#fef3c7]">
              <ListTodo size={17} />
              <span className="text-xs font-bold uppercase tracking-[0.18em]">Daily cue</span>
            </div>
            <p className="text-sm leading-6 text-stone-300">Finish one meaningful task before adding three more.</p>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-400 transition-colors hover:bg-white/[0.07] hover:text-[#fffaf2] cursor-pointer"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06]">
              <LogOut size={17} />
            </span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
