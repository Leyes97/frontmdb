import { createSlice } from '@reduxjs/toolkit';

// Estado inicial basado en tu modelo de usuario en el backend
const initialState = {
  email: null,
  name: null,
  lastname: null,
  admin: false,
  isAuthenticated: false, // Para saber si el usuario está autenticado
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, name, lastname, admin } = action.payload;
      state.email = email;
      state.name = name;
      state.lastname = lastname;
      state.admin = admin;
      state.isAuthenticated = true; // Usuario autenticado
    },
    logout: (state) => {
      state.email = null;
      state.name = null;
      state.lastname = null;
      state.admin = false;
      state.isAuthenticated = false; // Usuario no autenticado
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
