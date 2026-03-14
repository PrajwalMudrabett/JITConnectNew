const API_URL = import.meta.env.VITE_API_URL || 'https://jitconnectnew.onrender.com/api';

// Helper function for API calls with error handling
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Get token from localStorage
const getToken = () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    try {
      const parsed = JSON.parse(userData);
      return parsed.token;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  getMe: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};

// Posts API
export const postsAPI = {
  getAllPosts: async () => {
    const response = await fetch(`${API_URL}/posts`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  createPost: async (postData) => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(postData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create post');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  likePost: async (postId) => {
    const response = await fetch(`${API_URL}/posts/${postId}/like`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  addComment: async (postId, text) => {
    const response = await fetch(`${API_URL}/posts/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ text }),
    });
    return response.json();
  },

  deletePost: async (postId) => {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};

// Users API
export const usersAPI = {
  getAllUsers: async () => {
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  searchUsers: async (query) => {
    const response = await fetch(`${API_URL}/users/search?query=${query}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  getUserById: async (userId) => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  updateProfile: async (profileData) => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(profileData),
    });
    return response.json();
  },

  sendConnectionRequest: async (userId) => {
    const response = await fetch(`${API_URL}/users/${userId}/connect`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  acceptConnection: async (userId) => {
    const response = await fetch(`${API_URL}/users/connect/accept/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  getConnections: async () => {
    const response = await fetch(`${API_URL}/users/connections/list`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};

// Messages API
export const messagesAPI = {
  getMessages: async (userId) => {
    const response = await fetch(`${API_URL}/messages/${userId}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  sendMessage: async (receiver, message) => {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ receiver, message }),
    });
    return response.json();
  },

  getConversations: async () => {
    const response = await fetch(`${API_URL}/messages/conversations/list`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};

// Notifications API
export const notificationsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/notifications`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  getUnreadCount: async () => {
    const response = await fetch(`${API_URL}/notifications/unread`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  markAsRead: async (notificationId) => {
    const response = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  markAllAsRead: async () => {
    const response = await fetch(`${API_URL}/notifications/read-all`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  deleteNotification: async (notificationId) => {
    const response = await fetch(`${API_URL}/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};

// Announcements API
export const announcementsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/announcements`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  create: async (announcementData) => {
    const response = await fetch(`${API_URL}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(announcementData),
    });
    return response.json();
  },

  delete: async (announcementId) => {
    const response = await fetch(`${API_URL}/announcements/${announcementId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  toggle: async (announcementId) => {
    const response = await fetch(`${API_URL}/announcements/${announcementId}/toggle`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};

// Jobs API
export const jobsAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/jobs?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  getById: async (jobId) => {
    const response = await fetch(`${API_URL}/jobs/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  create: async (jobData) => {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(jobData),
    });
    return response.json();
  },

  update: async (jobId, jobData) => {
    const response = await fetch(`${API_URL}/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(jobData),
    });
    return response.json();
  },

  delete: async (jobId) => {
    const response = await fetch(`${API_URL}/jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  apply: async (jobId) => {
    const response = await fetch(`${API_URL}/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  getMyPosted: async () => {
    const response = await fetch(`${API_URL}/jobs/my/posted`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};
// Research API
export const researchAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/research`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  create: async (researchData) => {
    const response = await fetch(`${API_URL}/research`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(researchData),
    });
    return response.json();
  },

  apply: async (researchId) => {
    const response = await fetch(`${API_URL}/research/${researchId}/apply`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  delete: async (researchId) => {
    const response = await fetch(`${API_URL}/research/${researchId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};

// Events API
export const eventsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/events`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  create: async (eventData) => {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(eventData),
    });
    return response.json();
  },

  delete: async (eventId) => {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};
// Moderation API
export const moderationAPI = {
  getPosts: async () => {
    const response = await fetch(`${API_URL}/moderation/posts`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  approvePost: async (postId) => {
    const response = await fetch(`${API_URL}/moderation/posts/${postId}/approve`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  restrictPost: async (postId, reason) => {
    const response = await fetch(`${API_URL}/moderation/posts/${postId}/restrict`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ reason }),
    });
    return response.json();
  },

  deletePost: async (postId) => {
    const response = await fetch(`${API_URL}/moderation/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  getJobs: async () => {
    const response = await fetch(`${API_URL}/moderation/jobs`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  approveJob: async (jobId) => {
    const response = await fetch(`${API_URL}/moderation/jobs/${jobId}/approve`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  restrictJob: async (jobId) => {
    const response = await fetch(`${API_URL}/moderation/jobs/${jobId}/restrict`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  deleteJob: async (jobId) => {
    const response = await fetch(`${API_URL}/moderation/jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  getResearch: async () => {
    const response = await fetch(`${API_URL}/moderation/research`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  approveResearch: async (researchId) => {
    const response = await fetch(`${API_URL}/moderation/research/${researchId}/approve`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  restrictResearch: async (researchId) => {
    const response = await fetch(`${API_URL}/moderation/research/${researchId}/restrict`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  deleteResearch: async (researchId) => {
    const response = await fetch(`${API_URL}/moderation/research/${researchId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  getEvents: async () => {
    const response = await fetch(`${API_URL}/moderation/events`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  approveEvent: async (eventId) => {
    const response = await fetch(`${API_URL}/moderation/events/${eventId}/approve`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  restrictEvent: async (eventId) => {
    const response = await fetch(`${API_URL}/moderation/events/${eventId}/restrict`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },

  deleteEvent: async (eventId) => {
    const response = await fetch(`${API_URL}/moderation/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};
