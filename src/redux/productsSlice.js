import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../utils/api';
import { getToken } from '../utils/auth'; // Asumiendo que tienes una función para obtener el token

// Async thunk para obtener productos
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetchData('api/product', { method: 'GET' });
    return response;
});

// Async thunk para eliminar un producto
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    const token = getToken(); // Obtén el token como sea necesario en tu aplicación
    const result = await fetchData(`api/product/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return result;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        selectedProduct: null,
    },
    reducers: {
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.meta.arg);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { selectProduct } = productsSlice.actions;

export default productsSlice.reducer;
