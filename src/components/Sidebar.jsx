import { Link, useLocation, useNavigate } from 'react-router-dom';
import Notifications from './Notifications';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const isAdmin = userData.isAdmin;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <img src="/assets/jit-images/JIT-LOGO.png" alt="JIT Logo" className="sidebar-logo-img" />
      <h1 className="sidebar-logo">JITCONNECT</h1>
      
      {/* Notifications */}
      <div style={{ padding: '20px', borderBottom: '2px solid rgba(220, 0, 0, 0.2)' }}>
        <Notifications />
      </div>

      <nav>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <span>🏠</span> HOME
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/explore" className={`nav-link ${location.pathname === '/explore' ? 'active' : ''}`}>
              <span>🔍</span> EXPLORE
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/messages" className={`nav-link ${location.pathname === '/messages' ? 'active' : ''}`}>
              <span>💬</span> MESSAGES
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
              <span>👤</span> PROFILE
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/connections" className={`nav-link ${location.pathname === '/connections' ? 'active' : ''}`}>
              <span>🤝</span> CONNECTIONS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}>
              <span>💼</span> JOBS
            </Link>
          </li>
          {isAdmin && (
            <>
              <li className="nav-item">
                <Link to="/moderation" className={`nav-link ${location.pathname === '/moderation' ? 'active' : ''}`}>
                  <span>🛡️</span> MODERATION
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                  <span>⚙️</span> ADMIN PANEL
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={handleLogout}>
              <span>🚪</span> LOGOUT
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
