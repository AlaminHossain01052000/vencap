import  { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const MyProjects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/projects')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the projects!", error);
            });
    }, []);

    const handleDetailsClick = (projectId) => {
        navigate(`/projectdetail/${projectId}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">My Projects</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>No</th>
                            <th>Project Title</th>
                            <th>Amount</th>
                            <th>Valuation</th>
                            <th>Equity</th>
                            <th>Investors (Email ID)</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={project?.id}>
                                <td>{index + 1}</td>
                                <td>{project?.title}</td>
                                <td>{project?.amount}</td>
                                <td>{project?.valuation}</td>
                                <td>{project?.equity}</td>
                                <td>
                                    <ul>
                                       {
                                        project?.investors?.map((investor,id)=>{<li key={id}>{investor}</li>})
                                       }
                                    </ul>

                                </td>
                                <td>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => handleDetailsClick(project?.id)}
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProjects;
