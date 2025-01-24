interface CardProps {
  title: string;
  image: string;
  subtitle: string;
}

const Card = (props: CardProps) => {
  return (
    <div
      className="flex flex-col items-center gap-2 px-2 py-1 rounded-md focus:outline-none hover:ring-2 
     bg-transparent ring-stone-200 shadow-md
      dark:bg-stone-700 dark:shadow-2xl"
    >
      <img src={props.image} alt={props.title} className="w-24 h-24" />
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-2">
          <h1 className="font-semibold">{props.title}</h1>
        </div>
        <p className="">${props.subtitle}</p>
      </div>
    </div>
  );
};

export default Card;
