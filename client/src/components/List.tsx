import { useState } from "react";
import { ListProps } from "@/interfaces/ListProps";

export const List = (props: ListProps) => {
  const { title, children } = props;
  const childrenArray = Array.isArray(children) ? children : [children];

  const itemsPerPage = 5; // Número de itens por página
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(childrenArray.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedChildren = childrenArray.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex flex-col">
      {title && (
        <h1 className="text-center text-2xl border-b pb-4 border-b-neutral-700">
          {title}
        </h1>
      )}

      <div className="flex justify-between my-4 items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {paginatedChildren.length === 0 && <div>Não há registros</div>}
        {paginatedChildren.map((child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    </div>
  );
};
