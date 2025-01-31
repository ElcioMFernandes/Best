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
      try {
        const success = await refreshAccessToken();
        if (success) {
          return request({ ...props, retry: true });
        } else {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
      }
    } else {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
};

export default request;
