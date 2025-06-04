import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/getusers', { withCredentials: true })
            .then(res => setUsers(res.data))
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-5 text-left">#</th>
                            <th className="py-3 px-5 text-left">Picture</th>
                            <th className="py-3 px-5 text-left">Name</th>
                            <th className="py-3 px-5 text-left">Username</th>
                            <th className="py-3 px-5 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">No users found</td>
                            </tr>
                        ) : (
                            users.map((user, index) => (
                                <tr key={index} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-5">{index + 1}</td>
                                    <td className="py-2 px-4">
                                        {user.file ? (
                                            <img
                                                src={`http://localhost:3000/images/uploads/${user.file}`}
                                                alt="User"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />

                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>

                                    <td className="py-3 px-5">{user.name}</td>
                                    <td className="py-3 px-5">{user.username}</td>
                                    <td className="py-3 px-5">{user.email}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
