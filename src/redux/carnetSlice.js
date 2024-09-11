// src/redux/carnetSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL de votre API Laravel
const apiUrl = 'http://localhost:8000/api/contacts';

// AsyncThunk pour récupérer les carnets
export const fetchCarnets = createAsyncThunk('carnets/fetchCarnets', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

// AsyncThunk pour ajouter un carnet
export const addCarnet = createAsyncThunk('carnets/addCarnet', async (newCarnet) => {
  const response = await axios.post(apiUrl, newCarnet);
  return response.data;
});

// AsyncThunk pour mettre à jour un carnet
export const updateCarnet = createAsyncThunk('carnets/updateCarnet', async (carnet) => {
  const response = await axios.put(`${apiUrl}/${carnet.id}`, carnet);
  return response.data;
});

// AsyncThunk pour supprimer un carnet
export const deleteCarnet = createAsyncThunk('carnets/deleteCarnet', async (carnetId) => {
  await axios.delete(`${apiUrl}/${carnetId}`);
  return carnetId;
});

// Slice pour la gestion des carnets
const carnetSlice = createSlice({
  name: 'carnets',
  initialState: {
    carnets: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarnets.fulfilled, (state, action) => {
        state.carnets = action.payload;
      })
      .addCase(addCarnet.fulfilled, (state, action) => {
        state.carnets.push(action.payload);
      })
      .addCase(updateCarnet.fulfilled, (state, action) => {
        const index = state.carnets.findIndex(carnet => carnet.id === action.payload.id);
        state.carnets[index] = action.payload;
      })
      .addCase(deleteCarnet.fulfilled, (state, action) => {
        state.carnets = state.carnets.filter(carnet => carnet.id !== action.payload);
      });
  },
});

export default carnetSlice.reducer;
