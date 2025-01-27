import { client } from "@/config";
import axios from "axios";

export const fetchAuth = async (data: any) => {
  try {
    console.log(`${client.api.url}auth/token/`);
    const response = await axios.post(`${client.api.url}auth/token/`, data);

    console.log(response);
    if (response.data.detail) {
      return false;
    }
    const { access, refresh } = response.data;
    sessionStorage.setItem("accessToken", access);
    sessionStorage.setItem("refreshToken", refresh);
    return true;
  } catch (error) {
    return false;
  }
};
