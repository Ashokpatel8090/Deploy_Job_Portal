import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import Navbar from '../shared/Navbar';

const CompanySetup = () => {
    const { id } = useParams();
    useGetCompanyById(id);

    const { singleCompany } = useSelector(store => store.company);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null
    });

    // Ensure singleCompany updates properly
    useEffect(() => {
        if (singleCompany?._id) {
            setInput({
                name: singleCompany?.name || '',
                description: singleCompany?.description || '',
                website: singleCompany?.website || '',
                location: singleCompany?.location || '',
                file: null
            });
        }
    }, [singleCompany]);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.name || !input.description || !input.website || !input.location) {
            toast.error("All fields except logo are required.");
            return;
        }

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API}/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data?.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            } else {
                throw new Error("Unexpected API response format");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200'>
                <div className='flex items-center gap-4 mb-6'>
                    <Button 
                        onClick={() => navigate('/admin/companies')} 
                        variant='outline' 
                        className='flex items-center gap-2 hover:bg-gray-100 transition'
                    >
                        <ArrowLeft />
                        Back
                    </Button>
                    <h1 className='text-2xl font-semibold'>Company Setup</h1>
                </div>
                <form onSubmit={handleSubmit} className='grid gap-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input 
                                type='text' 
                                name='name' 
                                value={input.name} 
                                onChange={handleChange} 
                                required 
                                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input 
                                type='text' 
                                name='description' 
                                value={input.description} 
                                onChange={handleChange} 
                                required 
                                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <Label>Website</Label>
                            <Input 
                                type='text' 
                                name='website' 
                                value={input.website} 
                                onChange={handleChange} 
                                required 
                                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input 
                                type='text' 
                                name='location' 
                                value={input.location} 
                                onChange={handleChange} 
                                required 
                                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Logo</Label>
                        <Input 
                            type='file' 
                            accept='image/*' 
                            onChange={handleFileChange} 
                            className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <Button 
                        type='submit' 
                        className='w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all' 
                        disabled={loading}
                    >
                        {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Update'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
