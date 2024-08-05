import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../utils/api';
import { getToken } from '../utils/auth';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetchData('api/product', { method: 'GET' });
    return response;
});

// Fetch a product by ID
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const response = await fetchData(`api/product/${id}`);
    return response;
});


export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    const token = getToken();
    const result = await fetchData(`api/product/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return result;
});

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, ...updatedProduct }) => {
        const token = getToken();
        const formData = new FormData();
        for (const key in updatedProduct) {
            if (Array.isArray(updatedProduct[key])) {
                formData.append(key, JSON.stringify(updatedProduct[key]));
            } else {
                formData.append(key, updatedProduct[key]);
            }
        }

        const response = await fetchData(`api/product/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        const result = await response.json();
        return result;
    }
);

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
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
        // No se maneja el estado de actualización aquí, se manejará en el componente
    },
});

export const { selectProduct } = productsSlice.actions;

export default productsSlice.reducer;
