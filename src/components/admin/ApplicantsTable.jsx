import React from "react";
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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status,id) => {
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true})
      if(res.data.success){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const shortListingStatus = ["Accepted", "Rejected"];

  return (
    <div className="overflow-x-auto">
      <Table className="bg-white rounded-lg">
        <TableCaption className="text-sm text-gray-500 mt-2">
          A list of your recent applied users
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.map((item, index) => (
            <TableRow
              key={item?._id || index}
              className="hover:bg-gray-50 transition"
            >
              <TableCell className="font-medium">
                {item?.applicant?.fullname}
              </TableCell>

              <TableCell>{item?.applicant?.email}</TableCell>

              <TableCell>{item?.applicant?.phoneNumber}</TableCell>

              <TableCell>
                <a
                  href={item?.applicant?.profile?.resumeOriginalName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              </TableCell>

              <TableCell className="text-gray-500">
                {new Date(item?.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-gray-200">
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent className="w-32 p-2">
                    {shortListingStatus.map((status) => (
                      <div
                        key={status}
                        onClick={()=>statusHandler(status,item?._id)}
                        className={`px-2 py-1 rounded cursor-pointer text-sm hover:bg-gray-100 ${
                          status === "Accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {status}
                      </div>
                    ))}
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

export default ApplicantsTable;
