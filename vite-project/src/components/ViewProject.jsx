import { useState, useEffect } from 'react';
import axios from 'axios';
import EachPageBanner from '../utilities/EachPageBanner';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ViewProject = () => {
    const [projects, setProjects] = useState([]);
    const {admin}=useAuth()
    const navigate=useNavigate()
    useEffect(() => {
        fetchProjects();
        if(!admin){
            navigate("/")
        }
    }, [admin,navigate]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5001/projects');
            setProjects(response.data);
        } catch (error) {
            console.error("There was an error fetching the projects!", error);
        }
    };

    const deleteProject = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5001/projects/${id}`);
                setProjects(projects.filter(project => project._id !== id));
            } catch (error) {
                console.error("There was an error deleting the project!", error);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="container mt-5">
            <EachPageBanner content="Project List"/>
            <table className="table table-bordered my-5">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Owner Email</th>
                        <th>Addition Time</th>
                        <th>Amount</th>
                        <th>Equity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project?._id}>
                            <td>{project?.title}</td>
                            <td>{project?.description}</td>
                            <td>{project?.ownersInfo?.email}</td>
                            <td>{formatDate(project?.additionTime)}</td>
                            <td>{project?.amount}</td>
                            <td>{project?.equity}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteProject(project?._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewProject;
