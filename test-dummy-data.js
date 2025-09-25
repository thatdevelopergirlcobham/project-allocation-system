import * as dummyDB from './lib/dummyData';

// Test the dummy data functionality
console.log('Testing dummy data system...');

// Test getting all users
const users = dummyDB.getAll('users');
console.log('Total users:', users.length);

// Test getting a specific user
const adminUser = dummyDB.getById('users', 'admin1');
console.log('Admin user:', adminUser?.name);

// Test finding users by role
const students = dummyDB.find('users', { role: 'student' });
console.log('Total students:', students.length);

// Test creating a new user
const newUser = dummyDB.create('users', {
  name: 'Test User',
  email: 'test@example.com',
  role: 'student',
  department: 'Computer Science',
  matricNumber: 'TEST001',
  isActive: true
});
console.log('Created user:', newUser._id);

// Test updating a user
const updatedUser = dummyDB.updateById('users', newUser._id, {
  name: 'Updated Test User'
});
console.log('Updated user name:', updatedUser?.name);

// Test deleting a user
const deleted = dummyDB.deleteById('users', newUser._id);
console.log('User deleted:', deleted);

console.log('Dummy data system test completed successfully!');
