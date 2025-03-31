import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { 
        if (!allAdminJobs?.length) return;
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
            <Table className='w-full border-collapse'>
                <TableCaption className='text-gray-600'>A list of your recently posted jobs</TableCaption>
                <TableHeader className='bg-gray-100'>
                    <TableRow>
                        <TableHead className='p-4 text-left'>Company Name</TableHead>
                        <TableHead className='p-4 text-left'>Role</TableHead>
                        <TableHead className='p-4 text-left'>Date</TableHead>
                        <TableHead className='p-4 text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id} className='hover:bg-gray-50 transition'>
                            <TableCell className='p-4'>{job?.company?.name}</TableCell>
                            <TableCell className='p-4'>{job?.title}</TableCell>
                            <TableCell className='p-4'>{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className='p-4 text-right cursor-pointer'>
                                <Popover>
                                    <PopoverTrigger className='p-2 hover:bg-gray-200 rounded-full'><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className='w-36 bg-white shadow-md rounded-md p-2'>
                                        <div onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                            className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer'>
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
                                        <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                            className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer'>
                                            <Eye className='w-4'/>
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
