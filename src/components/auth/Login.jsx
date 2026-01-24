import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader, Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading,user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if(user){
      navigate("/")
    }
  })

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg bg-white shadow-xl border border-gray-100 rounded-2xl p-8 my-12"
        >
          <h1 className="font-bold text-3xl text-center text-indigo-600 mb-8">
            Login
          </h1>

          <div className="my-4">
            <Label className="text-gray-600">Email</Label>
            <Input
              type="text"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="xyz@gmail.com"
              className="mt-1 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="my-4">
            <Label className="text-gray-600">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Create your password"
              className="mt-1 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-6">
            <RadioGroup className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role == "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-indigo-600"
                />
                <Label htmlFor="option-one" className="text-gray-600">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role == "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-indigo-600"
                />
                <Label htmlFor="option-two" className="text-gray-600">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className= "w-full my-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              tupe="submit"
              className="w-full my-6 bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-2 rounded-xl transition"
            >
              Login
            </Button>
          )}

          <span className="text-sm text-gray-600">
            Don't have an account ?
            <Link
              to="/Signup"
              className="text-indigo-600 font-medium ml-1 hover:underline"
            >
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
