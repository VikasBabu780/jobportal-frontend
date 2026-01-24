import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";

export const Navbar = () => {
  // const user = true
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Logout failed. Try again.",
      );
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role == "Recruiter" ? (
              <>
                <li className="hover:text-indigo-400">
                  <Link to="/company/get">Companies</Link>
                </li>
                <li className="hover:text-indigo-400">
                  <Link to="/getadminjobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-indigo-400">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-indigo-400">
                  <Link to="/job">Jobs</Link>
                </li>
                <li className="hover:text-indigo-400">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="rounded-full border-gray-300 px-6 py-2 text-sm font-medium hover:bg-gray-100 transition cursor-pointer"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-full bg-[#7209b7] px-6 py-2 text-sm font-medium text-white hover:bg-[#e52a00] transition shadow-md cursor-pointer">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile Photo"
                  />
                  <AvatarFallback className="bg-purple-600 text-white text-2xl font-semibold">
                    {(user?.fullname?.[0] || "?").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Profile Photo"
                    />
                    <AvatarFallback className="bg-purple-600 text-white text-2xl font-semibold">
                      {(user?.fullname?.[0] || "?").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col  text-gray-600">
                  {user && user.role == "Student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    <Button onClick={logOutHandler} variant="link" className={'bg-black text-white h-8 mt-6'}>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
