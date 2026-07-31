import { createAsyncThunk, createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const drinksAdapter = createEntityAdapter()

const initialState = drinksAdapter.getInitialState({
  searchTerm: '',
  filterTerm: '',
  status: 'idle',
});

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
export const getDrinks = createAsyncThunk(
  'drinks/fetchDrinks',
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



export const drinksSlice = createSlice({
  name: 'drinks',
  initialState,
  reducers: {
    UPDATE_FILTERVALUE: (state, action) => {
      state.filterTerm = action.payload;
    },
    UPDATE_SEARCHTERM: (state, action) => {
      state.searchTerm = action.payload;
    },
    
    // UPDATE_CARTOPEN: (state, action) => {
    //   state.cartOpen = action.payload;
    // },
    // ADD_TO_CART: (state, action) => {
    //   if(Object.keys(state.cart).filter(x => state.cart[x].id === action.payload.id).length === 0){
    //     state.cart.push(action.payload);
    //   } else{state.cart = Object.keys(state.cart).map(x => state.cart[x].id !== action.payload.id ? {...state.cart[x]} : {...state.cart[x], amount: state.cart[x].amount+1})
    //   }
    // },
    // DECREASE: (state, action) => {
    //   state.cart = Object.keys(state.cart).map(x => state.cart[x].id !== action.payload.id ? {...state.cart[x]} : {...state.cart[x], amount: state.cart[x].amount-1});
    //   state.cart = Object.keys(state.cart).map(x => state.cart[x]).filter(y => y.amount !== 0)
    // },
    // REMOVE: (state, action) => {
    //   state.cart = Object.keys(state.cart).map(x => state.cart[x]).filter(y => y.id !== action.payload.id)
    // },
    // REMOVEALL: (state) => {
    //   state.cart = Object.keys(state.cart).map(x => state.cart[x]).filter(y => false)
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDrinks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDrinks.fulfilled, (state, action) => {
        drinksAdapter.setAll(state, action.payload)
        state.status = 'idle';
        
      })
      .addCase(getDrinks.rejected, (state) => {
        state.status = 'idle';
        
      });
  },
});

//  UPDATE_SINGLECOCKTAIL, UPDATE_CARTOPEN, ADD_TO_CART, REMOVE, REMOVEALL, DECREASE
export const { UPDATE_FILTERVALUE, UPDATE_SEARCHTERM, } = drinksSlice.actions;

const adapterSelectors = drinksAdapter.getSelectors(state => state.drinks)

export const selectFilteredDrinks = createSelector(adapterSelectors.selectAll, 
  state => state.drinks.filterTerm, (drinks, filterTerm) => {
    if (drinks.length === 25){return drinks}
    const searchFilter = new RegExp(`${filterTerm}`, "i");
    return drinks.filter((drink)=> drink.name.search(searchFilter) !== -1)
})
    
// export const selectCartSize = createSelector(state => Object.keys(state.data.cart).map(x => state.data.cart[x]), cart => cart.map(x=>x.amount).reduce((total,prev)=>total+prev,0) )
// export const selectCart = createSelector(state => Object.keys(state.data.cart).map(x => state.data.cart[x]), cart => cart)
// export const selectTotal = createSelector(state => Object.keys(state.data.cart).map(x=> state.data.cart[x]), cart => cart.map(y=>[y.amount,y.ingredients.filter(z=>z!=null)]).reduce((total,next)=>total+next[0]*(((next[1].length*200)-1)/100),0).toFixed(2))
export const selectLoading = createSelector(state => state.drinks.status, status => status === 'idle' ? false : true)


export default drinksSlice.reducer;
