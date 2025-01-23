import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken && pathname !== "/") {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router, pathname]);

  return isLoading;
};

export default useAuth;
