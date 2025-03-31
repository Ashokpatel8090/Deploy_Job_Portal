import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Tailwind CSS"];
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    
    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            <Navbar />
            <div className='max-w-4xl mx-auto my-5 p-8 bg-white border border-gray-200 rounded-2xl shadow-lg'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className='flex items-center gap-6'>
                        <Avatar className="h-24 w-24 border-2 border-purple-500 shadow-md hover:scale-105 transition-transform">
                            <AvatarImage 
                                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" 
                                alt="profile"
                            />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-2xl text-gray-800'>{user?.fullname}</h1>
                            <p className='text-gray-600'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right bg-purple-600 hover:bg-purple-700 text-white cursor-pointer" variant="outline">
                        <Pen className="mr-2" /> Edit Profile
                    </Button>
                </div>
                
                <div className='my-8'>
                    <h2 className='text-lg font-semibold mb-4'>Contact Information</h2>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm'>
                            <Mail className="text-purple-600" />
                            <span className="text-gray-700 hover:text-purple-600 cursor-pointer transition-colors">{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm'>
                            <Contact className="text-purple-600" />
                            <span className="text-gray-700 hover:text-purple-600 cursor-pointer transition-colors">{user?.phoneNumber}</span>
                        </div>
                    </div>
                </div>
                
                <div className='my-8'>
                    <h2 className='text-lg font-semibold mb-4'>Skills</h2>
                    <div className='flex flex-wrap gap-2'>
                        {user?.profile?.length !== 0 ? (
                            user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className='bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer transition'>
                                    {item}
                                </Badge>
                            ))
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                </div>
                
                <div className='my-8'>
                    <h2 className='text-lg font-semibold mb-4'>Resume</h2>
                    {isResume ? (
                        <a 
                            target='_blank' 
                            rel='noopener noreferrer' 
                            href={user?.profile?.resume} 
                            className='text-blue-500 hover:underline cursor-pointer'
                        >
                            {user?.profile?.resumeOriginalName}
                        </a>
                    ) : (
                        <span>NA</span>
                    )}
                </div>
            </div>
            
            <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6'>
                <h1 className='font-bold text-lg mb-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
                {/* <p className='text-gray-500'>You haven’t applied to any jobs yet. Start exploring opportunities now!</p> */}
            
        </div>
    )
}

export default Profile;