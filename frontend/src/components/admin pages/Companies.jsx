import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

function Companies() {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between my-5 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
          <Input
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            onClick={() => navigate('/admin/companies/create')}
          >
            New Company
          </Button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <CompaniesTable />
        </div>
      </div>
    </>
  );
}

export default Companies;
