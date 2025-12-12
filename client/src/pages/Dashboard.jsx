import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { CheckCircle, Clock, BookOpen, Users } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        enrolled: 0,
        completed: 0,
        pending: 0,
        totalTrainings: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                if (user.role === 'Employee') {
                    const res = await axios.get(`/api/users/${user.id}/profile`);
                    const enrollments = res.data.Enrollments || [];
                    setStats({
                        enrolled: enrollments.filter(e => e.status === 'Enrolled').length,
                        completed: enrollments.filter(e => e.status === 'Completed').length,
                        pending: 0, // Could be pending approvals
                        totalTrainings: enrollments.length
                    });
                } else {
                    // Admin stats
                    const res = await axios.get('/api/trainings');
                    setStats({
                        totalTrainings: res.data.length,
                        pending: res.data.filter(t => t.status === 'Pending').length,
                        enrolled: 0, // Placeholder
                        completed: 0 // Placeholder
                    });
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, [user]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Welcome back, {user.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <BookOpen className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-slate-500 truncate">
                                        {user.role === 'Employee' ? 'Enrolled Trainings' : 'Total Trainings'}
                                    </dt>
                                    <dd className="text-lg font-medium text-slate-900">
                                        {user.role === 'Employee' ? stats.enrolled : stats.totalTrainings}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-slate-500 truncate">
                                        {user.role === 'Employee' ? 'Completed' : 'Approved'}
                                    </dt>
                                    <dd className="text-lg font-medium text-slate-900">
                                        {user.role === 'Employee' ? stats.completed : stats.totalTrainings - stats.pending}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {user.role !== 'Employee' && (
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Clock className="h-6 w-6 text-yellow-500" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-slate-500 truncate">
                                            Pending Approval
                                        </dt>
                                        <dd className="text-lg font-medium text-slate-900">
                                            {stats.pending}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    {user.role === 'Employee' ? (
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                            Browse Trainings
                        </button>
                    ) : (
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                            Create New Training
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
