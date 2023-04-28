import GenreContainer from "../components/GenreContainer";

const Main = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4 p-4 max-w-7xl m-auto">
      <GenreContainer title={"horror"} />
      <GenreContainer title={"fantasy"} />
      <GenreContainer title={"programming"} />
    </div>
  );
};

export default Main;
