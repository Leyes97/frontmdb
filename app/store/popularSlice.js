import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPopular = createAsyncThunk(
  'popular/fetchPopular',
  async (page = 1) => {
    try {
      const response = await axios.get('http://localhost:8080/api/movies/popular', {
        params: { page },
      });
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
    page: 1, // Estado para la página actual
    status: 'idle',
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopular.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = [...state.data, ...action.payload.results]; // Acumula los resultados
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage } = popularSlice.actions;
export default popularSlice.reducer;


