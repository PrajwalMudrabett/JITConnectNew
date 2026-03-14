import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { usersAPI, postsAPI, researchAPI } from '../services/api';

function Profile() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    branch: '',
    department: '',
    company: '',
    designation: '',
    usn: '',
    year: '',
    batch: '',
    experience: '',
    profilePic: ''
  });
  const [researchOpportunities, setResearchOpportunities] = useState([]);
  const [showResearch, setShowResearch] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
    if (user?.role === 'student') {
      fetchResearchOpportunities();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      setUser(userData);
      setEditForm({
        name: userData.name || '',
        bio: userData.bio || '',
        branch: userData.branch || '',
        department: userData.department || '',
        company: userData.company || '',
        designation: userData.designation || '',
        usn: userData.usn || '',
        year: userData.year || '',
        batch: userData.batch || '',
        experience: userData.experience || '',
        profilePic: userData.profilePic || ''
      });
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const data = await postsAPI.getAllPosts();
      const userData = JSON.parse(localStorage.getItem('userData'));
      const filtered = data.filter(post => post.user._id === userData._id);
      setUserPosts(filtered);
    } catch (err) {
      console.error('Error fetching posts:', err);
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

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const updatedUser = await usersAPI.updateProfile(editForm);
      
      // Update localStorage
      const userData = JSON.parse(localStorage.getItem('userData'));
      const newUserData = { ...userData, ...updatedUser };
      localStorage.setItem('userData', JSON.stringify(newUserData));
      
      setUser(newUserData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.deletePost(postId);
        setUserPosts(userPosts.filter(post => post._id !== postId));
        alert('Post deleted successfully!');
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post');
      }
    }
  };

  if (!user) return null;

  return (
    <div className="page-profile">
      <div className="background-wrapper">
        <div className="overlay"></div>
      </div>

      <div className="dashboard-container">
        <Sidebar />

        <main className="feed" style={{ gridColumn: 'span 2' }}>
          {/* Profile Header */}
          <div className="profile-header" style={{ 
            background: 'rgba(255, 255, 255, 0.92)', 
            backdropFilter: 'blur(10px)', 
            border: '2px solid rgba(220, 0, 0, 0.2)', 
            padding: '40px', 
            marginBottom: '30px', 
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            position: 'relative'
          }}>
            {/* Cover Image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '150px',
              background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.2) 0%, rgba(220, 0, 0, 0.05) 100%)',
              borderBottom: '2px solid rgba(220, 0, 0, 0.3)'
            }}></div>

            <div style={{ position: 'relative', paddingTop: '80px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px' }}>
                {/* Profile Picture */}
                <div style={{ position: 'relative' }}>
                  <div className="avatar" style={{ 
                    width: '150px', 
                    height: '150px', 
                    fontSize: '60px',
                    border: '5px solid rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                    background: editForm.profilePic ? `url(${editForm.profilePic})` : 'linear-gradient(135deg, var(--ferrari-red) 0%, #FF0000 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                    {!editForm.profilePic && user.name.charAt(0).toUpperCase()}
                  </div>
                  {isEditing && (
                    <label style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: 'var(--ferrari-red)',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '18px',
                      boxShadow: '0 5px 15px rgba(220, 0, 0, 0.5)'
                    }}>
                      📷
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  )}
                </div>

                {/* Profile Info */}
                <div style={{ flex: 1 }}>
                  {!isEditing ? (
                    <>
                      <h2 style={{ 
                        fontSize: '32px', 
                        fontWeight: '900', 
                        marginBottom: '10px',
                        color: '#1A1A1A'
                      }}>
                        {user.name}
                        <span className={`role-badge ${user.role}`} style={{ 
                          marginLeft: '15px',
                          fontSize: '14px',
                          padding: '6px 16px'
                        }}>
                          {user.role.toUpperCase()}
                        </span>
                      </h2>
                      
                      <div style={{ marginBottom: '20px', color: 'rgba(0, 0, 0, 0.7)' }}>
                        {user.role === 'student' && (
                          <p style={{ fontSize: '16px', marginBottom: '5px' }}>
                            <strong>USN:</strong> {user.usn} | <strong>Branch:</strong> {user.branch} | <strong>Year:</strong> {user.year}
                          </p>
                        )}
                        {user.role === 'faculty' && (
                          <p style={{ fontSize: '16px', marginBottom: '5px' }}>
                            <strong>Department:</strong> {user.department} | <strong>Designation:</strong> {user.designation} | <strong>Experience:</strong> {user.experience}
                          </p>
                        )}
                        {user.role === 'alumni' && (
                          <p style={{ fontSize: '16px', marginBottom: '5px' }}>
                            <strong>Batch:</strong> {user.batch} | <strong>Branch:</strong> {user.branch} | <strong>Company:</strong> {user.company} | <strong>Designation:</strong> {user.designation}
                          </p>
                        )}
                        {user.role === 'department' && (
                          <p style={{ fontSize: '16px', marginBottom: '5px' }}>
                            <strong>Department:</strong> {user.deptName || user.department}
                          </p>
                        )}
                      </div>

                      <p style={{ 
                        fontSize: '15px', 
                        lineHeight: '1.8',
                        color: 'rgba(0, 0, 0, 0.8)',
                        marginBottom: '20px'
                      }}>
                        {user.bio || 'No bio added yet.'}
                      </p>

                      <button 
                        className="btn-primary" 
                        style={{ width: 'auto', padding: '12px 30px', margin: 0 }}
                        onClick={() => setIsEditing(true)}
                      >
                        EDIT PROFILE
                      </button>
                    </>
                  ) : (
                    <div>
                      <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px', color: '#1A1A1A' }}>
                        EDIT PROFILE
                      </h2>
                      
                      <div style={{ display: 'grid', gap: '15px' }}>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          style={{
                            padding: '12px 16px',
                            border: '2px solid rgba(220, 0, 0, 0.2)',
                            background: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '15px',
                            fontFamily: 'Montserrat'
                          }}
                        />

                        <textarea
                          name="bio"
                          placeholder="Bio"
                          value={editForm.bio}
                          onChange={handleEditChange}
                          rows="3"
                          style={{
                            padding: '12px 16px',
                            border: '2px solid rgba(220, 0, 0, 0.2)',
                            background: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '15px',
                            fontFamily: 'Montserrat',
                            resize: 'vertical'
                          }}
                        />

                        {user.role === 'student' && (
                          <>
                            <input type="text" name="usn" placeholder="USN" value={editForm.usn} onChange={handleEditChange} style={{ padding: '12px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', fontFamily: 'Montserrat' }} />
                            <input type="text" name="branch" placeholder="Branch" value={editForm.branch} onChange={handleEditChange} style={{ padding: '12px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', fontFamily: 'Montserrat' }} />
                            <input type="text" name="year" placeholder="Year" value={editForm.year} onChange={handleEditChange} style={{ padding: '12px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', fontFamily: 'Montserrat' }} />
                          </>
                        )}

                        {user.role === 'faculty' && (
                          <>
                            <input type="text" name="department" placeholder="Department" value={editForm.department} onChange={handleEditChange} style={{ padding: '12px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', fontFamily: 'Montserrat' }} />
                            <input type="text" name="designation" placeholder="Designation" value={editForm.designation} onChange={handleEditChange} style={{ padding: '12px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', fontFamily: 'Montserrat' }} />
                            <input type="text" name="experience" placeholder="Experience" value={editForm.experience} onChange={handleEditChange} style={{ padding: '12px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', fontFamily: 'Montserrat' }} />
                          </>
                        )}

                        {user.role === 'alumni' && (
                          <>
                            <input type="text" name="batch" placeholder="Batch" value={editForm.batch} onChange={handleEditChange} style={{ padding: '12px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', fontFamily: 'Montserrat' }} />
                            <input type="text" name="branch" placeholder="Branch" value={editForm.branch} onChange={handleEditChange} style={{ padding: '12px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', fontFamily: 'Montserrat' }} />
                            <input type="text" name="company" placeholder="Company" value={editForm.company} onChange={handleEditChange} style={{ padding: '12px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', fontFamily: 'Montserrat' }} />
                            <input type="text" name="designation" placeholder="Designation" value={editForm.designation} onChange={handleEditChange} style={{ padding: '12px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', fontFamily: 'Montserrat' }} />
                          </>
                        )}

                        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                          <button 
                            className="btn-primary" 
                            style={{ width: 'auto', padding: '12px 30px', margin: 0 }}
                            onClick={handleSaveProfile}
                            disabled={loading}
                          >
                            {loading ? 'SAVING...' : 'SAVE CHANGES'}
                          </button>
                          <button 
                            className="btn-secondary" 
                            style={{ padding: '12px 30px' }}
                            onClick={() => setIsEditing(false)}
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* User Posts */}
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.92)', 
            backdropFilter: 'blur(10px)', 
            border: '2px solid rgba(220, 0, 0, 0.2)', 
            padding: '30px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
          }}>
            <h3 style={{ 
              marginBottom: '30px', 
              fontWeight: '800', 
              letterSpacing: '1px', 
              textTransform: 'uppercase',
              color: '#1A1A1A'
            }}>
              MY POSTS ({userPosts.length})
            </h3>

            {userPosts.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px', color: 'rgba(0, 0, 0, 0.6)' }}>
                No posts yet. Go to Dashboard to create your first post!
              </p>
            ) : (
              userPosts.map(post => (
                <div key={post._id} style={{ 
                  padding: '25px', 
                  marginBottom: '20px', 
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(220, 0, 0, 0.2)',
                  position: 'relative'
                }}>
                  <div style={{ marginBottom: '15px' }}>
                    <span className={`role-badge ${post.category}`} style={{ fontSize: '10px', padding: '4px 10px' }}>
                      {post.category.toUpperCase()}
                    </span>
                    <span style={{ marginLeft: '10px', fontSize: '12px', color: 'rgba(0, 0, 0, 0.5)' }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#1A1A1A' }}>{post.content}</p>
                    {post.image && <img src={post.image} alt="Post" className="post-image" />}
                  </div>
                  <div className="post-interactions">
                    <button className="interaction-btn">❤️ {post.likes.length} Likes</button>
                    <button className="interaction-btn">💬 {post.comments.length} Comments</button>
                    <button 
                      className="interaction-btn" 
                      style={{ color: 'var(--ferrari-red)' }}
                      onClick={() => handleDeletePost(post._id)}
                    >
                      🗑️ DELETE
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Research Opportunities for Students */}
          {showResearch && user.role === 'student' && (
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.92)', 
              backdropFilter: 'blur(10px)', 
              border: '2px solid rgba(220, 0, 0, 0.2)', 
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
              marginTop: '20px'
            }}>
              <h3 style={{ 
                marginBottom: '20px', 
                fontWeight: '800', 
                letterSpacing: '1px', 
                textTransform: 'uppercase',
                color: '#1A1A1A'
              }}>
                🔬 RESEARCH OPPORTUNITIES
              </h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {researchOpportunities.map((research) => (
                  <div key={research._id} style={{ 
                    padding: '20px', 
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid rgba(220, 0, 0, 0.1)',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '700', color: '#1A1A1A' }}>
                      {research.title}
                    </h4>
                    <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: 'rgba(0, 0, 0, 0.7)' }}>
                      {research.description}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      {research.skillsNeeded?.map((skill, index) => (
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
                    <p style={{ margin: 0, fontSize: '12px', color: 'rgba(0, 0, 0, 0.5)' }}>
                      <strong>Faculty:</strong> {research.facultyMember?.name || 'Unknown'}
                      {research.facultyMember?.department && ` • ${research.facultyMember.department}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Profile;
