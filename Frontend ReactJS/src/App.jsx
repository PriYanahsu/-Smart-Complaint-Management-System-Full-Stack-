import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import ComplaintList from './pages/ComplainList';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UserHome from './pages/UserHome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/complaints" element={<ComplaintList />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;
