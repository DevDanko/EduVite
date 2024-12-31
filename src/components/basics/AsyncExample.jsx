import React, { useState } from 'react';
import { Typography, Box, Button, Paper, CircularProgress, TextField } from '@mui/material';

const AsyncExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postId, setPostId] = useState(1);

  // Basic Promise example
  const createPromise = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random > 0.5) {
          resolve('Promise resolved successfully!');
        } else {
          reject('Promise rejected!');
        }
      }, 1000);
    });
  };

  // Async function with Promise
  const handlePromise = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await createPromise();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Multiple async operations
  const fetchMultipleData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [postResponse, commentsResponse] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      ]);

      const [post, comments] = await Promise.all([
        postResponse.json(),
        commentsResponse.json()
      ]);

      setData({ post, comments });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Async Programming Examples</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Basic Promise Example</Typography>
        <Button 
          variant="contained" 
          onClick={handlePromise} 
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Test Promise'}
        </Button>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Fetch Data Example</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Post ID"
            type="number"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          />
          <Button 
            variant="contained" 
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Fetch Post'}
          </Button>
          <Button 
            variant="contained" 
            onClick={fetchMultipleData}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Fetch Post & Comments'}
          </Button>
        </Box>
      </Paper>

      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: '#ffebee' }}>
          <Typography color="error">Error: {error}</Typography>
        </Paper>
      )}

      {data && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Result:</Typography>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </Paper>
      )}
    </Box>
  );
};

export default AsyncExample;
