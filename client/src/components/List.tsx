// Interfaces
import { ListProps } from "@/interfaces/ListProps";

export const List = (props: ListProps) => {
  const { title, children } = props;

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className="flex flex-col w-full lg:w-1/2 md:w-2/3 items-center gap-4">
      {title && <h1 className="text-xl">{title}</h1>}

      <ul className="flex flex-col gap-4">
        {childrenArray.length === 0 && <div>Não há registros</div>}
        {childrenArray.length === 1 && <li>{childrenArray[0]}</li>}
        {childrenArray.length > 1 &&
          childrenArray.map((child, index) => <li key={index}>{child}</li>)}
      </ul>
    </div>
  );
};
