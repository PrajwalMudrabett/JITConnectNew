import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { usersAPI } from '../services/api';

function Connections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const data = await usersAPI.getConnections();
      if (Array.isArray(data)) {
        setConnections(data);
      }
    } catch (err) {
      console.error('Error fetching connections:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = (userId) => {
    navigate('/messages', { state: { selectedUserId: userId } });
  };

  return (
    <div className="page-connections">
      <div className="background-wrapper">
        <div className="overlay"></div>
      </div>

      <div className="dashboard-container">
        <Sidebar />

        <main className="feed" style={{ gridColumn: 'span 2' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', border: '2px solid rgba(220, 0, 0, 0.2)', padding: '30px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)' }}>
            <h2 style={{ marginBottom: '30px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1A1A' }}>
              MY CONNECTIONS ({connections.length})
            </h2>
            {loading ? (
              <p style={{ textAlign: 'center', padding: '40px', color: 'rgba(0, 0, 0, 0.6)' }}>Loading connections...</p>
            ) : connections.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px', color: 'rgba(0, 0, 0, 0.6)' }}>
                No connections yet. Go to Explore to connect with people!
              </p>
            ) : (
              connections.map((conn) => (
                <div key={conn._id} className="suggestion-item" style={{ marginBottom: '16px' }}>
                  <div className="avatar-sm">{conn.name.charAt(0).toUpperCase()}</div>
                  <div className="suggestion-info">
                    <h4>{conn.name}</h4>
                    <p>
                      <span className={`role-badge ${conn.role}`}>{conn.role}</span>
                      {' '}
                      {conn.role === 'student' && `${conn.branch} • ${conn.year}`}
                      {conn.role === 'faculty' && `${conn.department} • ${conn.designation}`}
                      {conn.role === 'alumni' && `${conn.company} • ${conn.designation}`}
                      {conn.role === 'department' && conn.deptName}
                    </p>
                  </div>
                  <button className="btn-connect" onClick={() => handleMessage(conn._id)}>MESSAGE</button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Connections;
