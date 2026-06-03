import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// login async thunk
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, idNumber }, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5044/Role/getByNameAndId/${username}/${idNumber}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
   // מצפים שיחזור: { type, username, idNumber }
      return data;
    }
     catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    idNumber: "",
    type: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.username = "";
      state.idNumber = "";
      state.type = null;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.username = action.payload.username;
        state.idNumber = action.payload.idNumber;
        state.type = action.payload.type;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;