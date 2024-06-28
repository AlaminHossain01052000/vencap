
import PropTypes from 'prop-types';
const ProjectDetail = ({ project }) => {
    const { title, description, image, valuation, amount, equity, minimumEquityToBuy, addedDate, minimumReturnDate, ownersEmail } = project;

    return (
        <div className="container mt-4">
            <div className="card">
                {/* Project image */}
                <img src={image} className="card-img-top" alt={title} />
                <div className="card-body">
                    {/* Project details */}
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p>
                        Valuation: ${valuation} <br />
                        Amount: ${amount} <br />
                        Equity: {equity}% <br />
                        Minimum Equity to Buy: {minimumEquityToBuy}% <br />
                        Added Date: {addedDate} <br />
                        Minimum Return Date: {minimumReturnDate} <br />
                        Owners Email: {ownersEmail}
                    </p>
                    <button className="btn btn-primary">Get Equity</button>
                </div>
            </div>
        </div>
    );
};
ProjectDetail.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        equity: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        valuation: PropTypes.number.isRequired,
        description:PropTypes.string.isRequired,
        minimumEquityToBuy:PropTypes.number.isRequired,
        addedDate:PropTypes.string.isRequired,
        minimumReturnDate:PropTypes.string.isRequired,
        ownersEmail:PropTypes.string.isRequired
        // Add more PropTypes as per your project object structure
    }).isRequired,
};

export default ProjectDetail;
