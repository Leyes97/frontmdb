import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';
import popularReducer from './popularSlice';
import cinemaReducer from './cinemaSlice';
import upcomingReducer from './upcomingSlice';
import topReducer from './topSlice';
import searchReducer from './searchSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    popular: popularReducer,
    cinema: cinemaReducer,
    upcoming: upcomingReducer,
    top: topReducer,
    search: searchReducer,
  },
});
