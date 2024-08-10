import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartSlice from './cartSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        user:userSlice,
        cart:cartSlice
    },
});

export default store;
