import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type theme = {
  value: "light" | "dark";
};
const initialState:theme = { value: "light" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themes: (state, action: PayloadAction<"dark" | "light">) => {
      state.value = action.payload;
    },
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});
export const { themes, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;