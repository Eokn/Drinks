import { combineSlices, configureStore } from '@reduxjs/toolkit'
import dataSlice from '../dataSlice';

const rootReducer = combineSlices( dataSlice )

// export const rootState = rootReducer()

export const store = configureStore({
    reducer: rootReducer
})

export const AppDispatch = store["dispatch"]
export default store;