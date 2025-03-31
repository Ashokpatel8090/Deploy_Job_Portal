import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllApplicants();
    }, [dispatch, params.id]);

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10'>
                <h1 className='font-bold text-2xl mb-6 text-gray-800'>Applicants ({applicants?.applications?.length || 0})</h1>
                {loading ? (
                    <p className='text-gray-500 text-center py-4'>Loading applicants...</p>
                ) : (
                    <ApplicantsTable />
                )}
            </div>
        </div>
    );
};

export default Applicants;