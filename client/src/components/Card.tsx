// Interfaces
import { CardProps } from "@/interfaces/CardProps";

const Card = (props: CardProps) => {
  return (
    <div className="flex flex-col gap-4 p-2 rounded-md shadow-xl border bg-neutral-200 border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:ring-2 ring-neutral-300 dark:ring-neutral-700">
      <img
        src={props.image}
        alt={props.title}
        className="row-span-2 h-24 md:h-28 lg:h-32 w-full"
      />
      <div className="border-t dark:border-neutral-700 flex flex-col gap-2 py-2">
        <p className="text-xl">{props.title}</p>
        <p className="flex gap-1 ">
          {
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
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
                strokeWidth="2"
                d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
          }
          {props.subtitle}
        </p>
      </div>
    </div>
  );
};

export default Card;
