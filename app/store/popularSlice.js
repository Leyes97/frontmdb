import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPopular = createAsyncThunk(
  'popular/fetchPopular',
  async (page = 1) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/movies/popular',
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
      console.log('HAY UN PROBLEMA CON EL PEDIDO POPULAR', error);
      return { results: [] }; // Devuelve un array vacío si hay un error
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

      .addCase(fetchPopular.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage } = popularSlice.actions;
export default popularSlice.reducer;
