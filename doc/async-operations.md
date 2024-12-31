# Asynchronous Operations in React

## Overview

This document covers asynchronous programming concepts in React, including Promises, async/await, and handling asynchronous operations in React components.

## Promises

### Basic Promise Syntax
```javascript
const myPromise = new Promise((resolve, reject) => {
    // Async operation
    if (success) {
        resolve(result);
    } else {
        reject(error);
    }
});
```

### Promise Methods
```javascript
// Then/Catch Chain
myPromise
    .then(result => {
        // Handle success
    })
    .catch(error => {
        // Handle error
    })
    .finally(() => {
        // Always executes
    });

// Promise.all
Promise.all([promise1, promise2])
    .then(results => {
        // All promises resolved
    });

// Promise.race
Promise.race([promise1, promise2])
    .then(firstResult => {
        // First resolved promise
    });
```

## Async/Await

### Basic Syntax
```javascript
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### In React Components
```javascript
const MyComponent = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await api.getData();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;
    if (!data) return null;

    return <DisplayData data={data} />;
};
```

## Error Handling

### Try/Catch Pattern
```javascript
async function handleSubmit() {
    try {
        await submitData();
        // Success handling
    } catch (error) {
        // Error handling
    }
}
```

### Error Boundaries
```javascript
class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        logErrorToService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFallback />;
        }
        return this.props.children;
    }
}
```

## Best Practices

1. **Loading States**
   ```javascript
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
       const loadData = async () => {
           setIsLoading(true);
           try {
               const result = await fetchData();
               setData(result);
           } catch (err) {
               setError(err);
           } finally {
               setIsLoading(false);
           }
       };
       loadData();
   }, []);
   ```

2. **Cleanup in useEffect**
   ```javascript
   useEffect(() => {
       let isMounted = true;

       const fetchData = async () => {
           try {
               const result = await api.getData();
               if (isMounted) {
                   setData(result);
               }
           } catch (error) {
               if (isMounted) {
                   setError(error);
               }
           }
       };

       fetchData();

       return () => {
           isMounted = false;
       };
   }, []);
   ```

3. **Cancelling Requests**
   ```javascript
   useEffect(() => {
       const abortController = new AbortController();

       const fetchData = async () => {
           try {
               const response = await fetch(url, {
                   signal: abortController.signal
               });
               const data = await response.json();
               setData(data);
           } catch (error) {
               if (error.name === 'AbortError') {
                   // Handle abort
               } else {
                   setError(error);
               }
           }
       };

       fetchData();

       return () => {
           abortController.abort();
       };
   }, [url]);
   ```

## Common Patterns

### Debouncing
```javascript
const debouncedSearch = useCallback(
    debounce((searchTerm) => {
        performSearch(searchTerm);
    }, 500),
    []
);
```

### Polling
```javascript
useEffect(() => {
    const interval = setInterval(async () => {
        try {
            const data = await fetchUpdates();
            setUpdates(data);
        } catch (error) {
            console.error('Polling error:', error);
        }
    }, 5000);

    return () => clearInterval(interval);
}, []);
```

## Performance Considerations

1. **Caching Results**
   ```javascript
   const { data, error } = useSWR(key, fetcher, {
       revalidateOnFocus: false,
       dedupingInterval: 2000
   });
   ```

2. **Race Conditions**
   ```javascript
   useEffect(() => {
       let isLatestRequest = true;

       async function fetchData() {
           const response = await api.getData(id);
           if (isLatestRequest) {
               setData(response);
           }
       }

       fetchData();

       return () => {
           isLatestRequest = false;
       };
   }, [id]);
   ```
