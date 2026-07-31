   import { createAsyncThunk, createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';


const initialState = {
    cart: [],
    cartOpen: 'closed',
}



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    UPDATE_CARTOPEN: (state, action) => {
      state.cartOpen = action.payload;
    },
    //Check if item is already in cart, if already in add 1 to amount, otherwise add to cart
    ADD_TO_CART: (state, action) => {
      if(Object.keys(state.cart).filter(x => state.cart[x].id === action.payload.id).length === 0){
        state.cart.push(action.payload);
      } else{state.cart = Object.keys(state.cart).map(x => state.cart[x].id !== action.payload.id ? {...state.cart[x]} : {...state.cart[x], amount: state.cart[x].amount+1})
      }
    },
    DECREASE: (state, action) => {
      state.cart = Object.keys(state.cart).map(x => state.cart[x].id !== action.payload.id ? {...state.cart[x]} : {...state.cart[x], amount: state.cart[x].amount-1});
      state.cart = Object.keys(state.cart).map(x => state.cart[x]).filter(y => y.amount !== 0)
    },
    REMOVE: (state, action) => {
      state.cart = Object.keys(state.cart).map(x => state.cart[x]).filter(y => y.id !== action.payload.id)
    },
    REMOVEALL: (state) => {
      state.cart = Object.keys(state.cart).map(x => state.cart[x]).filter(y => false)
    },
  },
});


export const { UPDATE_CARTOPEN, ADD_TO_CART, REMOVE, REMOVEALL, DECREASE } = cartSlice.actions;


    
export const selectCartSize = createSelector(state => Object.keys(state.cart.cart).map(x => state.cart.cart[x]), cart => cart.map(x=>x.amount).reduce((total,prev)=>total+prev,0) )
export const selectCart = createSelector(state => Object.keys(state.cart.cart).map(x => state.cart.cart[x]), cart => cart)
export const selectTotal = createSelector(state => Object.keys(state.cart.cart).map(x=> state.cart.cart[x]), cart => cart.map(y=>[y.amount,y.ingredients.filter(z=>z!=null)]).reduce((total,next)=>total+next[0]*(((next[1].length*200)-1)/100),0).toFixed(2))
export const selectCartOpen = createSelector(state => state.cart.cartOpen, cartOpen => cartOpen === 'open' ? true : false)
// export const selectLoading = createSelector(state => state.drinks.status, status => status === 'idle' ? false : true)


export default cartSlice;

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