import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTop = createAsyncThunk('Top/fetchTop', async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/movies/top',
    );
    return response.data;
  } catch (error) {
    console.log('HAY UN PROBLEMA CON EL PEDIDO TOP', error);
  }
});

const TopSlice = createSlice({
  name: 'top',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTop.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default TopSlice.reducer;
