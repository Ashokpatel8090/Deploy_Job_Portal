import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button'; 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 p-6 bg-white shadow-xl rounded-xl'>
        <div className='flex flex-col sm:flex-row items-center justify-between mb-6 border-b pb-4'>
          <Input
            className="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6A38C2] transition"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")} 
            className="mt-4 sm:mt-0 bg-[#6A38C2] hover:bg-[#5b2ea9] shadow-lg px-6 py-2 rounded-lg transition-transform transform hover:scale-105">
            + New Job
          </Button>
        </div>
        <div className='overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-md'>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
