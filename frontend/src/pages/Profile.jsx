import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import {
  Mail, MapPin, Phone, Github, Linkedin, Edit, Save, X,
  Download, ExternalLink, Globe, Code2
} from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    headline: '',
    phone: '',
    location: '',
    summary: '',
    githubUsername: '',
    linkedinId: '',
    leetcodeUsername: '',
    isProfilePublic: true
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const syncForm = (data) => {
    setFormData({
      fullName: data.fullName || '',
      headline: data.headline || '',
      phone: data.phone || '',
      location: data.location || '',
      summary: data.summary || '',
      githubUsername: data.githubUsername || '',
      linkedinId: data.linkedinId || '',
      leetcodeUsername: data.leetcodeUsername || '',
      isProfilePublic: data.isProfilePublic ?? true
    });
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get('/user/profile');
      setProfile(res.data);
      setUser(res.data);
      syncForm(res.data);
    } catch (err) {
      console.error('Fetch profile error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put('/user/profile', formData);

      const freshUser = await api.get('/user/profile');

      setProfile(freshUser.data);
      setUser(freshUser.data);
      syncForm(freshUser.data);

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Profile update error:', err);
      console.error('Error response:', err.response);
      alert(err.response?.data?.message || 'Error updating profile');
    }
  };

  const downloadResume = async () => {
    setDownloading(true);

    try {
      const res = await api.get('/pdf/resume', {
        responseType: 'blob'
      });

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = `${profile?.fullName?.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download resume. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const cleanUsername = (value, type) => {
    if (!value) return '';

    return value
      .replace('https://github.com/', '')
      .replace('https://www.linkedin.com/in/', '')
      .replace('https://linkedin.com/in/', '')
      .replace('https://leetcode.com/', '')
      .replaceAll('/', '');
  };

  const getSocialUrl = (type, value) => {
    if (!value) return null;

    if (value.startsWith('http')) return value;

    switch (type) {
      case 'github':
        return `https://github.com/${value}`;
      case 'linkedin':
        return `https://linkedin.com/in/${value}`;
      case 'leetcode':
        return `https://leetcode.com/${value}`;
      default:
        return null;
    }
  };

  const currentUser = profile || user;

  if (!currentUser) return <div className="p-6">Loading...</div>;

  const publicProfileUrl = currentUser?.publicSlug
    ? `http://localhost:5173/public/profile/${currentUser.publicSlug}`
    : 'Public slug not generated yet. Save profile once.';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>

        <div className="flex gap-3">
          <button
            onClick={downloadResume}
            disabled={downloading}
            className="btn-primary flex items-center gap-2"
          >
            <Download size={18} />
            {downloading ? 'Generating...' : 'Download Resume'}
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-secondary flex items-center gap-2"
          >
            {isEditing ? <X size={18} /> : <Edit size={18} />}
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="card">
          <h3 className="font-semibold mb-4 text-lg">Edit Profile</h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                className="input-field"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Headline</label>
              <input
                type="text"
                className="input-field"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="Full Stack Developer | Java | React"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                className="input-field"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                className="input-field"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Bangalore, India"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">GitHub Username</label>
              <div className="relative">
                <Github size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="input-field pl-10"
                  value={formData.githubUsername}
                  onChange={(e) => setFormData({ ...formData, githubUsername: cleanUsername(e.target.value, 'github') })}
                  placeholder="lliikkii7722-ops"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn Username</label>
              <div className="relative">
                <Linkedin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="input-field pl-10"
                  value={formData.linkedinId}
                  onChange={(e) => setFormData({ ...formData, linkedinId: cleanUsername(e.target.value, 'linkedin') })}
                  placeholder="likitha-hk"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LeetCode Username</label>
              <div className="relative">
                <Code2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="input-field pl-10"
                  value={formData.leetcodeUsername}
                  onChange={(e) => setFormData({ ...formData, leetcodeUsername: cleanUsername(e.target.value, 'leetcode') })}
                  placeholder="leetcode_username"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Summary</label>
              <textarea
                className="input-field"
                rows={4}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Write a brief summary about yourself..."
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isProfilePublic}
                onChange={(e) => setFormData({ ...formData, isProfilePublic: e.target.checked })}
              />
              <label htmlFor="isPublic" className="text-sm">Make profile public</label>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-lg">
                {currentUser?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {currentUser?.fullName || 'No name added'}
                </h2>

                <p className="text-gray-500 mt-1">
                  {currentUser?.headline || 'No headline added'}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} className="text-blue-500" />
                    <span className="text-sm">{currentUser?.email || 'No email'}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} className="text-green-500" />
                    <span className="text-sm">{currentUser?.location || 'Not set'}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} className="text-purple-500" />
                    <span className="text-sm">{currentUser?.phone || 'Not set'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Github size={16} className="text-gray-800" />
                    {currentUser?.githubUsername ? (
                      <a
                        href={getSocialUrl('github', currentUser.githubUsername)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        @{cleanUsername(currentUser.githubUsername, 'github')} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">Not connected</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Linkedin size={16} className="text-blue-700" />
                    {currentUser?.linkedinId ? (
                      <a
                        href={getSocialUrl('linkedin', currentUser.linkedinId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        @{cleanUsername(currentUser.linkedinId, 'linkedin')} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">Not connected</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Code2 size={16} className="text-orange-500" />
                    {currentUser?.leetcodeUsername ? (
                      <a
                        href={getSocialUrl('leetcode', currentUser.leetcodeUsername)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        @{cleanUsername(currentUser.leetcodeUsername, 'leetcode')} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">Not connected</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      currentUser?.isProfilePublic
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {currentUser?.isProfilePublic ? '🌐 Public' : '🔒 Private'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2 text-gray-900">Summary</h3>
            <p className="text-gray-600 leading-relaxed">
              {currentUser?.summary || 'No summary added yet. Click Edit Profile to add your professional summary.'}
            </p>
          </div>

          <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Your Public Profile Link</h3>
                <p className="text-sm text-blue-700 mt-1">Share this with recruiters</p>

                <code className="text-xs bg-white px-3 py-2 rounded block mt-2 border border-blue-100">
                  {publicProfileUrl}
                </code>
              </div>

              <button
                onClick={() => {
                  if (!currentUser?.publicSlug) {
                    alert('Public slug not generated. Save profile once.');
                    return;
                  }

                  navigator.clipboard.writeText(publicProfileUrl);
                  alert('Link copied to clipboard!');
                }}
                className="btn-primary text-sm flex items-center gap-2"
              >
                <Globe size={16} /> Copy Link
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;