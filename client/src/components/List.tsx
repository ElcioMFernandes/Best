interface ListProps {
  title?: string;
  children: React.ReactNode[];
}

export const List = (props: ListProps) => {
  return (
    <div className="flex flex-col w-full lg:w-1/2 md:w-2/3 items-center gap-4">
      {props.title && <h1 className="text-xl">{props.title}</h1>}
      <ul className="flex flex-col gap-4">
        {props.children.map((child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    </div>
  );
};
