import  { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const MyProjects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
const {user}=useAuth();


    useEffect(() => {
        axios.get('http://localhost:5000/projects')
            .then(response => {
                setProjects(response?.data?.filter(project=>project?.ownersInfo?.email!==user?.email));
            //    (projects.map(project=>project?.investorsInfo?.map(investor=>console.log(investor))))
            })
            .catch(error => {
                console.error("There was an error fetching the projects!", error);
            });
    }, [projects,user]);

    const handleDetailsClick = (projectId) => {
        navigate(`/projectdetail/${projectId}`);
    };

    return (
        projects?.length===0?
        <h1 className='text-center mt-5'>There is no project</h1>
        :
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
                                    {project?.investorsInfo?.map((investor,index)=><li key={index}>{investor.email}</li>)}
                                    {/* <ul>
                                       {
                                        project.investorsInfo?.map((investor,id)=>{<li key={id}>{investor.email}</li>})
                                       }
                                    </ul> */}

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
