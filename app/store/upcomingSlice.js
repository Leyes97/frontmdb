import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUpcoming = createAsyncThunk(
  'upcoming/fetchUpcoming',
  async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/movies/upcoming',
      );
      return response.data;
    } catch (error) {
      console.log('HAY UN PROBLEMA CON EL PEDIDO UPCOMING', error);
    }
  },
);

const upcomingSlice = createSlice({
  name: 'upcoming',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcoming.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default upcomingSlice.reducer;
