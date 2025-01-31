import { client } from "@/config";
import axios from "axios";

const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      const response = await axios.post(
        `${client.api.url}auth/token/refresh/`,
        {
          refresh: refreshToken,
        }
      );

      const { access } = response.data;
      sessionStorage.setItem("accessToken", access);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

export default refreshAccessToken;
