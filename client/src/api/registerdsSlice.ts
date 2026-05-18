import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  phone: "",
  email: "",
  date: "",
  tripType: "נופש מלא",
  roomType: "אקסטרה",
  guests: 1,
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setGuestData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearGuestData: () => initialState,
  },
});

export const { setGuestData, clearGuestData } = guestSlice.actions;
export default guestSlice.reducer;