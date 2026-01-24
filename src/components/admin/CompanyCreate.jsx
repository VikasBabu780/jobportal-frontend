import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/CompanySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      if (res?.data?.success) {
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/company/get/${companyId}`);
        dispatch(setSingleCompany(res.data.company));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center mt-20 px-4">
        <div className="w-full max-w-lg bg-white border rounded-2xl shadow-sm p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Your Company Name
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              What would you like to give your company name? You can change this
              later.
            </p>
          </div>

        
          <div className="space-y-2 mb-6">
            <Label>Company Name</Label>
            <Input
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>


          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate("/company/get")}>
              Cancel
            </Button>

            <Button
              className="bg-[#6A38C2] hover:bg-[#5a2fb0] text-white"
              onClick={registerNewCompany}
              disabled={!companyName}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
