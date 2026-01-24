import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  
  const { allAdminJobs ,searchJobByText} = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    // if (!Array.isArray(allAdminJobs)) {
    //   setFilterJobs([]);
    //   return;
    // }

    const filteredJobs = allAdminJobs.filter((job) =>
      searchJobByText
        ? job?.title
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
        : true
    );

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="rounded-2xl border bg-white shadow-sm p-4">
      <Table>
        <TableCaption className="text-gray-500">
          A list of your recent posted jobs
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                You haven't posted any job yet
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-gray-50 transition"
              >
                <TableCell className="font-medium">
                  {job.company?.name || "N/A"}
                </TableCell>

                <TableCell className="text-gray-600">
                  {job.title || job.name}
                </TableCell>

                <TableCell className="text-gray-600">
                  {job.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 rounded-md hover:bg-gray-100">
                      <MoreHorizontal className="h-5 w-5 text-gray-600" />
                    </PopoverTrigger>

                    <PopoverContent align="end" className="w-32 p-2">
                      <div
                        onClick={() => navigate(`/get/${job?._id}`)}
                        className="flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-gray-100"
                      >
                        <Edit2 className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">Edit</span>
                      </div>
                      <div className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                      onClick={() => navigate(`/getadminjobs/${job?._id}/applicants`)}>
                        <Eye className="w-4"/>
                        <span>Applicants</span>
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
};

export default AdminJobsTable;
