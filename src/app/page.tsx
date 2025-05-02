/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PlayerList from "@/components/PlayerList";
import TeamList from "@/components/TeamList";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state: any) => state.auth.user);
  const [page, setPage] = useState<"players" | "teams">("players");

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="size-screen flex-center flex-col justify-start">
      {/* Nav */}
      <div className="flex-center my-5 space-x-5">
        <Button
          variant={page === "players" ? "ghost" : "default"}
          onClick={() => setPage("players")}
        >
          Players
        </Button>
        <Button
          variant={page === "teams" ? "ghost" : "default"}
          onClick={() => setPage("teams")}
        >
          Teams
        </Button>
      </div>

      {/* body */}
      {page === "players" ? <PlayerList /> : <TeamList />}
    </section>
  );
}
