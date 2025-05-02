/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import TeamForm from "./TeamForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { TeamInterface } from "@/store/teamSlice";

const TeamList = () => {
  const teams: TeamInterface[] = useSelector((state: any) => state.team.teams);
  const [open, setOpen] = useState(false);
  const [dialogText, setDialogText] = useState<"Add New" | "Edit">("Add New");

  return (
    <div className="flex-center flex-col">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setDialogText("Add New")}>
            Create new team <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogText} Team</DialogTitle>
          </DialogHeader>

          {/* body */}
          <div className="grid gap-4 py-4">
            <TeamForm closeDialog={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>

      {/* card container */}
      <div className="grid grid-cols-1 p-5 md:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h1>hello</h1>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setDialogText("Edit");
                  setOpen(true);
                }}
              >
                update
              </Button>

              <DeleteBtn />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamList;

const DeleteBtn = () => {
  const [open, setOpen] = useState(false);
  const onDelete = () => {
    setOpen(false);
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
            {" "}
            Yes
          </Button>
          <Button onClick={() => setOpen(false)}> Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
