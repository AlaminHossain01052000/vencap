import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const MyProfile = () => {
    const [profile, setProfile] = useState({});
    // const [openAmountField,setOpenAmountField]=useState(false);
    const [amount,setAmount]=useState(0);
    // const [prevBalance,setPrevBalance]=useState(0);
    const {user}=useAuth();
    useEffect(() => {
        // console.log(user)
         axios.get(`http://localhost:5000/users/single?email=${user?.email}`)
            .then(response => {
                // console.log(response)
                setProfile(response.data);
                // setPrevBalance(response?.data?.balance)
            })
            .catch(error => {
                console.error("There was an error fetching the profile data!", error);
            });
    }, [user]);

    const handleWithdraw = () => {
        // Add logic for withdrawing using SSLCommerz
        console.log('Withdraw clicked');
    };
    
    const handleRecharge = async() => {
        // Add logic for recharging using SSLCommerz
        if(amount<=0){
            alert("Please Enter a valid amount to reacharge");
            return;
        }
        if(!profile?.email||!profile?.balance){
            alert("User Email is missing. Please try after some times");
            return;
        }
        const res=window.confirm(`Are you sure want to recharge ৳${amount}`)
        if(res){
            const rechargeResponse=await axios.post("http://localhost:5000/recharge",{...profile,amount:amount,rechargeTime:new Date().toISOString()}).then(responseUrl=>{
                // console.log(responseUrl.data) //{responseUrl.data={url:<the habijabi url>}}
                window.location.replace(responseUrl.data.url);
                // window.location.reload()
            })
            console.log("Recharge Response",rechargeResponse.json())
            // console.log(response)
            // console.log(responseUrl)
        }
        else return;
        // console.log('Recharge clicked');
    };

    

    return (
        <div className="container mt-5">
            <h2 className="mb-4">My Profile</h2>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={profile?.photo} alt="User Photo" className="img-fluid rounded-circle" />
                        </div>
                        <div className="col-md-9">
                            <h4 className="card-title">{profile?.name}</h4>
                            <p className="card-text"><strong>Email:</strong> {profile?.email}</p>
                            <p className="card-text"><strong>Contact No:</strong> {profile?.contact}</p>
                            <p className="card-text"><strong>Balance:</strong> {profile?.balance}</p>
                            
                            <div>
                                <input type='number' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                            </div>

                            
                            <div className='w-50  d-flex  justify-content-between'>   
                            <button className="btn btn-primary me-2" onClick={handleWithdraw}>Withdraw</button>
                            <button className="btn btn-success" onClick={handleRecharge}>Recharge</button>
                            </div>
                            
                        </div>
                    </div>n
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
