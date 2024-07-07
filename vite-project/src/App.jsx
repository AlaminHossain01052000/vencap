
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


function App() {


  return (
    <>
    
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
          <Route path='/signup' Component={Signup} />
        </Routes>
      <Footer/>
      </BrowserRouter>
    </AuthProvider>
      

    </>
  )
}

export default App
