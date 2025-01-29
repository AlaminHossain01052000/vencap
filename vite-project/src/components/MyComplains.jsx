import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

const MyComplains = () => {
  const [complaints, setComplaints] = useState([]);
const {user}=useAuth();
  // Fetch complaints from the backend on component mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`http://localhost:5001/complains/user?email=${user?.email}`); // Endpoint to fetch complaints
        const data = await response.json();
        setComplaints(data); // Set the complaints data into state
      } catch (error) {
        console.error('Error fetching complaints:', error.message);
      }
    };

    fetchComplaints();
  }, [user]);

  return (
    <div className="container mt-4">
      <h2>My Complaints</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Complain Against (Email)</th>
            <th>Issue Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint._id}</td>
              <td>{complaint.complainAgainst}</td>
              <td>{new Date(complaint.date).toLocaleDateString()}</td>
              <td>
                {complaint.isResolved ? (
                  <span className="text-success">&#x2713; Resolved</span>
                ) : (
                  <span className="text-danger">Not Resolved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComplains;
