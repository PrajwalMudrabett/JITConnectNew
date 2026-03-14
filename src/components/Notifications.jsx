import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationsAPI } from '../services/api';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();

    // Poll for new notifications every 10 seconds
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await notificationsAPI.getAll();
      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const data = await notificationsAPI.getUnreadCount();
      setUnreadCount(data.count || 0);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      // Mark as read
      if (!notification.read) {
        await notificationsAPI.markAsRead(notification._id);
        setUnreadCount(prev => Math.max(0, prev - 1));
      }

      // Navigate to the link
      if (notification.link) {
        navigate(notification.link);
      }

      setShowDropdown(false);
      fetchNotifications();
    } catch (err) {
      console.error('Error handling notification:', err);
    }
  };

  const handleMarkAllRead = async () => {
    setLoading(true);
    try {
      await notificationsAPI.markAllAsRead();
      setUnreadCount(0);
      fetchNotifications();
    } catch (err) {
      console.error('Error marking all as read:', err);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'connection_request':
        return '👥';
      case 'connection_accepted':
        return '✅';
      case 'new_message':
        return '💬';
      case 'new_post':
        return '📝';
      case 'post_like':
        return '❤️';
      case 'post_comment':
        return '💭';
      default:
        return '🔔';
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Notification Bell */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          position: 'relative',
          background: 'rgba(220, 0, 0, 0.1)',
          border: '2px solid rgba(220, 0, 0, 0.3)',
          padding: '12px 16px',
          cursor: 'pointer',
          fontSize: '20px',
          transition: 'all 0.3s ease',
          borderRadius: '4px'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'var(--ferrari-red)';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(220, 0, 0, 0.1)';
          e.target.style.transform = 'scale(1)';
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: 'var(--ferrari-red)',
            color: 'white',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '800',
            border: '2px solid white',
            animation: 'pulse 2s infinite'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '0',
          width: '400px',
          maxHeight: '500px',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(220, 0, 0, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{
            padding: '20px',
            borderBottom: '2px solid rgba(220, 0, 0, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            zIndex: 1
          }}>
            <h3 style={{ 
              margin: 0, 
              fontSize: '18px', 
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#1A1A1A'
            }}>
              NOTIFICATIONS
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={loading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ferrari-red)',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {loading ? 'MARKING...' : 'MARK ALL READ'}
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div>
            {notifications.length === 0 ? (
              <div style={{ 
                padding: '40px', 
                textAlign: 'center', 
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '14px'
              }}>
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => handleNotificationClick(notification)}
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(220, 0, 0, 0.1)',
                    cursor: 'pointer',
                    background: notification.read ? 'transparent' : 'rgba(220, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(220, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = notification.read ? 'transparent' : 'rgba(220, 0, 0, 0.05)';
                  }}
                >
                  {/* Icon */}
                  <div style={{ fontSize: '24px', flexShrink: 0 }}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '14px',
                      fontWeight: notification.read ? '500' : '700',
                      color: '#1A1A1A',
                      lineHeight: '1.4'
                    }}>
                      {notification.message}
                    </p>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '12px', 
                      color: 'rgba(0, 0, 0, 0.5)',
                      fontWeight: '500'
                    }}>
                      {getTimeAgo(notification.createdAt)}
                    </p>
                  </div>

                  {/* Unread indicator */}
                  {!notification.read && (
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--ferrari-red)',
                      flexShrink: 0,
                      marginTop: '6px'
                    }} />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}

export default Notifications;
