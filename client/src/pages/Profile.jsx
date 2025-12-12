import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Briefcase, Award } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`/api/users/${user.id}/profile`);
                setProfile(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, [user.id]);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6 flex items-center">
                    <div className="bg-indigo-100 rounded-full p-3 mr-4">
                        <User className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-slate-900">
                            {profile.name}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-slate-500">
                            {profile.role} - {profile.department}
                        </p>
                    </div>
                </div>
                <div className="border-t border-slate-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-slate-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-slate-500 flex items-center">
                                <Mail className="w-4 h-4 mr-2" /> Email
                            </dt>
                            <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                                {profile.email}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-slate-500 flex items-center">
                                <Briefcase className="w-4 h-4 mr-2" /> Tech Stack
                            </dt>
                            <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                                {profile.tech_stack || 'Not specified'}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-4">Training History</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-slate-200">
                    {profile.Enrollments && profile.Enrollments.length > 0 ? (
                        profile.Enrollments.map((enrollment) => (
                            <li key={enrollment.id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-indigo-600 truncate">
                                            {enrollment.Training.title}
                                        </p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${enrollment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {enrollment.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-slate-500">
                                                <Award className="flex-shrink-0 mr-1.5 h-5 w-5 text-slate-400" />
                                                {enrollment.Training.type}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-slate-500 sm:mt-0">
                                            <p>
                                                Date: {new Date(enrollment.Training.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-4 sm:px-6 text-center text-slate-500">
                            No trainings enrolled yet.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
