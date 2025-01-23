"use client";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/services/logout";

const Home = () => {
  const isLoading = useAuth();
  const logout = useLogout();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>home</p>
      <button onClick={logout}>Logoff</button>
    </>
  );
};

export default Home;
