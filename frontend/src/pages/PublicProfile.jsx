import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import {
  Mail, MapPin, Phone, Github, GraduationCap, Briefcase,
  Code, FolderGit, Award, Star, ExternalLink, Download
} from 'lucide-react';

const PublicProfile = () => {
  const { slug } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPublicProfile();
  }, [slug]);

  const fetchPublicProfile = async () => {
    try {
      const res = await api.get(`/public/profile/${slug}`);
      setProfile(res.data);
    } catch (err) {
      setError('Profile not found or is private');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-400">{error}</h1>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-blue-600 shadow-lg">
              {profile?.fullName?.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{profile?.fullName}</h1>
              <p className="text-blue-100 text-lg mt-1">{profile?.headline || 'Aspiring Developer'}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-blue-100">
                {profile?.location && <span className="flex items-center gap-1"><MapPin size={14} /> {profile.location}</span>}
                {profile?.email && <span className="flex items-center gap-1"><Mail size={14} /> {profile.email}</span>}
                {profile?.githubUsername && (
                  <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-white">
                    <Github size={14} /> @{profile.githubUsername}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Summary */}
        {profile?.summary && (
          <section className="card">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">{profile.summary}</p>
          </section>
        )}

        {/* Skills */}
        {profile?.skills?.length > 0 && (
          <section className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code size={20} className="text-purple-600" /> Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(skill => (
                <div key={skill.id} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <span className="font-medium text-sm">{skill.skillName}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} size={12} className={star <= skill.proficiencyLevel ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {profile?.experiences?.length > 0 && (
          <section className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase size={20} className="text-green-600" /> Experience
            </h2>
            <div className="space-y-4">
              {profile.experiences.map(exp => (
                <div key={exp.id} className="border-l-2 border-green-200 pl-4">
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company} • {exp.employmentType}</p>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                  {exp.description && <p className="text-gray-600 text-sm mt-2">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {profile?.educations?.length > 0 && (
          <section className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <GraduationCap size={20} className="text-blue-600" /> Education
            </h2>
            <div className="space-y-4">
              {profile.educations.map(edu => (
                <div key={edu.id} className="border-l-2 border-blue-200 pl-4">
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-gray-600">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                  <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  {edu.grade && <p className="text-sm text-green-600 font-medium">Grade: {edu.grade}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {profile?.projects?.length > 0 && (
          <section className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FolderGit size={20} className="text-orange-600" /> Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.projects.map(proj => (
                <div key={proj.id} className={`border rounded-lg p-4 ${proj.isFeatured ? 'border-orange-300 bg-orange-50' : 'border-gray-200'}`}>
                  <h3 className="font-semibold">{proj.title}</h3>
                  {proj.isFeatured && <span className="text-xs text-orange-600 font-medium">⭐ Featured</span>}
                  <p className="text-gray-600 text-sm mt-2">{proj.description}</p>
                  {proj.technologies && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{tech.trim()}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3 mt-3">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                        <Github size={14} /> Code
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:underline flex items-center gap-1">
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {profile?.certificates?.length > 0 && (
          <section className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award size={20} className="text-red-600" /> Certificates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.certificates.map(cert => (
                <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold">{cert.title}</h3>
                  <p className="text-gray-600 text-sm">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">Issued: {cert.issueDate}</p>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-2 inline-flex items-center gap-1">
                      <ExternalLink size={14} /> Verify
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm py-8">
          <p>🎓 Built with Competency Passport</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;