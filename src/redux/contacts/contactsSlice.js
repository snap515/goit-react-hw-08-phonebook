import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as contactsApi from 'apiService/apiService';
import { STATUSES } from 'utils/constants';

export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const contacts = await contactsApi.fetchContacts();
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiAddContact = createAsyncThunk(
  'contacts/apiAddContact',
  async (contact, thunkApi) => {
    try {
      const newContact = await contactsApi.addContact(contact);
      return newContact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteContact = createAsyncThunk(
  'contacts/apiDeleteContact',
  async (id, thunkApi) => {
    try {
      const contacts = await contactsApi.deleteContact(id);
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: [],
  status: STATUSES.idle,
  error: null,
};

const contactsSlice = createSlice({
  //имя слайса
  name: 'contacts',
  //начальное состояние редьюсера слайса
  initialState,
  //объект редьюсеров
  // reducers: {
  //   // addContact(state, action) {
  //   //   state.contacts = [...state.contacts, action.payload];
  //   // },
  //   // removeContact(state, action) {
  //   //   state.contacts = state.contacts.filter(
  //   //     contact => contact.id !== action.payload
  //   //   );
  //   // },
  // },
  extraReducers: builder => {
    builder
      .addCase(apiGetContacts.pending, (state, _) => {
        state.status = STATUSES.pending;
        state.error = null;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts = action.payload;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.status = STATUSES.error;
        state.error = action.payload;
      })
      .addCase(apiAddContact.pending, (state, _) => {
        state.status = STATUSES.pending;
        state.error = null;
      })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts.push(action.payload);
      })
      .addCase(apiAddContact.rejected, (state, action) => {
        state.status = STATUSES.error;
        state.error = action.payload;
      })
      .addCase(apiDeleteContact.pending, (state, action) => {
        state.status = STATUSES.pending;
        state.error = null;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts = state.contacts.filter(contactEl => {
          return contactEl.id !== action.payload.id;
        });
      })
      .addCase(apiDeleteContact.rejected, (state, action) => {
        state.status = STATUSES.error;
        state.error = action.payload;
      });
  },
});

//генератор екшенов
// export const { addContact, removeContact } = contactsSlice.actions;
// редьюсер слайса
export const contactsReducer = contactsSlice.reducer;
