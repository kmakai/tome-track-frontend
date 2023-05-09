import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URI = "https://tome-track-backend-production.up.railway.app/api/v1";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const body = { name, email, password };

    try {
      const res = await axios.post(`${API_URI}/user/register`, body);

      if (res.status === 201) {
        toast.success("Register success");
        form.reset();
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    console.log(name, email, password);
  };
  return (
    <div className="register-page flex items-center flex-col h-screen items gap-4">
      <h1 className="text-4xl font-bold">Register</h1>
      <form
        className="flex flex-col items-center justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full border border-slate-300 rounded-md p-2 focus:outline-none text-slate-700"
          type="text"
          name="name"
          id="name"
          placeholder="Your name"
        />
        <input
          className="w-full border border-slate-300 rounded-md p-2 focus:outline-none text-slate-700"
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
        />
        <input
          className="w-full border border-slate-300 rounded-md p-2 focus:outline-none text-slate-700"
          type="password"
          name="password"
          id="password"
          placeholder="Your password"
        />
        <button
          type="submit"
          className="border border-slate-300 rounded-md w-full py-2 bg-slate-700 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-  text-2xl"
        >
          register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
