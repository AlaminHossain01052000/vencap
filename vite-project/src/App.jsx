
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

function App() {


  return (
    <>
    <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/addNewProject' Component={AddNewProject} />
          <Route path='/projects' Component={Projects} />
          <Route path='/projectdetail/:id' Component={ProjectDetail} />
          <Route path='/my-projects' Component={MyProjects} />
          <Route path='/my-profile' Component={MyProfile} />
          <Route path='/my-investments' Component={MyInvestments} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={Signup} />
        </Routes>
      </BrowserRouter>s
    </AuthProvider>
      

    </>
  )
}

export default App
