import axios from "axios";

export const fetchAuth = async (data: any) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/v1/auth/token/",
    data
  );
  console.log(response.data);
};
