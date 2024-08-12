import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../utils/api';
import { getToken } from '../utils/auth';

// Thunks para operaciones asíncronas
export const loadCart = createAsyncThunk(
    'cart/loadCart',
    async (cartId, thunkAPI) => {
        try {
            const token = getToken(); // Mueve getToken() aquí para asegurar que siempre obtienes el token más reciente
            const response = await fetchData(`api/cart/${cartId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            return await response.json(); // Asegúrate de devolver JSON
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product, { rejectWithValue }) => {
        try {
            const token = getToken(); // Obtén el token aquí para que siempre sea el más reciente
            const response = await fetchData('api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Asegúrate de que la autorización esté bien configurada
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

export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async (product, thunkAPI) => {
        try {
            const token = getToken();
            const response = await fetchData('/api/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId, thunkAPI) => {
        try {
            const token = getToken();
            const response = await fetchData(`/api/cart/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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

export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, thunkAPI) => {
        try {
            const token = getToken();
            const response = await fetchData('/api/cart/clear', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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
                state.items = action.payload.items || [];
                state.total = action.payload.total || 0;
                state.loading = false;
                state.error = null; // Resetear error
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
                state.error = null; // Resetear error
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
                state.error = null; // Resetear error
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
                state.error = null; // Resetear error
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
                state.error = null; // Resetear error
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export default cartSlice.reducer;
