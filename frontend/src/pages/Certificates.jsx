import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Award, Plus, Trash2, Edit, X, Save, ExternalLink, Upload } from 'lucide-react';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '', issuer: '', issueDate: '', expiryDate: '', credentialId: '', credentialUrl: '', fileUrl: '', fileType: 'pdf'
  });

  useEffect(() => { fetchCertificates(); }, []);

  const fetchCertificates = async () => {
    try { const res = await api.get('/certificates'); setCertificates(res.data); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await api.post('/files/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({...formData, fileUrl: res.data, fileType: file.name.split('.').pop()});
      alert('File uploaded successfully!');
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await api.put(`/certificates/${editingId}`, formData);
      else await api.post('/certificates', formData);
      setShowForm(false); setEditingId(null); resetForm(); fetchCertificates();
    } catch (err) { alert(err.response?.data?.message || 'Error saving certificate'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try { await api.delete(`/certificates/${id}`); fetchCertificates(); }
    catch (err) { alert('Error deleting'); }
  };

  const handleEdit = (cert) => {
    setFormData({
      title: cert.title, issuer: cert.issuer, issueDate: cert.issueDate || '',
      expiryDate: cert.expiryDate || '', credentialId: cert.credentialId || '',
      credentialUrl: cert.credentialUrl || '', fileUrl: cert.fileUrl || '', fileType: cert.fileType || 'pdf'
    });
    setEditingId(cert.id); setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', issuer: '', issueDate: '', expiryDate: '', credentialId: '', credentialUrl: '', fileUrl: '', fileType: 'pdf' });
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); resetForm(); }}
          className="btn-primary flex items-center gap-2">
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'Add Certificate'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3 className="font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Certificate</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input type="text" required className="input-field" value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="AWS Certified Developer" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Issuer *</label>
              <input type="text" required className="input-field" value={formData.issuer}
                onChange={(e) => setFormData({...formData, issuer: e.target.value})} placeholder="Amazon Web Services" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Issue Date</label>
              <input type="date" className="input-field" value={formData.issueDate}
                onChange={(e) => setFormData({...formData, issueDate: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input type="date" className="input-field" value={formData.expiryDate}
                onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Credential ID</label>
              <input type="text" className="input-field" value={formData.credentialId}
                onChange={(e) => setFormData({...formData, credentialId: e.target.value})} placeholder="ABC-123-XYZ" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Credential URL</label>
              <input type="url" className="input-field" value={formData.credentialUrl}
                onChange={(e) => setFormData({...formData, credentialUrl: e.target.value})}
                placeholder="https://www.credly.com/badges/..." />
            </div>

            {/* FILE UPLOAD SECTION */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Certificate File (PDF/Image)</label>
              <div className="flex items-center gap-3">
                <label className="btn-secondary flex items-center gap-2 cursor-pointer">
                  <Upload size={18} />
                  {uploading ? 'Uploading...' : 'Choose File'}
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload} disabled={uploading} />
                </label>
                {formData.fileUrl && (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    ✓ {formData.fileUrl.split('/').pop()}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Supported: PDF, JPG, PNG (Max 10MB)</p>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Save size={18} /> {editingId ? 'Update' : 'Save'} Certificate
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.length === 0 ? (
          <div className="card md:col-span-2 text-center text-gray-500 py-12">
            <Award size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No certificates added yet. Add your certifications to stand out!</p>
          </div>
        ) : (
          certificates.map((cert) => (
            <div key={cert.id} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg"><Award size={20} /></div>
                    <div>
                      <h3 className="font-semibold">{cert.title}</h3>
                      <p className="text-gray-600 text-sm">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-500 space-y-1">
                    {cert.issueDate && <p>📅 Issued: {cert.issueDate}</p>}
                    {cert.expiryDate && <p>⏰ Expires: {cert.expiryDate}</p>}
                    {cert.credentialId && <p>🆔 ID: {cert.credentialId}</p>}
                    {cert.fileUrl && (
                      <p className="text-xs bg-green-50 text-green-700 p-2 rounded mt-2">
                        📎 File: {cert.fileUrl.split('/').pop()}
                      </p>
                    )}
                    {cert.verificationHash && (
                      <p className="text-xs bg-gray-100 p-2 rounded mt-2 font-mono">🔒 {cert.verificationHash}</p>
                    )}
                  </div>
                  <div className="flex gap-3 mt-3">
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
                        <ExternalLink size={14} /> Verify
                      </a>
                    )}
                    {cert.fileUrl && (
                        <a
                            href={`http://localhost:9090${cert.fileUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-green-600 hover:underline"
                        >
                            <Upload size={14} /> View File
                        </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(cert)} className="p-2 text-gray-400 hover:text-blue-600"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(cert.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Certificates;