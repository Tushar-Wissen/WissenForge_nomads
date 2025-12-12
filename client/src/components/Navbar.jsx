import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, BookOpen, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="bg-white shadow-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-indigo-600">WissenForge</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className="text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 text-sm font-medium">
                                <LayoutDashboard className="w-4 h-4 mr-2" />
                                Dashboard
                            </Link>
                            <Link to="/trainings" className="text-slate-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Trainings
                            </Link>
                            <Link to="/profile" className="text-slate-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                <User className="w-4 h-4 mr-2" />
                                Profile
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-slate-500 mr-4">
                            {user.name} ({user.role})
                        </span>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
