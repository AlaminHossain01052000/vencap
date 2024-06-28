
import './App.css'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import AuthProvider from './shared/authprovider/authprovider'
import Login from './components/Login'
import AddNewProject from './components/AddNewProject'
import Projects from './components/Projects'

function App() {


  return (
    <>
    <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/addNewProject' Component={AddNewProject} />
          <Route path='/projects' Component={Projects} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={Signup} />
        </Routes>
      </BrowserRouter>s
    </AuthProvider>
      

    </>
  )
}

export default App
