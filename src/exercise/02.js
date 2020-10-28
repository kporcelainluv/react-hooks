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

  const [name, setName] = useLocalStorageState('name');
  

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
