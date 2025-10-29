import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export default fetchUserDetails;
