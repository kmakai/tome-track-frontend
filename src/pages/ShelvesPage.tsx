import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import Shelf from "../components/Shelf";
import axios from "axios";
import { addShelfToState } from "../features/userSlice";
import { refreshShelves } from "../features/userSlice";

const ShelvesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { myShelves } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.user.user);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const shelf = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    };
    // TODO: Add shelf to database

    const res = await axios.post(
      "http://localhost:3000/api/v1/shelf/create",
      shelf,
      config
    );

    // TODO: Add shelf to state
    if (res.status === 201) {
      dispatch(addShelfToState(res.data.bookShelf));
    }
  };

  const handleFormToggle = () => {
    const form = document.getElementById("new-shelf-form") as HTMLFormElement;

    form.classList.toggle("hidden");
  };

  useEffect(() => {
    dispatch(refreshShelves());
  }, [dispatch]);

  return (
    <div className="h-full w-full flex flex-col">
      <h2>My Shelves</h2>
      <div className="new-shelf-form-container">
        <button
          className="border-2 border-white text-white rounded-md p-1 text-center bg-slate-800 px-2 hover:bg-slate-700"
          onClick={handleFormToggle}
        >
          New Shelf
        </button>
        <form
          className="bg-slate-700 p-2 flex flex-col gap-3 items-center rounded-lg shadow-lg absolute w-fit hidden"
          id="new-shelf-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Shelf Name"
            className="p-2 rounded-md"
          />
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description (Optional)"
            className="p-2 rounded-md"
          />
          <div className="btns flex gap-2">
            <button
              type="submit"
              className="p-2 rounded-md border-2 border-white text-white"
              onClick={handleFormToggle}
            >
              Create
            </button>
            <button
              onClick={handleFormToggle}
              type="button"
              className="p-2 rounded-md border-2 border-white text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="shelves-container grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-2">
        {myShelves &&
          myShelves.map((shelf: any, index: number) => (
            <Shelf key={index} shelf={shelf} />
          ))}
      </div>
    </div>
  );
};

export default ShelvesPage;
