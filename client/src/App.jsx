import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Trainings from './pages/Trainings';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/trainings" element={<Trainings />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
