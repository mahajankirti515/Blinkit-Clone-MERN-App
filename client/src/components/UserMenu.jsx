import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../redux/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { TbExternalLink } from "react-icons/tb";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        // localStorage.removeItem("token")
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if(close){
      close()
    }
  }

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">{user.name || user.mobile}</span>
        <Link onClick={handleClose} to={"/deshboard/profile"} className="hover:[color:var(--primary-200)]">
          <TbExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-1">
        <Link onClick={handleClose} to={"/deshboard/myorders"} className="px-2 hover:bg-orange-200 py-1">
          My Orders
        </Link>
        <Link onClick={handleClose} to={"/deshboard/address"} className="px-2 hover:bg-orange-200 py-1">
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-orange-200 py-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
