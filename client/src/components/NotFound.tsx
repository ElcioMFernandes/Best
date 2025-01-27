export const NotFound = () => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Algo está faltando.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Desculpe, não conseguimos encontrar essa página.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};
