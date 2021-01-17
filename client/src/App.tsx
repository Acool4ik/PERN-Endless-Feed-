import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const baseurl = process.env.REACT_APP_BASE_URL

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <a href={`${baseurl}/backend/download`} download>
        download
        </a>
      </header>
    </div>
  );
}

export default App;
