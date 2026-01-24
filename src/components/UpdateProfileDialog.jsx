import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    file: null,
  });

 
  useEffect(() => {
    if (user) {
      setInput({
        fullname: user.fullname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
        file: null,
      });
    }
  }, [user]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] || null });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);


    formData.append(
      "skills",
      JSON.stringify(
        input.skills.split(",").map((skill) => skill.trim())
      )
    );

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          withCredentials: true, 
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl rounded-xl px-6 py-6 bg-gray-50">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-semibold text-center">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-5" onSubmit={submitHandler}>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
            <Label className="sm:text-right">Name</Label>
            <Input
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="sm:col-span-3"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
            <Label className="sm:text-right">Email</Label>
            <Input
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              className="sm:col-span-3"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
            <Label className="sm:text-right">Number</Label>
            <Input
              name="phoneNumber"
              type="tel"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              className="sm:col-span-3"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Label className="sm:text-right">Bio</Label>
            <Textarea
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              rows={3}
              className="sm:col-span-3 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
            <Label className="sm:text-right">Skills</Label>
            <Input
              name="skills"
              placeholder="React, Node, MongoDB"
              value={input.skills}
              onChange={changeEventHandler}
              className="sm:col-span-3"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
            <Label className="sm:text-right">Resume</Label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx" 
              onChange={fileChangeHandler}
              className="sm:col-span-3"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
