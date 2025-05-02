import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface TeamInterface {
  id: string;
  name: string;
  player_count: number;
  region: string;
  country: string;
  members?: string[];
}

interface TeamsState {
  teams: TeamInterface[];
}

const initialState: TeamsState = {
  teams: [],
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addTeam: {
      reducer(state, action: PayloadAction<TeamInterface>) {
        state.teams.push(action.payload);
      },
      prepare(team: Omit<TeamInterface, "id">) {
        return { payload: { id: nanoid(), ...team } };
      },
    },
    updateTeam(state, action: PayloadAction<TeamInterface>) {
      const idx = state.teams.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state.teams[idx] = action.payload;
    },
    deleteTeam(state, action: PayloadAction<string>) {
      state.teams = state.teams.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTeam, updateTeam, deleteTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
