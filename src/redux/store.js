// // src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import carnetReducer from './carnetSlice';

// export const store = configureStore({
//   reducer: {
//     carnets: carnetReducer,
//   },
// });
// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import carnetReducer from './carnetSlice';

const store = configureStore({
  reducer: {
    carnets: carnetReducer
  }
});

export default store; // Exportation par défaut
