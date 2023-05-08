import React from "react";
import { login } from "../features/userSlice";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="login-page flex items-center flex-col h-screen">
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
    </div>
  );
};

export default LoginPage;
