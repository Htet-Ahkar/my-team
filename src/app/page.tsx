"use client";

import { decrement, increment } from "@/store/user/user-slice";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <section className="size-screen flex items-center justify-center">
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </section>
  );
}
