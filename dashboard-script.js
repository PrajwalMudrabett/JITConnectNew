// Check authentication
function checkAuth() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(userData);
}

const currentUser = checkAuth();

// Theme Management
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon-nav');
    
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (themeIcon) themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon-nav');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
    }
    
    loadPosts();
    loadSuggestions();
});

// Logout
function logout() {
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}

// Sample Posts Data
const samplePosts = [
    {
        id: 1,
        author: 'Training & Placement Cell',
        role: 'department',
        content: '🎉 Congratulations to all students who got placed in top companies! Amazon, Microsoft, Google - 45 students placed with average package of 12 LPA!',
        image: null,
        likes: 234,
        comments: 45,
        timestamp: '2 hours ago'
    },
    {
        id: 2,
        author: 'Priya Sharma',
        role: 'student',
        content: 'Excited to share that I have been selected for a Software Engineering Internship at Microsoft! 🚀 Thank you to all my professors and seniors for the guidance.',
        image: null,
        likes: 156,
        comments: 32,
        timestamp: '5 hours ago'
    },
    {
        id: 3,
        author: 'Dr. Rajesh Kumar',
        role: 'faculty',
        content: 'Our research paper on "AI in Healthcare" has been accepted at IEEE International Conference 2024! Proud of my research team.',
        image: null,
        likes: 89,
        comments: 12,
        timestamp: '1 day ago'
    },
    {
        id: 4,
        author: 'Arjun Reddy',
        role: 'alumni',
        content: 'Looking back at my journey from JIT to Senior Software Engineer at Google. Happy to mentor current students. Feel free to connect!',
        image: null,
        likes: 312,
        comments: 67,
        timestamp: '2 days ago'
    }
];

// Load Posts
function loadPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';
    
    // Load from localStorage or use sample data
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const allPosts = [...savedPosts, ...samplePosts];
    
    allPosts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
    });
}

// Create Post Element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card glass-effect';
    
    const initial = post.author.charAt(0).toUpperCase();
    
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="avatar">${initial}</div>
            <div class="post-author-info">
                <h4>${post.author} <span class="role-badge ${post.role}">${post.role}</span></h4>
                <p class="post-meta">${post.timestamp}</p>
            </div>
        </div>
        <div class="post-content">
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
        </div>
        <div class="post-interactions">
            <button class="interaction-btn" onclick="likePost(${post.id})">
                ❤️ ${post.likes} Likes
            </button>
            <button class="interaction-btn">
                💬 ${post.comments} Comments
            </button>
            <button class="interaction-btn">
                🔁 Share
            </button>
        </div>
    `;
    
    return postDiv;
}

// Create Post
function createPost() {
    const content = document.getElementById('postContent').value.trim();
    const category = document.getElementById('postCategory').value;
    const imageFile = document.getElementById('postImage').files[0];
    
    if (!content) {
        alert('Please write something to post!');
        return;
    }
    
    const newPost = {
        id: Date.now(),
        author: currentUser.name,
        role: currentUser.role,
        content: content,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
        category: category
    };
    
    // Save to localStorage
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    savedPosts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(savedPosts));
    
    // Clear form
    document.getElementById('postContent').value = '';
    document.getElementById('postImage').value = '';
    
    // Reload posts
    loadPosts();
}

// Like Post
function likePost(postId) {
    alert('Post liked! ❤️');
}

// Sample Suggestions
const sampleSuggestions = [
    { name: 'Ananya Iyer', role: 'alumni', company: 'Amazon' },
    { name: 'Karthik Menon', role: 'student', branch: 'CSE' },
    { name: 'Dr. Sunita Rao', role: 'faculty', dept: 'ECE' },
    { name: 'Vikram Singh', role: 'alumni', company: 'Microsoft' }
];

// Load Suggestions
function loadSuggestions() {
    const container = document.getElementById('suggestionsContainer');
    container.innerHTML = '';
    
    sampleSuggestions.forEach(person => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.className = 'suggestion-item';
        
        const initial = person.name.charAt(0).toUpperCase();
        const subtitle = person.company || person.branch || person.dept || '';
        
        suggestionDiv.innerHTML = `
            <div class="avatar-sm">${initial}</div>
            <div class="suggestion-info">
                <h4>${person.name}</h4>
                <p>${person.role} ${subtitle ? '• ' + subtitle : ''}</p>
            </div>
            <button class="btn-connect" onclick="connect('${person.name}')">Connect</button>
        `;
        
        container.appendChild(suggestionDiv);
    });
}

// Connect with user
function connect(name) {
    alert(`Connection request sent to ${name}!`);
}
