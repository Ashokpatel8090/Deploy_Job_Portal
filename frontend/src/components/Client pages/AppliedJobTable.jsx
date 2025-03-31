import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Applied Jobs</h1>
            <div className="overflow-x-auto">
                <Table className="w-full border-collapse">
                    <TableCaption className="text-gray-600">A list of your applied jobs</TableCaption>
                    <TableHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                        <TableRow>
                            <TableHead className="p-4 text-left">Date</TableHead>
                            <TableHead className="p-4 text-left">Job Role</TableHead>
                            <TableHead className="p-4 text-left">Company</TableHead>
                            <TableHead className="p-4 text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allAppliedJobs.length > 0 ? (
                            allAppliedJobs.map((appliedJob, index) => (  // ✅ Changed `_` to `appliedJob`
                                <TableRow key={appliedJob._id}>
                                    <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob.job?.title}</TableCell>
                                    <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge className={`${
                                            appliedJob?.status === "rejected" ? "bg-red-400" 
                                            : appliedJob.status === "pending" ? "bg-yellow-400" 
                                            : "bg-green-400"
                                        }`}>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center p-6 text-gray-500">
                                    <p className="text-gray-500">You haven’t applied to any jobs yet. Start exploring opportunities now!</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AppliedJobTable;
