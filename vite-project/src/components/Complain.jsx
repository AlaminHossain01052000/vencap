import  { useState } from 'react';
import useAuth from '../hooks/useAuth';
import EachPageBanner from '../utilities/EachPageBanner';

const Complain = () => {
  const [complainAgainst, setComplainAgainst] = useState('');
  const [details, setDetails] = useState('');
const {user}=useAuth();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const complaintData = {
      complainAgainst,
      details,
      userEmail:user?.email,
      date: new Date().toISOString(), // Get current date in ISO format
      isResolved:false
    };

    try {
        console.log(complaintData)
      const response = await fetch('http://localhost:5001/complain', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(complaintData)
      });
      
      console.log('Complaint submitted:', response);
      // Clear form fields after submission
      setComplainAgainst('');
      setDetails('');
    } catch (error) {
      console.error('Error submitting complaint:', error.message);
    }
  };

  return (
    <div>
        <EachPageBanner content='Submit a Complain'/>
        <div className="container mt-4">
      
      <form onSubmit={handleSubmit}>
        

        <div className="mb-3">
          <label htmlFor="complainAgainst" className="form-label">Complain Against (Email)</label>
          <input
            type="email"
            className="form-control"
            id="complainAgainst"
            value={complainAgainst}
            onChange={(e) => setComplainAgainst(e.target.value)}
            required
            placeholder="Enter the email of the person you're complaining against"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="details" className="form-label">Complaint Details</label>
          <textarea
            className="form-control"
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows="4"
            required
            placeholder="Describe your complaint"
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit Complaint</button>
      </form>
    </div>
    </div>
    
  );
};

export default Complain;
