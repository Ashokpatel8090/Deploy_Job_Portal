import { setAllAdminJobs } from '../redux/jobSlice';
import { JOB_API } from '../utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API}/getadminjobs`, { withCredentials: true });
                
                if (res?.data?.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                } else {
                    console.error("Failed to fetch jobs: ", res?.data?.message);
                }
            } catch (error) {
                console.error("Error fetching admin jobs: ", error);
            }
        };

        fetchAllAdminJobs();
        
    }, [dispatch]);

    // Optional: Return some state or status if needed
};

export default useGetAllAdminJobs;
