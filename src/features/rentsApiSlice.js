// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { reduxApiSlice } from "../api/reduxApiSlice";

// const rentsAdapter = createEntityAdapter({});

// const initialState = rentsAdapter.getInitialState();

export const rentApiSlice = reduxApiSlice.injectEndpoints({
    endpoints: builder => ({
        getRents: builder.query({
            query: ({page}) => ({
                url: '/rent',
                method: 'GET',
                params: { page }
            }),
            providesTags: ['Rent']
        }),
        updateRent: builder.mutation({
            query: initialProp => ({
                url: '/rent',
                method: 'PATCH',
                body: {
                    ...initialProp
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Rent', id: arg.id}
            ]
        }), 
        deleteRent: builder.mutation({
            query: (id) => ({
                url: `/rent/${id}`,
                method: 'DELETE',
            }), 
            invalidatesTags: (result, error, arg) => [
                {type: 'Rent', id: arg.id}
            ]
        })
    })
});

export const {
    useGetRentsQuery, useUpdateRentMutation, useDeleteRentMutation
} = rentApiSlice;
