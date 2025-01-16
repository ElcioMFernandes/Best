import { FormProps } from "@/interfaces/FormProps";

export const Form = (props: FormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center">
        {/*Logo no topo do formulário
        <div className="flex flex-row gap-4">
          <img src="/logo.png" alt="Logo" className="w-20 h-auto" />
          <img src="/best.png" alt="Logo" className="w-32 h-auto" />
        </div>*/}
        <form
          onSubmit={handleSubmit}
          method={props.formMethod}
          className="flex flex-col gap-6 border p-4"
        >
          {props.children}
          <button type="submit" className="border py-2 px-4">
            {props.formTitle}
          </button>
        </form>
      </div>
    </>
  );
};
