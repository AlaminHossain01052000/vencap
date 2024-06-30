
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import pf from '../utilities/pf';
const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState({})
    const {user}=useAuth();
    const [userProfile,setUserProfile]=useState({});
    const [equityValue,setEquityValue]=useState(0);
    const [owner,setOwner]=useState({})
    //    console.log(id);
    const { title, description, image, valuation, amount, equity, minimumEquityBuy, additionTime, minimumReturnDate, ownersInfo,investorsInfo } = project || {};
    // console.log(project)
    useEffect(() => {console.log(id)
        axios.get(`http://localhost:5000/project/${id}`).then(response => setProject(response.data))
        axios.get(`http://localhost:5000/users/single?email=${user?.email}`).then(response => setUserProfile(response?.data))
        axios.get(`http://localhost:5000/users/single?email=${ownersInfo?.email}`).then(response => setOwner(response?.data))

    }, [id,user,ownersInfo])
    const date=new Date(additionTime);
    const handleGetEquityFunctionalities=()=>{
        // Hey chatgpt perform the actions
        // 1. It will open a modal
        // 2. The modal will take input of equity percentage that the investor want to get
        // 3. If the inputed percentage is greater or equal to minimumEquityBuy and less than or equal to equity then the amount will calculated using the percentage
        // 4. An update function will be invoke of node js. peform this using axios
        // 5. Update function will decrease the balance of user.balance and equity percentage of the project
        if(user?.email===ownersInfo?.email){
            alert("You can't invest in own project");
            return
        }
        const userHaveToInvest=(pf(amount)*pf(equityValue))/pf(equity);
        // console.log(userHaveToInvest,userProfile?.balance)
        if(userHaveToInvest>pf(userProfile?.balance)){
            alert("Not sufficient balance");
            return;
        }
        if(pf(equityValue)>=pf(minimumEquityBuy)&&pf(equityValue)<=pf(equity)){
            const newEquity=parseFloat(equity)-parseFloat(equityValue)
        const newAmount=(parseFloat(amount)*(parseFloat(equity)-parseFloat(equityValue)))/parseFloat(equity);
        const newValuation=(newAmount*100)/(newEquity)
        const newMinimumEquity=Math.min(parseFloat(minimumEquityBuy),parseFloat(newEquity));
        axios.put("http://localhost:5000/projects",{
            projectId:id,
            newEquity,
            newInvestorsInfo: investorsInfo.map(investor => {
                if (investor.email === user.email) {
                    return {
                        ...investor,
                        equity: parseFloat(investor.equity) + parseFloat(equityValue)
                    };
                }
                return investor;
            }).concat(
                investorsInfo.some(investor => investor.email === user.email)
                ? []
                : [{ email: user.email, equity: parseFloat(equityValue) }]
            ),
                newAmount,
                newValuation,
                newMinimumEquity
        })
        // /users/investment
        const myinvests=[]
        for(let i=0;i<userProfile?.myinvests?.length;++i){
            if(userProfile?.myinvests[i]?.projectId===id){
                myinvests.push({
                    email:user?.email,
                    projectId:id,
                    equity:pf(equityValue)+pf(userProfile?.myinvests[i]?.equity),
                    amount:pf(userHaveToInvest)+pf(userProfile?.myinvests[i]?.amount),
                    returnDate:minimumReturnDate,
                    title
                })
            }
            else myinvests.push(userProfile?.myinvests[i]);
        }
        const userBalance=pf(userProfile?.balance)-pf(userHaveToInvest)
        if(myinvests.length>0){
            axios.put("http://localhost:5000/users/investment",{email:user?.email,myinvests,userBalance})

        }
        axios.put("http://localhost:5000/users/getinvestment",{email:owner?.email,newBalance:pf(owner?.balance)+pf(userHaveToInvest)})
        }
        else alert("Something wrong.Please input correct value")
        

    }
    return (
        <div className="container mt-4">
            <div className="card">
                {/* Project image */}
                <img src={`data:image/png;base64,${image}`} height={500} className="card-img-top" alt={title} />
                <div className="card-body">
                    {/* Project details */}
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p>
                        Valuation: ৳{valuation} <br />
                        Amount: ৳{amount} <br />
                        Equity: {equity}% <br />
                        Minimum Equity to Buy: {minimumEquityBuy}% <br />
                        Added Date: {`${date.getFullYear()}-${String(date?.getMonth() + 1)?.padStart(2, '0')}-${String(date?.getDate())?.padStart(2, '0')}`} <br />
                        Minimum Return Date: {minimumReturnDate} <br />
                        Owners Email: {ownersInfo?.email}
                    </p>
                    <input type='number' value={equityValue} onChange={(e)=>setEquityValue(e.target.value)}/>
                    <button className="btn btn-primary" onClick={handleGetEquityFunctionalities}>Get Equity</button>
                    <ul>
                        <p>Investors: </p>
                        {
                            investorsInfo?.map((investor,index)=>investor?.email===user?.email&&<li key={index}>{investor?.email}</li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};
ProjectDetail.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        equity: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        valuation: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        minimumEquityBuy: PropTypes.number.isRequired,
        addedDate: PropTypes.string.isRequired,
        minimumReturnDate: PropTypes.string.isRequired,
        ownersEmail: PropTypes.string.isRequired
        // Add more PropTypes as per your project object structure
    }).isRequired,
};

export default ProjectDetail;
