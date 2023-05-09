import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import Shelf from "../components/Shelf";
import axios from "axios";
import { refreshShelves } from "../features/userSlice";
import { toast } from "react-toastify";
import { IShelf } from "../interfaces";
const API_URI = "https://tome-track-backend-production.up.railway.app/api/v1";
const ShelvesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { myShelves } = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.user.user?.token) || null;
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

    const res = await axios.post(API_URI + "/shelf/create", shelf, config);

    if (res.status === 201) {
      toast.success("Shelf Created");

      dispatch(refreshShelves());
    }
  };

  const handleFormToggle = () => {
    const form = document.getElementById("new-shelf-form") as HTMLFormElement;

    form.classList.toggle("hidden");
    form.classList.toggle("flex");
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
          className="bg-slate-700 p-2 flex-col gap-3 items-center rounded-lg shadow-lg absolute w-fit hidden"
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
          myShelves.map((shelf: IShelf, index: number) => (
            <Shelf key={index} shelf={shelf} />
          ))}
      </div>
    </div>
  );
};

export default ShelvesPage;
