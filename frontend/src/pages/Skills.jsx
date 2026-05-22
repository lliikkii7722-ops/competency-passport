import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Code, Plus, Trash2, Edit, X, Save, Star } from 'lucide-react';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    skillName: '', category: 'Technical', proficiencyLevel: 3, source: 'self_assessed'
  });

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = async () => {
    try { const res = await api.get('/skills'); setSkills(res.data); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await api.put(`/skills/${editingId}`, formData);
      else await api.post('/skills', formData);
      setShowForm(false); setEditingId(null); resetForm(); fetchSkills();
    } catch (err) { alert(err.response?.data?.message || 'Error saving skill'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try { await api.delete(`/skills/${id}`); fetchSkills(); }
    catch (err) { alert('Error deleting'); }
  };

  const handleEdit = (skill) => {
    setFormData({
      skillName: skill.skillName, category: skill.category,
      proficiencyLevel: skill.proficiencyLevel, source: skill.source
    });
    setEditingId(skill.id); setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ skillName: '', category: 'Technical', proficiencyLevel: 3, source: 'self_assessed' });
  };

  const getProficiencyColor = (level) => {
    if (level <= 2) return 'bg-yellow-500';
    if (level <= 3) return 'bg-blue-500';
    if (level <= 4) return 'bg-indigo-500';
    return 'bg-green-500';
  };

  const categories = [...new Set(skills.map(s => s.category))];

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Skills</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); resetForm(); }}
          className="btn-primary flex items-center gap-2">
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'Add Skill'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3 className="font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Skill</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Skill Name *</label>
              <input type="text" required className="input-field" value={formData.skillName}
                onChange={(e) => setFormData({...formData, skillName: e.target.value})} placeholder="Java" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="input-field" value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option>Technical</option><option>Soft Skill</option><option>Tool</option><option>Language</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Proficiency (1-5)</label>
              <input type="range" min="1" max="5" className="w-full" value={formData.proficiencyLevel}
                onChange={(e) => setFormData({...formData, proficiencyLevel: parseInt(e.target.value)})} />
              <div className="text-center text-sm text-gray-600 mt-1">{formData.proficiencyLevel}/5</div>
            </div>
            <div className="md:col-span-3">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Save size={18} /> {editingId ? 'Update' : 'Save'} Skill
              </button>
            </div>
          </form>
        </div>
      )}

      {skills.length === 0 ? (
        <div className="card text-center text-gray-500 py-12">
          <Code size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No skills added yet. Click "Add Skill" to get started!</p>
        </div>
      ) : (
        categories.map(cat => (
          <div key={cat} className="card">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Code size={20} className="text-purple-600" /> {cat}
            </h3>
            <div className="space-y-3">
              {skills.filter(s => s.category === cat).map(skill => (
                <div key={skill.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{skill.skillName}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} size={14} className={star <= skill.proficiencyLevel ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <button onClick={() => handleEdit(skill)} className="text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(skill.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full transition-all ${getProficiencyColor(skill.proficiencyLevel)}`}
                        style={{ width: `${skill.proficiencyLevel * 20}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Skills;