import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../utils/api';
import { getToken } from '../utils/auth';

// Thunks para operaciones asíncronas
const token = getToken() || null;
// Cargar carrito desde el backend
export const loadCart = createAsyncThunk(
    'cart/loadCart',
    async (cartId, thunkAPI) => {
        try {
            const response = await fetchData(`api/cart/${cartId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
// Añadir producto al carrito
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await fetchData('api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}` // Incluye el token en los headers
                },
                body: JSON.stringify(product)
            });
            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Actualizar producto en el carrito
export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async (product, thunkAPI) => {
        try {
            const response = await fetch('/api/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            if (!response.ok) {
                throw new Error('Failed to update cart');
            }
            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Eliminar producto del carrito
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId, thunkAPI) => {
        try {
            const response = await fetch(`/api/cart/${productId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }
            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Limpiar el carrito
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('/api/cart/clear', {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }
            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        loading: false,
        error: null
    },
    reducers: {
        // Aquí puedes agregar más reducers si es necesario
    },
    extraReducers: (builder) => {
        builder
            // Cargar carrito
            .addCase(loadCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                console.log('Cart loaded:', action.payload);  // Verifica los datos del carrito
                state.items = action.payload.items || [];
                state.total = action.payload.total || 0;
                state.loading = false;
            })
            
            .addCase(loadCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // Añadir al carrito
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // Actualizar carrito
            .addCase(updateCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // Eliminar del carrito
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // Limpiar carrito
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.total = 0;
                state.loading = false;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export default cartSlice.reducer;
