import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../utils/api';
import { getToken } from '../utils/auth';

// FETCHING PRODUCT FILTRO Y PAGINACION
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page = 1, limit = 8, filters = {} }) => {
        const { size, category } = filters;
        let query = `api/product?page=${page}&limit=${limit}`;

        if (category.length > 0) {
            query += `&category=${category.join(',')}`;
        }

        if (size.length > 0) {
            query += `&size=${size.join(',')}`;
        }

        const response = await fetchData(query, { method: 'GET' });
        return response;
    }
);

// Fetch a product by ID
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const response = await fetchData(`api/product/${id}`);
    return response;
});


// Delete a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    const token = getToken();
    const result = await fetchData(`api/product/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return result;
});


// Update a product
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
        totalPages: 0,
        currentPage: 1,
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
                state.items = action.payload.products; // Aquí se asignan los productos
                state.totalPages = action.payload.totalPages; // Aquí se asigna el total de páginas
                state.currentPage = action.payload.currentPage; // Aquí se asigna la página actual
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
            });
    },
});

export const { selectProduct } = productsSlice.actions;

export default productsSlice.reducer;
