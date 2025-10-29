import toast from "react-hot-toast";

const AxiosToastError = (error) => {
  if (error.response) {
    toast.error(error?.response?.data?.message);
  } else if (error.request) {
    toast.error("No response received from the server.");
  } else {
    toast.error("An error occurred while sending the request.");
  }
};

export default AxiosToastError;