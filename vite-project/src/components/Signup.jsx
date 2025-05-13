import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import EachPageBanner from '../utilities/EachPageBanner';

const Signup = () => {
  const [currentError, setCurrentError] = useState('');
  const [file,setSelectedFile]=useState(null)
  const { registerNewUser, loading, error } = useAuth();
const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: null,
    contact: '',
    myprojects: [],
    myinvests: [],
    isOwner: false,
    date:'',
    isVerified:false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file1 = e.target.files[0];
    if (file1) {
      setSelectedFile(file1);
    }
  };

  const handleSubmit = (e) => {
   setCurrentError('')
    e.preventDefault();
    console.log(error)
    if(error)setCurrentError(error);
    else if (!formData.name) {
      setCurrentError('User Name is required!');
    } else if (!formData.email) {
      setCurrentError('Email is required!');
    } else if (!formData.password) {
      setCurrentError('Password is required!');
    } else if (!formData.confirmPassword || formData.confirmPassword !== formData.password) {
      setCurrentError('Password is not matching!');
    } else if (!formData.contact) {
      setCurrentError('Contact is required');
    } else {
      setCurrentError('');
      // Add photo generation logic using name if photo is empty
      formData.photo=file;
      console.log(formData)
      if (!formData.photo) {
        
        formData.photo = `https://ui-avatars.com/api/?name=${formData.name}`;
        formData.date=new Date()
      
        
      registerNewUser(formData,navigate);

      }
      else{
        
      console.log("first")
         
          formData.date=new Date()
          registerNewUser(formData,navigate);
        

      }
      
    }
  };

  return (
    <div>
      <EachPageBanner content='Sign Up'/>
      {
        loading ? <h1 className='text-center py-5'>It is loading</h1> :
        <div className="container mt-5 d-flex align-items-center">
          <div className='w-50'>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="photo">Photo (optional)</label>
              <input type="file" className="form-control" id="photo" name="photo" onChange={handleFileChange} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="contact">Contact</label>
              <input type="text" className="form-control" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-dark">Sign Up</button>
            {currentError && <p className="text-danger mt-2">{currentError}</p>}
          </form>
          </div>
          <div className='w-50'>
            <img src="../../assets/images/signup.jpg" alt="" className='w-100'/>
          </div>
        </div>
      }
    </div>
    
  );
};

export default Signup;
