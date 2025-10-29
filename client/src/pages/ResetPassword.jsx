import React, { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState();

  const valideValue = Object.values(data).every((el) => el);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.newPassword !== data.confirmPassword) {
      toast.error("Password and Confirm Password not match")
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }

      console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  console.log("reset password data", data);

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto p-9 rounded shadow">
        <p className="font-bold text-lg text-center">Reset Password</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password : </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-[color:var(--primary-200)]">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                placeholder="Enter Your newPassword"
                value={data.newPassword}
                onChange={handleChange}
                autoFocus
                className=" w-full outline-none text-sm"
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password : </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-[color:var(--primary-200)]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter Your confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                autoFocus
                className=" w-full outline-none text-sm"
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <IoEyeSharp /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } cursor-pointer text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Reset Password
          </button>
        </form>

        <p className="">
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
