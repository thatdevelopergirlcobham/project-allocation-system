// Test admin login functionality
import * as dummyDB from './lib/dummyData.js';

// Test finding admin user
const adminUser = dummyDB.findOne('users', { email: 'admin@example.com', role: 'admin' });
console.log('Admin user found:', adminUser ? 'YES' : 'NO');
if (adminUser) {
  console.log('Admin user details:', {
    name: adminUser.name,
    email: adminUser.email,
    role: adminUser.role,
    hasPassword: !!adminUser.password
  });

  // Test password comparison
  const isPasswordValid = dummyDB.comparePassword('password123', adminUser.password);
  console.log('Password valid:', isPasswordValid);
}

// Test all users
const allUsers = dummyDB.getAll('users');
console.log('Total users in system:', allUsers.length);
console.log('User roles:', allUsers.map(u => u.role));

console.log('Admin login test completed!');
