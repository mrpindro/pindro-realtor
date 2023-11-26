// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { reduxApiSlice } from "../api/reduxApiSlice";

// const buysAdapter = createEntityAdapter({});

// const initialState = buysAdapter.getInitialState();

export const buyApiSlice = reduxApiSlice.injectEndpoints({
    endpoints: builder => ({
        getBuys: builder.query({
            query: ({ page }) =>({
                url: '/buy',
                method: 'GET',
                params: { page }
            }),
            providesTags: ['Buy']
        }),
        updateBuy: builder.mutation({
            query: initialProp => ({
                url: `/buy`,
                method: 'PATCH',
                body: {
                    ...initialProp
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Buy', id: arg.id}
            ]
        }), 
        deleteBuy: builder.mutation({
            query: (id) => ({
                url: `/buy/${id}`,
                method: 'DELETE',
            }), 
            invalidatesTags: (result, error, arg) => [
                {type: 'Buy', id: arg.id}
            ]
        })
    })
});

export const {
    useGetBuysQuery, useUpdateBuyMutation, useDeleteBuyMutation
} = buyApiSlice;
