
import PropTypes from 'prop-types';
import './Project.css'
import { useNavigate } from 'react-router-dom';
import { currencyFormatter } from '../utilities/others';

const Project = ({ project }) => {
    const { _id,title, amount, equity, image, valuation,interest } = project||{};


const navigate=useNavigate()
    const handleNavigateToProjectDetailPage=()=>{
       
            navigate(`/projectdetail/${_id}`);
        
        
        
       
    }
    
    return (
        <div className="card single-project-card">
            {/* Project image */}
            <div className='single-project-card-image-container' onClick={handleNavigateToProjectDetailPage}>
                <img 
                
                // src={image===undefined?`https://ui-avatars.com/api/?name=${title}`:`http://localhost:5001${image}`} 
                src={image === undefined||image===null ? `https://ui-avatars.com/api/?name=${title}` : `http://localhost:5001${image}`}
                className="card-img-top single-project-image" 
                height={400} 
                alt={title} />
                <div className='single-project-card-img-cover'>
                <i className="fas fa-arrow-circle-right fs-1" style={{color:'white'}}></i>
                </div>
            </div>
            
            <div className="card-body text-center pt-5 pb-3">
                {/* Project title */}
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {/* Amount, Equity, Valuation */}
                    Amount:<strong>  {currencyFormatter.format(amount)} </strong><br />
                    Equity:<strong> {equity} %</strong> <br />
                    Interest:<strong> {interest?interest:"20"} %</strong> <br />
                    Valuation:<strong> {currencyFormatter.format(valuation)}</strong>
                    
                </p>
            </div>
        </div>
    );
};

Project.propTypes = {
    project: PropTypes.shape({

        _id:PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        equity: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        valuation: PropTypes.number.isRequired,
        interest: PropTypes.number.isRequired,
        // Add more PropTypes as per your project object structure
    }).isRequired,
};

export default Project;
