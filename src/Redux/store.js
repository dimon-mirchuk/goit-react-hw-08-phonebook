import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contactsAPI } from "./contacts/contactsSlice";
import filter from "./contacts/contacts-reducer";

export const store = configureStore({
  reducer: {
    [contactsAPI.reducerPath]: contactsAPI.reducer,
    filterValue: filter,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    contactsAPI.middleware,
  ],
});

setupListeners(store.dispatch);
