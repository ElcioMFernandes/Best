import { RequestProps } from "@/interfaces/RequestProps";
import axios, { AxiosRequestConfig } from "axios";
import refreshAccessToken from "./refresh";
import { client } from "@/config";

const request = async (props: RequestProps) => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");
    const config: AxiosRequestConfig = {
      url: `${client.api.url}${props.endpoint}`,
      method: props.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: props.body,
    };

    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401 && !props.retry) {
      console.error("Unauthorized request, attempting to refresh token...");
      try {
        const newAccessToken = await refreshAccessToken();
        return request({ ...props, retry: true });
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
        throw refreshError;
      }
    } else {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
};

export default request;
