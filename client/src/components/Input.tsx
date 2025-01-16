import { InputProps } from "@/interfaces/InputProps";

export const Input = (props: InputProps) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <input
          id={props.id}
          type={props.type}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          className="bg-transparent border-b focus:outline-none"
        />
      </div>
    </>
  );
};
