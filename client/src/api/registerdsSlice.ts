import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ה-thunk שישלח את הנתונים לשרת
export const sendGuestData = createAsyncThunk(
  "guest/sendGuestData",
  async (guestData, thunkAPI) => {
    try {
      const response = await fetch("/api/getAllRegistereds", {
        method: "POST", // או GET אם זה endpoint שמחזיר רשומות
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestData),
      });
      const data = await response.json();
      return data; // החזרת המידע מהשרת
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  id: "",
  name: "",
  phone: "",
  email: "",
  date: "",
  tripType: "נופש מלא",
  roomType: "אקסטרה",
  guests: 1,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(sendGuestData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendGuestData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // אפשר כאן לעדכן state אם השרת מחזיר משהו
      })
      .addCase(sendGuestData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setGuestData, clearGuestData } = guestSlice.actions;
export default guestSlice.reducer;