interface CardProps {
  title: string;
  subtitle: string;
  description: string;
}

const Card = (props: CardProps) => {
  return (
    <div className="flex flex-col border rounded-md justify-center items-center p-4 m-4 select-none">
      <img src="/bottle.webp" alt="" className="w-24 h-24" />
      <div className="flex flex-row gap-1">
        <h1 className="text-sm font-semibold">{props.title}</h1>
        <p>${props.subtitle}</p>
      </div>
      <p>{props.description}</p>
    </div>
  );
};

export default Card;
