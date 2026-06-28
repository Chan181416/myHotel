import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_API_URL;
// login async thunk
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, idNumber }, thunkAPI) => {
    console.log({baseUrl})
    try {
      const response = await fetch(`${baseUrl}/api/Role/getByNameAndId/${username}/${idNumber}`, {
        method: "GET",
      });

      if (!response.ok) {
         
        throw new Error("אתה לא מוגדר במערכת נסה שוב או פנה למנהל");
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
        console.log({action});
        
        state.username = action.payload.name;
        state.idNumber = action.payload.idNumber;
        state.type = action.payload.code;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const baseUrl = import.meta.env.VITE_API_URL;
// // login async thunk
// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async ({ username, idNumber }, thunkAPI) => {
//     try {
//       const response = await fetch(`${baseUrl}/api/Role/getByNameAndId/${username}/${idNumber}`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Login failed");
//       }

//       const data = await response.json();

//       // מצפים שיחזור: { type, username, idNumber }
//       return data;
//     }
//      catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // בדיקה האם כל טבלאות הבסיס מכילות נתונים
// // export const checkAllTablesHaveData = createAsyncThunk(
// //   "user/checkAllTablesHaveData",
// //   async (_, thunkAPI) => {
// //     try {
// //       const response = await fetch(
// //         `${baseUrl}/api/proxy/checkTableController/allTablesHaveData`,
// //         {
// //           method: "GET",
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error("Failed to check database");
// //       }

// //       const data = await response.json();

// //       // data הוא true או false
// //       return data;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // );

// // const userSlice = createSlice({
// //   name: "user",
// //   initialState: {
// //     username: "",
// //     idNumber: "",
// //     type: null,
// //     status: "idle", // idle | loading | succeeded | failed
// //     error: null,
// //   },

// //   reducers: {
// //     logout: (state) => {
// //       state.username = "";
// //       state.idNumber = "";
// //       state.type = null;
// //       state.status = "idle";
// //       state.error = null;
// //     },
// //   },

// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(loginUser.pending, (state) => {
// //         state.status = "loading";
// //         state.error = null;
// //       })

// //       .addCase(loginUser.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         console.log({action});
        
// //         state.username = action.payload.name;
// //         state.idNumber = action.payload.idNumber;
// //         state.type = action.payload.code;
// //       })

// //       .addCase(loginUser.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.payload || action.error.message;
// //       });
// //   },
// // });

// // export const { logout } = userSlice.actions;
// // export default userSlice.reducer;

