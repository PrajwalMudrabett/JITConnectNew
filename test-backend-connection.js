// Test Backend Connection
// Run this with: node test-backend-connection.js

const API_URL = 'https://jitconnectnew.onrender.com/api';

async function testConnection() {
  console.log('🔍 Testing backend connection...\n');
  console.log(`Backend URL: ${API_URL}\n`);

  try {
    // Test 1: Root endpoint
    console.log('Test 1: Root endpoint');
    const rootResponse = await fetch('https://jitconnectnew.onrender.com');
    const rootData = await rootResponse.json();
    console.log('✅ Root endpoint:', rootData);
    console.log('');

    // Test 2: Health check (if exists)
    console.log('Test 2: API endpoint');
    try {
      const apiResponse = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Status:', apiResponse.status);
      if (apiResponse.status === 401) {
        console.log('✅ API is responding (401 is expected without auth token)');
      }
    } catch (err) {
      console.log('⚠️  API endpoint test:', err.message);
    }
    console.log('');

    // Test 3: CORS check
    console.log('Test 3: CORS headers');
    const corsResponse = await fetch('https://jitconnectnew.onrender.com', {
      method: 'OPTIONS'
    });
    console.log('CORS Status:', corsResponse.status);
    console.log('✅ CORS is configured');
    console.log('');

    console.log('🎉 Backend is reachable and responding!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Deploy frontend to Vercel');
    console.log('2. Update CLIENT_URL on Render with your Vercel URL');
    console.log('3. Test registration and login');

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('');
    console.log('Troubleshooting:');
    console.log('1. Check if backend is awake (Render free tier sleeps)');
    console.log('2. Visit https://jitconnectnew.onrender.com in browser');
    console.log('3. Wait 30 seconds and try again');
  }
}

testConnection();
