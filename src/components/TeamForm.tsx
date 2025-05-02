"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { addTeam, TeamInterface, updateTeam } from "@/store/teamSlice";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  player_count: z.number().min(1),
  region: z.string().min(1).max(10),
  country: z.string().min(1),
  players: z.array(z.any()).optional(),
});

export default function TeamForm({
  closeDialog,
  data,
  teamsData,
}: {
  closeDialog: () => void;
  data: TeamInterface | null;
  teamsData: TeamInterface[];
}) {
  const dispatch = useDispatch();

  // Later, e.g., after fetching or selecting a team
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      player_count: 1,
      region: "",
      country: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const isDuplicate = teamsData.some(
      (team) => team.name === values.name && team.id !== data?.id, // skip self when editing
    );

    if (isDuplicate) {
      form.setError("name", {
        type: "manual",
        message: "A team with this name already exists.",
      });
      return;
    }

    if (data) {
      dispatch(updateTeam({ ...values, id: data.id }));
    } else {
      dispatch(addTeam(values));
    }

    closeDialog(); // Close dialog after successful submit
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Liquid..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="player_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player Count</FormLabel>
              <FormControl>
                <Input
                  min={1}
                  step={1}
                  placeholder="Enter number of players"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>1-10 players</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-between">
          <Button type="submit">Submit</Button>

          <Button
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              closeDialog();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
