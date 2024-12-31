# Destructuring in JavaScript and React

## Overview

Destructuring is a JavaScript feature that allows you to extract values from objects and arrays into distinct variables. This document covers various destructuring patterns and their applications in React.

## Object Destructuring

### Basic Syntax
```javascript
const person = { name: 'John', age: 30 };
const { name, age } = person;
```

### Renaming Variables
```javascript
const { name: firstName, age: years } = person;
console.log(firstName); // 'John'
console.log(years); // 30
```

### Default Values
```javascript
const { name = 'Anonymous', age = 0 } = person;
```

### Nested Objects
```javascript
const user = {
    id: 1,
    details: {
        firstName: 'John',
        lastName: 'Doe'
    }
};

const { details: { firstName, lastName } } = user;
```

## Array Destructuring

### Basic Syntax
```javascript
const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;
```

### Skipping Elements
```javascript
const [first, , third] = colors;
```

### Rest Pattern
```javascript
const [head, ...tail] = colors;
console.log(head); // 'red'
console.log(tail); // ['green', 'blue']
```

### Default Values
```javascript
const [first = 'black', second = 'white'] = colors;
```

## React Applications

### Function Components
```javascript
const UserProfile = ({ name, age, email = 'N/A' }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
        </div>
    );
};
```

### Hooks
```javascript
const [count, setCount] = useState(0);
const { data, loading, error } = useFetch('/api/data');
```

### Event Handlers
```javascript
const handleChange = ({ target: { value } }) => {
    setValue(value);
};
```

## Common Patterns

### Props Destructuring
```javascript
// In the component parameter
const Component = ({ prop1, prop2, children }) => {
    return (/* JSX */);
};

// Inside the component
const Component = (props) => {
    const { prop1, prop2, children } = props;
    return (/* JSX */);
};
```

### State Destructuring
```javascript
const [state, setState] = useState({
    loading: false,
    data: null,
    error: null
});

const { loading, data, error } = state;
```

### Context Destructuring
```javascript
const { theme, toggleTheme } = useContext(ThemeContext);
```

## Best Practices

1. **Destructuring in Function Parameters**
   ```javascript
   // Good
   function UserCard({ name, age, email }) {
       return (/* JSX */);
   }

   // Avoid
   function UserCard(props) {
       const name = props.name;
       const age = props.age;
       const email = props.email;
       return (/* JSX */);
   }
   ```

2. **Using Aliases for Clarity**
   ```javascript
   const { data: userData, loading: userLoading } = useUser();
   const { data: orderData, loading: orderLoading } = useOrders();
   ```

3. **Nested Destructuring**
   ```javascript
   const {
       user: { firstName, lastName },
       settings: { theme }
   } = data;
   ```

## Common Use Cases

### API Response Handling
```javascript
async function fetchUser() {
    const response = await fetch('/api/user');
    const { data: { user, permissions }, meta } = await response.json();
    return { user, permissions, meta };
}
```

### Component Props
```javascript
function UserList({ users, onUserSelect, renderItem }) {
    return users.map(({ id, name, email }) => (
        renderItem({ id, name, email })
    ));
}
```

### Custom Hooks
```javascript
function useFormField(initialValue = '') {
    const [value, setValue] = useState(initialValue);
    
    const handleChange = ({ target: { value: newValue } }) => {
        setValue(newValue);
    };

    return [value, handleChange];
}
```

## Pitfalls to Avoid

1. **Deeply Nested Destructuring**
   ```javascript
   // Avoid
   const { user: { address: { street: { name } } } } = data;

   // Better
   const { user } = data;
   const streetName = user?.address?.street?.name;
   ```

2. **Missing Default Values**
   ```javascript
   // Risky
   const { data } = response;

   // Safer
   const { data = [] } = response;
   ```

3. **Unnecessary Destructuring**
   ```javascript
   // Unnecessary
   const { length } = array;
   console.log(length);

   // Better
   console.log(array.length);
   ```
