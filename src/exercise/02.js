// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

const useLocalStorageState = (key, defaultValue = '') => {
  const [state, setState] = React.useState(() => window.localStorage.getItem(key) || defaultValue);

  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);
  
  return [state, setState];
};

function Greeting({initialName = ''}) {
  
  // 1
  // const [name, setName] = React.useState(window.localStorage.getItem('name') || initialName)

  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name);
  // }, []);

  // 2
  // const [name, setName] = React.useState(() => window.localStorage.getItem('name') || initialName)
  
  // 3
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name);
  // }, [name]);
  
  // 4 custom hook

  // const useLocalStorageState = (key, defaultValue = '') => {
  //   const [state, setState] = React.useState(() => window.localStorage.getItem(key) || defaultValue);
  //
  //   React.useEffect(() => {
  //     window.localStorage.setItem(key, state);
  //   }, [key, state]);
  //
  //   return [state, setState];
  // };
  
  // 5 flexible localStorage hook

  const useLocalStorageState = (
    key,
    defaultValue = '', 
    {serialize = JSON.stringify, deserialize = JSON.parse} = {},) => {
    const [state, setState] = React.useState(() => {
      const value = window.localStorage.getItem(key);
      if (value) {
        return deserialize(value);
      }
      return defaultValue;
    });

    const prevKeyRef = React.useRef(key);
    
    React.useEffect(() => {
      if (prevKeyRef.current !== key) {
        window.localStorage.removeItem(prevKeyRef.current);
      }
      prevKeyRef.current = key;
      window.localStorage.setItem(key, serialize(state));
    }, [key, state, serialize]);

    return [state, setState];
  };

  const [name, setName] = useLocalStorageState('name' );
  

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
