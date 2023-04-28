import GenreContainer from "../components/GenreContainer";

const Main = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4 p-4 m-auto md:col-start-2 md:col-end-5 md:row-start-2 md:row-end-5 md:overflow-y-scroll">
      <GenreContainer title={"programming"} />
      <GenreContainer title={"fantasy"} />
      <GenreContainer title={"horror"} />
    </div>
  );
};

export default Main;
