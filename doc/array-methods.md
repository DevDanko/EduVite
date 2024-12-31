# Array Methods in JavaScript and React

## Overview

Modern JavaScript provides powerful array methods for data manipulation. This document covers the most commonly used array methods and their implementation in React components.

## Common Array Methods

### map()
```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
// Result: [2, 4, 6]
```

### filter()
```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
// Result: [2, 4]
```

### reduce()
```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
// Result: 10
```

### forEach()
```javascript
const array = ['a', 'b', 'c'];
array.forEach(item => console.log(item));
// Logs: 'a', 'b', 'c'
```

## Use Cases in React

### Rendering Lists
```javascript
const items = ['Item 1', 'Item 2', 'Item 3'];

return (
    <ul>
        {items.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ul>
);
```

### Data Transformation
```javascript
const transformData = (rawData) => {
    return rawData
        .filter(item => item.active)
        .map(item => ({
            id: item.id,
            name: item.name.toUpperCase()
        }));
};
```

### State Updates
```javascript
const addItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
};

const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
};
```

## Best Practices

1. **Always Use Keys in Lists**
   ```javascript
   {items.map(item => (
       <ListItem key={item.id}>{item.name}</ListItem>
   ))}
   ```

2. **Immutable State Updates**
   ```javascript
   // Good
   setItems(prevItems => [...prevItems, newItem]);
   
   // Avoid
   items.push(newItem); // Mutates original array
   ```

3. **Method Chaining**
   ```javascript
   const result = data
       .filter(item => item.active)
       .map(item => item.value)
       .reduce((sum, value) => sum + value, 0);
   ```

## Performance Considerations

1. **Memoization**
   ```javascript
   const memoizedTransform = useMemo(() => {
       return expensiveArrayOperation(data);
   }, [data]);
   ```

2. **Avoiding Unnecessary Iterations**
   ```javascript
   // Instead of multiple separate operations
   const filtered = array.filter(x => x > 0);
   const mapped = filtered.map(x => x * 2);
   
   // Combine operations in one iteration
   const result = array.reduce((acc, x) => {
       if (x > 0) acc.push(x * 2);
       return acc;
   }, []);
   ```

## Common Pitfalls

1. **Mutating State Directly**
2. **Forgetting Keys in Lists**
3. **Unnecessary Array Methods**
4. **Not Considering Performance with Large Arrays**

## Additional Array Methods

### find()
```javascript
const array = [{id: 1}, {id: 2}];
const item = array.find(item => item.id === 1);
```

### some()
```javascript
const hasNegative = numbers.some(num => num < 0);
```

### every()
```javascript
const allPositive = numbers.every(num => num > 0);
```

### includes()
```javascript
const fruits = ['apple', 'banana'];
const hasApple = fruits.includes('apple'); // true
```
