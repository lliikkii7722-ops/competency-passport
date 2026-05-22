import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  GraduationCap, Briefcase, Code, FolderGit, Award,
  Star, TrendingUp, ArrowRight
} from 'lucide-react';
import api from '../api/axiosConfig';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    educations: 0, experiences: 0, skills: 0, projects: 0, certificates: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [edu, exp, skl, prj, cert] = await Promise.all([
        api.get('/education'), api.get('/experience'), api.get('/skills'),
        api.get('/projects'), api.get('/certificates')
      ]);
      setStats({
        educations: edu.data.length, experiences: exp.data.length,
        skills: skl.data.length, projects: prj.data.length, certificates: cert.data.length
      });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const statCards = [
    { label: 'Education', count: stats.educations, icon: GraduationCap, color: 'bg-blue-100 text-blue-600', path: '/education' },
    { label: 'Experience', count: stats.experiences, icon: Briefcase, color: 'bg-green-100 text-green-600', path: '/experience' },
    { label: 'Skills', count: stats.skills, icon: Code, color: 'bg-purple-100 text-purple-600', path: '/skills' },
    { label: 'Projects', count: stats.projects, icon: FolderGit, color: 'bg-orange-100 text-orange-600', path: '/projects' },
    { label: 'Certificates', count: stats.certificates, icon: Award, color: 'bg-red-100 text-red-600', path: '/certificates' },
  ];

  const completion = Math.min(100, Math.round(
    ((stats.educations > 0 ? 15 : 0) + (stats.experiences > 0 ? 15 : 0) +
     (stats.skills > 0 ? 20 : 0) + (stats.projects > 0 ? 20 : 0) +
     (stats.certificates > 0 ? 15 : 0) + (user?.headline ? 15 : 0))
  ));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.fullName}!</p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg">
          <Star size={18} fill="currentColor" />
          <span className="font-medium">Level {user?.userPoints?.level || 1}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} to={stat.path} className="card hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-gray-400 group-hover:text-blue-600 transition-colors">
                Manage <ArrowRight size={14} className="ml-1" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Profile Completion</h2>
            <span className="text-2xl font-bold text-primary-600">{completion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }} />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            {completion < 100
              ? 'Add more details to improve your ATS score and impress recruiters!'
              : '🎉 Your profile is complete! Share your public link with recruiters.'}
          </p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/profile" className="btn-secondary text-sm text-center">Update Profile</Link>
            <Link to="/certificates" className="btn-secondary text-sm text-center">Add Certificate</Link>
            <Link to="/projects" className="btn-secondary text-sm text-center">Add Project</Link>
            <Link to={`/public/profile/${user?.publicSlug}`} target="_blank" className="btn-secondary text-sm text-center">View Public CV</Link>
          </div>
        </div>
      </div>

      {user?.publicSlug && (
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">Your Public Profile Link</h3>
              <p className="text-sm text-blue-700 mt-1">Share this with recruiters</p>
              <code className="text-xs bg-white px-2 py-1 rounded mt-2 inline-block">
                http://localhost:5173/api/public/profile/{user.publicSlug}
              </code>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`http://localhost:9090/api/public/profile/${user.publicSlug}`);
                alert('Link copied!');
              }}
              className="btn-primary text-sm"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;