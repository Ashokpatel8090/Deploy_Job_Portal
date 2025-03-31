import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

function HeroSection() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center py-16 px-6 '>
            <div className='flex flex-col gap-8 max-w-4xl mx-auto'>
                <span className='mx-auto px-5 py-2 rounded-full bg-[#FFCDD2] text-[#D32F2F] font-semibold shadow-sm'>Top Job Portal of the Year</span>
                
                <h1 className='text-5xl md:text-6xl font-extrabold leading-tight text-[#1E293B]'>
                    Unlock Your <span className='text-[#FF6F61]'>Future</span> <br /> One Job at a Time
                </h1>
                
                <p className='text-gray-700 max-w-2xl mx-auto text-lg'>
                    Discover endless career possibilities tailored to your skills. Start exploring new opportunities and land the job you’ve been dreaming of!
                </p>

                <div className='flex flex-col md:flex-row items-center w-full md:w-[70%] mx-auto gap-4'>
                    <input
                        type="text"
                        placeholder='Search for your dream job...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border border-gray-300 px-5 py-3 rounded-full w-full shadow-md focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent'
                    />
                    
                    <Button 
                        onClick={searchJobHandler} 
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF6F61] hover:bg-[#E64A45] text-white font-semibold shadow-lg transition-transform transform hover:scale-105">
                        <Search className='h-5 w-5' /> Search
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
