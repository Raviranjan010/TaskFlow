import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, CheckCircle, LogOut } from 'lucide-react';
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
    { id: 'all', label: 'All Tasks', icon: LayoutDashboard },
    { id: 'pending', label: 'Pending', icon: LayoutDashboard },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      <aside className={`fixed top-0 bottom-0 left-0 w-[220px] bg-[#1C1917] flex flex-col justify-between py-6 z-40 transition-transform duration-300 lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          {/* Top Logo */}
          <div className="px-6 mb-8">
            <span className="text-[#F5F0E8] font-semibold text-lg tracking-wide">Tascova</span>
          </div>

          {/* User Profile */}
          {user && (
            <div className="px-6 mb-8 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D97706] text-white flex items-center justify-center text-xs font-semibold">
                {getInitials(user.name)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-[#F5F0E8] truncate leading-tight">{user.name}</p>
                <p className="text-[10px] text-stone-400 truncate mt-0.5">{user.email}</p>
              </div>
            </div>
          )}

          {/* Nav Navigation */}
          <nav className="px-3 space-y-1">
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
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${isActive ? 'bg-[#292524] text-[#F5F0E8]' : 'text-stone-400 hover:bg-[#292524] hover:text-[#F5F0E8]'}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="px-3">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-stone-400 hover:bg-[#292524] hover:text-[#F5F0E8] transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
