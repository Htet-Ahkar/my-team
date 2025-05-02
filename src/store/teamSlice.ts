import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Team {
  id: string;
  name: string;
  player_count: number;
  region: string;
  country: string;
  members?: string[];
}

interface TeamsState {
  teams: Team[];
}

const initialState: TeamsState = {
  teams: [],
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addTeam: {
      reducer(state, action: PayloadAction<Team>) {
        state.teams.push(action.payload);
      },
      prepare(team: Omit<Team, "id">) {
        return { payload: { id: nanoid(), ...team } };
      },
    },
    updateTeam(state, action: PayloadAction<Team>) {
      const idx = state.teams.findIndex((t) => t.name === action.payload.name);
      if (idx !== -1) state.teams[idx] = action.payload;
    },
    deleteTeam(state, action: PayloadAction<string>) {
      state.teams = state.teams.filter((t) => t.name !== action.payload);
    },
  },
});

export const { addTeam, updateTeam, deleteTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
