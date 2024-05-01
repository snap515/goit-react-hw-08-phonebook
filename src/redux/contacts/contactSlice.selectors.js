// export const selectContacts = state => state.contacts.contacts;

// export const selectStatus = state => state.contacts.status;
// export const selectError = state => state.contacts.error;

import { createSelector } from '@reduxjs/toolkit';

const selectContacts = state => state.contacts;

export const selectContactsList = createSelector(
  selectContacts,
  contacts => contacts.contacts
);

export const selectStatus = createSelector(
  selectContacts,
  contacts => contacts.status
);

export const selectError = createSelector(
  selectContacts,
  contacts => contacts.error
);

export const selectIdToDelete = createSelector(
  selectContacts,
  contacts => contacts.idToDelete
);
