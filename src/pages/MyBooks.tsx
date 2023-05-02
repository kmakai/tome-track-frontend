import { useAppSelector } from "../hooks";
import MyBookCard from "../components/MyBookCard";
const MyBooks: React.FC = () => {
  const MyBooks = useAppSelector((state) => state.user.myBooks);
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
      {MyBooks.map((book) => (
        <MyBookCard key={book.id} volume={book} />
      ))}
    </div>
  );
};

export default MyBooks;
