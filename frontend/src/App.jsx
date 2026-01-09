import React from "react";

const App = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-3xl text-center font-bold">Signup</h1>
        <form className="flex flex-col gap-4 mt-5">
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="p-3 rounded-lg border border-slate-400"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="p-3 rounded-lg border border-slate-400"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="p-3 rounded-lg border border-slate-400"
          />
          <button className="p-3 rounded-lg border bg-slate-700 hover:opacity-80 text-white font-semibold">
            Create Account
          </button>
        </form>
        <button className="p-3 rounded-lg border bg-red-700 hover:opacity-80 text-white font-semibold">
          Sign with Google
        </button>
        <div className="flex items-center gap-2 mt-3">
          <p className=" text-sm ">Already have an account?</p>
          <span className="font-bold text-sm text-blue-600">Sign in</span>
        </div>
      </div>
    </div>
  );
};

export default App;
