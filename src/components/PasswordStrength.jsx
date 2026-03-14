import { useState, useEffect } from 'react';

function PasswordStrength({ password }) {
  const [strength, setStrength] = useState({ score: 0, label: '', color: '', suggestions: [] });

  useEffect(() => {
    analyzePassword(password);
  }, [password]);

  const analyzePassword = (pwd) => {
    if (!pwd) {
      setStrength({ score: 0, label: '', color: '', suggestions: [] });
      return;
    }

    let score = 0;
    const suggestions = [];

    // Length check
    if (pwd.length >= 8) score += 1;
    else suggestions.push('Use at least 8 characters');

    if (pwd.length >= 12) score += 1;

    // Uppercase check
    if (/[A-Z]/.test(pwd)) score += 1;
    else suggestions.push('Add uppercase letters (A-Z)');

    // Lowercase check
    if (/[a-z]/.test(pwd)) score += 1;
    else suggestions.push('Add lowercase letters (a-z)');

    // Number check
    if (/[0-9]/.test(pwd)) score += 1;
    else suggestions.push('Add numbers (0-9)');

    // Special character check
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score += 1;
    else suggestions.push('Add special characters (!@#$%^&*)');

    // Determine strength
    let label = '';
    let color = '';

    if (score <= 2) {
      label = 'WEAK';
      color = '#DC0000';
    } else if (score <= 4) {
      label = 'MEDIUM';
      color = '#FFA500';
    } else {
      label = 'STRONG';
      color = '#00C853';
    }

    setStrength({ score, label, color, suggestions });
  };

  if (!password) return null;

  return (
    <div style={{ marginTop: '10px' }}>
      {/* Strength Bar */}
      <div style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '8px'
      }}>
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <div
            key={level}
            style={{
              flex: 1,
              height: '4px',
              background: level <= strength.score ? strength.color : 'rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              borderRadius: '2px'
            }}
          />
        ))}
      </div>

      {/* Strength Label */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: '700',
          color: strength.color,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {strength.label}
        </span>
        <span style={{
          fontSize: '11px',
          color: 'rgba(0, 0, 0, 0.5)',
          fontWeight: '600'
        }}>
          {strength.score}/6
        </span>
      </div>

      {/* Suggestions */}
      {strength.suggestions.length > 0 && (
        <div style={{
          background: 'rgba(220, 0, 0, 0.05)',
          border: '1px solid rgba(220, 0, 0, 0.2)',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <p style={{
            margin: '0 0 6px 0',
            fontSize: '11px',
            fontWeight: '700',
            color: '#1A1A1A',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            STRENGTHEN YOUR PASSWORD:
          </p>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            fontSize: '11px',
            color: 'rgba(0, 0, 0, 0.7)',
            lineHeight: '1.6'
          }}>
            {strength.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PasswordStrength;
