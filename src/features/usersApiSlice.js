import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { reduxApiSlice } from "../api/reduxApiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = reduxApiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else {
                    return [{ type: 'User', id: 'LIST' }]
                }
            }
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: 'users',
                method: 'PATCH',
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        updateUserPassword: builder.mutation({
            query: initialUserPassword => ({
                url: 'users/reset-password',
                method: 'PATCH',
                body: {
                    ...initialUserPassword
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        sendMessages: builder.mutation({
            query: initialData => ({
                url: 'users/messages',
                method: 'POST',
                body: {
                    ...initialData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: id => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id }
            ]
        })
    })
})

export const { 
    useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation,
    useUpdateUserPasswordMutation, useSendMessagesMutation
} = usersApiSlice;

// returns the  query result object 
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector 
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring 
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);
