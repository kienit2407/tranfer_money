import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Transfer from './pages/Transfer';
import History from './pages/History';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div style={{ paddingBottom: '40px' }}>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/history" element={<History />} />
          {/* Default to Transfer as home for now, or create a Dashboard. 
              Let's redirect "/" to "/transfer" since that's a main feature, 
              or make Transfer the refined Home. 
          */}
          <Route path="/" element={<Navigate to="/transfer" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
