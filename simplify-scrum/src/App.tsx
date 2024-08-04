import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="d-flex w-100 h-100">
        <Outlet/>
    </div>
  );
}

export default App;
