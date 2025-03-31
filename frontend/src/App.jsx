import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/Client pages/Login"
import Signup from "./components/Client pages/Signup"
import Home from "./components/shared/Home"
import Jobs from "./components/Client pages/Jobs"
import Browse from "./components/Client pages/Browse"
import Profile from "./components/Client pages/Profile"
import JobDescription from "./components/Client pages/JobDescription"
import Companies from "./components/admin pages/Companies"
import CompanyCreate from "./components/admin pages/CompanyCreate"
import CompanySetup from "./components/admin pages/CompanySetup"
import AdminJobs from './components/admin pages/AdminJobs'
import PostJob from "./components/admin pages/PostJob"
import Applicants from "./components/admin pages/Applicants"
import ProtectedRoute from "./components/admin pages/ProtectedRoute"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/jobs',
      element: <Jobs />
    },
    {
      path: '/description/:id',
      element: <JobDescription />
    },
    {
      path: '/browse',
      element: <Browse />
    },
    {
      path: '/profile',
      element: <Profile />
    },

    // for admin

    {
      path:"/admin/companies",
      element: <ProtectedRoute><Companies/></ProtectedRoute>
    },
    {
      path:"/admin/companies/create",
      element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
    },
    {
      path:"/admin/companies/:id",
      element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
    },
    {
      path:"/admin/jobs",
      element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
    },
    {
      path:"/admin/jobs/create",
      element:<ProtectedRoute><PostJob/></ProtectedRoute> 
    },
    {
      path:"/admin/jobs/:id/applicants",
      element:<ProtectedRoute><Applicants/></ProtectedRoute> 
    },
  
  ])
  return (
    <div className="clr">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
