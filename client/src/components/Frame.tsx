import { FrameProps } from "@/interfaces/FrameProps";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Frame = (props: FrameProps) => {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
        {props.displayNavBar && <Navbar />}
        <div className="flex flex-grow items-center justify-center w-full">
          {props.children}
        </div>
        {props.displayFooter && <Footer />}
      </div>
    </>
  );
};
