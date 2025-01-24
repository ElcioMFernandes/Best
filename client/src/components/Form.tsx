import { useState } from "react";
import { FormProps } from "@/interfaces/FormProps";

export const Form = (props: FormProps) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const json = Object.fromEntries(data.entries());

    setFormData(JSON.stringify(json));

    if (typeof props.formAction === "function") {
      props.formAction(json);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center lg:w-1/3 md:w-2/3 sm:w-3/4">
        <form
          onSubmit={handleSubmit}
          method={props.formMethod}
          className="flex flex-col gap-6 border p-4 w-full"
        >
          {props.children}
          <div className="flex w-full justify-center items-center">
            <button type="submit" className="border py-2 w-2/3">
              {props.formTitle}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
