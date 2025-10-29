import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";

import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

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
      ...SummaryApi.forgot_password,
      data : data
    })

    if(response.data.error){
      toast.error(response.data.message)
    }

    if(response.data.success){
      toast.success(response.data.message)
      navigate("/otp-verification", {
         state : data 
      })
      setData({
        email: "",
      })
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
        <p className='font-bold text-lg text-center'>Forgot Password</p>
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


          <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } cursor-pointer text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Send Otp
          </button>
        </form>

        <p className=''>Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'> Login</Link></p>
      </div>
    </section>
  );
};

export default ForgotPassword;
