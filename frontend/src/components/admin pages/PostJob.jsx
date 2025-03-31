import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { JOB_API } from '../../utils/constant';
import { toast } from 'sonner';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

function PostJob() {
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: '',
        companyId: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleCompanyChange = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(input);
        
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5">
                <form onSubmit={handleSubmit} className="p-8 max-w-4xl w-full border border-gray-200 shadow-lg rounded-md bg-white">
                    <h1 className="text-xl font-semibold mb-4 text-center">Post a Job</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Title</Label>
                            <Input type="text" name="title" value={input.title} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input type="text" name="salary" value={input.salary} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" name="jobType" value={input.jobType} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input type="text" name="experience" value={input.experience} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label>Number of Positions</Label>
                            <Input type="number" name="position" value={input.position} onChange={handleChange} required />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <Label>Company</Label>
                            {companies.length > 0 ? (
                                <Select onValueChange={handleCompanyChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className="text-xs text-red-600 font-bold text-center my-2">
                                    * Please register a company first before posting a job.
                                </p>
                            )}
                        </div>
                    </div>

                    <Button type="submit" className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Post New Job'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default PostJob;
