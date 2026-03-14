import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { moderationAPI } from '../services/api';

function Moderation() {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [research, setResearch] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRestrictModal, setShowRestrictModal] = useState(false);
  const [restrictItem, setRestrictItem] = useState(null);
  const [restrictReason, setRestrictReason] = useState('');

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const isAdmin = userData.isAdmin;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      alert('Access denied. Admin only.');
      navigate('/dashboard');
      return;
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [postsData, jobsData, researchData, eventsData] = await Promise.all([
        moderationAPI.getPosts(),
        moderationAPI.getJobs(),
        moderationAPI.getResearch(),
        moderationAPI.getEvents()
      ]);
      setPosts(postsData);
      setJobs(jobsData);
      setResearch(researchData);
      setEvents(eventsData);
    } catch (err) {
      console.error('Error fetching moderation data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovePost = async (postId) => {
    try {
      await moderationAPI.approvePost(postId);
      setPosts(posts.map(p => p._id === postId ? { ...p, isApproved: true, isRestricted: false } : p));
    } catch (err) {
      alert('Error approving post');
    }
  };

  const handleRestrictPost = async (postId) => {
    try {
      await moderationAPI.restrictPost(postId, restrictReason);
      setPosts(posts.map(p => p._id === postId ? { ...p, isApproved: false, isRestricted: true, restrictionReason } : p));
      setShowRestrictModal(false);
      setRestrictReason('');
    } catch (err) {
      alert('Error restricting post');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await moderationAPI.deletePost(postId);
      setPosts(posts.filter(p => p._id !== postId));
    } catch (err) {
      alert('Error deleting post');
    }
  };

  const handleApproveJob = async (jobId) => {
    try {
      await moderationAPI.approveJob(jobId);
      setJobs(jobs.map(j => j._id === jobId ? { ...j, isApproved: true } : j));
    } catch (err) {
      alert('Error approving job');
    }
  };

  const handleRestrictJob = async (jobId) => {
    try {
      await moderationAPI.restrictJob(jobId);
      setJobs(jobs.map(j => j._id === jobId ? { ...j, isApproved: false } : j));
    } catch (err) {
      alert('Error restricting job');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await moderationAPI.deleteJob(jobId);
      setJobs(jobs.filter(j => j._id !== jobId));
    } catch (err) {
      alert('Error deleting job');
    }
  };

  const handleApproveResearch = async (researchId) => {
    try {
      await moderationAPI.approveResearch(researchId);
      setResearch(research.map(r => r._id === researchId ? { ...r, isApproved: true } : r));
    } catch (err) {
      alert('Error approving research');
    }
  };

  const handleRestrictResearch = async (researchId) => {
    try {
      await moderationAPI.restrictResearch(researchId);
      setResearch(research.map(r => r._id === researchId ? { ...r, isApproved: false } : r));
    } catch (err) {
      alert('Error restricting research');
    }
  };

  const handleDeleteResearch = async (researchId) => {
    if (!confirm('Are you sure you want to delete this research?')) return;
    try {
      await moderationAPI.deleteResearch(researchId);
      setResearch(research.filter(r => r._id !== researchId));
    } catch (err) {
      alert('Error deleting research');
    }
  };

  const handleApproveEvent = async (eventId) => {
    try {
      await moderationAPI.approveEvent(eventId);
      setEvents(events.map(e => e._id === eventId ? { ...e, isApproved: true } : e));
    } catch (err) {
      alert('Error approving event');
    }
  };

  const handleRestrictEvent = async (eventId) => {
    try {
      await moderationAPI.restrictEvent(eventId);
      setEvents(events.map(e => e._id === eventId ? { ...e, isApproved: false } : e));
    } catch (err) {
      alert('Error restricting event');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await moderationAPI.deleteEvent(eventId);
      setEvents(events.filter(e => e._id !== eventId));
    } catch (err) {
      alert('Error deleting event');
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <div style={{ padding: '30px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '800', 
            marginBottom: '30px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#1A1A1A'
          }}>
            🛡️ MODERATION PANEL
          </h1>

          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginBottom: '30px',
            borderBottom: '2px solid rgba(220, 0, 0, 0.2)',
            paddingBottom: '10px'
          }}>
            {['posts', 'jobs', 'research', 'events'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 24px',
                  background: activeTab === tab ? 'var(--ferrari-red)' : 'rgba(220, 0, 0, 0.1)',
                  color: activeTab === tab ? 'white' : '#1A1A1A',
                  border: '2px solid rgba(220, 0, 0, 0.3)',
                  cursor: 'pointer',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading && <p>Loading...</p>}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>
                All Posts ({posts.length})
              </h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {posts.map((post) => (
                  <div key={post._id} style={{
                    background: post.isRestricted ? 'rgba(220, 0, 0, 0.1)' : 'rgba(220, 0, 0, 0.05)',
                    border: '2px solid rgba(220, 0, 0, 0.2)',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <div>
                        <p style={{ margin: '0 0 5px 0', fontWeight: '700' }}>{post.user?.name}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)' }}>
                          {post.user?.email} • {post.user?.role}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {!post.isApproved && (
                          <button
                            onClick={() => handleApprovePost(post._id)}
                            style={{
                              padding: '8px 16px',
                              background: 'rgba(0, 200, 83, 0.1)',
                              border: '1px solid #00C853',
                              color: '#00C853',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '11px',
                              textTransform: 'uppercase'
                            }}
                          >
                            APPROVE
                          </button>
                        )}
                        <button
                          onClick={() => { setRestrictItem(post); setShowRestrictModal(true); }}
                          style={{
                            padding: '8px 16px',
                            background: 'rgba(255, 165, 0, 0.1)',
                            border: '1px solid #FFA500',
                            color: '#FFA500',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '11px',
                            textTransform: 'uppercase'
                          }}
                        >
                          RESTRICT
                        </button>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          style={{
                            padding: '8px 16px',
                            background: 'rgba(220, 0, 0, 0.1)',
                            border: '1px solid var(--ferrari-red)',
                            color: 'var(--ferrari-red)',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '11px',
                            textTransform: 'uppercase'
                          }}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                    <p style={{ margin: '0 0 10px 0' }}>{post.content}</p>
                    {post.image && (
                      <img src={post.image} alt="Post" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    )}
                    {post.isRestricted && (
                      <p style={{ color: 'var(--ferrari-red)', fontSize: '12px', marginTop: '10px' }}>
                        ⚠️ Restricted: {post.restrictionReason}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>
                All Jobs ({jobs.length})
              </h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {jobs.map((job) => (
                  <div key={job._id} style={{
                    background: job.isApproved ? 'rgba(220, 0, 0, 0.05)' : 'rgba(220, 0, 0, 0.1)',
                    border: '2px solid rgba(220, 0, 0, 0.2)',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <div>
                        <h3 style={{ margin: '0 0 5px 0', fontWeight: '700' }}>{job.title}</h3>
                        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}>
                          {job.company} • {job.postedBy?.name}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {!job.isApproved && (
                          <button
                            onClick={() => handleApproveJob(job._id)}
                            style={{
                              padding: '8px 16px',
                              background: 'rgba(0, 200, 83, 0.1)',
                              border: '1px solid #00C853',
                              color: '#00C853',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '11px',
                              textTransform: 'uppercase'
                            }}
                          >
                            APPROVE
                          </button>
                        )}
                        <button
                          onClick={() => handleRestrictJob(job._id)}
                          style={{
                            padding: '8px 16px',
                            background: 'rgba(255, 165, 0, 0.1)',
                            border: '1px solid #FFA500',
                            color: '#FFA500',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '11px',
                            textTransform: 'uppercase'
                          }}
                        >
                          RESTRICT
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          style={{
                            padding: '8px 16px',
                            background: 'rgba(220, 0, 0, 0.1)',
                            border: '1px solid var(--ferrari-red)',
                            color: 'var(--ferrari-red)',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '11px',
                            textTransform: 'uppercase'
                          }}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                    <p style={{ margin: '0 0 10px 0' }}>{job.description.substring(0, 150)}...</p>
                    <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)' }}>
                      💼 {job.type} • {job.location} ({job.workMode})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Research Tab */}
          {activeTab === 'research' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>
                All Research Projects ({research.length})
              </h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {research.map((r) => (
                  <div key={r._id} style={{
                    background: r.isApproved ? 'rgba(220, 0, 0, 0.05)' : 'rgba(220, 0, 0, 0.1)',
                    border: '2px solid rgba(220, 0, 0, 0.2)',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <div>
                        <h3 style={{ margin: '0 0 5px 0', fontWeight: '700' }}>{r.title}</h3>
                        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}>
                          {r.facultyMember?.name} • {r.department}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {!r.isApproved && (
                          <button
                            onClick={() => handleApproveResearch(r._id)}
                            style={{
                              padding: '8px 16px',
                              background: 'rgba(0, 200, 83, 0.1)',
                              border: '1px solid #00C853',
                              color: '#00C853',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '11px',
                              textTransform: 'uppercase'
                            }}
                          >
                            APPROVE
                          </button>
                        )}
                        <button
                          onClick={() => handleRestrictResearch(r._id)}
                          style={{
                            padding: '8px 16px',
                            background: 'rgba(255, 165, 0, 0.1)',
                            border: '1px solid #FFA500',
                            color: '#FFA500',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '11px',
                            textTransform: 'uppercase'
                          }}
                        >
                          RESTRICT
                        </button>
                        <button
                          onClick={() => handleDeleteResearch(r._id)}
                          style={{
                            padding: '8px 16px',
                            background: 'rgba(220, 0, 0, 0.1)',
                            border: '1px solid var(--ferrari-red)',
                            color: 'var(--ferrari-red)',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '11px',
                            textTransform: 'uppercase'
                          }}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                    <p style={{ margin: '0 0 10px 0' }}>{r.description}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                      {r.skillsNeeded?.map((skill, index) => (
                        <span key={index} style={{
                          padding: '4px 10px',
                          background: 'rgba(220, 0, 0, 0.1)',
                          fontSize: '12px',
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

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>
                All Events ({events.length})
              </h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {events.map((event) => (
                  <div key={event._id} style={{
                    background: event.isApproved ? 'rgba(220, 0, 0, 0.05)' : 'rgba(220, 0, 0, 0.1)',
                    border: '2px solid rgba(220, 0, 0, 0.2)',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <div>
                        <h3 style={{ margin: '0 0 5px 0', fontWeight: '700' }}>{event.title}</h3>
                        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}>
                          {event.department} • {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {!event.isApproved && (
                          <button
                            onClick={() => handleApproveEvent(event._id)}
                            style={{
                              padding: '8px 16px',
                              background: 'rgba(0, 200, 83, 0.1)',
                              border: '1px solid #00C853',
                              color: '#00C853',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '11px',
                              textTransform: 'uppercase'
                            }}
                          >
                            APPROVE
                          </button>
                        )}
                        <button
                          onClick={() => handleRestrictEvent(event._id)}
                          style={{
                            padding: '8px 16px',
                            background: 'rgba(255, 165, 0, 0.1)',
                            border: '1px solid #FFA500',
                            color: '#FFA500',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '11px',
                            textTransform: 'uppercase'
                          }}
                        >
                          RESTRICT
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          style={{
                            padding: '8px 16px',
                            background: 'rgba(220, 0, 0, 0.1)',
                            border: '1px solid var(--ferrari-red)',
                            color: 'var(--ferrari-red)',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '11px',
                            textTransform: 'uppercase'
                          }}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                    <p style={{ margin: '0 0 10px 0' }}>{event.description}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)' }}>
                      📍 {event.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Restrict Modal */}
      {showRestrictModal && (
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
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            border: '3px solid var(--ferrari-red)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              marginBottom: '30px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              RESTRICT ITEM
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>
                Reason for Restriction *
              </label>
              <textarea
                value={restrictReason}
                onChange={(e) => setRestrictReason(e.target.value)}
                rows="4"
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

            <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
              <button
                onClick={() => handleRestrictPost(restrictItem?._id)}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: 'var(--ferrari-red)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '800',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                RESTRICT
              </button>
              <button
                onClick={() => { setShowRestrictModal(false); setRestrictReason(''); }}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Moderation;
