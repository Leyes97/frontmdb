import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUpcoming = createAsyncThunk(
  'upcoming/fetchUpcoming',
  async (page = 1) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/movies/upcoming',
        {
          params: { page },
        },
      );
      if (response.data && response.data.results) {
        return response.data;
      } else {
        throw new Error('Data not in expectend format');
      }
    } catch (error) {
      console.log('HAY UN PROBLEMA CON EL PEDIDO UPCOMING', error);
      return { results: [] };
    }
  },
);

const upcomingSlice = createSlice({
  name: 'upcoming',
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
      .addCase(fetchUpcoming.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
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
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage } = upcomingSlice.actions;
export default upcomingSlice.reducer;
