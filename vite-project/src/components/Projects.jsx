/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Project from './Project';
import EachPageBanner from '../utilities/EachPageBanner';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import pf from '../utilities/pf';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByValuation, setSortByValuation] = useState('Default');
    const [selectedCategory, setSelectedCategory] = useState('');
    const {user}=useAuth()
    const [userEmail,setUserEmail]=useState('')
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5001/projects');
                setProjects(response.data.filter(obj => {
                    const minimumReturnDate = new Date(obj.minimumReturnDate);
                    const today = new Date();
                    return pf(obj.equity) > 0 && minimumReturnDate > today;
                  }));
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProjects();
        setUserEmail(user?.email)
    }, [user]);

    // Filter projects by search term, category, and sort by valuation
    useEffect(() => {
        const filtered = projects.filter(project =>
            project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === '' || project.category === selectedCategory)
        );

        let sortedProjects = [...filtered];

        if (sortByValuation === 'Low to High') {
            sortedProjects.sort((a, b) => a.valuation - b.valuation);
        } else if (sortByValuation === 'High to Low') {
            sortedProjects.sort((a, b) => b.valuation - a.valuation);
        }

        setFilteredProjects(sortedProjects);
    }, [searchTerm, projects, selectedCategory, sortByValuation]);

    const handleSortByValuationChange = e => {
        setSortByValuation(e.target.value);
    };

    const handleCategoryChange = e => {
        setSelectedCategory(e.target.value);
        updateUserInterests(userEmail, e.target.value);
    };

    const handleSearchTermChange = e => {
        setSearchTerm(e.target.value);
    };

    const updateUserInterests = (email, category) => {
        const userInterests = JSON.parse(localStorage.getItem('userInterests')) || {};
        
        if (category) {
            userInterests[email] = userInterests[email] || {};
            userInterests[email][category] = (userInterests[email][category] || 0) + 1;
            localStorage.setItem('userInterests', JSON.stringify(userInterests));
        }
    };

    

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;

    return (
        <div>
            <EachPageBanner content='Projects' />
            <div className="container py-5">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Search by title"
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                            />
                            <select
                                className="form-select me-2"
                                aria-label="Sort by valuation"
                                value={sortByValuation}
                                onChange={handleSortByValuationChange}
                            >
                                <option value="Default">Default (Latest First)</option>
                                <option value="Low to High">Low to High</option>
                                <option value="High to Low">High to Low</option>
                            </select>
                            <select
                                className="form-select"
                                aria-label="Filter by category"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">All Categories</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Technology">Technology</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Finance">Finance</option>
                                <option value="Real State">Real State</option>
                                <option value="Others">Others</option>
                            </select>
                            {/* <button onClick={handleSearch} className="btn btn-primary">Search</button> */}
                        </div>
                    </div>
                </div>
                
                <div className="row row-cols-1 row-cols-md-3 g-4">
                
                    {filteredProjects.map(project => (
                        <div key={project._id} className="col">
                            <Project project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

Projects.propTypes = {
    userEmail: PropTypes.string.isRequired,
};

export default Projects;
