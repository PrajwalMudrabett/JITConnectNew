function checkAuth() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(userData);
}

const currentUser = checkAuth();
let currentChat = null;

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
    loadConversations();
});

function logout() {
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}

const sampleConversations = [
    { name: 'Ananya Iyer', role: 'alumni', lastMessage: 'Thanks for connecting!' },
    { name: 'Karthik Menon', role: 'student', lastMessage: 'See you at the event' },
    { name: 'Dr. Sunita Rao', role: 'faculty', lastMessage: 'Your project looks great' }
];

function loadConversations() {
    const container = document.getElementById('conversationsList');
    container.innerHTML = '';
    
    sampleConversations.forEach(conv => {
        const convDiv = document.createElement('div');
        convDiv.className = 'suggestion-item';
        convDiv.style.cursor = 'pointer';
        convDiv.onclick = () => openChat(conv);
        
        const initial = conv.name.charAt(0).toUpperCase();
        
        convDiv.innerHTML = `
            <div class="avatar-sm">${initial}</div>
            <div class="suggestion-info">
                <h4>${conv.name}</h4>
                <p style="font-size: 12px;">${conv.lastMessage}</p>
            </div>
        `;
        
        container.appendChild(convDiv);
    });
}

function openChat(conversation) {
    currentChat = conversation;
    document.getElementById('chatHeader').innerHTML = `<h3>${conversation.name}</h3>`;
    loadMessages();
}

function loadMessages() {
    const container = document.getElementById('messagesContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-secondary-light);">
            <p>Start a conversation with ${currentChat.name}</p>
        </div>
    `;
}

function sendMessage() {
    if (!currentChat) {
        alert('Please select a conversation first');
        return;
    }
    
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    alert(`Message sent to ${currentChat.name}: ${message}`);
    input.value = '';
}
