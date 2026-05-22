import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Briefcase,
  Code,
  FolderGit,
  Award,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/skill-gap', icon: TrendingUp, label: 'AI Analyzer' },
    { path: '/badges', icon: Award, label: 'Badges' },
    { path: '/mock-interview', icon: MessageSquare, label: 'Mock Interview' },
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/education', icon: GraduationCap, label: 'Education' },
    { path: '/experience', icon: Briefcase, label: 'Experience' },
    { path: '/skills', icon: Code, label: 'Skills' },
    { path: '/projects', icon: FolderGit, label: 'Projects' },
    { path: '/certificates', icon: Award, label: 'Certificates' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden md:block">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;