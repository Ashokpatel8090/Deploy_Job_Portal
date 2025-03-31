import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";

const Job = ({ job }) => {
    const navigate = useNavigate();

    const createdDays = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    return (
        <div className='p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-100 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl'>
            <div className='flex items-center justify-between mb-4'>
                <p className='text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer'>{createdDays(job?.createdAt) == 0 ? "Today" : `${createdDays(job.createdAt)} Days Ago`}</p>
                <Button variant="outline" className="rounded-full hover:bg-purple-100 hover:text-purple-600 cursor-pointer" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className='flex items-center gap-4 mb-4'>
                <Button className="p-2 bg-transparent hover:bg-purple-100 rounded-full transition-colors cursor-pointer" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src='https://th.bing.com/th/id/OIP.ddvfeMg5AbPaEVxw4NC9uQHaHa?rs=1&pid=ImgDetMain' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-semibold text-xl text-gray-800 hover:text-purple-600 transition-colors cursor-pointer'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-2xl text-gray-800 hover:text-purple-600 transition-colors mb-2 cursor-pointer'>{job?.title}</h1>
                <p className='text-sm text-gray-600 leading-relaxed'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-6'>
                <Badge className='text-blue-700 font-bold bg-blue-100'>{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold bg-red-100'>{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold bg-purple-100'>{job?.salary}LPA</Badge>
            </div>

            <div className='flex flex-col sm:flex-row items-center gap-4 mt-6'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className='w-full sm:w-auto hover:bg-gray-200 hover:text-gray-800 cursor-pointer'>Details</Button>
                <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-xl cursor-pointer">Save For Later</Button>
            </div>
        </div>
    );
}

export default Job;
