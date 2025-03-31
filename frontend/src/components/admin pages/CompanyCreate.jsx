import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API } from '../../utils/constant.js'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setSingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'

function CompanyCreate() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name cannot be empty.");
            return;
        }
        try {
            const res = await axios.post(`${COMPANY_API}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to register company. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className='max-w-4xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg'>
                <div className='mb-6'>
                    <h1 className='font-bold text-2xl text-gray-800'>Your Company Name</h1>
                    <p className='text-gray-500 text-sm'>What would you like to name your company? You can change this later.</p>
                </div>
                
                <div className='mb-4'>
                    <Label className="text-gray-700 font-semibold">Company Name</Label>
                    <Input
                        type="text"
                        className="mt-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md shadow-sm"
                        placeholder="JobHunt, Microsoft, etc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                
                <div className='flex items-center gap-3 mt-6'>
                    <Button variant="outline" className="border-gray-300 hover:bg-gray-200" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate