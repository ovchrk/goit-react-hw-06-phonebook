import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  contact: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    addContact(state, action) {
      state.contact.push(action.payload);
    },
    prepare({ name, number }) {
      return {
        payload: {
          name,
          number,
        },
      };
    },
    deleteContact(state, action) {
      const index = state.contact.findIndex(
        userId => userId.id === action.payload
      );
      state.contact.splice(index, 1);
    },
    searchByName(state, action) {
      state.filter = action.payload.toLowerCase();
    },
  },
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['contact'],
};

export const { addContact, deleteContact, searchByName } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

export const persistedReducer = persistReducer(persistConfig, contactsReducer);
