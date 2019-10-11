const fullKeyFor = (prefix, key) => `hours.${prefix}.${key}`;

function createGetStoredState(prefix) {
  return (key, defaultValue) => {
    const storedValue = localStorage.getItem(fullKeyFor(prefix, key));
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  };
}

function createStoreState(prefix) {
  return (key, value) => {
    localStorage.setItem(fullKeyFor(prefix, key), JSON.stringify(value));
    return value;
  };
}

export default function storedState(prefix) {
  const getStoredState = createGetStoredState(prefix);
  const storeState = createStoreState(prefix);
  return { getStoredState, storeState };
}
