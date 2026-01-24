import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobtype: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company?.name?.toLowerCase() == value,
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        ...input,
        salary: Number(input.salary),
        experience: Number(input.experience),
        position: Number(input.position),
      };

      const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/getadminjobs");
      }
    } catch (error) {
      console.error("Job post error:", error);
      toast.error(error?.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center mt-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Post a Job
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Title</Label>
              <Input
                className={"mt-2"}
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                className={"mt-2"}
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                className={"mt-2"}
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                className={"mt-2"}
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                className={"mt-2"}
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                className={"mt-2"}
                name="jobtype"
                value={input.jobtype}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Experience</Label>
              <Input
                className={"mt-2"}
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>No. of Positions</Label>
              <Input
                className={"mt-2"}
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Company</Label>

              <Select
                disabled={companies.length === 0}
                onValueChange={selectChangeHandler}
              >
                <SelectTrigger className="mt-1 w-full ">
                  <SelectValue
                    placeholder={
                      companies.length > 0
                        ? "Select a company"
                        : "No companies available"
                    }
                  />
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  className="w-[--radix-select-trigger-width] z-50"
                >
                  {companies.map((company) => (
                    <SelectItem
                      key={company._id}
                      value={company?.name?.toLowerCase()}
                    >
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="
              flex items-center gap-2
              bg-[#6A38C2] hover:bg-[#5a2fb0]
              text-white font-medium
              px-10 py-5
              rounded-lg
              shadow-md hover:shadow-lg
              transition
              w-full
              mt-8
              cursor-pointer
            "
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin " />
                Please wait...
              </>
            ) : (
              "Post New Job"
            )}
          </Button>

          {companies.length === 0 && (
            <p className="text-sm text-red-500 mt-4 text-center">
              * Please register a company before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
