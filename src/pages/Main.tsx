import GenreContainer from "../components/GenreContainer";

const Main = () => {
  return (
    <div className="h-fit w-full flex flex-col gap-4 p-4 m-auto">
      <GenreContainer title={"programming"} />
      <GenreContainer title={"fantasy"} />
      <GenreContainer title={"horror"} />
    </div>
  );
};

export default Main;
