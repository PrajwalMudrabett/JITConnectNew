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
    loadPeople();
});

function logout() {
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}

const samplePeople = [
    { name: 'Ananya Iyer', role: 'alumni', info: 'Software Engineer at Amazon', branch: 'CSE' },
    { name: 'Karthik Menon', role: 'student', info: 'CSE • 3rd Year', branch: 'CSE' },
    { name: 'Dr. Sunita Rao', role: 'faculty', info: 'Professor • ECE Department', branch: 'ECE' },
    { name: 'Vikram Singh', role: 'alumni', info: 'Product Manager at Microsoft', branch: 'ISE' },
    { name: 'Priya Sharma', role: 'student', info: 'ECE • 4th Year', branch: 'ECE' },
    { name: 'Rahul Verma', role: 'alumni', info: 'Data Scientist at Google', branch: 'CSE' }
];

function loadPeople() {
    const container = document.getElementById('peopleContainer');
    container.innerHTML = '';
    
    samplePeople.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.className = 'suggestion-item';
        personDiv.style.marginBottom = '16px';
        
        const initial = person.name.charAt(0).toUpperCase();
        
        personDiv.innerHTML = `
            <div class="avatar-sm">${initial}</div>
            <div class="suggestion-info">
                <h4>${person.name}</h4>
                <p><span class="role-badge ${person.role}">${person.role}</span> ${person.info}</p>
            </div>
            <button class="btn-connect" onclick="connect('${person.name}')">Connect</button>
        `;
        
        container.appendChild(personDiv);
    });
}

function searchContent() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('peopleContainer');
    
    if (!query) {
        loadPeople();
        return;
    }
    
    const filtered = samplePeople.filter(person => 
        person.name.toLowerCase().includes(query) || 
        person.info.toLowerCase().includes(query) ||
        person.branch.toLowerCase().includes(query)
    );
    
    container.innerHTML = '';
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-secondary-light);">No results found</p>';
        return;
    }
    
    filtered.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.className = 'suggestion-item';
        personDiv.style.marginBottom = '16px';
        
        const initial = person.name.charAt(0).toUpperCase();
        
        personDiv.innerHTML = `
            <div class="avatar-sm">${initial}</div>
            <div class="suggestion-info">
                <h4>${person.name}</h4>
                <p><span class="role-badge ${person.role}">${person.role}</span> ${person.info}</p>
            </div>
            <button class="btn-connect" onclick="connect('${person.name}')">Connect</button>
        `;
        
        container.appendChild(personDiv);
    });
}

function connect(name) {
    alert(`Connection request sent to ${name}!`);
}
