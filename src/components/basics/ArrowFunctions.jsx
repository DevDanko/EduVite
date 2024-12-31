import React, { useState } from 'react';
import { Typography, Box, Paper, TextField, Button, Alert } from '@mui/material';

const ArrowFunctions = () => {
  // State for calculator
  const [numbers, setNumbers] = useState({ a: '', b: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Basic arrow function
  const add = (a, b) => a + b;

  // Arrow function with single parameter
  const square = x => x * x;

  // Arrow function with no parameters
  const getRandomNumber = () => Math.floor(Math.random() * 100);

  // Arrow function with multiple statements
  const calculate = (a, b, operation) => {
    const num1 = Number(a);
    const num2 = Number(b);
    
    // Validate input
    if (isNaN(num1) || isNaN(num2)) {
      throw new Error('Please enter valid numbers');
    }

    switch(operation) {
      case 'add': return add(num1, num2);
      case 'multiply': return num1 * num2;
      case 'subtract': return num1 - num2;
      case 'divide': 
        if (num2 === 0) throw new Error('Cannot divide by zero');
        return num1 / num2;
      default: throw new Error('Invalid operation');
    }
  };

  // Arrow function in array methods
  const numbers2 = [1, 2, 3, 4, 5];
  const doubled = numbers2.map(num => num * 2);
  const evenNumbers = numbers2.filter(num => num % 2 === 0);
  const sum = numbers2.reduce((acc, curr) => acc + curr, 0);

  // Complex array operations with arrow functions
  const operations = {
    square: x => x * x,
    double: x => x * 2,
    addFive: x => x + 5
  };

  const chainedOperations = numbers2
    .map(operations.square)
    .filter(x => x > 10)
    .reduce((acc, curr) => acc + curr, 0);

  // Handler for calculator
  const handleCalculate = (operation) => {
    setError(null);
    try {
      if (!numbers.a || !numbers.b) {
        throw new Error('Please fill in both numbers');
      }
      const calculatedResult = calculate(numbers.a, numbers.b, operation);
      setResult(calculatedResult);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handler for random number
  const handleRandomNumber = () => {
    setError(null);
    setResult(getRandomNumber());
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Arrow Functions Examples</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Calculator Example</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Number A"
            type="number"
            value={numbers.a}
            onChange={(e) => setNumbers({ ...numbers, a: e.target.value })}
            error={error && !numbers.a}
          />
          <TextField
            label="Number B"
            type="number"
            value={numbers.b}
            onChange={(e) => setNumbers({ ...numbers, b: e.target.value })}
            error={error && !numbers.b}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button variant="contained" onClick={() => handleCalculate('add')}>Add</Button>
          <Button variant="contained" onClick={() => handleCalculate('subtract')}>Subtract</Button>
          <Button variant="contained" onClick={() => handleCalculate('multiply')}>Multiply</Button>
          <Button variant="contained" onClick={() => handleCalculate('divide')}>Divide</Button>
          <Button variant="contained" onClick={handleRandomNumber}>Random Number</Button>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {result !== null && <Alert severity="success">Result: {result}</Alert>}
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Array Operations Example</Typography>
        <Typography>Original array: [{numbers2.join(', ')}]</Typography>
        <Typography>Doubled: [{doubled.join(', ')}]</Typography>
        <Typography>Even numbers: [{evenNumbers.join(', ')}]</Typography>
        <Typography>Sum: {sum}</Typography>
        <Typography>Result of chained operations: {chainedOperations}</Typography>
      </Paper>
    </Box>
  );
};

export default ArrowFunctions;
