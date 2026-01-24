import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} = useSelector(store => store.application)
  useEffect(() => {
    const fetchApplicants = async() => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials:true
        })
        dispatch(setAllApplicants(res.data.job))
      } catch (error) {
        console.log(error)
      }
    }
    fetchApplicants();
  },[])
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Applicants <span className="text-gray-500">{applicants?.applications?.length}</span>
          </h1>

          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
