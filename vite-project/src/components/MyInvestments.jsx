import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';


import EachPageBanner from '../utilities/EachPageBanner';
import MyInvestment from './MyInvestment';
import getRemainingDays from '../utilities/calculateRemainingDays';

const MyInvestments = () => {

    const {user}=useAuth();
    const [myinvests,setMyInvests]=useState([]);
    const [myPreviousInvestes,setMyPreviousInvestes]=useState([]);
 
   
    useEffect(() => {
        // Fetching project data for each investment
        axios.get(`http://localhost:5001/users/single?email=${user?.email}`)
        .then(res => {
            const myInvests = res?.data?.myinvests || [];
            setMyInvests(myInvests.filter(obj => getRemainingDays(obj) > 0));
            setMyPreviousInvestes(myInvests.filter(obj => getRemainingDays(obj) === 0));
          })

    
    }, [user]);

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
                        <th>Valuation</th>
                        <th>Expected Return Date</th>
                        
                        <th>Profit</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {myinvests?.map((project,index) => (
                        
                        <MyInvestment key={index} project={project} index={index}/>
                        
                    ))}
                </tbody>
            </Table>
        </div>
    }
            {myPreviousInvestes?.length>0&&
            <div>
        <h1 className='py-4 text-center'>Your Previous Investments</h1>
        
        <div className="container" >
           
            <Table striped bordered hover responsive>
                <thead  className='text-center'>
                    <tr>
                        <th>No.</th>
                        <th>Project Title</th>
                        <th>Amount</th>
                        <th>Equity</th>
                        <th>Valuation</th>
                        <th>Expected Return Date</th>
                        
                        <th>Profit</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {myPreviousInvestes?.map((project,index) => (
                        
                        <MyInvestment key={index} project={project} index={index}/>
                        
                    ))}
                </tbody>
            </Table>
        </div>
        </div>

    }
    
        </div>
        
   

    );
};

export default MyInvestments;
