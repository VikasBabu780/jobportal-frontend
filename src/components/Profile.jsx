import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJob from "../hooks/useGetAppliedJob";

const Profile = () => {
  useGetAppliedJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-sm">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 ring-2 ring-gray-100">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="Profile Photo"
              />
              <AvatarFallback className="bg-purple-600 text-white text-2xl font-semibold">
                {(user?.fullname?.[0] || "?").toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="font-semibold text-2xl text-gray-800">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="rounded-full"
          >
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-6 space-y-3 border-t pt-5">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="h-4 w-4 text-gray-500" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6 border-t pt-5">
          <h1 className="font-semibold text-lg mb-3">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-purple-100 text-purple-700 border border-purple-200"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="border-t pt-5">
          <Label className="text-md font-semibold text-gray-800">Resume</Label>

          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 text-blue-600 hover:underline"
            >
              {user.profile.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h1 className="font-bold text-xl mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
