import { client } from "@/config";
import axios from "axios";

const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post(`${client.api.url}auth/token/refresh/`, {
      refresh: refreshToken,
    });

    const { access } = response.data;
    sessionStorage.setItem("accessToken", access);
    return access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

export default refreshAccessToken;
