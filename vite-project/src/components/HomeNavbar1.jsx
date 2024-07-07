import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/images/logo-removebg-preview.png"
import './HomeNavbar1.css'
const HomeNavbar1 = () => {
  const [userPhoto,setUserPhoto]=useState('');
  const {logoutUser,user,admin}=useAuth();
  useEffect(()=>{
    axios.get(`http://localhost:5000/users/single?email=${user?.email}`).then(res=>setUserPhoto(res?.data?.photo))
    console.log(user)
  },[user])

  // console.log(user)
  const handleLogginOut=()=>{
    // console.log("out")
    logoutUser()
  }
    return (
        <div>
            <nav className="navbar navbar-expand-lg py-4" style={{background:'white'}}>
  <div className="container">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item ">
        <img  width={40} height={40} src={logo} alt="logo"/>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {
        admin?
        <>
          <li className="nav-item">
        <Link className="nav-link" to="/view-project">View Projects</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/view-users">View Users</Link>
      </li>
        </>
        :
        user?.email&&
        <> 
        <li className="nav-item">
          <Link className="nav-link" to="/my-projects">My Projects</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/my-investments">My Investments</Link>
        </li>
        </>
      
        }
        
        <li className="nav-item">
          <Link className="nav-link" to="/projects">Explore Projects</Link>
        </li>
        
        
      {
        user?.uid?
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={`data:image/png;base64,${userPhoto}`}alt="user-photo" width={15} />
          </a>
          
            <ul className="dropdown-menu">
            <li className="home-navar-dropdown-menu-list"><Link className="dropdown-item " to="/my-profile">My Profile</Link></li>
            <li className="home-navar-dropdown-menu-list"><Link className="dropdown-item " to="/addNewProject">Add New Project</Link></li>
            <li className="home-navar-dropdown-menu-list"><a className="dropdown-item " onClick={handleLogginOut}>Logout</a></li>
          </ul>
        
          
        </li>
        :
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      }
        
      </ul>
    </div>
  </div>
</nav>
        </div>
    );
};

export default HomeNavbar1;