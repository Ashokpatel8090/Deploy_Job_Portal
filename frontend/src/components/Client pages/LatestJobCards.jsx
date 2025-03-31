import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../ui/badge';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)}
            className='p-6 rounded-2xl shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow cursor-pointer flex flex-col justify-between'>
            <div>
                <h1 className='font-medium text-xl mb-2'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500 mb-4'>📍 India</p>
            </div>
            <div>
                <h1 className='font-bold text-2xl my-2 text-[#6A38C2]'>{job?.title}</h1>
                <p className='text-sm text-gray-600 mb-4'>{job?.description}</p>
            </div>
            <div className='flex items-center flex-wrap gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold bg-blue-100'>{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold bg-red-100'>{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold bg-purple-100'>{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards