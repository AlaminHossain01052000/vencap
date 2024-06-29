
import PropTypes from 'prop-types';

const Project = ({ project }) => {
    const { title, amount, equity, image, valuation } = project;

    // const handleNavigateToProjectDetailPage=()=>{

    //     navigate(`/projectdetail/৳{_id}`);
    // }
    return (
        <div className="card">
            {/* Project image */}
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                {/* Project title */}
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {/* Amount, Equity, Valuation */}
                    Amount: ৳{amount} <br />
                    Equity: {equity}% <br />
                    Valuation: ৳{valuation}
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
        // Add more PropTypes as per your project object structure
    }).isRequired,
};

export default Project;
