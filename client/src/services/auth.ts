import axios from "axios";

export const fetchAuth = async (data: any) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/auth/token/",
      data
    );

    console.log(response.data);

    if (response.data.detail) {
      return false;
    }
    const { access, refresh } = response.data;
    sessionStorage.setItem("accessToken", access);
    sessionStorage.setItem("refreshToken", refresh);
    return true;
  } catch (error) {
    console.log(`Erro ao autenticar: ${error}`);
    return false;
  }
};
