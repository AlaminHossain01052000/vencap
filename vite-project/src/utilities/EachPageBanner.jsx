import PropTypes from 'prop-types';
import './EachPageBanner.css';

const EachPageBanner = ({ content }) => {
    return (
        <div className='each-page-banner-container'>
            <h1 className='fw-bold text-center'>{content}</h1>
        </div>
    );
};

EachPageBanner.propTypes = {
    content: PropTypes.string.isRequired
};

export default EachPageBanner;
