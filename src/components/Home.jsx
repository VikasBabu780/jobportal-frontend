import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './Categorycarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store => store.auth)
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role == "Recruiter") {
      navigate("/company/get");
    }
  },[navigate,user?.role])
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>  
    </div>
  )
}

export default Home