import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import ArrayMethods from './components/basics/ArrayMethods';
import DestructuringExample from './components/basics/DestructuringExample';
import ArrowFunctions from './components/basics/ArrowFunctions';
import AsyncExample from './components/basics/AsyncExample';
import './App.css';

const App = () => {
  const menuItems = [
    { path: '/array-methods', name: 'Array Methods', component: ArrayMethods },
    { path: '/destructuring', name: 'Destructuring', component: DestructuringExample },
    { path: '/arrow-functions', name: 'Arrow Functions', component: ArrowFunctions },
    { path: '/async', name: 'Async Programming', component: AsyncExample },
  ];

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6">React & JS Learning</Typography>
          </Toolbar>
        </AppBar>
        
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              marginTop: '64px',
            },
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem button component={Link} to={item.path} key={item.path}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: '64px',
            marginLeft: '240px',
          }}
        >
          <Container>
            <Routes>
              {menuItems.map((item) => (
                <Route
                  key={item.path}
                  path={item.path}
                  element={<item.component />}
                />
              ))}
              <Route
                path="/"
                element={
                  <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to React & JavaScript Learning Platform
                  </Typography>
                }
              />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
