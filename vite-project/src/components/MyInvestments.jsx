import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import pf from '../utilities/pf';
import  { textColor}  from '../utilities/color';

import EachPageBanner from '../utilities/EachPageBanner';

const MyInvestments = () => {

    const {user}=useAuth();
    const [myinvests,setMyInvests]=useState([]);
    useEffect(() => {
        // Fetching project data for each investment
        axios.get(`http://localhost:5000/users/single?email=${user?.email}`).then(res=>setMyInvests(res?.data?.myinvests))
        // const fetchProjectsData = async () => {
        //     try {
        //         const projectDataPromises = user.myinvests.map(async (investment) => {
        //             const response = await axios.get(`http://localhost:5000/project/${investment.projectId}`);
        //             return { ...response.data, amount: investment.amount, equity: investment.equity };
        //         });
        //         const projectsData = await Promise.all(projectDataPromises);
        //         setInvestments(projectsData);
        //     } catch (error) {
        //         console.error('Error fetching projects:', error);
        //     }
        // };

        // fetchProjectsData();
    }, [user]);
 function valuationCal(e,a) {
    return pf(a*100)/pf(e);
} 
// console.log(myinvests)
    return (
        <div style={{background:`white`,height:'100vh'}}>
            
            <EachPageBanner content="My Investments"/>
            {myinvests?.length===0?
        <h1 className='py-4 text-center'>You does not have any investments</h1>
        :
        <div className="container pt-5 mt-5" >
           
            <Table striped bordered hover responsive>
                <thead  className='text-center'>
                    <tr>
                        <th>No.</th>
                        <th>Project Title</th>
                        <th>Amount</th>
                        <th>Equity</th>
                        <th>Previous Valuation</th>
                        <th>Current Valuation</th>
                        <th>Return Request</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {myinvests?.map((project, index) => (
                        <tr key={project?._id}>
                            <td>{index + 1}</td>
                            <td>{project?.title}</td>
                            <td>{project?.amount}</td>
                            <td>{project?.equity}%</td>
                            <td>{valuationCal(project?.equity,project?.amount)}</td>
                            <td>{valuationCal(project?.equity,project?.amount)}</td>
                            <td><button className='btn btn-primary mx-auto'>Return</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    }
    {/* <Footer/> */}
        </div>
        
   

    );
};

export default MyInvestments;
