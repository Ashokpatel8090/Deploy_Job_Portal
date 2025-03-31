import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API } from '@/utils/constant.js';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className='bg-white shadow-md border-b border-gray-200 sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
                <h1 className='text-2xl font-bold text-gray-800 cursor-pointer'>Job<span className='text-[#F83002]'>Portal</span></h1>

                <div className='hidden md:flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6 text-gray-700'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies" className='hover:text-[#F83002] transition'>Companies</Link></li>
                                <li><Link to="/admin/jobs" className='hover:text-[#F83002] transition'>Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/" className='hover:text-[#F83002] transition'>Home</Link></li>
                                <li><Link to="/jobs" className='hover:text-[#F83002] transition'>Jobs</Link></li>
                                <li><Link to="/browse" className='hover:text-[#F83002] transition'>Browse</Link></li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to="/login"><Button variant="outline" className='hover:shadow-lg'>Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b2ea9] shadow-lg">Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer border-2 border-gray-300 shadow-md hover:shadow-lg transition'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                    <AvatarFallback className='text-2xl bg-gray-200 text-gray-700'>{user?.fullname?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4 shadow-lg rounded-lg border border-gray-200">
                                <div className='flex gap-4 items-center'>
                                    <Avatar className='border border-gray-400'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                        <AvatarFallback className='bg-gray-300'>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className='font-semibold text-gray-800'>{user?.fullname}</h4>
                                        <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='mt-4 space-y-2'>
                                    {user?.role === 'student' && (
                                        <Link to="/profile" className='flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition'>
                                            <User2 /> View Profile
                                        </Link>
                                    )}
                                    <button onClick={logoutHandler} className='flex items-center gap-2 text-red-600 hover:text-red-800 transition'>
                                        <LogOut /> Logout
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                <div className='md:hidden'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className='hover:shadow-md'>
                                <Menu />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-64 p-4 shadow-lg rounded-lg border border-gray-200'>
                            <ul className='flex flex-col gap-4 text-gray-700'>
                                <li><Link to="/" className='hover:text-[#F83002] transition'>Home</Link></li>
                                <li><Link to="/jobs" className='hover:text-[#F83002] transition'>Jobs</Link></li>
                                <li><Link to="/browse" className='hover:text-[#F83002] transition'>Browse</Link></li>
                            </ul>
                            {!user ? (
                                <div className='mt-4 space-y-2'>
                                    <Link to="/login"><Button variant="outline" className='w-full hover:shadow-md'>Login</Button></Link>
                                    <Link to="/signup"><Button className='w-full bg-[#6A38C2] hover:bg-[#5b2ea9] mt-2 shadow-md'>Signup</Button></Link>
                                </div>
                            ) : (
                                <div className='mt-4 space-y-2'>
                                    <Link to="/profile" className='block text-gray-700 hover:text-[#6A38C2] transition'>View Profile</Link>
                                    <button onClick={logoutHandler} className='block text-red-600 hover:text-red-800 transition'>Logout</button>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default Navbar;