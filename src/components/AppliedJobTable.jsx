import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const getStatusClasses = (status) => {
  switch (status) {
    case "accepted":
      return "bg-green-100 text-green-700 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
  }
};

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-5xl mx-auto my-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableCaption className="py-4 text-sm text-gray-500">
          List of your applied jobs
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="font-semibold text-gray-700">
              Job Role
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Company
            </TableHead>
            <TableHead className="text-right font-semibold text-gray-700">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob?._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="text-gray-600">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="font-medium">
                  {appliedJob?.job?.title || "N/A"}
                </TableCell>

                <TableCell className="text-gray-700">
                  {appliedJob?.job?.company?.name || "N/A"}
                </TableCell>

                <TableCell className="text-right">
                  <Badge
                    className={`px-3 py-1 rounded-full text-xs font-semibold border shadow-sm 
      transition-all duration-200 hover:scale-105 
      ${getStatusClasses(appliedJob?.status)}`}
                  >
                    {appliedJob?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
