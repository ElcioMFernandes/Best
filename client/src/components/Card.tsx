import { CardProps } from "@/interfaces/CardProps";

const Card = (props: CardProps) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg pt-2 focus:outline-none shadow dark:shadow-lg p-4 dark:border dark:border-stone-600 dark:border-opacity-30">
      <img src={props.image} alt={props.title} className="w-24 h-24" />
      <div className="flex flex-col gap-2 p-2 w-full">
        <div className="flex gap-2">
          <h1 className="text-sm">{props.title}</h1>
        </div>
        <p className="flex flex-row gap-2">
          {
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
            </svg>
          }
          {props.subtitle}
        </p>
      </div>
    </div>
  );
};

export default Card;
