import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

const initialState = {
    isSignedIn: 'no',
    profile: {},
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





const profileSlice = createSlice({
    name:"profile",
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
            state.isSignedIn = 'yes'
            state.profile = action.payload
        })
        .addCase(getData.rejected, state => {
            state.status = 'failed'
        })
    }
})

export const selectSignedIn = createSelector(state => state.profile.isSignedIn, 
    (result) => result === 'yes')
export const selectProfile = createSelector(state => state.profile.profile, x => x)
export default profileSlice
