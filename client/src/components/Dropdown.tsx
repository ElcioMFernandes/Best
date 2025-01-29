// React
import { useEffect, useState } from "react";

// Hooks
import { useToggle } from "@/hooks/useToggle";

// Interfaces
import { DropdownProps } from "@/interfaces/DropdownProps";

export const Dropdown = (props: DropdownProps) => {
  const [enabled, toggleDropdown] = useToggle(false);
  const [selectedValue, setSelectedValue] = useState(props.options[0]);

  useEffect(() => {
    setSelectedValue(props.value);
  }, [props.value]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    toggleDropdown();
    {
      props.onChange && props.onChange(value);
    }
  };

  return (
    <div className="flex flex-col select-none">
      {props.id && <label htmlFor={props.id}>{props.label}</label>}
      <div className="relative inline-block text-left">
        <section
          id={props.id}
          onClick={toggleDropdown}
          className="cursor-pointer focus:outline-none bg-slate-100 border dark:bg-neutral-800 dark:border-stone-500 py-2 px-3 rounded-md flex items-center justify-between"
        >
          {selectedValue}
          <svg
            className={`w-6 h-6 text-gray-800 dark:text-white cursor-pointer transform transition-transform ${
              enabled ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 9-7 7-7-7"
            />
          </svg>
        </section>
        {enabled && (
          <ul className="absolute mt-2 w-full right-0 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg z-10">
            {props.options.map((option) => (
              <li
                key={option}
                className=" py-2 pl-2 hover:bg-neutral-700 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
