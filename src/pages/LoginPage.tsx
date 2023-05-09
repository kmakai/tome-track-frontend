import React from "react";
import { login } from "../features/userSlice";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const API_URI = "https://tome-track-backend-production.up.railway.app/api/v1";
const LoginPage = () => {
  const dispatch = useAppDispatch();
  // const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    dispatch(login({ email, password }));
    navigate("/");
  };

  const handleGuestLogin = async () => {
    try {
      const res = await axios.post(API_URI + "/user/guestLogin");
      if (res.status === 200) {
        toast.success(res.data.message);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login-page flex items-center flex-col h-screen items">
      <form
        onSubmit={handleSubmit}
        className="login-form border-2 border-slate-300 rounded-md p-8 shadow-md flex flex-col items-center gap-4"
      >
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="w-full border border-slate-300 rounded-md p-2 focus:outline-none text-slate-500"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="w-full border border-slate-300 rounded-md p-2 focus:outline-none text-slate-500"
        />
        <button className="border border-slate-300 rounded-md w-full py-2 bg-slate-700 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-  text-2xl">
          Login
        </button>
      </form>

      <div className="flex flex-col gap-2 items-center p-4">
        <span className="text-xl font-bold text-slate-500">New Account</span>
        <button
          className="border border-slate-300 rounded-md w-full py-2 bg-slate-700 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-  text-xl p-3"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>

      <div className="flex flex-col gap-2 items-center p-4">
        <span className="text-xl font-bold text-slate-500">try it out</span>
        <button
          onClick={() => handleGuestLogin()}
          className="border border-slate-300 rounded-md w-full py-2 bg-slate-700 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-  text-xl p-3"
        >
          Guest Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
