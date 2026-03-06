function checkAuth() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(userData);
}

const currentUser = checkAuth();

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

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon-nav');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
    }
    
    loadProfile();
    loadUserPosts();
});

function logout() {
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}

function loadProfile() {
    const initial = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('profileAvatar').textContent = initial;
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    
    let details = '';
    if (currentUser.role === 'student') {
        details = `${currentUser.branch || 'N/A'} • Year ${currentUser.year || 'N/A'}`;
    } else if (currentUser.role === 'faculty') {
        details = `${currentUser.department || 'N/A'} • ${currentUser.designation || 'N/A'}`;
    } else if (currentUser.role === 'alumni') {
        details = `${currentUser.company || 'N/A'} • Batch ${currentUser.batch || 'N/A'}`;
    } else if (currentUser.role === 'department') {
        details = currentUser.deptName || 'N/A';
    }
    
    document.getElementById('profileDetails').textContent = details;
}

function loadUserPosts() {
    const container = document.getElementById('userPostsContainer');
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const userPosts = savedPosts.filter(post => post.author === currentUser.name);
    
    if (userPosts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary-light); padding: 40px;">No posts yet. Share your first achievement!</p>';
        return;
    }
    
    container.innerHTML = '';
    userPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post-card glass-effect';
        postDiv.innerHTML = `
            <div class="post-content">
                <p>${post.content}</p>
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            </div>
            <div class="post-interactions">
                <button class="interaction-btn">❤️ ${post.likes} Likes</button>
                <button class="interaction-btn">💬 ${post.comments} Comments</button>
            </div>
        `;
        container.appendChild(postDiv);
    });
}

function editProfile() {
    alert('Edit profile feature coming soon!');
}
