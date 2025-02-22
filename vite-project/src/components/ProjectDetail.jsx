/* eslint-disable no-undef */

import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import pf from '../utilities/pf';
import './ProjectDetail.css'
import { categoryToCorrespondingIcon, currencyFormatter } from '../utilities/others';

import EachPageBanner from '../utilities/EachPageBanner';

import SwipeRightButton from '../utilities/SwipeRightButton';


const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState({})
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState({});
    const [equityValue, setEquityValue] = useState(0);
    const [owner, setOwner] = useState({})
    const [iconClassName, setIconClassName] = useState("")
    const [updateLoading, setUpdateLoading] = useState(false)

    const navigate = useNavigate();
    const location = useLocation()
    //    console.log(id);
    const { title, description, image, valuation, amount, equity,  additionTime, minimumReturnDate, ownersInfo, investorsInfo, category ,interest} = project || {};
    // console.log(project)
    useEffect(() => {
        const getProjectFunction = async () => {
            await axios.get(`http://localhost:5001/project/${id}`).then(response => setProject(response.data))

        }
        const getUserProfileFunction = async () => {
            
            await axios.get(`http://localhost:5001/users/single?email=${user?.email}`).then(response => setUserProfile(response?.data))
        }
        const getOwnerFunction = async () => {
            await axios.get(`http://localhost:5001/users/single?email=${ownersInfo?.email}`).then(response => setOwner(response?.data))
        }
        const getIconClassNameFunction = () => {
            setIconClassName(categoryToCorrespondingIcon[category?.toLowerCase()])
        }
        if (id && !project?._id||updateLoading)
            getProjectFunction()
        if (user?.email && !userProfile?.email)
            getUserProfileFunction()
        if (ownersInfo?.email && !owner?.email)
            getOwnerFunction()
        if (!iconClassName && category)
            getIconClassNameFunction()
        console.log(user?.email,userProfile)

    }, [id, user, ownersInfo, iconClassName, category, owner, userProfile, project,updateLoading])
    const date = new Date(additionTime);
    const handleGetEquityFunctionalities = async () => {


        if (!user?.email) {
            const confirm = window.confirm("You have to login first to invest. Do you want to login now?");
            if (confirm) {
                navigate('/login', { state: { from: location } });
            }
            return;
        }

        if (user?.email === ownersInfo?.email) {
            alert("You can't invest in own project");
            return
        }
        const userHaveToInvest = (pf(amount) * pf(equityValue)) / pf(equity);
        // console.log(userHaveToInvest,userProfile?.balance)
        if (userHaveToInvest > pf(userProfile?.balance)) {
            alert("Not sufficient balance");
            return;
        }
        if (userProfile?.isVerified===false||userProfile?.isVerified===undefined) {
            alert("You Have to Verify at First");
            return;
        }
        if (pf(equityValue) <= pf(equity)) {
            const newEquity = parseFloat(equity) - parseFloat(equityValue)
            const newAmount = (parseFloat(amount) * (parseFloat(equity) - parseFloat(equityValue))) / parseFloat(equity);
            const newValuation = (newAmount * 100) / (newEquity)
            try {
                setUpdateLoading(true)
                // eslint-disable-next-line no-unused-vars
                const reponse = await axios.put("http://localhost:5001/projects", {
                    projectId: id,
                    newEquity,
                    newInvestorsInfo: investorsInfo?.map(investor => {
                        if (investor.email === user.email) {
                            return {
                                ...investor,
                                equity: parseFloat(investor.equity) + parseFloat(equityValue)
                            };
                        }
                        return investor;
                    }).concat(
                        investorsInfo?.some(investor => investor.email === user.email)
                            ? []
                            : [{ email: user.email, equity: parseFloat(equityValue) }]
                    ),
                    newAmount,
                    newValuation,
                   
                })
                // /users/investment
                const myinvests = []
                let paisi=false
                for (let i = 0; i < userProfile?.myinvests?.length; ++i) {
                    console.log(userProfile?.myinvests[i]?.projectId,id)
                    if (userProfile?.myinvests[i]?.projectId === id) {
                        paisi=true
                        myinvests.push({
                            email: user?.email,
                            projectId: id,
                            equity: pf(equityValue) + pf(userProfile?.myinvests[i]?.equity),
                            amount: pf(userHaveToInvest) + pf(userProfile?.myinvests[i]?.amount),
                            returnDate: minimumReturnDate,
                            title:title
                        })
                    }
                    else myinvests.push(userProfile?.myinvests[i]);
                }
                if(!paisi){
                    myinvests.push({
                        email: user?.email,
                        projectId: id,
                        equity: pf(equityValue) ,
                        amount: pf(userHaveToInvest),
                        returnDate: minimumReturnDate,
                        title:title
                    })
                }
                // console.log(myinvests?)
                const userBalance = pf(userProfile?.balance) - pf(userHaveToInvest)
                if (myinvests.length > 0) {
                    await axios.put("http://localhost:5001/users/investment", { email: user?.email, myinvests, userBalance })

                }
                await axios.put("http://localhost:5001/users/getinvestment", { email: owner?.email, newBalance: pf(owner?.balance) + pf(userHaveToInvest) })
            } catch (error) {
                setUpdateLoading(false)
                alert(error.message)
            }
            finally {
                setUpdateLoading(false)

            }

        }
        else alert("Something wrong.Please input correct value")


    }

    return (
        <div>

            <EachPageBanner content='Project' />
            <div className="container mt-5">
                <div>
                    {/* Project image */}
                    <img src={image === undefined||image===null ? `https://ui-avatars.com/api/?name=${title}` : `http://localhost:5001${image}`} alt={title} className='w-100' style={{ height: "600px" }} />
                    <div className='d-flex justify-content-center mt-5'>
                        <div className='project-detail-description w-75'>
                            <div className='d-flex flex-column'>
                                <h5>Project Description</h5>
                                <hr style={{ width: "80px", borderWidth: "2px", borderColor: 'black' }} />
                            </div>
                            <div className='w-75'>
                                <h6 >
                                    {description}
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic consectetur ab molestias id libero vitae ad ducimus nisi, blanditiis odio nobis, iure quod nihil in provident doloremque minus fugit magni quia repudiandae facilis perspiciatis reiciendis, necessitatibus neque? Dolore dolorem eligendi laudantium in est, sint excepturi cum, tempora similique eius repellendus.
                                </h6>

                            </div>

                        </div>
                        <div className='project-detail-all-informations w-25 d-flex flex-column align-items-start'>
                            {/* <div className='project-detail-all-informations-child text-end'> */}
                            <div className=''>
                                <h5>Project Detail</h5>
                                <hr style={{ width: "80px", borderWidth: "2px", borderColor: 'black' }} />
                            </div>
                            <div>
                                {
                                    updateLoading ? <div className="spinner-border" role="status">
                                        <span className="visually-hidden"></span>
                                    </div> :
                                        <>
                                            <p style={{ color: '#001140' }}>
                                                Valuation: <strong className='fw-bold'> {currencyFormatter.format(valuation)}</strong> <br />
                                                Amount: <strong className='fw-bold'>{currencyFormatter.format(amount)}</strong> <br />
                                                Equity: <strong className='fw-bold'>{equity} %</strong> <br />
                                                
                                                Interest: <strong className='fw-bold'>{interest?interest:"20"} %</strong> <br />
                                                Added Date:<strong className='fw-bold'> {`${date.getFullYear()}-${String(date?.getMonth() + 1)?.padStart(2, '0')}-${String(date?.getDate())?.padStart(2, '0')}`} </strong><br />
                                                Minimum Return Date: <strong className='fw-bold'>{minimumReturnDate}</strong> <br />
                                                Owners Email: <strong className='fw-bold'>{ownersInfo?.email}</strong><br />
                                                Category: <strong className='fw-bold'>
                                                    <i className={iconClassName} style={{ marginRight: "8px" }}></i>

                                                    {category}

                                                </strong>

                                            </p>
                                            <div className='mb-3 d-flex flex-column'>
                                                <input
                                                    type='number'
                                                    value={equityValue}
                                                    onChange={(e) => setEquityValue(e.target.value)}
                                                    style={{ color: '#001140' }}
                                                    className='mb-3'
                                                />
                                                <div onClick={handleGetEquityFunctionalities} >

                                                    <SwipeRightButton content='Get Equity' />
                                                </div>
                                            </div>

                                            <div>
                                                <p style={{ color: '#001140' }}>Investors: </p>
                                                {
                                                   investorsInfo?.size()>0&& investorsInfo?.map((investor, index) => investor?.email === user?.email && <p key={index} style={{ color: '#001140' }} className='fw-bold'>{investor?.email}</p>)
                                                }
                                            </div></>

                                }

                            </div>
                        </div>
                        {/* </div> */}
                    </div>

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
        
        addedDate: PropTypes.string.isRequired,
        minimumReturnDate: PropTypes.string.isRequired,
        ownersEmail: PropTypes.string.isRequired
        // Add more PropTypes as per your project object structure
    }).isRequired,
};

export default ProjectDetail;
