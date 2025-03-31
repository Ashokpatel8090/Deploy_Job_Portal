import { APPLICATION_API, JOB_API } from "@/utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);




    if (!singleJob) {
        return <div className='text-center text-gray-600 text-lg py-10'>Job not found</div>;
    }

    return (
        <div className='max-w-7xl mx-auto my-10 p-6 bg-white shadow-xl rounded-2xl'>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
                <div>
                    <h1 className='font-bold text-2xl text-gray-800'>{singleJob?.title || "N/A"}</h1>
                    <div className='flex flex-wrap items-center gap-3 mt-4'>
                        <Badge className='text-blue-700 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-full shadow-md transition-all cursor-pointer'>
                            {singleJob?.position || "N/A"}
                        </Badge>
                        <Badge className='text-[#F83002] bg-red-100 hover:bg-red-200 px-4 py-2 rounded-full shadow-md transition-all cursor-pointer'>
                            {singleJob?.jobType || "N/A"}
                        </Badge>
                        <Badge className='text-[#7209b7] bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-full shadow-md transition-all cursor-pointer'>
                            {singleJob?.salary ? `${singleJob.salary} LPA` : "N/A"}
                        </Badge>
                    </div>
                </div>
                <Button onClick={!isApplied ? applyJobHandler : undefined}
                    className={`rounded-lg mt-4 md:mt-0 px-6 py-3 text-white font-semibold transition-all ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-gray-300 font-medium py-4 text-lg text-gray-700'>{singleJob?.description || "No description available"}</h1>
            <div className='my-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <h1 className='font-bold'>Role: <span className='font-normal text-gray-800'>{singleJob?.title || "N/A"}</span></h1>
                    <h1 className='font-bold'>Location: <span className='font-normal text-gray-800'>{singleJob?.location || "N/A"}</span></h1>
                    <h1 className='font-bold'>Experience: <span className='font-normal text-gray-800'>{singleJob?.experienceLevel ? `${singleJob.experienceLevel} Years` : "N/A"}</span></h1>
                    <h1 className='font-bold'>Salary: <span className='font-normal text-gray-800'>{singleJob?.salary ? `${singleJob.salary} LPA` : "N/A"}</span></h1>
                </div>
                <div>
                    <h1 className='font-bold'>Total Applicants: <span className='font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span></h1>
                    <h1 className='font-bold'>Posted Date: <span className='font-normal text-gray-800'>{singleJob?.createdAt ? singleJob.createdAt.split('T')[0] : "N/A"}</span></h1>
                    <h1 className='font-bold'>Description: <span className='font-normal text-gray-800'>{singleJob?.description || "No description available"}</span></h1>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
