import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Briefcase, Plus, Trash2, Edit, X, Save } from 'lucide-react';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    employmentType: 'Full-time',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    isVisible: true
  });

  useEffect(() => { fetchExperiences(); }, []);

  const fetchExperiences = async () => {
    try {
      const res = await api.get('/experience');
      setExperiences(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/experience/${editingId}`, formData);
      } else {
        await api.post('/experience', formData);
      }
      setShowForm(false); setEditingId(null); resetForm(); fetchExperiences();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving experience');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    try { await api.delete(`/experience/${id}`); fetchExperiences(); }
    catch (err) { alert('Error deleting'); }
  };

  const handleEdit = (exp) => {
    setFormData({
      company: exp.company, title: exp.title, location: exp.location || '',
      employmentType: exp.employmentType || 'Full-time', startDate: exp.startDate || '',
      endDate: exp.endDate || '', isCurrent: exp.isCurrent || false,
      description: exp.description || '', isVisible: exp.isVisible
    });
    setEditingId(exp.id); setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      company: '', title: '', location: '', employmentType: 'Full-time',
      startDate: '', endDate: '', isCurrent: false, description: '', isVisible: true
    });
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Experience</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); resetForm(); }}
          className="btn-primary flex items-center gap-2">
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'Add Experience'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3 className="font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Experience</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company *</label>
              <input type="text" required className="input-field" value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="Google" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input type="text" required className="input-field" value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Software Engineer" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input type="text" className="input-field" value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Bangalore" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Employment Type</label>
              <select className="input-field" value={formData.employmentType}
                onChange={(e) => setFormData({...formData, employmentType: e.target.value})}>
                <option>Full-time</option><option>Part-time</option><option>Internship</option>
                <option>Contract</option><option>Freelance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input type="date" className="input-field" value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input type="date" className="input-field" value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})} disabled={formData.isCurrent} />
            </div>
            <div className="md:col-span-2 flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.isCurrent}
                  onChange={(e) => setFormData({...formData, isCurrent: e.target.checked})} />
                <span className="text-sm">Currently working here</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.isVisible}
                  onChange={(e) => setFormData({...formData, isVisible: e.target.checked})} />
                <span className="text-sm">Show on public profile</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea className="input-field" rows={3} value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your role and achievements..." />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Save size={18} /> {editingId ? 'Update' : 'Save'} Experience
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="card text-center text-gray-500 py-12">
            <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No experience added yet. Click "Add Experience" to get started!</p>
          </div>
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Briefcase size={20} /></div>
                    <div>
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company} {exp.location && `• ${exp.location}`}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{exp.employmentType}</span>
                    <span className="ml-2">📅 {exp.startDate} to {exp.isCurrent ? 'Present' : exp.endDate}</span>
                    {!exp.isVisible && <span className="ml-2 text-orange-500">👁️ Hidden</span>}
                  </div>
                  {exp.description && <p className="mt-3 text-gray-600 text-sm">{exp.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(exp)} className="p-2 text-gray-400 hover:text-blue-600"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(exp.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Experience;