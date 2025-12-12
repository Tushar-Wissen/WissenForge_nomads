import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plus, Check, X, Calendar, User } from 'lucide-react';

const Trainings = () => {
    const { user } = useAuth();
    const [trainings, setTrainings] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTraining, setNewTraining] = useState({
        title: '', description: '', date: '', type: 'Open', target_audience: ''
    });

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const res = await axios.get('/api/trainings');
            setTrainings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEnroll = async (id) => {
        try {
            await axios.post(`/api/trainings/${id}/enroll`);
            alert('Enrolled successfully!');
            fetchTrainings();
        } catch (err) {
            alert(err.response?.data?.message || 'Enrollment failed');
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.patch(`/api/trainings/${id}/approve`);
            fetchTrainings();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/trainings', newTraining);
            setShowCreateModal(false);
            setNewTraining({ title: '', description: '', date: '', type: 'Open', target_audience: '' });
            fetchTrainings();
        } catch (err) {
            alert('Failed to create training');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Trainings</h1>
                {['Admin', 'Super Admin'].includes(user.role) && (
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Create Training
                    </button>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {trainings.map((training) => (
                    <div key={training.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold text-slate-900">{training.title}</h3>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${training.type === 'Mandatory' ? 'bg-red-100 text-red-800' :
                                        training.type === 'Departmental' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                    {training.type}
                                </span>
                            </div>
                            <p className="mt-2 text-slate-600 text-sm">{training.description}</p>
                            <div className="mt-4 flex items-center text-sm text-slate-500">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(training.date).toLocaleDateString()}
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                {training.status === 'Pending' ? (
                                    <span className="text-yellow-600 text-sm font-medium flex items-center">
                                        Pending Approval
                                    </span>
                                ) : (
                                    <span className="text-green-600 text-sm font-medium flex items-center">
                                        <Check className="w-4 h-4 mr-1" /> Approved
                                    </span>
                                )}

                                <div className="flex gap-2">
                                    {user.role === 'Employee' && training.status === 'Approved' && (
                                        <button
                                            onClick={() => handleEnroll(training.id)}
                                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                        >
                                            Enroll
                                        </button>
                                    )}
                                    {user.role === 'Super Admin' && training.status === 'Pending' && (
                                        <button
                                            onClick={() => handleApprove(training.id)}
                                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                                        >
                                            Approve
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-bold mb-4">Create New Training</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <input
                                type="text" placeholder="Title" required
                                className="w-full border p-2 rounded"
                                value={newTraining.title}
                                onChange={e => setNewTraining({ ...newTraining, title: e.target.value })}
                            />
                            <textarea
                                placeholder="Description" required
                                className="w-full border p-2 rounded"
                                value={newTraining.description}
                                onChange={e => setNewTraining({ ...newTraining, description: e.target.value })}
                            />
                            <input
                                type="date" required
                                className="w-full border p-2 rounded"
                                value={newTraining.date}
                                onChange={e => setNewTraining({ ...newTraining, date: e.target.value })}
                            />
                            <select
                                className="w-full border p-2 rounded"
                                value={newTraining.type}
                                onChange={e => setNewTraining({ ...newTraining, type: e.target.value })}
                            >
                                <option value="Open">Open</option>
                                <option value="Mandatory">Mandatory</option>
                                <option value="Departmental">Departmental</option>
                            </select>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Trainings;
