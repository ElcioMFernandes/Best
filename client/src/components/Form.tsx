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
      <div
        className="flex flex-col items-center justify-center lg:w-1/4 md:w-2/4 sm:w-3/4 gap-2 px-2 py-1 rounded-md
        focus:outline-none
         bg-neutral-200 ring-stone-200 shadow-md
        dark:bg-neutral-700 dark:shadow-2xl"
      >
        <form
          onSubmit={handleSubmit}
          method={props.formMethod}
          className="flex flex-col gap-6 p-4 w-full"
        >
          {props.formTitle && (
            <h1 className="text-2xl text-center">{props.formTitle}</h1>
          )}
          {props.children}
          <div className="flex w-full justify-center items-center">
            <button
              type="submit"
              className="rounded-md bg-red-500 hover:bg-red-600 w-full py-2 text-neutral-100"
            >
              {props.buttonLabel}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
