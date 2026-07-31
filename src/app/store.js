import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { drinksSlice } from '../features/list/listSlice';
import cartSlice from '../features/cart/cartSlice';
import profileSlice from '../features/profile/profileSlice';

const rootReducer = combineSlices( profileSlice, drinksSlice, cartSlice )

// export const rootState = rootReducer()

export const store = configureStore({
    reducer: rootReducer
})

export const AppDispatch = store["dispatch"]
export default store;