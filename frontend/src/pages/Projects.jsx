import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import {
  FolderGit,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ExternalLink,
  Github
} from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveUrl: ''
    });

    setEditingId(null);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, formData);
      } else {
        await api.post('/projects', formData);
      }

      fetchProjects();
      resetForm();

      alert(editingId ? 'Project updated!' : 'Project added!');
    } catch (err) {
      console.error(err);
      alert('Error saving project');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || '',
      description: project.description || '',
      technologies: project.technologies || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || ''
    });

    setEditingId(project.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;

    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Error deleting project');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>

        <button
          onClick={() => {
            resetForm();
            setIsEditing(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {isEditing && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {editingId ? 'Edit Project' : 'Add Project'}
            </h2>

            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Title
              </label>

              <input
                type="text"
                className="input-field"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>

              <textarea
                rows={4}
                className="input-field"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value
                  })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Technologies
              </label>

              <input
                type="text"
                className="input-field"
                placeholder="React, Spring Boot, MySQL"
                value={formData.technologies}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    technologies: e.target.value
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                GitHub URL
              </label>

              <input
                type="url"
                className="input-field"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    githubUrl: e.target.value
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Live URL
              </label>

              <input
                type="url"
                className="input-field"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    liveUrl: e.target.value
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <Save size={18} />
              {editingId ? 'Update Project' : 'Save Project'}
            </button>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <div className="card text-center py-10">
            <FolderGit className="mx-auto mb-3 text-gray-400" size={40} />
            <p className="text-gray-500">No projects added yet.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {project.description}
                  </p>

                  {project.technologies && (
                    <div className="mt-3">
                      <span className="text-sm font-medium">
                        Technologies:
                      </span>

                      <p className="text-sm text-gray-600">
                        {project.technologies}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4 mt-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <Github size={16} />
                        GitHub
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-green-600 hover:underline"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
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

export default Projects;