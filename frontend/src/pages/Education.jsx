import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { GraduationCap, Plus, Trash2, Edit, X, Save } from 'lucide-react';

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
    isVisible: true
  });

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const res = await api.get('/education');
      setEducations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/education/${editingId}`, formData);
      } else {
        await api.post('/education', formData);
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchEducations();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving education');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education?')) return;
    try {
      await api.delete(`/education/${id}`);
      fetchEducations();
    } catch (err) {
      alert('Error deleting');
    }
  };

  const handleEdit = (edu) => {
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      grade: edu.grade || '',
      isVisible: edu.isVisible
    });
    setEditingId(edu.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
      isVisible: true
    });
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Education</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); resetForm(); }}
          className="btn-primary flex items-center gap-2"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'Add Education'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3 className="font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Education</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Institution *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.institution}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
                placeholder="University Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Degree *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.degree}
                onChange={(e) => setFormData({...formData, degree: e.target.value})}
                placeholder="Bachelor of Technology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Field of Study</label>
              <input
                type="text"
                className="input-field"
                value={formData.fieldOfStudy}
                onChange={(e) => setFormData({...formData, fieldOfStudy: e.target.value})}
                placeholder="Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Grade</label>
              <input
                type="text"
                className="input-field"
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
                placeholder="8.5 CGPA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                className="input-field"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                className="input-field"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="isVisible"
                checked={formData.isVisible}
                onChange={(e) => setFormData({...formData, isVisible: e.target.checked})}
              />
              <label htmlFor="isVisible" className="text-sm">Show on public profile</label>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Save size={18} />
                {editingId ? 'Update' : 'Save'} Education
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {educations.length === 0 ? (
          <div className="card text-center text-gray-500 py-12">
            <GraduationCap size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No education added yet. Click "Add Education" to get started!</p>
          </div>
        ) : (
          educations.map((edu) => (
            <div key={edu.id} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{edu.institution}</h3>
                      <p className="text-gray-600">{edu.degree} {edu.fieldOfStudy && `• ${edu.fieldOfStudy}`}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                    {edu.startDate && <span>📅 {edu.startDate} to {edu.endDate || 'Present'}</span>}
                    {edu.grade && <span>🏆 {edu.grade}</span>}
                    {!edu.isVisible && <span className="text-orange-500">👁️ Hidden</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Education;