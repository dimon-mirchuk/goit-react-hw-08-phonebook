import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsAPI = createApi({
  reducerPath: "contactsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://61b4f9a80e84b70017331a21.mockapi.io/",
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => "/contacts",
      providesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `/contacts/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
    addContact: builder.mutation({
      query: ({ name, phone }) => ({
        url: "/contacts",
        method: "POST",
        body: {
          name,
          phone,
        },
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactsAPI;
