import  { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import {  Card, Col, Container, Row } from 'react-bootstrap';
import './HomeProjects.css'
import SwipeRightButton from '../utilities/SwipeRightButton';
const HomeProjects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
   
    useEffect(() => {
        // Fetching projects data
        const fetchProjects = async () => {
            try {
                 const response=await axios.get('http://localhost:5000/projects')
                    // console.log(response?.data)
             
                // Sorting projects by additionTime in descending order
                const sortedProjects = response?.data?.sort((a, b) => new Date(b.additionTime) - new Date(a.additionTime));
                setProjects(sortedProjects.slice(0,Math.min(6,sortedProjects.length)));
                // console.log(projects)
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, [projects]);

    const handleCardClick = (id) => {
        navigate(`/projectdetail/${id}`);
    };
    const handleGoToExplorePage=()=>{
        navigate("/projects")
        console.log("Click")
    }

    return (
        <Container>
            <h1 className="text-center mb-5" style={{color:'#001140'}}>Projects</h1>
            <Row>
                {projects?.map((project) => (
                    <Col key={project?._id} md={4} className="mb-4">
                        <Card onClick={() => handleCardClick(project?._id)} className='h-100'>
                            <div className='home-projects-card-image-container'>
                                <Card.Img variant="top" 
                                src={project?.image===undefined?`https://ui-avatars.com/api/?name=${project?.title}`:`data:image/png;base64,${project?.image}`} 
                                alt={project?.title} 
                                className="home-projects-card-image w-100 h-100" 
                               
                                />
                                <Card.Body className='home-projects-card-body'>
                                    <Card.Title className="fw-bold text-center" style={{color:'#FFFFFF'}}>{project?.title}</Card.Title>
                                    <Card.Text className="fw-bold" style={{color:'#FFFFFF'}}>
                                        Amount: ৳{project?.amount} <br />
                                        Equity: {project?.equity}% <br />
                                        Valuation: ৳{project?.valuation}
                                    </Card.Text>
                                </Card.Body>
                            </div>
                            
                        </Card>
                    </Col>
                ))}
            </Row>
            <div  onClick={handleGoToExplorePage}>
            <SwipeRightButton content="Explore More"/>

            </div>
                {/* <Button variant="primary" onClick={handleGoToExplorePage}>Explore More</Button> */}
            
        </Container>
    );
};

export default HomeProjects;
