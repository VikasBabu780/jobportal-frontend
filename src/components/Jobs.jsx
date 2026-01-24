import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const Jobs = () => {
  const { allJobs = [], searchedQuery } = useSelector((store) => store.job);
  

  

const filteredJobs = useMemo(() => {
  if (!searchedQuery) return allJobs;

  const query = searchedQuery.toLowerCase();

  return allJobs.filter((job) =>
    job.title?.toLowerCase().includes(query) ||
    job.description?.toLowerCase().includes(query) ||
    job.location?.toLowerCase().includes(query)
  );
}, [allJobs, searchedQuery]);


  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          
          <div className="w-1/5">
            <FilterCard />
          </div>

          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center text-gray-500 text-lg"
            >
              No jobs found 🔍
            </motion.div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Jobs;
