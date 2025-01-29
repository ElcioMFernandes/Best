// Interfaces
import { SvgProps } from "@/interfaces/SvgProps";

export const Svg = (props: SvgProps) => {
  return (
    <svg
      className="w-6 h-6 text-neutral-700 dark:text-neutral-100"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      {props.paths.map((path, index) => (
        <path key={index} fillRule="evenodd" d={path.d} clipRule="evenodd" />
      ))}
    </svg>
  );
};
