// Interfaces
import { InputProps } from "@/interfaces/InputProps";

export const Input = (props: InputProps) => {
  return (
    <>
      <div className="flex flex-col place">
        {props.label && (
          <label className="select-none" htmlFor={props.id}>
            {props.label}
          </label>
        )}
        <input
          id={props.id}
          type={props.type}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          className="focus:outline-none bg-slate-100 border dark:bg-stone-700 dark:border-stone-500 py-2 px-3 rounded-md"
        />
      </div>
    </>
  );
};
