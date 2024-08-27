import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCinema = createAsyncThunk(
  'cinema/fetchCinema',
  async (page = 1) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/movies/cinema',
        {
          params: { page },
        },
      );
      if (response.data && response.data.results) {
        return response.data;
      } else {
        throw new Error('Data not in expected format');
      }
    } catch (error) {
      console.log('HAY UN PROBLEMA CON EL PEDIDO CINEMA', error);
      return { results: [] };
    }
  },
);

const cinemaSlice = createSlice({
  name: 'cinema',
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
      .addCase(fetchCinema.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCinema.fulfilled, (state, action) => {
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
      .addCase(fetchCinema.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { setPage } = cinemaSlice.actions;
export default cinemaSlice.reducer;
