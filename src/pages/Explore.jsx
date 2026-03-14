import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { usersAPI, eventsAPI } from '../services/api';

function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allPeople, setAllPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await usersAPI.getAllUsers();
      if (Array.isArray(data)) {
        setAllPeople(data);
        setFilteredPeople(data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await eventsAPI.getAll();
      if (Array.isArray(data)) {
        setEvents(data);
        setShowEvents(data.length > 0);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length < 2) {
      setFilteredPeople(allPeople);
      return;
    }

    const filtered = allPeople.filter(person =>
      person.name.toLowerCase().includes(query) ||
      (person.email && person.email.toLowerCase().includes(query)) ||
      (person.branch && person.branch.toLowerCase().includes(query)) ||
      (person.department && person.department.toLowerCase().includes(query)) ||
      (person.company && person.company.toLowerCase().includes(query))
    );
    setFilteredPeople(filtered);
  };

  const handleConnect = async (userId) => {
    setLoading(true);
    try {
      await usersAPI.sendConnectionRequest(userId);
      alert('Connection request sent successfully!');
    } catch (err) {
      console.error('Error sending connection request:', err);
      alert('Failed to send connection request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-explore">
      <div className="background-wrapper">
        <div className="overlay"></div>
      </div>

      <div className="dashboard-container">
        <Sidebar />

        <main className="feed" style={{ gridColumn: 'span 2' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', border: '2px solid rgba(220, 0, 0, 0.2)', padding: '30px', marginBottom: '30px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)' }}>
            <h2 style={{ marginBottom: '20px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1A1A' }}>
              EXPLORE JITCONNECT
            </h2>
            <input
              type="text"
              placeholder="Search people, posts, departments..."
              value={searchQuery}
              onChange={handleSearch}
              style={{ width: '100%', padding: '14px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', color: '#1A1A1A', fontSize: '15px' }}
            />
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', border: '2px solid rgba(220, 0, 0, 0.2)', padding: '30px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)' }}>
            <h3 style={{ marginBottom: '30px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1A1A' }}>
              DISCOVER PEOPLE
            </h3>
            {filteredPeople.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px', color: 'rgba(0, 0, 0, 0.6)' }}>No results found</p>
            ) : (
              filteredPeople.map((person) => (
                <div key={person._id} className="suggestion-item" style={{ marginBottom: '16px' }}>
                  <div className="avatar-sm">{person.name.charAt(0).toUpperCase()}</div>
                  <div className="suggestion-info">
                    <h4>{person.name}</h4>
                    <p>
                      <span className={`role-badge ${person.role}`}>{person.role}</span> 
                      {' '}
                      {person.role === 'student' && `${person.branch} • ${person.year}`}
                      {person.role === 'faculty' && `${person.department} • ${person.designation}`}
                      {person.role === 'alumni' && `${person.company} • ${person.designation}`}
                      {person.role === 'department' && person.deptName}
                    </p>
                  </div>
                  <button 
                    className="btn-connect" 
                    onClick={() => handleConnect(person._id)}
                    disabled={loading}
                  >
                    {loading ? 'SENDING...' : 'CONNECT'}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Department Events Banner */}
          {showEvents && (
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.92)', 
              backdropFilter: 'blur(10px)', 
              border: '2px solid rgba(220, 0, 0, 0.2)', 
              padding: '30px', 
              marginTop: '30px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
            }}>
              <h3 style={{ marginBottom: '20px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1A1A' }}>
                📅 UPCOMING EVENTS
              </h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {events.map((event) => (
                  <div key={event._id} style={{ 
                    padding: '20px', 
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid rgba(220, 0, 0, 0.1)',
                    borderRadius: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1A1A1A' }}>
                        {event.title}
                      </h4>
                      <span style={{ 
                        fontSize: '12px', 
                        color: 'rgba(0, 0, 0, 0.6)',
                        background: 'rgba(220, 0, 0, 0.1)',
                        padding: '4px 10px',
                        borderRadius: '4px'
                      }}>
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: 'rgba(0, 0, 0, 0.7)' }}>
                      {event.description}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: 'rgba(0, 0, 0, 0.5)' }}>
                      <strong>Location:</strong> {event.location}
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

export default Explore;
