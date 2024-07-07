
import PropTypes from 'prop-types';
import './SwipeRightButton.css'
const SwipeRightButton = ({ content }) => {
    return (
        <div className="wrapper">
            <a className='swipe-right-button-a'><span>{content}</span></a>
        </div>
    );
};
SwipeRightButton.propTypes = {
    
    content: PropTypes.string.isRequired
};


export default SwipeRightButton;