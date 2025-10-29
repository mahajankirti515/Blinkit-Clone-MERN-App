import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/userSlice';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await Axios({
      ...SummaryApi.login,
      data : data
    })

    if(response.data.error){
      toast.error(response.data.message)
    }

    if(response.data.success){
      toast.success(response.data.message)
      localStorage.setItem("accessToken", response.data.data.accessToken)
      localStorage.setItem("refreshToken", response.data.data.refreshToken)

      const userDetails = await fetchUserDetails()
      dispatch(setUserDetails(userDetails.data))

      setData({
        email: "",
        password: "",
      })
      navigate("/")
    }

    console.log("response", response)
    } catch (error) {
      AxiosToastError(error)
    }

  };

  const valideValue = Object.values(data).every((el) => el);

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto p-9 rounded shadow">
        <p className='text-2xl font-semibold text-center'>Login</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>

          <div className="grid gap-1">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={data.email}
              onChange={handleChange}
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus:border-[color:var(--primary-200)] text-sm"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Password : </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-[color:var(--primary-200)]">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={data.password}
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
            <Link to={"/forgot-password"} className='block ml-auto hover:text-[color:var(--primary-200)]'>Forgot Password ?</Link>
          </div>


          <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } cursor-pointer text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Login
          </button>
        </form>

        <p className=''>Don't have account ? <Link to={"/ragister"} className='font-semibold text-green-700 hover:text-green-800'> Register</Link></p>
      </div>
    </section>
  );
};

export default Login;
