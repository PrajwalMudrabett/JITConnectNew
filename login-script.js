// Theme Management
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    }
});

// Form Switching
function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

// Role-based Fields
function handleRoleChange() {
    const role = document.getElementById('regRole').value;
    
    // Hide all role fields
    document.querySelectorAll('.role-fields').forEach(field => {
        field.classList.add('hidden');
    });
    
    // Show selected role fields
    if (role === 'student') {
        document.getElementById('studentFields').classList.remove('hidden');
    } else if (role === 'faculty') {
        document.getElementById('facultyFields').classList.remove('hidden');
    } else if (role === 'alumni') {
        document.getElementById('alumniFields').classList.remove('hidden');
    } else if (role === 'department') {
        document.getElementById('departmentFields').classList.remove('hidden');
    }
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Store user data (in real app, this would be API call)
    const userData = {
        email: email,
        name: 'Demo User',
        role: 'student',
        isLoggedIn: true
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// Register Handler
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;
    
    let additionalData = {};
    
    // Collect role-specific data
    if (role === 'student') {
        additionalData = {
            usn: document.getElementById('usn').value,
            branch: document.getElementById('branch').value,
            year: document.getElementById('year').value
        };
    } else if (role === 'faculty') {
        additionalData = {
            department: document.getElementById('department').value,
            designation: document.getElementById('designation').value,
            experience: document.getElementById('experience').value
        };
    } else if (role === 'alumni') {
        additionalData = {
            batch: document.getElementById('batch').value,
            branch: document.getElementById('alumniBranch').value,
            company: document.getElementById('company').value,
            designation: document.getElementById('alumniDesignation').value
        };
    } else if (role === 'department') {
        additionalData = {
            deptName: document.getElementById('deptName').value,
            description: document.getElementById('deptDescription').value
        };
    }
    
    const userData = {
        name,
        email,
        role,
        ...additionalData,
        isLoggedIn: true
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    alert('Account created successfully! Redirecting to dashboard...');
    window.location.href = 'dashboard.html';
}
