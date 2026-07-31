import { combineSlices, configureStore } from '@reduxjs/toolkit'
import dataSlice from '../dataSlice';
import { drinksSlice } from '../features/listSlice';
import cartSlice from '../features/cartSlice';

const rootReducer = combineSlices( dataSlice, drinksSlice, cartSlice )

// export const rootState = rootReducer()

export const store = configureStore({
    reducer: rootReducer
})

export const AppDispatch = store["dispatch"]
export default store;