/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import './ViewAllComplains.css'; // Custom CSS for eye-soothing design
import EachPageBanner from '../utilities/EachPageBanner';


const ViewAllComplains = () => {
    const [complains, setComplains] = useState([]);

    // API Endpoint
    const API_URL = 'http://localhost:5001/complains';

    // Fetch Complains from API
    useEffect(() => {
        const fetchComplains = async () => {
            try {
                 await fetch(API_URL).then(res=>res.json()).then(data=>setComplains(data));
                // setComplains(response.data);
            } catch (error) {
                console.error('Error fetching complains:', error);
            }
        };
        fetchComplains();
    }, []);

    // Mark Complain as Resolved
    const handleResolve = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/complains/resolve/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isResolved: true }),
            });
    
            
    
            const result = await response.json();
            console.log(result.message);
    
            // Update UI by setting isResolved to true for the resolved complaint
            setComplains((prevComplains) =>
                prevComplains.map((complain) =>
                    complain._id === id ? { ...complain, isResolved: true } : complain
                )
            );
        } catch (error) {
            console.error("Error updating complaint:", error);
        }
    };

    // Delete Complain
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this complaint?");
        if (!confirmDelete) return;
    
        try {
            const response = await fetch(`http://localhost:5001/complains/${id}`, {
                method: "DELETE",
            });
    
            // if (!response.ok) {
            //     throw new Error("Failed to delete the complaint");
            // }
    
            // Update state after successful deletion
            setComplains((prev) => prev.filter((complain) => complain._id !== id));
        } catch (error) {
            console.error("Error deleting complaint:", error);
        }
    };
    

  return (
    <div style={{marginBottom:"300px"}}>
        <EachPageBanner content='All Complains'/>
        <div className="container mt-4 view-all-complains">
      <h2 className="text-center mb-4">Complaints</h2>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Complain Against</th>
            <th>Details</th>
            <th>User Email</th>
            <th>Date</th>
            <th>Resolve</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {complains.map((complain, index) => (
            <tr key={complain._id}>
              <td>{index + 1}</td>
              <td>{complain.complainAgainst}</td>
              <td>{complain.details}</td>
              <td>{complain.userEmail}</td>
              <td>{new Date(complain.date).toLocaleString()}</td>
              <td>
                <button 
                  className="btn btn-success"
                  onClick={() => handleResolve(complain._id)}
                  disabled={complain.isResolved}
                >
                  {complain.isResolved ? 'Resolved' : 'Resolve'}
                </button>
              </td>
              <td>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(complain._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {complains.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">
                No complaints found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ViewAllComplains;
