import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '@/components/ui/button';
import { USER_API } from '../../utils/constant.js';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(input);

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };
    useEffect(()=>{
        if(user) {
          navigate('/')
        }
      })

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col">
            <Navbar />
            <div className="flex flex-1 items-center justify-center p-4">
                <form onSubmit={submitHandler} className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8">
                    <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create an Account</h1>

                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm font-medium">Full Name</Label>
                            <Input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="John Doe" className="input-field" />
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Email</Label>
                            <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="you@example.com" className="input-field" />
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Phone Number</Label>
                            <Input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="123-456-7890" className="input-field" />
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Password</Label>
                            <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="••••••••" className="input-field" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4 justify-between">
                                <div>
                                    <Label className="text-sm font-medium">Role</Label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center space-x-2">
                                            <Input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} />
                                            <span>Student</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <Input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} />
                                            <span>Recruiter</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Profile Picture</Label>
                                    <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        {loading ? (
                            <Button className="w-full bg-indigo-300" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Signing up...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all hover:scale-105">
                                Sign Up
                            </Button>
                        )}
                    </div>

                    <p className="text-sm text-gray-600 text-center mt-4">
                        Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
