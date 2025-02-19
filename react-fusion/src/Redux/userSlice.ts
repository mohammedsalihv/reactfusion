import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  userId: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  hasUnsavedChanges: boolean;
}

const initialState: userState = {
  userId: "",
  name: "",
  address: "",
  email: "",
  phone: "",
  hasUnsavedChanges: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<userState>>) => {
      return { ...state, ...action.payload, hasUnsavedChanges: true };
    },
    saveUser: (state) => {
      state.hasUnsavedChanges = false;
      state.userId = `USER${Date.now()}`;
    },
    resetUser: () => initialState,
  },
});

export const { setUser, saveUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
