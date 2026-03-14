import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import PasswordStrength from '../components/PasswordStrength';

function Login({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    usn: '',
    branch: '',
    year: '',
    department: '',
    designation: '',
    experience: '',
    batch: '',
    company: '',
    deptName: '',
    deptDescription: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Sanitize input by trimming whitespace
    const sanitizedValue = typeof value === 'string' ? value.trim() : value;
    setFormData({ ...formData, [name]: sanitizedValue });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate inputs
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const data = await authAPI.login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });

      if (data.message) {
        setError(data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem('userData', JSON.stringify(data));
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Sanitize inputs
    const sanitizedEmail = formData.email.trim().toLowerCase();
    const sanitizedName = formData.name.trim();

    // Validate college email
    const validDomains = ['@jyothyit.ac.in', '@jit.ac.in'];
    const isValidEmail = validDomains.some(domain => sanitizedEmail.endsWith(domain));
    
    if (!isValidEmail) {
      setError('Please use your college email address (@jyothyit.ac.in or @jit.ac.in)');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(formData.password)) {
      setError('Password must contain at least one uppercase letter');
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(formData.password)) {
      setError('Password must contain at least one lowercase letter');
      setLoading(false);
      return;
    }

    if (!/[0-9]/.test(formData.password)) {
      setError('Password must contain at least one number');
      setLoading(false);
      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
      setError('Password must contain at least one special character');
      setLoading(false);
      return;
    }

    try {
      const sanitizedData = {
        ...formData,
        name: sanitizedName,
        email: sanitizedEmail
      };

      const data = await authAPI.register(sanitizedData);

      if (data.message && data.message.includes('exists')) {
        setError(data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem('userData', JSON.stringify(data));
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="page-login">
      <div className="background-wrapper">
        <div className="overlay"></div>
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="logo-section">
            <img src="/assets/jit-images/JIT-LOGO.png" alt="JIT Logo" className="login-logo-img" />
            <h1 className="logo-text">JITCONNECT</h1>
            <p className="tagline">CONNECT • SHARE • GROW</p>
            <p className="subtitle">Jyothy Institute of Technology</p>
          </div>

          {isLogin ? (
            <div className="form-section">
              <h2 className="form-title">WELCOME BACK</h2>
              {error && <div style={{ padding: '12px', marginBottom: '20px', background: 'rgba(220, 0, 0, 0.1)', border: '1px solid rgba(220, 0, 0, 0.3)', color: '#DC0000', fontSize: '14px' }}>{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                </div>
                <div className="input-group">
                  <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'LOGGING IN...' : 'LOGIN'}
                </button>
              </form>
              <p className="switch-text">
                Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>SIGN UP</a>
              </p>
            </div>
          ) : (
            <div className="form-section">
              <h2 className="form-title">CREATE ACCOUNT</h2>
              {error && <div style={{ padding: '12px', marginBottom: '20px', background: 'rgba(220, 0, 0, 0.1)', border: '1px solid rgba(220, 0, 0, 0.3)', color: '#DC0000', fontSize: '14px' }}>{error}</div>}
              <form onSubmit={handleRegister}>
                <div className="input-group">
                  <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
                </div>
                <div className="input-group">
                  <input type="email" name="email" placeholder="College Email (@jyothyit.ac.in or @jit.ac.in)" required onChange={handleChange} />
                </div>
                <div className="input-group">
                  <input type="password" name="password" placeholder="Password (min 8 characters)" required onChange={handleChange} />
                  <PasswordStrength password={formData.password} />
                </div>
                <div className="input-group">
                  <select name="role" required onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="alumni">Alumni</option>
                    <option value="department">Department</option>
                  </select>
                </div>

                {formData.role === 'student' && (
                  <div className="role-fields">
                    <div className="input-group">
                      <input type="text" name="usn" placeholder="USN" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <input type="text" name="branch" placeholder="Branch" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <input type="text" name="year" placeholder="Year" onChange={handleChange} />
                    </div>
                  </div>
                )}

                {formData.role === 'faculty' && (
                  <div className="role-fields">
                    <div className="input-group">
                      <input type="text" name="department" placeholder="Department" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <input type="text" name="designation" placeholder="Designation" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <input type="text" name="experience" placeholder="Years of Experience" onChange={handleChange} />
                    </div>
                  </div>
                )}

                {formData.role === 'alumni' && (
                  <div className="role-fields">
                    <div className="input-group">
                      <input type="text" name="batch" placeholder="Batch Year" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <input type="text" name="branch" placeholder="Branch" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <input type="text" name="company" placeholder="Current Company" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <input type="text" name="designation" placeholder="Designation" onChange={handleChange} />
                    </div>
                  </div>
                )}

                {formData.role === 'department' && (
                  <div className="role-fields">
                    <div className="input-group">
                      <input type="text" name="deptName" placeholder="Department Name" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <textarea name="deptDescription" placeholder="Description" rows="3" onChange={handleChange}></textarea>
                    </div>
                  </div>
                )}

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                </button>
              </form>
              <p className="switch-text">
                Already have an account? <a href="#" onClick={() => setIsLogin(true)}>LOGIN</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
