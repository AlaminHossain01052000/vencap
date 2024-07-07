import  { useState, useEffect } from 'react';
import axios from 'axios';
import useFirebase from '../hooks/useFirebase';
import EachPageBanner from '../utilities/EachPageBanner';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ViewUsers = () => {
    const { deleteUser, admin, loading } = useAuth();
    const [users, setUsers] = useState([]);
    
    const navigate=useNavigate()
    useEffect(() => {
        fetchUsers();
        if(!admin){
            navigate('/')
        }
    }, [admin,navigate]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };

    const handleDeleteUser = async (email) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            await deleteUser(email);
            setUsers(users.filter(user => user.email !== email));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <EachPageBanner content='User List'/>
            <table className="table table-bordered my-5">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Balance</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.contact}</td>
                            <td>{user.balance}</td>
                            <td>{formatDate(user.date)}</td>
                            <td>
                                {admin && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteUser(user.email)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewUsers;
