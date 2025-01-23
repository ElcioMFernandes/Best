import axios from "axios";

export const fetchAuth = async (data: any) => {
  console.log(data);
  try {
    const response = await axios.post(
      "http://192.168.20.51:8000/api/v1/auth/token/",
      data
    );

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
