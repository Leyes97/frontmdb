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
      return response.data;
    } catch (error) {
      console.log('HAY UN PROBLEMA CON EL PEDIDO CINEMA', error);
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
        state.data = [...state.data, ...action.payload.results];
      })
      .addCase(fetchCinema.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { setPage } = cinemaSlice.actions;
export default cinemaSlice.reducer;
