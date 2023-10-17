import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
  contacts: [],
  filter: '',
  isLoading: false,
  error: null,
};
axios.defaults.baseURL = 'https://652d5a47f9afa8ef4b274f78.mockapi.io';

export const fetchThunk = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteContactsThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }

);

export const fetchAddContactsThunk = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', newContact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState,
  reducers: {

    setOnFilterContact: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchThunk.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })



      .addCase(fetchDeleteContactsThunk.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDeleteContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(fetchDeleteContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })



      .addCase(fetchAddContactsThunk.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(fetchAddContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
});

export const {
  setOnFilterContact,
} = phoneBookSlice.actions;

export const phoneBookReducer = phoneBookSlice.reducer;

export default phoneBookSlice.reducer;



