
import './App.css'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import AuthProvider from './shared/authprovider/authprovider'
import Login from './components/Login'
import AddNewProject from './components/AddNewProject'
import Projects from './components/Projects'
import ProjectDetail from './components/ProjectDetail'
import MyProjects from './components/MyProjects'
import MyProfile from './components/MyProfile'
import MyInvestments from './components/MyInvestments'
import Footer from './components/Footer'
import HomeNavbar1 from './components/HomeNavbar1'
import ViewProject from './components/ViewProject'
import ViewUsers from './components/ViewUsers'
import Chat from './components/Chat'
import UserVerification from './components/UserVerification'
import Complain from './components/Complain'
import MyComplains from './components/MyComplains'
import ViewAllComplains from './components/ViewAllComplains'


function App() {


  return (
    <>
        <div id="recaptcha-container"></div>
    <AuthProvider>
    
    <BrowserRouter>


    <HomeNavbar1/>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/addNewProject' Component={AddNewProject} />
          <Route path='/projects' Component={Projects} />
          <Route path='/projectdetail/:id' Component={ProjectDetail} />
          <Route path='/my-projects' Component={MyProjects} />
          <Route path='/my-profile' Component={MyProfile} />
          <Route path='/my-investments' Component={MyInvestments} />
          <Route path='/view-project' Component={ViewProject} />
          <Route path='/view-users' Component={ViewUsers} />
          <Route path='/login' Component={Login} />
          <Route path='/user-verification' Component={UserVerification} />
          <Route path='/complain-form' Component={Complain} />
          <Route path='/my-complains' Component={MyComplains} />
          <Route path='/view-all-complains' Component={ViewAllComplains} />
          <Route path='/signup' Component={Signup} />
        </Routes>
      <Chat/>
      <Footer/>
      </BrowserRouter>
    </AuthProvider>
      

    </>
  )
}

export default App
