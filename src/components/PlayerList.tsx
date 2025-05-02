/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useGetPlayersQuery } from "../services/playerService";

export default function PlayerList() {
  const [allData, setAllData] = useState<any[]>([]);
  const [cursor, setCursor] = useState(0);
  const { data, isFetching } = useGetPlayersQuery(cursor);

  // Append fetched data
  useEffect(() => {
    if (data?.data) {
      setAllData((prev) => [...prev, ...data.data]);
    }
  }, [data]);

  // Handle infinite scroll
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (scrolledToBottom && !isFetching && data?.meta?.next_cursor) {
        setCursor(data.meta.next_cursor);
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [cursor, isFetching, data]);

  return (
    <div className="App space-y-2 p-4">
      {allData.map((player: any, index: number) => (
        <h3 key={index} className="text-lg font-medium">
          {player.first_name} {player.last_name}
        </h3>
      ))}

      {isFetching && <p className="text-gray-500">Loading...</p>}
    </div>
  );
}
