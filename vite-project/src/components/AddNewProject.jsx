import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import EachPageBanner from '../utilities/EachPageBanner';
import pf from '../utilities/pf';

const AddNewProject = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    minimumReturnDate: '',
    equity: 0,
    amount: 0,
    valuation: 0,
    minimumEquityBuy: 0,
    ownersInfo: {},
    investorsInfo: [],
    category: '',
    image:null,
    additionTime: '',
    interest:0
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valuation calculation
    formData.valuation = (parseFloat(formData.amount) * 100.00) / parseFloat(formData.equity);

    // Date adding
    formData.additionTime = new Date().toISOString();
    formData.image=selectedFile;
    // Check if minimumReturnDate is not a past or current date
    const returnDate = new Date(formData.minimumReturnDate);
    const currentDate = new Date();
    if (returnDate <= currentDate) {
      setError('Minimum Return Date must be a future date.');
      return;
    }

    // Check if minimumEquityBuy is greater than or equal to equity
    else if (parseFloat(formData.minimumEquityBuy) > parseFloat(formData.equity)) {
      setError('Minimum Equity Buy must be less than or equal to the total equity.');
      return;
    }
    else if(formData.equity>100||formData.equity<0||formData.amount<=0||formData.minimumEquityBuy<=0){
        setError("Please Enter a valid Number")
        return;
    }
    if (!selectedFile) {
      setError('Please select an image.');
      return;
    }
    // Handle adding images in the MongoDB database
 formData.ownersInfo={ email: user.email, name: user?.displayName?user.displayName:user?.name };


    
 

  //  const base64Image = reader.result.split(',')[1];

   // Prepare data to send to server
   const projectData =formData;
  //  console.log(projectData)

   try {
    projectData.equity=pf(projectData.equity);
    projectData.amount=pf(projectData.amount);
    projectData.minimumEquityBuy=pf(projectData.minimumEquityBuy);
    projectData.valuation=pf(projectData.valuation);

    //  await axios.post('http://localhost:5001/projects', projectData);
    await axios.post('http://localhost:5001/projects', projectData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
     setSuccess('Project added successfully!');
     setError('');
    //  console.log(response.data);
    setFormData({
      title: '',
      description: '',
      minimumReturnDate: '',
      equity: 0,
      amount: 0,
      valuation: 0,
      minimumEquityBuy: 0,
      ownersInfo: {},
      investorsInfo: [],
      category: '',
      image:null,
      additionTime: ''
    })
   } catch (error) {
     console.error('Error adding project:', error);
     setError('Error adding project. Please try again.');
     setSuccess('');
   }
 
  };

  const categories = ["", "Agriculture", "Technology", "Healthcare", "Finance", "Real State", "Others"];

  return (
    <div>
      <EachPageBanner content='Add New Project'/>
      
      <div className="container mt-5 d-lg-flex align-items-center">
      
      
        <div className='w-50'>
        {error && <p className="text-danger my-3">{error}</p>}
        {success && <p className="text-success my-3">{success}</p>}
        <form onSubmit={handleSubmit} className='mt-5 w-100'>
          <div className="form-group mb-3">
            <label style={{color:'#001140'}} htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label style={{color:'#001140'}} htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <label style={{color:'#001140'}} htmlFor="minimumReturnDate">Minimum Return Date</label>
            <input
              type="date"
              className="form-control"
              id="minimumReturnDate"
              name="minimumReturnDate"
              value={formData.minimumReturnDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label style={{color:'#001140'}} htmlFor="amount">Amount (৳)</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label style={{color:'#001140'}} htmlFor="equity">Equity (%)</label>
            <input
              type="number"
              className="form-control"
              id="equity"
              name="equity"
              value={formData.equity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label style={{color:'#001140'}} htmlFor="minimumEquityBuy">Minimum Equity Buy (%)</label>
            <input
              type="number"
              className="form-control"
              id="minimumEquityBuy"
              name="minimumEquityBuy"
              value={formData.minimumEquityBuy}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label style={{color:'#001140'}} htmlFor="interset">Interest (%)</label>
            <input
              type="number"
              className="form-control"
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label style={{color:'#001140'}} htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.sort().map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label style={{color:'#001140'}} htmlFor="images">Upload Images</label>
            <input
              type="file"
              className="form-control"
              id="images"
              name="images"
              
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Project<i className='fas fa-arrow-right ms-3'></i></button>
        </form>
        </div>
        
        <div className='w-50'>
          <img src="../../assets/images/add-project.jpg" alt="add-project" className='w-100'/>
        </div>
      
      </div>
      
    </div>
  );
};

export default AddNewProject;
