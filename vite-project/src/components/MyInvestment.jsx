import { useEffect, useState } from 'react';
import pf from '../utilities/pf';
import axios from 'axios';
import getRemainingDays from '../utilities/calculateRemainingDays';



const MyInvestment = (props) => {
    const {project,index}=props||{};
    const [projectDetails,setProjectDetails]=useState({});

function valuationCal(e,a) {
    return pf(pf(a)*100)/pf(e);
} 
    useEffect(() => {
        // Fetching project data for each investment
        console.log(project.projectId)
        axios.get(`http://localhost:5001/project/${project?.projectId}`).then(res=>console.log(res))
     console.log(projectDetails)
    }, [project,setProjectDetails,projectDetails]);
   
   
    
    return (


        <tr key={project?._id}>
            <td className='text-center'>{index>=0&&(index + 1)}</td>
            <td className='text-center'>{project?.title}</td>
            <td className='text-center'>{project?.amount}</td>
            <td className='text-center'>{project?.equity}%</td>
            <td className='text-center'>{valuationCal(project?.equity, project?.amount)}</td>
            <td className='text-center'>{project?.returnDate}({getRemainingDays(project)}) Days Remaining</td>
            <td className='text-center'>20%</td>
            
        </tr>
                  
        
    )
    
  
};

export default MyInvestment;
