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

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const saveGuestData = createAsyncThunk(
//   "guest/saveGuestData",
//   async (guestData, thunkAPI) => {
//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/data/loadData",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(guestData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Save guest failed");
//       }

//       const data = await response.json();

//       return {
//         guestData,
//         serverData: data,
//       };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   id: "",
//   name: "",
//   phone: "",
//   email: "",
//   date: "",
//   tripType: "נופש מלא",
//   roomType: "אקסטרה",
//   guests: 1,

//   status: "idle",
//   error: null,
//   serverData: null,
// };

// const guestSlice = createSlice({
//   name: "guest",
//   initialState,

//   reducers: {
//     clearGuestData: () => initialState,
//   },

//   extraReducers: (builder) => {
//     builder

//       .addCase(saveGuestData.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })

//       .addCase(saveGuestData.fulfilled, (state, action) => {
//         state.status = "succeeded";

//         state.id = action.payload.guestData.id;
//         state.name = action.payload.guestData.name;
//         state.phone = action.payload.guestData.phone;
//         state.email = action.payload.guestData.email;
//         state.date = action.payload.guestData.date;
//         state.tripType = action.payload.guestData.tripType;
//         state.roomType = action.payload.guestData.roomType;
//         state.guests = action.payload.guestData.guests;

//         state.serverData = action.payload.serverData;
//       })

//       .addCase(saveGuestData.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export const { clearGuestData } = guestSlice.actions;
// export default guestSlice.reducer;