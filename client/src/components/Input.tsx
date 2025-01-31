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
          required={props.required}
          maxLength={props.maxLength}
          onChange={props.onChange}
          className="focus:outline-none border bg-neutral-200 border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 py-2 px-3 rounded-md"
        />
      </div>
    </>
  );
};
