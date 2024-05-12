export const saveToLocalStorage = (key, state) => {
    if (typeof window !== 'undefined') {
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
      } catch (e) {
        console.error('Could not save to local storage:', e);
      }
    }
  };
  
  // src/utils/localStorage.js
  export const loadFromLocalStorage = (key, defaultValue = {}) => {
    if (typeof window !== 'undefined') {
      try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
          return defaultValue;
        }
        return JSON.parse(serializedState);
      } catch (e) {
        console.error('Could not load from local storage:', e);
      }
    }
    return defaultValue;
  };