import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// פונקציית login עם fetch
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await fetch('https://your-server-url.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // מניחים שהשרת מחזיר { type: "admin" }
            return data.type;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

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