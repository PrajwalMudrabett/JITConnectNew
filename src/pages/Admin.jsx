import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
    priority: 'medium',
    targetRoles: ['student', 'faculty', 'alumni', 'department']
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const isAdmin = userData.isAdmin;

  useEffect(() => {
    if (!isAdmin) {
      alert('Access denied. Admin only.');
      navigate('/dashboard');
      return;
    }
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    else if (activeTab === 'posts') fetchPosts();
    else if (activeTab === 'analytics') fetchAnalytics();
    else if (activeTab === 'announcements') fetchAnnouncements();
  }, [activeTab]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/stats', {
        headers: { Authorization: `Bearer ${userData.token}` }
      });
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${userData.token}` }
      });
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/posts', {
        headers: { Authorization: `Bearer ${userData.token}` }
      });
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/analytics', {
        headers: { Authorization: `Bearer ${userData.token}` }
      });
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This will delete all their posts, messages, and notifications.')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${userData.token}` }
      });
      const data = await response.json();
      alert(data.message);
      fetchUsers();
    } catch (err) {
      alert('Error deleting user');
    }
  };

  const handleBanUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/ban`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${userData.token}` }
      });
      const data = await response.json();
      alert(data.message);
      fetchUsers();
    } catch (err) {
      alert('Error banning/unbanning user');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/posts/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${userData.token}` }
      });
      const data = await response.json();
      alert(data.message);
      fetchPosts();
    } catch (err) {
      alert('Error deleting post');
    }
  };

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/announcements', {
        headers: { Authorization: `Bearer ${userData.token}` }
      });
      const data = await response.json();
      setAnnouncements(data);
    } catch (err) {
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        },
        body: JSON.stringify(announcementForm)
      });
      const data = await response.json();
      alert('Announcement created successfully!');
      setShowAnnouncementModal(false);
      setAnnouncementForm({ title: '', content: '', priority: 'medium', targetRoles: ['student', 'faculty', 'alumni', 'department'] });
      fetchAnnouncements();
    } catch (err) {
      alert('Error creating announcement');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/announcements/${announcementId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${userData.token}` }
      });
      const data = await response.json();
      alert(data.message);
      fetchAnnouncements();
    } catch (err) {
      alert('Error deleting announcement');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#DC0000';
      case 'high': return '#FF6B00';
      case 'medium': return '#FFA500';
      case 'low': return '#00C853';
      default: return '#666';
    }
  };

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
            ⚙️ ADMIN PANEL
          </h1>

          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginBottom: '30px',
            borderBottom: '2px solid rgba(220, 0, 0, 0.2)',
            paddingBottom: '10px'
          }}>
            {['dashboard', 'users', 'posts', 'announcements', 'analytics'].map((tab) => (
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

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && stats && (
            <div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '20px',
                marginBottom: '40px'
              }}>
                <div style={{
                  background: 'rgba(220, 0, 0, 0.05)',
                  border: '2px solid rgba(220, 0, 0, 0.2)',
                  padding: '30px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 10px 0', color: 'var(--ferrari-red)' }}>
                    {stats.totalUsers}
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Total Users
                  </p>
                </div>
                <div style={{
                  background: 'rgba(220, 0, 0, 0.05)',
                  border: '2px solid rgba(220, 0, 0, 0.2)',
                  padding: '30px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 10px 0', color: 'var(--ferrari-red)' }}>
                    {stats.totalPosts}
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Total Posts
                  </p>
                </div>
                <div style={{
                  background: 'rgba(220, 0, 0, 0.05)',
                  border: '2px solid rgba(220, 0, 0, 0.2)',
                  padding: '30px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 10px 0', color: 'var(--ferrari-red)' }}>
                    {stats.totalMessages}
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Total Messages
                  </p>
                </div>
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>
                Users by Role
              </h2>
              <div style={{ marginBottom: '40px' }}>
                {stats.usersByRole.map((role) => (
                  <div key={role._id} style={{ 
                    padding: '15px', 
                    background: 'rgba(220, 0, 0, 0.05)',
                    border: '1px solid rgba(220, 0, 0, 0.2)',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: '700', textTransform: 'uppercase' }}>{role._id}</span>
                    <span style={{ fontWeight: '800', color: 'var(--ferrari-red)' }}>{role.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>
                All Users ({users.length})
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(220, 0, 0, 0.1)', borderBottom: '2px solid rgba(220, 0, 0, 0.3)' }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px' }}>Name</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px' }}>Email</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px' }}>Role</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px' }}>Status</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} style={{ borderBottom: '1px solid rgba(220, 0, 0, 0.1)' }}>
                        <td style={{ padding: '15px' }}>{user.name}</td>
                        <td style={{ padding: '15px' }}>{user.email}</td>
                        <td style={{ padding: '15px', textTransform: 'uppercase', fontWeight: '700' }}>{user.role}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            padding: '4px 12px',
                            background: user.isBanned ? 'rgba(220, 0, 0, 0.1)' : 'rgba(0, 200, 83, 0.1)',
                            color: user.isBanned ? 'var(--ferrari-red)' : '#00C853',
                            fontWeight: '700',
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {user.isBanned ? 'BANNED' : 'ACTIVE'}
                          </span>
                        </td>
                        <td style={{ padding: '15px' }}>
                          <button
                            onClick={() => handleBanUser(user._id)}
                            style={{
                              padding: '8px 16px',
                              background: user.isBanned ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 165, 0, 0.1)',
                              border: `1px solid ${user.isBanned ? '#00C853' : '#FFA500'}`,
                              color: user.isBanned ? '#00C853' : '#FFA500',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '11px',
                              textTransform: 'uppercase',
                              marginRight: '10px'
                            }}
                          >
                            {user.isBanned ? 'UNBAN' : 'BAN'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>
                All Posts ({posts.length})
              </h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {posts.map((post) => (
                  <div key={post._id} style={{
                    background: 'rgba(220, 0, 0, 0.05)',
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
                          textTransform: 'uppercase',
                          height: 'fit-content'
                        }}
                      >
                        DELETE
                      </button>
                    </div>
                    <p style={{ margin: '0 0 10px 0' }}>{post.content}</p>
                    {post.image && (
                      <img src={post.image} alt="Post" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    )}
                    <div style={{ marginTop: '10px', fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)' }}>
                      ❤️ {post.likes?.length || 0} • 💬 {post.comments?.length || 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && analytics && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>
                Posts by Category
              </h2>
              <div style={{ marginBottom: '40px' }}>
                {analytics.postsByCategory.map((cat) => (
                  <div key={cat._id} style={{ 
                    padding: '15px', 
                    background: 'rgba(220, 0, 0, 0.05)',
                    border: '1px solid rgba(220, 0, 0, 0.2)',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: '700', textTransform: 'uppercase' }}>{cat._id || 'UNCATEGORIZED'}</span>
                    <span style={{ fontWeight: '800', color: 'var(--ferrari-red)' }}>{cat.count}</span>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>
                Most Active Users
              </h2>
              <div style={{ marginBottom: '40px' }}>
                {analytics.mostActiveUsers.map((user, index) => (
                  <div key={user._id} style={{ 
                    padding: '15px', 
                    background: 'rgba(220, 0, 0, 0.05)',
                    border: '1px solid rgba(220, 0, 0, 0.2)',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{ fontWeight: '800', marginRight: '10px', color: 'var(--ferrari-red)' }}>#{index + 1}</span>
                      <span style={{ fontWeight: '700' }}>{user.name}</span>
                      <span style={{ marginLeft: '10px', fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)' }}>
                        {user.email}
                      </span>
                    </div>
                    <span style={{ fontWeight: '800', color: 'var(--ferrari-red)' }}>{user.postCount} posts</span>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>
                Posts Per Day (Last 7 Days)
              </h2>
              <div>
                {analytics.postsPerDay.map((day) => (
                  <div key={day._id} style={{ 
                    padding: '15px', 
                    background: 'rgba(220, 0, 0, 0.05)',
                    border: '1px solid rgba(220, 0, 0, 0.2)',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: '700' }}>{day._id}</span>
                    <span style={{ fontWeight: '800', color: 'var(--ferrari-red)' }}>{day.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Admin;
