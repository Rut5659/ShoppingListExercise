import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/Product.type';
import api from '../api/api';

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (product: Omit<Product, 'id'>) => {
    const response = await api.post('/products', product);
    return response.data as Product;
  }
);

interface ProductState {
  items: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  items: [],
  loading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addProduct.pending, state => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, state => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
