
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
            Object.assign (state, ...action.payload );
            },
            clearGuestData:  (state) => {
            Object.assign(state, initialState);
        },
    },
});
addGuest(state, action)
updateGuest(state, action)
removeGuest(state, action)
clearGuests(state)

export const { setGuestData, clearGuestData } = guestSlice.actions;
export default guestSlice.reducer;