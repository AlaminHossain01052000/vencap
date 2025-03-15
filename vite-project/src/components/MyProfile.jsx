/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

import EachPageBanner from '../utilities/EachPageBanner';
import pf from '../utilities/pf';
import  emailjs  from '@emailjs/browser';
import { currencyFormatter } from '../utilities/others';
import { useLocation, useNavigate } from 'react-router-dom';



const MyProfile = () => {
    const [profile, setProfile] = useState({});
    // const [openAmountField,setOpenAmountField]=useState(false);
    const [amount,setAmount]=useState(0);
    // const [prevBalance,setPrevBalance]=useState(0);
    const {user,handleSendOtp,handleVerifyOtp}=useAuth();
    const [contactNoVerifyNowClicked,setContactNoVerifyNowClicked]=useState(false);
    const [otp,setOtp]=useState('');
    const [confirmResult,setConfirmResult]=useState(null)
    const navigate=useNavigate();
    const location=useLocation()
    useEffect(() => {
        // console.log(user)
         axios.get(`http://localhost:5001/users/single?email=${user?.email}`)
            .then(response => {
                // console.log(response)
                setProfile(response.data);
                // setPrevBalance(response?.data?.balance)
            })
            .catch(error => {
                console.error("There was an error fetching the profile data!", error);
            });
            emailjs.init("ExZoup8ZCGDP-bVZk");
           
         
    }, [user,profile]);
    const sendEmail = () => {
        console.log(profile.name,profile.email)
        emailjs.send("service_f29mwnq", "template_othd4tm", {
          // Replace with your template parameters
          to_name: profile.name,
          to_email: profile.email,
          message: `You Recharge of ${currencyFormatter.format(pf(amount))} is sucessfully done`,
          from_name:'vencap'
          // ...other details
        })
        .then((response) => {
          console.log("Email sent successfully!", response);
          // Handle successful email sending, e.g., display a success message
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
          // Handle email sending error, e.g., display an error message
        });
      };
    const sendEmail2 = () => {
        // console.log(profile.name,profile.email)
        try {
            emailjs.send("service_f29mwnq", "template_r47mnrf", {
                // Replace with your template parameters
                to_name: profile.name,
                to_email: profile.email,
                message: `Your withdrawal of ${currencyFormatter.format(pf(amount))} is sucessfully done`,
                from_name:'vencap'
                // ...other details
              })
              .then((response) => {
                console.log("Email sent successfully!", response);
                // Handle successful email sending, e.g., display a success message
              })
              .catch((error) => {
                console.error("Failed to send email:", error);
                // Handle email sending error, e.g., display an error message
              });
        } catch (error) {
            console.log(error)
        }
       
      };
    const handleWithdraw=async () => {
        console.log(profile.balance)
        if(!profile?.email){
            alert("Something Went Wrong. Try Again Letter")
            return
        }
        // Add logic for withdrawing using SSLCommerz
        if(profile?.balance===null||profile?.balance===undefined||parseFloat(profile.balance)<pf(amount)){
            alert("Insufficient Balance")
            return
        }
        const confirm=window.confirm(`Are you sure want to withdraw BDT ${amount}`)
        if(!confirm)return
        try {
            var withdrawUrl=""
            await axios.post("http://localhost:5001/withdraw",
                {
                    name:profile.name,
                    email:profile.email,
                    contact:profile.contact,
                    amount,
                    balance:pf(profile.balance),
                    newBalance:pf(profile.balance)-pf(amount)
                }
            
            ).then(responseUrl=>{
                
                withdrawUrl=responseUrl.data.url
                
                sendEmail2()
                
                
            })

        } catch (error) {
            console.log(error)
        }
        
        finally{
            // console.log(withdrawUrl)
            window.open(withdrawUrl)
            // window.location.replace(withdrawUrl);

            
        }   
    };
    
    const handleRecharge = async() => {
        // Add logic for recharging using SSLCommerz
        // console.log(profile)
        if(amount<=0){
            alert("Please Enter a valid amount to reacharge");
            return;
        }
        if(profile?.email?.length===0){
            alert("User Email is missing. Please try after some times");
            return;
        }
        
       
        const res=window.confirm(`Are you sure want to recharge ৳${amount}`)
        if(res){
            try{
                var rechargeUrl="";
                await axios.post("http://localhost:5001/recharge",{...profile,amount:amount,rechargeTime:new Date().toISOString()}).then(responseUrl=>{
                
                    rechargeUrl=responseUrl.data.url
                    
              
                    
                })
                sendEmail()


                // console.log(rechargeResponse)
                
            }
            catch(error){
                console.log("Recharge Response",error)

            }
            finally{
                window.open(rechargeUrl)
               

            }
            // console.log(response)
            // console.log(responseUrl)
        }
        else return;
        // console.log('Recharge clicked');
    };

    const handleSendingOtp=()=>{
        if(!contactNoVerifyNowClicked)
            handleSendOtp(setConfirmResult,profile.contact)
        setContactNoVerifyNowClicked(!contactNoVerifyNowClicked)
    }
    const invokeHandleVerifyOtp=()=>{
        handleVerifyOtp(confirmResult,otp,profile.email,profile.password,navigate,location);
        
        // console.log(confirmResult)
    }
    return (
        <>
        

        <EachPageBanner content='My Profile'/>
        <div className="container mt-5 mb-5">
            
            <div className="card py-5">
                <div className="card-body">
                    <div className="row  d-flex align-items-center flex-row">
                        <div className="col-md-3">
                            <img src={profile?.photo === undefined||profile.photo===null ? `https://ui-avatars.com/api/?name=${profile?.name}` : `http://localhost:5001${profile.photo}`}  alt="User Photo" className="img-fluid rounded-circle" />
                        </div>
                        <div className="col-md-9">
                            <h3 className="card-title">
                                {profile?.name}
                                {(profile?.isVerified===undefined||profile?.isVerified===false) &&
                                    <sup 
                                    className="text-warning"
                                    data-bs-toggle="tooltip" 
                                    title="Not Verified">
                                        <i className="fas fa-exclamation"></i>
                                    </sup>
                                }
                                
                                </h3>
                            <p className="card-text"><strong>Email:</strong> {profile?.email}</p>
                            <div>

                                <div  className='d-flex align-items-center'>
                                
                                <p className="card-text mt-3"><strong>Contact No:</strong> {profile?.contact}</p>
                                {profile?.isMobileVerified? <button className='btn btn-success ms-3 fw-bold' disabled>Verified</button>:
                                <button className='btn btn-warning ms-3 fw-bold' onClick={handleSendingOtp}>{contactNoVerifyNowClicked?"Cancel":"Verify Now"}</button> }
                                </div>
                                {contactNoVerifyNowClicked&&
                                <div>
                                    <input placeholder='Enter Your OTP' type='number' style={{padding:"10px"}} onChange={(e)=>setOtp(e.target.value)}/>
                                    <input type='submit' className='btn btn-danger ms-3' onClick={invokeHandleVerifyOtp}/>
                                </div>
                                }
                               
                                    
                            </div>
                            <p className="card-text"><strong>Balance:</strong> {profile?.balance===null||profile?.balance===undefined?0:profile.balance}</p>
                            <div className='d-flex flex-column'>
                                <div className='w-25'>
                                    <input 
                                    type='number' 
                                    value={amount} 
                                    onChange={(e)=>setAmount(e.target.value)}
                                    className='w-100'
                                    />
                                </div>

                                
                                <div className='w-25 d-flex  flex-column justify-content-between mt-4'>   
                                <button className="btn btn-primary mb-3" onClick={handleWithdraw} disabled={profile?.isVerified===false||profile?.isVerified===undefined||profile?.isMobileVerified===undefined||profile?.isMobileVerified===false}>Withdraw</button>
                                <button className="btn btn-success" onClick={handleRecharge} 
                                 disabled={profile?.isVerified===false||profile?.isVerified===undefined||profile?.isMobileVerified===undefined||profile?.isMobileVerified===false}
                                >Recharge</button>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <Footer/> */}
        </>
        
    );
};

export default MyProfile;
