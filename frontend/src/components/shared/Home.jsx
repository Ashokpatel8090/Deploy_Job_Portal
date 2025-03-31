import React, { useEffect } from 'react'
import Navbar from './Navbar'
import HeroSection from '../Client pages/HeroSection'
import CategoryCrousel from '../Client pages/CategoryCrousel'
import LatestJobs from '../Client pages/LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Home() {
  useGetAllJobs()

  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() =>{
    if(user?.role == 'recruiter'){
      navigate('/admin/companies')
    }
  },[])

  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCrousel />
      <LatestJobs />
      <Footer />
    </>
  )
}

export default Home