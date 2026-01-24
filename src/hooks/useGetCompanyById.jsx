import axios from "axios";
import { useEffect } from "react";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
// import { setAllJobs } from "../redux/jobSlice";
import { setSingleCompany } from "../redux/CompanySlice";

const useGetCompanyById = (companyid) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyid}`, {
          withCredentials: true,
        });
        console.log(res.data)
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleCompany();
  },[companyid,dispatch]);
};

export default useGetCompanyById;
