import { FrameProps } from "@/interfaces/FrameProps";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Frame = (props: FrameProps) => {
  const headers = [
    {
      title: "Início",
      path: "/products",
    },
    {
      title: "Pedidos",
      path: "/orders",
    },
    {
      title: "Extrato",
      path: "/transactions",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
        {props.displayNavBar && <Navbar title="Best" items={headers} />}
        <div className="flex flex-grow border items-center justify-center w-full m-8">
          {props.children}
        </div>
        {props.displayFooter && <Footer />}
      </div>
    </>
  );
};
