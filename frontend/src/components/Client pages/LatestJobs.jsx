import React from 'react'
import LatestJobCards from './LatestJobCards';
import store from '@/redux/store';
import { useSelector } from 'react-redux';

// const allJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    // console.log(allJobs);
    

   
    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <h1 className='text-4xl font-bold text-center mb-10'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    allJobs.length <= 0 ? (
                        <span className='text-gray-500 text-center col-span-full'>Job Not Available</span>
                    ) : (
                        allJobs.slice(0, 6).map((job, index) => <LatestJobCards key={job?._id} job={job} />)
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs