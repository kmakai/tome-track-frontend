import { useAppSelector } from "../hooks";
import MyBookCard from "../components/MyBookCard";

const MyBooks: React.FC = () => {
  const MyBooks = useAppSelector((state) => state.user.myBooks);
  return (
    <>
      <h2>My Books</h2>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
        {MyBooks.map((book: any) => (
          <MyBookCard key={book.volumeId} volume={book} />
        ))}
      </div>
    </>
  );
};

export default MyBooks;
