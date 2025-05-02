"use client";

import { login, logout } from "@/store/auth/authSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.auth.user);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(login(username));
      setUsername("");
    }
  };

  return (
    <section className="size-screen flex items-center justify-center">
      <h2>Welcome, {user?.userName || ""}!</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <button type="submit">Login</button>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </form>
    </section>
  );
}
