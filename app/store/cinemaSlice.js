import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCinema = createAsyncThunk('cinema/fetchCinema', async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/movies/cinema');
    return response.data;
  } catch (error) {
    console.log('HAY UN PROBLEMA CON EL PEDIDO CINEMA', error);
  }
});

const cinemaSlice = createSlice({
  name: 'cinema',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCinema.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCinema.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCinema.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default cinemaSlice.reducer;
