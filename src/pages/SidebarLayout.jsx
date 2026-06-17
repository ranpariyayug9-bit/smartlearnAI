import React, { useContext, useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Sparkles, 
  LogOut, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  GraduationCap,
  User,
  Shield,
  UserCheck
} from 'lucide-react';

const SidebarLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Read theme class from html tag
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Sparkles },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin Panel', path: '/admin', icon: Shield });
    navItems.push({ name: 'Permissions', path: '/permissions', icon: UserCheck });
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-darkBg transition-colors duration-200">
      {/* Mobile Sidebar Trigger */}
      <div className="absolute top-4 left-4 z-40 md:hidden">
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="p-2 rounded-lg bg-white dark:bg-darkCard text-gray-700 dark:text-gray-200 shadow-md focus:outline-none"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Panel */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between transform transition-transform duration-300 md:relative md:transform-none
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brandIndigo to-brandViolet flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Smart<span className="text-brandIndigo">Learn</span></h1>
              <span className="text-xs text-gray-400 font-medium">LMS Platform</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-brandIndigo dark:text-indigo-400 border-l-4 border-brandIndigo' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-950 dark:hover:text-white'}
                  `}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer (User details, settings, logout) */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300">
                <User size={16} />
              </div>
              <div className="max-w-[120px] overflow-hidden">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-gray-400 capitalize truncate">{user?.role}</p>
              </div>
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gradient-mesh">
        {/* Spacer for hamburger trigger in mobile */}
        <div className="h-10 md:hidden"></div>
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
