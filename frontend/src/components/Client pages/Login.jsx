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
import { setLoading, setUser } from '@/redux/authSlice';
import store from '@/redux/store';
import { Loader2 } from 'lucide-react';

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API}/login`, input, {
        headers: { 'Content-Type': "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-6 sm:px-10">
        <form onSubmit={submitHandler} className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back 👋</h1>

          <div className="mb-4">
            <Label className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="johnDoe@gmail.com"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <Label className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <h2 className="text-sm font-medium text-gray-700">Login as</h2>
          <div className="flex items-center justify-start my-4 space-x-6">
            <label className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <span className="text-sm text-gray-700">Student</span>
            </label>
            <label className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <span className="text-sm text-gray-700">Recruiter</span>
            </label>
          </div>

          {loading ? (
            <Button className="w-full my-4 bg-indigo-300 cursor-not-allowed">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              Login
            </Button>
          )}

          <p className="text-sm text-gray-600 text-center mt-4">
            Don’t have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
