import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';

const HomeProject = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        // Fetching project data by ID
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/project/${id}`);
                setProject(response.data);
                // console.log(response.data)
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchProject();
    }, [id]);


    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-4">
            <Card>
                <div>
                    <Card.Img variant="top" src={project?.image===undefined?`https://ui-avatars.com/api/?name=${project?.title}`:`data:image/png;base64,${project?.image[0]}`} alt={project.title} />
                    <Card.Body className='home-project-card-cody'>
                        <Card.Title>{project.title}</Card.Title>
                        <Card.Text>
                            Description: {project.description} <br />
                            Amount: ৳{project.amount} <br />
                            Equity: {project.equity}% <br />
                            Valuation: ৳{project.valuation} <br />
                            Return Date: {project.minimumReturnDate} <br />
                            Owner: {project.ownersInfo.name} <br />
                            Category: {project.category}
                        </Card.Text>
                    </Card.Body>
                </div>
                
            </Card>
        </Container>
    );
};

export default HomeProject;
