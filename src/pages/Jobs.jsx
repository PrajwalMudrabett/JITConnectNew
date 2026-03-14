import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { jobsAPI, announcementsAPI, researchAPI } from '../services/api';
import './jobs-page.css';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    workMode: '',
    search: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: 'full-time',
    location: '',
    workMode: 'on-site',
    description: '',
    requirements: '',
    salary: '',
    experience: '',
    skills: '',
    applicationLink: '',
    applicationEmail: '',
    deadline: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [researchOpportunities, setResearchOpportunities] = useState([]);
  const [showResearch, setShowResearch] = useState(false);

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const canPostJobs = userData.role === 'alumni' || userData.role === 'faculty';

  useEffect(() => {
    fetchJobs();
    fetchRecommendations();
    fetchResearchOpportunities();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobsAPI.getAll();
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const data = await announcementsAPI.getAll();
      if (Array.isArray(data)) {
        const jobAnnouncements = data.filter(ann => 
          ann.content?.toLowerCase().includes('job') || 
          ann.content?.toLowerCase().includes('opening') ||
          ann.content?.toLowerCase().includes('vacancy')
        );
        setRecommendations(jobAnnouncements);
        setShowRecommendations(jobAnnouncements.length > 0);
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    }
  };

  const fetchResearchOpportunities = async () => {
    try {
      const data = await researchAPI.getAll();
      if (Array.isArray(data)) {
        setResearchOpportunities(data);
        setShowResearch(data.length > 0);
      }
    } catch (err) {
      console.error('Error fetching research opportunities:', err);
    }
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }

    if (filters.workMode) {
      filtered = filtered.filter(job => job.workMode === filters.workMode);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredJobs(filtered);
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
      };

      await jobsAPI.create(jobData);
      alert('Job posted successfully!');
      setShowCreateModal(false);
      setFormData({
        title: '',
        company: '',
        type: 'full-time',
        location: '',
        workMode: 'on-site',
        description: '',
        requirements: '',
        salary: '',
        experience: '',
        skills: '',
        applicationLink: '',
        applicationEmail: '',
        deadline: ''
      });
      fetchJobs();
    } catch (err) {
      alert('Error posting job');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    if (!confirm('Are you sure you want to apply to this job?')) return;

    try {
      const data = await jobsAPI.apply(jobId);
      alert(data.message);
      fetchJobs();
    } catch (err) {
      alert('Error applying to job');
    }
  };

  const getJobTypeColor = (type) => {
    switch (type) {
      case 'full-time': return '#00C853';
      case 'part-time': return '#FFA500';
      case 'internship': return '#2196F3';
      case 'contract': return '#9C27B0';
      default: return '#666';
    }
  };

  const getWorkModeIcon = (mode) => {
    switch (mode) {
      case 'remote': return '🏠';
      case 'hybrid': return '🔄';
      case 'on-site': return '🏢';
      default: return '📍';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInMs = now - posted;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content" style={{ background: '#F3F2EF', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          {/* Header */}
          <div style={{ 
            background: 'white',
            padding: '24px',
            marginBottom: '16px',
            borderRadius: '8px',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h1 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                margin: 0,
                color: '#000000'
              }}>
                Jobs
              </h1>
              {canPostJobs && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  style={{
                    padding: '8px 16px',
                    background: '#0A66C2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#004182'}
                  onMouseLeave={(e) => e.target.style.background = '#0A66C2'}
                >
                  Post a job
                </button>
              )}
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search by title, skill, or company"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 16px 10px 40px',
                  border: '1px solid rgba(0,0,0,0.15)',
                  borderRadius: '4px',
                  background: '#EDF3F8',
                  fontSize: '14px',
                  fontWeight: '400',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.background = 'white'}
                onBlur={(e) => e.target.style.background = '#EDF3F8'}
              />
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🔍</span>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                style={{
                  padding: '8px 32px 8px 12px',
                  border: '1px solid rgba(0,0,0,0.6)',
                  borderRadius: '16px',
                  background: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: '#000000'
                }}
              >
                <option value="">Job type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
              <select
                value={filters.workMode}
                onChange={(e) => setFilters({ ...filters, workMode: e.target.value })}
                style={{
                  padding: '8px 32px 8px 12px',
                  border: '1px solid rgba(0,0,0,0.6)',
                  borderRadius: '16px',
                  background: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  color: '#000000'
                }}
              >
                <option value="">On-site/remote</option>
                <option value="on-site">On-site</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.6)', fontWeight: '400' }}>
              {filteredJobs.length} results
            </p>
          </div>

          {/* Role-Based Recommendations */}
          {showRecommendations && (
            <div style={{ 
              background: 'white', 
              padding: '24px', 
              marginBottom: '16px',
              borderRadius: '8px',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '16px',
                color: '#000000'
              }}>
                📢 RECOMMENDED ANNOUNCEMENTS
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {recommendations.map((ann) => (
                  <div key={ann._id} style={{ 
                    padding: '16px', 
                    background: 'rgba(220, 0, 0, 0.05)',
                    borderRadius: '6px',
                    border: '1px solid rgba(220, 0, 0, 0.1)'
                  }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
                      {ann.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
                      {ann.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Research Opportunities */}
          {showResearch && (
            <div style={{ 
              background: 'white', 
              padding: '24px', 
              marginBottom: '16px',
              borderRadius: '8px',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '16px',
                color: '#000000'
              }}>
                🔬 RESEARCH OPPORTUNITIES
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {researchOpportunities.map((research) => (
                  <div key={research._id} style={{ 
                    padding: '16px', 
                    background: 'rgba(220, 0, 0, 0.05)',
                    borderRadius: '6px',
                    border: '1px solid rgba(220, 0, 0, 0.1)'
                  }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
                      {research.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
                      {research.description}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                      {research.skillsNeeded?.slice(0, 3).map((skill, index) => (
                        <span key={index} style={{
                          padding: '4px 10px',
                          background: 'rgba(220, 0, 0, 0.1)',
                          fontSize: '11px',
                          fontWeight: '600',
                          color: 'var(--ferrari-red)',
                          borderRadius: '4px'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs List */}
          {loading ? (
            <div style={{ background: 'white', padding: '40px', textAlign: 'center', borderRadius: '8px', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}>
              <p style={{ color: 'rgba(0,0,0,0.6)' }}>Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div style={{
              background: 'white',
              textAlign: 'center',
              padding: '60px',
              borderRadius: '8px',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.08)'
            }}>
              <p style={{ fontSize: '48px', margin: '0 0 16px 0' }}>💼</p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: 'rgba(0, 0, 0, 0.9)', marginBottom: '8px' }}>
                No jobs found
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '8px' }}>
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  style={{
                    background: 'white',
                    padding: '20px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.08)';
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {/* Company Logo Placeholder */}
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      fontWeight: '700',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      {job.company.charAt(0).toUpperCase()}
                    </div>

                    {/* Job Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        margin: '0 0 4px 0',
                        color: '#0A66C2',
                        cursor: 'pointer'
                      }}>
                        {job.title}
                      </h3>
                      <p style={{ 
                        fontSize: '14px', 
                        fontWeight: '400', 
                        color: 'rgba(0,0,0,0.9)',
                        margin: '0 0 4px 0'
                      }}>
                        {job.company}
                      </p>
                      <p style={{ 
                        fontSize: '14px', 
                        color: 'rgba(0,0,0,0.6)',
                        margin: '0 0 8px 0',
                        fontWeight: '400'
                      }}>
                        {job.location} ({job.workMode})
                      </p>

                      {/* Job Type Badge */}
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{
                          padding: '4px 8px',
                          background: '#E7F3E7',
                          color: '#057642',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '4px'
                        }}>
                          {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace('-', ' ')}
                        </span>
                        {job.salary && (
                          <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.6)', fontWeight: '400' }}>
                            {job.salary}
                          </span>
                        )}
                      </div>

                      {/* Description Preview */}
                      <p style={{ 
                        margin: '8px 0', 
                        color: 'rgba(0, 0, 0, 0.6)',
                        lineHeight: '1.5',
                        fontSize: '14px',
                        fontWeight: '400'
                      }}>
                        {job.description.substring(0, 150)}...
                      </p>

                      {/* Skills */}
                      {job.skills && job.skills.length > 0 && (
                        <div style={{ margin: '12px 0', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {job.skills.slice(0, 4).map((skill, index) => (
                            <span
                              key={index}
                              style={{
                                padding: '4px 10px',
                                background: '#F3F2EF',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: 'rgba(0,0,0,0.9)',
                                borderRadius: '4px'
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 4 && (
                            <span style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '400', padding: '4px 0' }}>
                              +{job.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginTop: '12px',
                        paddingTop: '12px',
                        borderTop: '1px solid rgba(0,0,0,0.08)'
                      }}>
                        <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '400' }}>
                          Posted by {job.postedBy?.name}
                          {job.postedBy?.company && ` • ${job.postedBy.company}`}
                          {job.createdAt && ` • ${getTimeAgo(job.createdAt)}`}
                        </div>
                        {userData.role === 'student' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApply(job._id);
                            }}
                            disabled={job.applicants?.includes(userData._id)}
                            style={{
                              padding: '8px 20px',
                              background: job.applicants?.includes(userData._id) 
                                ? 'transparent' 
                                : '#0A66C2',
                              color: job.applicants?.includes(userData._id) ? '#0A66C2' : 'white',
                              border: job.applicants?.includes(userData._id) ? '1px solid #0A66C2' : 'none',
                              borderRadius: '16px',
                              cursor: job.applicants?.includes(userData._id) ? 'default' : 'pointer',
                              fontWeight: '600',
                              fontSize: '14px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (!job.applicants?.includes(userData._id)) {
                                e.target.style.background = '#004182';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!job.applicants?.includes(userData._id)) {
                                e.target.style.background = '#0A66C2';
                              }
                            }}
                          >
                            {job.applicants?.includes(userData._id) ? 'Applied' : 'Apply'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Job Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '3px solid var(--ferrari-red)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              marginBottom: '30px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              POST NEW JOB
            </h2>

            <form onSubmit={handleCreateJob}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid rgba(220, 0, 0, 0.3)',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                  Company *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid rgba(220, 0, 0, 0.3)',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                    Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid rgba(220, 0, 0, 0.3)',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                    Work Mode *
                  </label>
                  <select
                    required
                    value={formData.workMode}
                    onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid rgba(220, 0, 0, 0.3)',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    <option value="on-site">On-Site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid rgba(220, 0, 0, 0.3)',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                  Description *
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid rgba(220, 0, 0, 0.3)',
                    fontSize: '14px',
                    fontWeight: '600',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                  Requirements *
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid rgba(220, 0, 0, 0.3)',
                    fontSize: '14px',
                    fontWeight: '600',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                    Salary
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g., 5-8 LPA"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid rgba(220, 0, 0, 0.3)',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                    Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 0-2 years"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid rgba(220, 0, 0, 0.3)',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g., React, Node.js, MongoDB"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid rgba(220, 0, 0, 0.3)',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                  Application Link
                </label>
                <input
                  type="url"
                  value={formData.applicationLink}
                  onChange={(e) => setFormData({ ...formData, applicationLink: e.target.value })}
                  placeholder="https://..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid rgba(220, 0, 0, 0.3)',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                  Application Email
                </label>
                <input
                  type="email"
                  value={formData.applicationEmail}
                  onChange={(e) => setFormData({ ...formData, applicationEmail: e.target.value })}
                  placeholder="hr@company.com"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid rgba(220, 0, 0, 0.3)',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: 'var(--ferrari-red)',
                    color: 'white',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: '800',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {loading ? 'POSTING...' : 'POST JOB'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: 'rgba(0, 0, 0, 0.1)',
                    color: '#1A1A1A',
                    border: '2px solid rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    fontWeight: '800',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
