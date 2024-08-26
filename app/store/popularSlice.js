import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPopular = createAsyncThunk(
  'popular/fetchPopular',
  async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/movies/popular',
      );
      return response.data;
    } catch (error) {
      console.log('HAY UN PROBLEMA CON EL PEDIDO POPULAR', error);
    }
  },
);

const popularSlice = createSlice({
  name: 'popular',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopular.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default popularSlice.reducer;
