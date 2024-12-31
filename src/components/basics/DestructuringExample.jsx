import React, { useState } from 'react';
import { Typography, Box, Paper, TextField, Button } from '@mui/material';

const DestructuringExample = () => {
  // Sample object for demonstration
  const [user, setUser] = useState({
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Boston',
      country: 'USA'
    },
    hobbies: ['reading', 'gaming', 'coding']
  });

  // Basic object destructuring
  const { name, age } = user;

  // Nested object destructuring
  const { address: { city, country } } = user;

  // Array destructuring
  const [firstHobby, secondHobby, thirdHobby] = user.hobbies;

  // Example of destructuring in function parameters
  const UserInfo = ({ name, age, address: { city } }) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1">Name: {name}</Typography>
      <Typography variant="body1">Age: {age}</Typography>
      <Typography variant="body1">City: {city}</Typography>
    </Box>
  );

  // Form state for updating user
  const [newUserData, setNewUserData] = useState({
    name: '',
    age: '',
    city: ''
  });

  // Update user data
  const handleUpdateUser = () => {
    setUser(prevUser => ({
      ...prevUser,
      name: newUserData.name || prevUser.name,
      age: newUserData.age || prevUser.age,
      address: {
        ...prevUser.address,
        city: newUserData.city || prevUser.address.city
      }
    }));
    setNewUserData({ name: '', age: '', city: '' });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Destructuring Examples</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Basic Object Destructuring</Typography>
        <Typography variant="body1">Name: {name}</Typography>
        <Typography variant="body1">Age: {age}</Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Nested Object Destructuring</Typography>
        <Typography variant="body1">City: {city}</Typography>
        <Typography variant="body1">Country: {country}</Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Array Destructuring</Typography>
        <Typography variant="body1">First Hobby: {firstHobby}</Typography>
        <Typography variant="body1">Second Hobby: {secondHobby}</Typography>
        <Typography variant="body1">Third Hobby: {thirdHobby}</Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Update User Data</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Name"
            value={newUserData.name}
            onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
          />
          <TextField
            label="Age"
            type="number"
            value={newUserData.age}
            onChange={(e) => setNewUserData({ ...newUserData, age: e.target.value })}
          />
          <TextField
            label="City"
            value={newUserData.city}
            onChange={(e) => setNewUserData({ ...newUserData, city: e.target.value })}
          />
          <Button variant="contained" onClick={handleUpdateUser}>
            Update User
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Component with Destructured Props</Typography>
        <UserInfo name={name} age={age} address={{ city }} />
      </Paper>
    </Box>
  );
};

export default DestructuringExample;
