import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk(
  'search/fetchMovies',
  async (searchQuery, thunkAPI) => {
    try {
      // Usar POST y pasar 'searchQuery' en el body
      const response = await axios.post(
        `http://localhost:8080/api/movies/search`,
        {
          data: searchQuery,
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearMovies: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload; // Guardar las películas en el estado
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearMovies } = searchSlice.actions;
export default searchSlice.reducer;
