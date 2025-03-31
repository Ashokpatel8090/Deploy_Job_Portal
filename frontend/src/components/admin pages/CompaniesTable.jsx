import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CompaniesTable() {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    
    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter(company => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-hidden shadow-lg rounded-lg border border-gray-200 bg-white p-4">
            <Table>
                <TableCaption className="text-gray-600 text-lg">List of recent registered companies</TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="p-3 text-gray-700">Logo</TableHead>
                        <TableHead className="p-3 text-gray-700">Name</TableHead>
                        <TableHead className="p-3 text-gray-700">Date</TableHead>
                        <TableHead className="p-3 text-right text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companies.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                                You have not registered any companies
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map((company, index) => (
                            <TableRow key={index} className="hover:bg-gray-50 transition-all">
                                <TableCell className="p-3">
                                    <Avatar className="w-12 h-12 border border-gray-300 shadow-md rounded-full">
                                        <AvatarImage src={company.logo || 'https://via.placeholder.com/50'} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="p-3 text-gray-800 font-medium">{company.name}</TableCell>
                                <TableCell className="p-3 text-gray-600">{company.createdAt.split('T')[0] || "N/A"}</TableCell>
                                <TableCell className="p-3 text-right">
                                    <Popover>
                                        <PopoverTrigger className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 bg-white shadow-md border border-gray-200 rounded-lg p-2">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                                                <Edit2 className="w-4 text-blue-600" />
                                                <span className="text-gray-700">Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default CompaniesTable;
