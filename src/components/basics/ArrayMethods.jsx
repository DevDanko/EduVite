import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Button, 
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const ArrayMethods = () => {
  // Initial state with sample data
  const [items, setItems] = useState([
    { id: 1, name: 'iPhone', price: 999, category: 'Electronics' },
    { id: 2, name: 'Book', price: 15, category: 'Books' },
    { id: 3, name: 'Laptop', price: 1200, category: 'Electronics' },
    { id: 4, name: 'Coffee', price: 5, category: 'Food' },
  ]);

  const [newItem, setNewItem] = useState({ name: '', price: '', category: '' });
  const [filterCategory, setFilterCategory] = useState('');

  // Demonstration of map()
  const mappedItems = items.map(item => ({
    ...item,
    displayName: `${item.name} - $${item.price}`
  }));

  // Demonstration of filter()
  const filteredItems = items.filter(item => 
    filterCategory ? item.category.toLowerCase() === filterCategory.toLowerCase() : true
  );

  // Demonstration of reduce()
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  // Handler for adding new items
  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      setItems([...items, { ...newItem, id: items.length + 1, price: Number(newItem.price) }]);
      setNewItem({ name: '', price: '', category: '' });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Array Methods Examples</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Add New Item</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <TextField
            label="Price"
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <TextField
            label="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          />
          <Button variant="contained" onClick={handleAddItem}>Add Item</Button>
        </Box>

        <TextField
          label="Filter by Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Display Name (mapped)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{mappedItems.find(i => i.id === item.id)?.displayName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Total Price (reduced): ${totalPrice}
        </Typography>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Array Methods Used:</Typography>
        <Typography>
          <strong>map():</strong> Used to create displayName by combining name and price
        </Typography>
        <Typography>
          <strong>filter():</strong> Used to filter items by category
        </Typography>
        <Typography>
          <strong>reduce():</strong> Used to calculate total price
        </Typography>
        <Typography>
          <strong>find():</strong> Used to find mapped item for display name
        </Typography>
      </Paper>
    </Box>
  );
};

export default ArrayMethods;
