import { useState } from 'react';
import api from '../api/axiosConfig';
import { Search, TrendingUp, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';

const SkillGap = () => {
  const [formData, setFormData] = useState({
    targetRole: '',
    targetCompany: '',
    jobDescription: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ SAFE ARRAY PARSER - handles string or array from backend
  const safeArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'string') {
      return data.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/ai/skill-gap', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">AI Skill Gap Analyzer</h1>
        <p className="text-gray-600">Paste a job description to see how you match up!</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Target Role</label>
              <input
                type="text"
                className="input-field"
                value={formData.targetRole}
                onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
                placeholder="Software Engineer"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Target Company</label>
              <input
                type="text"
                className="input-field"
                value={formData.targetCompany}
                onChange={(e) => setFormData({...formData, targetCompany: e.target.value})}
                placeholder="Google"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Job Description *</label>
            <textarea
              className="input-field"
              rows={8}
              required
              value={formData.jobDescription}
              onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
              placeholder="Paste the full job description here..."
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
            {loading ? 'Analyzing...' : <><Search size={18} /> Analyze My Profile</>}
          </button>
        </form>
      </div>

      {result && (
        <div className="space-y-4">
          {/* Match Score */}
          <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-600" /> Match Score
                </h2>
                <p className="text-gray-600 mt-1">{result.targetRole} at {result.targetCompany}</p>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold ${
                  result.matchPercentage >= 70 ? 'text-green-600' :
                  result.matchPercentage >= 40 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {result.matchPercentage}%
                </div>
                <p className="text-sm text-gray-500">Match</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div className={`h-3 rounded-full transition-all ${
                result.matchPercentage >= 70 ? 'bg-green-500' :
                result.matchPercentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`} style={{ width: `${result.matchPercentage}%` }} />
            </div>
            {result.overallFeedback && (
              <p className="mt-3 text-gray-700">{result.overallFeedback}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matched Skills */}
            <div className="card border-green-200">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-700">
                <CheckCircle size={18} />
                Matched Skills ({safeArray(result.matchedSkills).length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {safeArray(result.matchedSkills).length > 0 ? (
                  safeArray(result.matchedSkills).map((skill, i) => (
                    <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      ✓ {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No matched skills found</p>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="card border-red-200">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-red-700">
                <AlertTriangle size={18} />
                Missing Skills ({safeArray(result.missingSkills).length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {safeArray(result.missingSkills).length > 0 ? (
                  safeArray(result.missingSkills).map((skill, i) => (
                    <span key={i} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      ✗ {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No missing skills - you're fully prepared!</p>
                )}
              </div>
            </div>
          </div>

          {/* Suggested Courses */}
          {safeArray(result.missingSkills).length > 0 && (
            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-purple-600" /> Recommended Learning Path
              </h3>
              <div className="space-y-3">
                {safeArray(result.suggestedCourses).slice(0, 5).map((course, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <p className="font-medium">{course}</p>
                      <p className="text-sm text-gray-500">Online Course • Self-paced</p>
                    </div>
                    <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      Priority {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillGap;