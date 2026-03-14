import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { messagesAPI, usersAPI } from '../services/api';

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchConversations();
    
    // If navigated from connections with a user ID
    if (location.state?.selectedUserId) {
      loadUserChat(location.state.selectedUserId);
    }
  }, []);

  const fetchConversations = async () => {
    try {
      const data = await messagesAPI.getConversations();
      if (Array.isArray(data)) {
        setConversations(data);
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
    }
  };

  const loadUserChat = async (userId) => {
    try {
      const user = await usersAPI.getUserById(userId);
      setCurrentChat(user);
      await loadMessages(userId);
    } catch (err) {
      console.error('Error loading user chat:', err);
    }
  };

  const loadMessages = async (userId) => {
    try {
      const data = await messagesAPI.getMessages(userId);
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  const openChat = async (conversation) => {
    setCurrentChat(conversation.user);
    await loadMessages(conversation.user._id);
  };

  const sendMessage = async () => {
    if (!currentChat) {
      alert('Please select a conversation first');
      return;
    }
    if (!message.trim()) return;

    setLoading(true);
    try {
      const newMessage = await messagesAPI.sendMessage(currentChat._id, message);
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Update conversations list
      await fetchConversations();
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getCurrentUserId = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData._id;
  };

  return (
    <div className="page-messages">
      <div className="background-wrapper">
        <div className="overlay"></div>
      </div>

      <div className="dashboard-container">
        <Sidebar />

        <main className="feed" style={{ gridColumn: 'span 2' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', border: '2px solid rgba(220, 0, 0, 0.2)', padding: '30px', minHeight: '600px', display: 'grid', gridTemplateColumns: '300px 1fr', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)' }}>
            <div style={{ borderRight: '2px solid rgba(220, 0, 0, 0.2)', paddingRight: '20px' }}>
              <h3 style={{ marginBottom: '20px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1A1A' }}>
                CONVERSATIONS
              </h3>
              {conversations.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '20px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '14px' }}>
                  No conversations yet
                </p>
              ) : (
                conversations.map((conv, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openChat(conv)}
                  >
                    <div className="avatar-sm">{conv.user.name.charAt(0).toUpperCase()}</div>
                    <div className="suggestion-info">
                      <h4>{conv.user.name}</h4>
                      <p style={{ fontSize: '12px' }}>{conv.lastMessage}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ paddingLeft: '30px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ paddingBottom: '20px', borderBottom: '2px solid rgba(220, 0, 0, 0.2)', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1A1A' }}>
                  {currentChat ? currentChat.name : 'SELECT A CONVERSATION'}
                </h3>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', minHeight: '300px', maxHeight: '400px' }}>
                {!currentChat ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(0, 0, 0, 0.6)' }}>
                    <p>Select a conversation to start messaging</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(0, 0, 0, 0.6)' }}>
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const isCurrentUser = msg.sender._id === getCurrentUserId();
                    return (
                      <div
                        key={index}
                        style={{
                          marginBottom: '15px',
                          display: 'flex',
                          justifyContent: isCurrentUser ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <div
                          style={{
                            maxWidth: '70%',
                            padding: '12px 16px',
                            background: isCurrentUser ? 'var(--ferrari-red)' : 'rgba(255, 255, 255, 0.8)',
                            color: isCurrentUser ? 'white' : '#1A1A1A',
                            borderRadius: '12px',
                            border: isCurrentUser ? 'none' : '1px solid rgba(220, 0, 0, 0.2)'
                          }}
                        >
                          <p style={{ fontSize: '14px', marginBottom: '5px' }}>{msg.message}</p>
                          <p style={{ fontSize: '10px', opacity: 0.7 }}>
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!currentChat || loading}
                  style={{ flex: 1, padding: '12px 16px', border: '2px solid rgba(220, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.8)', color: '#1A1A1A', fontSize: '14px' }}
                />
                <button 
                  className="btn-primary" 
                  style={{ width: 'auto', padding: '12px 24px', margin: 0 }} 
                  onClick={sendMessage}
                  disabled={!currentChat || loading}
                >
                  {loading ? 'SENDING...' : 'SEND'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Messages;
