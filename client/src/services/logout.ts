import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    router.push("/");
  };

  return logout;
};

export default useLogout;
