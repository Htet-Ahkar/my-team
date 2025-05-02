/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  Earth,
  Flag,
  Plus,
  Trash2,
  UsersRound,
  Volleyball,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import TeamForm from "./TeamForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { deleteTeam, TeamInterface } from "@/store/teamSlice";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

const TeamList = () => {
  const teams: TeamInterface[] = useSelector((state: any) => state.team.teams);
  const [open, setOpen] = useState(false);
  const [teamData, setTeamData] = useState<null | TeamInterface>(null);
  const [dialogText, setDialogText] = useState<"Add New" | "Edit">("Add New");

  return (
    <div className="flex-center flex-col">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setTeamData(null);
              setDialogText("Add New");
            }}
          >
            Create new team <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogText} Team</DialogTitle>
          </DialogHeader>

          {/* body */}
          <div className="grid gap-4 py-4">
            <TeamForm
              teamsData={teams}
              closeDialog={() => setOpen(false)}
              data={teamData}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* card container */}
      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id} className="w-[250px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <Volleyball />
                {team.name}
              </CardTitle>
              <CardDescription className="flex items-center justify-between">
                <UsersRound /> {team.player_count}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="flex items-center justify-between">
                <Flag /> {team.country}
              </p>
              <p className="flex items-center justify-between">
                <Earth /> {team.region}
              </p>
            </CardContent>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="m-auto w-3/4" variant="outline">
                  Add Player
                </Button>
              </SheetTrigger>

              <SheetContent className="flex-center h-7/8" side="bottom">
                <SheetHeader>
                  <SheetTitle> Add Player</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <ScrollList />
                </div>

                <SheetFooter>
                  <SheetClose asChild>
                    {/* <Button type="submit">Save changes</Button> */}
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setDialogText("Edit");
                  setOpen(true);
                  setTeamData(team);
                }}
              >
                Edit
              </Button>

              <DeleteBtn data={team} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamList;

const DeleteBtn = ({ data }: { data: TeamInterface | null }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onDelete = () => {
    setOpen(false);
    if (data) {
      dispatch(deleteTeam(data.id));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
          delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Are you sure.</DialogTitle>
        </DialogHeader>

        {/* body */}
        <div className="grid gap-4 py-4">Team will be gone.</div>

        <DialogFooter className="flex justify-between">
          <Button onClick={() => onDelete()} variant="destructive">
            Yes
          </Button>
          <Button onClick={() => setOpen(false)}> Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { useGetPlayersQuery } from "../services/playerService";
import { Label } from "./ui/label";

export function ScrollList() {
  const [allData, setAllData] = useState<any[]>([]);
  const [cursor, setCursor] = useState(0);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const { data, isFetching } = useGetPlayersQuery(cursor);

  // Append fetched data
  useEffect(() => {
    if (data?.data) {
      setAllData((prev) => {
        const temp = [...prev, ...data.data];
        const unique = Array.from(new Set(temp));
        return unique;
      });
    }
  }, [data]);

  const onLoad = () => {
    setCursor(data.meta.next_cursor);
  };

  const toggleChecked = (id: string) => {
    setCheckedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isChecked = (id: string) => {
    return checkedIds.has(id);
  };
  return (
    <ScrollArea className="h-[400px] w-[350px] rounded-md border">
      {/* Use data attribute to get the viewport later */}

      {allData.map((player: any, index: number) => (
        <div key={index} className="m-1 flex items-center space-x-2">
          <Checkbox
            id={player.first_name}
            checked={isChecked(player.id)}
            onCheckedChange={() => toggleChecked(player.id)}
          />
          <Label htmlFor={player.first_name}>
            {player.first_name} {player.last_name}
          </Label>
        </div>
      ))}

      {isFetching && <p className="text-gray-500">Loading...</p>}

      <Button className="w-full" onClick={() => onLoad()}>
        Load More ...
      </Button>
    </ScrollArea>
  );
}
