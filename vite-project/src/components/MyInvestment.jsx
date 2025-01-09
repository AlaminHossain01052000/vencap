import { useEffect, useState } from 'react';
import pf from '../utilities/pf';
import axios from 'axios';



const MyInvestment = (props) => {
    const {project,index}=props||{};
    const [projectDetails,setProjectDetails]=useState({});
    
    useEffect(() => {
        // Fetching project data for each investment
        
        axios.get(`http://localhost:5000/project/${project?.projectId}`).then(res=>setProjectDetails(res?.data))
        
        
    }, [project,setProjectDetails]);
    
    const profitCal=()=>{
        return ((projectDetails?.valuation-valuationCal(project?.equity, project?.amount))*(project?.equity/100));
    }
    function valuationCal(e,a) {
        return pf(a*100)/pf(e);
    } 
    
    return (


        <tr key={project?._id}>
            <td>{index>=0&&(index + 1)}</td>
            <td>{project?.title}</td>
            <td>{project?.amount}</td>
            <td>{project?.equity}%</td>
            <td>{valuationCal(project?.equity, project?.amount)}</td>
            <td>{project?.returnDate}</td>
            <td>{projectDetails?.valuation}</td>
            <td>{profitCal()}</td>
            <td><button className="btn-success">Withdraw</button></td>
        </tr>
                  
        
    )
    
  
};

export default MyInvestment;
