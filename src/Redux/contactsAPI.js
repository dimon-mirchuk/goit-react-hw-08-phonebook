import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsAPI = createApi({
  reducerPath: "contactsAPI",
  tagTypes: ["Contacts", "Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://connections-api.herokuapp.com",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => "/contacts",
      providesTags: ["Contacts"],
    }),
    addContact: builder.mutation({
      query: ({ name, number }) => ({
        url: "/contacts",
        method: "POST",
        body: {
          name,
          number,
        },
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `/contacts/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
    refreshUser: builder.query({
      query: () => "/users/current",
      providesTags: ["Auth"],
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/users/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useRefreshUserQuery,
  useSignupMutation,
  useLoginMutation,
} = contactsAPI;
