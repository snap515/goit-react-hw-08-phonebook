import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { STATUSES } from 'utils/constants';

import { $authInstance } from '../../redux/auth/authSlice';

export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await $authInstance.get('/contacts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiAddContact = createAsyncThunk(
  'contacts/apiAddContact',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/contacts', formData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteContact = createAsyncThunk(
  'contacts/apiDeleteContact',
  async (id, thunkApi) => {
    try {
      const { data } = await $authInstance.delete(`/contacts/${id}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: null,
  status: STATUSES.idle,
  error: null,
};

const contactsSlice = createSlice({
  //имя слайса
  name: 'contacts',
  //начальное состояние редьюсера слайса
  initialState,
  //объект экстра редьюсеров
  extraReducers: builder => {
    builder
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts = action.payload;
      })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts.push(action.payload);
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.contacts = state.contacts.filter(contactEl => {
          return contactEl.id !== action.payload.id;
        });
      })
      .addMatcher(
        isAnyOf(
          apiGetContacts.pending,
          apiAddContact.pending,
          apiDeleteContact.pending
        ),
        state => {
          state.status = STATUSES.pending;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          apiGetContacts.rejected,
          apiAddContact.rejected,
          apiDeleteContact.rejected
        ),
        (state, action) => {
          state.status = STATUSES.error;
          state.error = action.payload;
        }
      );

    // .addCase(apiGetContacts.pending, (state, _) => {
    //   state.status = STATUSES.pending;
    //   state.error = null;
    // })

    // .addCase(apiGetContacts.rejected, (state, action) => {
    //   state.status = STATUSES.error;
    //   state.error = action.payload;
    // })
    // .addCase(apiAddContact.pending, (state, _) => {
    //   state.status = STATUSES.pending;
    //   state.error = null;
    // })
    // .addCase(apiAddContact.rejected, (state, action) => {
    //   state.status = STATUSES.error;
    //   state.error = action.payload;
    // })
    // .addCase(apiDeleteContact.pending, (state, action) => {
    //   state.status = STATUSES.pending;
    //   state.error = null;
    // })

    // .addCase(apiDeleteContact.rejected, (state, action) => {
    //   state.status = STATUSES.error;
    //   state.error = action.payload;
    // });
  },
});

//генератор екшенов
// export const { addContact, removeContact } = contactsSlice.actions;
// редьюсер слайса
export const contactsReducer = contactsSlice.reducer;
