import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from '../redux/userSlice';
import { IoClose } from 'react-icons/io5';

const UserProfileAvatarEdit = ({close}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];

    if(!file){
      return
    }

    const formData = new FormData();
    formData.append("avatar", file);
    
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      const { data : responseData} = response.data
      console.log(responseData);
      dispatch(updateAvatar(responseData.avatar))
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
       
       <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
         <IoClose size={20}/>
       </button>

        <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm cursor-pointer">
          {user.avatar ? (
            <img src={user.avatar} alt="" className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="text-sm min-w-20 border border-[color:var(--primary-100)] hover:border-[color:var(--primary-200)] hover:bg-[color:var(--primary-200)] px-3 py-1 rounded mt-3 cursor-pointer">
              {loading ? "Loading..." : "Upload"}
            </div>
          </label>
          <input
            onChange={handleUploadAvatarImage}
            type="file"
            id="uploadProfile"
            className="hidden"
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
