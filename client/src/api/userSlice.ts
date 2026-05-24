import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// כאן loginFunction היא פונקציה חיצונית שתבצע את הבקשה לשרת
// היא צריכה לקבל { username, password } ולהחזיר Promise עם הנתונים
export const loginUser = createAsyncThunk(
    'user/loginUser', async () => {
        const response = await fetch('https:בקשת שרת שמביאה את סוג העובד');
        // מניחים שה-response מכיל שדה type
        return await response.type;
        //   catch (error) {
        //   return thunkAPI.rejectWithValue(error);
    });

const userSlice = createSlice({
    name: 'user',
    initialState: {
        type: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.type = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                
                state.type = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;