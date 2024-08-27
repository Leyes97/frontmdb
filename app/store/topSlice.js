import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTop = createAsyncThunk('Top/fetchTop', async (page = 1) => {
  try {
    const response = await axios.get('http://localhost:8080/api/movies/top', {
      params: { page },
    });
    if (response.data && response.data.results) {
      return response.data;
    } else {
      throw new Error('Data not in expected format');
    }
  } catch (error) {
    console.log('HAY UN PROBLEMA CON EL PEDIDO TOP', error);
    return { results: [] };
  }
});

const TopSlice = createSlice({
  name: 'top',
  initialState: {
    data: [],
    page: 1,
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
      .addCase(fetchTop.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && action.payload.results) {
          const newResults = action.payload.results.filter(
            (movie) =>
              !state.data.some(
                (existingMovie) => existingMovie.id === movie.id,
              ),
          );
          state.data = [...state.data, ...newResults]; // Acumula los resultados sin duplicados
        }
      })
      .addCase(fetchTop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage } = TopSlice.actions;
export default TopSlice.reducer;
