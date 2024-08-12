// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../utils/api';



export const fetchUserData = createAsyncThunk('user/fetchUserData', async (userId, { rejectWithValue }) => {
    try {
        const response = await fetchData(`api/users/${userId}`, { method: 'GET' });
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        clearUserData: (state) => {
            state.userData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
