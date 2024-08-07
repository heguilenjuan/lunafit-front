import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        user:userSlice
    },
});

export default store;
