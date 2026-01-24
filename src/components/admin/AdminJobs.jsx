import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  },[input,dispatch])
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto my-10 px-4">
      
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input placeholder="Filter by name , role" className="sm:w-64" onChange={(e) => setInput(e.target.value)}/>

          <Button
          onClick={() =>navigate("/job/post")}
            className="
              flex items-center gap-2
              bg-[#6A38C2] hover:bg-[#5a2fb0]
              text-white font-medium
              px-5 py-2.5
              rounded-lg
              shadow-md hover:shadow-lg
              transition
            "
          >
            <Plus className="h-4 w-4" />
              New Jobs
          </Button>
        </div>

        
        <AdminJobsTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
