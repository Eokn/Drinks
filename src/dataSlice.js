import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAppSlice } from "./app/createAppSlice";

const initialState = {
    profile: {},
    status: 'idle',
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

const url2 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
export const getData2 = createAsyncThunk(
  'data/fetchData2',
  async (searchTerm) => {
        const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      const strippedDrinks = drinks.map(drink => { 
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass, strCategory, strInstructions, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5 } = drink;
          return { id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass, category: strCategory, instructions: strInstructions, ingredients: [ strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5 ], amount: 1}})
    return strippedDrinks;
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
        .addCase(getData2.pending, state => {
            state.status='loading'
        })
        .addCase(getData2.fulfilled, (state, action) => {
            state.status = 'idle'
            state.profile = action.payload
        })
        .addCase(getData2.rejected, state => {
            state.status = 'failed'
        })
    }
})

export default dataSlice
