"use client";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.auth.user);

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="size-screen flex items-center justify-center">
      Hello World
    </section>
  );
}
