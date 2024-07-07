import { Container } from 'react-bootstrap';


const Footer = () => {
    return (
        <footer className="py-3 mt-5" style={{background:'#F6F6F6'}}>
            <Container>
                <p className="mb-0 text-center">All rights goes to Vencap | 2024</p>
                <div className='d-flex justify-content-center align-items-center mt-3'>
                    <i className='fab fa-facebook me-3'></i>
                    <i className='fab fa-linkedin me-3'></i>
                    <i className='fab fa-youtube'></i>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
