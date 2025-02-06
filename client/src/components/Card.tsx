// Interfaces
import { CardProps } from "@/interfaces/CardProps";
import { SvgCoin } from "./SvgCoin";

const Card = (props: CardProps) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src={props.image}
          alt={props.title}
          className="h-44 w-full p-4 rounded-xl shadow-lg dark:shadow-neutral-950/50"
        />
        <p className="w-full text-xl">{props.title}</p>
        <div className="w-full flex items-center gap-1">
          <SvgCoin />
          <p className="">{props.subtitle}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
