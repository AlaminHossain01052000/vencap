import { useState, useEffect } from 'react';
import axios from 'axios';
import Project from './Project';
import useAuth from '../hooks/useAuth';
import { textColor } from '../utilities/color';

const RecommendedProjects = () => {
    const [recommendedProjects, setRecommendedProjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const {user}=useAuth();
    useEffect(() => {
        const fetchRecommendedProjects = async () => {
            try {
                const userInterests = JSON.parse(localStorage.getItem('userInterests')) || {};
                const userCategories = userInterests[user?.email] || {};
                // console.log(userCategories)
                const categoryPreference = Object.keys(userCategories).sort((a, b) => userCategories[b] - userCategories[a]);

                const response = await axios.get('http://localhost:5000/projects');
                let projects = response.data;

                projects.sort((a, b) => {
                    const aCategoryIndex = categoryPreference.indexOf(a.category);
                    const bCategoryIndex = categoryPreference.indexOf(b.category);

                    if (aCategoryIndex !== bCategoryIndex) {
                        return (aCategoryIndex === -1 ? Number.MAX_SAFE_INTEGER : aCategoryIndex) - 
                               (bCategoryIndex === -1 ? Number.MAX_SAFE_INTEGER : bCategoryIndex);
                    }

                    return b.valuation - a.valuation || new Date(b.additionTime) - new Date(a.additionTime);
                });

                setRecommendedProjects(projects.slice(0, 3));
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchRecommendedProjects();
    }, [user]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;

    return (
        <div className='container'>
            <h3 className="my-5 me-5" style={{color:`${textColor()}`}}>Recommended Projects <i className="fas fa-caret-right my-5"></i></h3>
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                {recommendedProjects.map(project => (
                    <div key={project._id} className="col">
                        <Project project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedProjects;
