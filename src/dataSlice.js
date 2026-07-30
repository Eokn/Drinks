import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAppSlice } from "./app/createAppSlice";

const initialState = {
    profile: {},
    status: 'idle'
}

const url = 'https://jsonplaceholder.typicode.com/users/'
export const getData = createAsyncThunk(
  'data/fetchData',
  async (userId) => {
        const response = await fetch(`${url}${userId}`);
        const data = await response.json();
        return data;
  }
);

const dataSlice = createSlice({
    name:"data",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
        .addCase(getData.pending, state => {
            state.status='loading'
        })
        .addCase(getData.fulfilled, (state, action) => {
            state.status = 'idle'
            state.profile = action.payload
        })
        .addCase(getData.rejected, state => {
            state.status = 'failed'
        })
    }
})

export default dataSlice
