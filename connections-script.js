function checkAuth() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(userData);
}

checkAuth();

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
    if (savedTheme === 'dark') {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('.theme-icon-nav');
        if (themeIcon) themeIcon.textContent = '☀️';
    }
    loadConnections();
});

function logout() {
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}

const sampleConnections = [
    { name: 'Ananya Iyer', role: 'alumni', info: 'Software Engineer at Amazon' },
    { name: 'Karthik Menon', role: 'student', info: 'CSE • 3rd Year' },
    { name: 'Dr. Sunita Rao', role: 'faculty', info: 'Professor • ECE Department' },
    { name: 'Vikram Singh', role: 'alumni', info: 'Product Manager at Microsoft' }
];

function loadConnections() {
    const container = document.getElementById('connectionsContainer');
    container.innerHTML = '';
    
    sampleConnections.forEach(conn => {
        const connDiv = document.createElement('div');
        connDiv.className = 'suggestion-item';
        connDiv.style.marginBottom = '16px';
        
        const initial = conn.name.charAt(0).toUpperCase();
        
        connDiv.innerHTML = `
            <div class="avatar-sm">${initial}</div>
            <div class="suggestion-info">
                <h4>${conn.name}</h4>
                <p><span class="role-badge ${conn.role}">${conn.role}</span> ${conn.info}</p>
            </div>
            <button class="btn-connect" onclick="messageUser('${conn.name}')">Message</button>
        `;
        
        container.appendChild(connDiv);
    });
}

function messageUser(name) {
    window.location.href = 'messages.html';
}
