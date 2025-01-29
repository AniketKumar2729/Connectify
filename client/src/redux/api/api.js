import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config';
let accumulatedMessages = []; // Persistent variable to store fetched messages
const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1` }),
    tagTypes: ["Chat", "User", "Message"],
    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: "/chat/my",
                credentials: "include"
            }),
            providesTags: ["Chat"],
        }),
        oneToOne: builder.query({
            query: () => ({
                url: "/chat/oneToOneChat",
                credentials: "include"
            }),
            providesTags: ["Chat"],
        }),
        searchUser: builder.query({
            query: (name) => ({
                url: `/user/search?name=${name}`,
                credentials: "include"
            }),
            providesTags: ["User"]
        }),
        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: "/user/sendRequest",
                method: "PUT",
                credentials: "include",
                body: data
            }),
            invalidatesTags: ["User"]
        }),
        getNotification: builder.query({
            query: () => ({
                url: "/user/notificaions",
                credentials: "include",
            }),
            keepUnusedDataFor: 0
        }),
        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: "/user/acceptRequest",
                method: "PUT",
                credentials: "include",
                body: data
            }),
            invalidatesTags: ["Chat"]
        }),
        chatDetails: builder.query({
            query: ({ chatId, populate = false }) => {
                let url = `/chat/${chatId}`
                if (populate)
                    url += "?populate=true"
                return {
                    url,
                    credentials: "include"
                }
            },
            providesTags: ["Chat"],
        }),
        getOldMessages: builder.query({
            query: ({ chatId, page }) => ({
                url: `/chat/message/${chatId}?page=${page}`,
                credentials: "include"
            }),
            transformResponse: (response) => {
                if (response?.messages) {
                    // Reverse the new messages from the server
                    const reversedMessages = response.messages.reverse();

                    // Merge the new reversed messages with the accumulated messages
                    accumulatedMessages = [...reversedMessages, ...accumulatedMessages];
                }

                return {
                    ...response,
                    messages: accumulatedMessages, // Return the merged array
                };
            },
            keepUnusedDataFor: 0,
        }),
        sendAttachments: builder.mutation({
            query: (data) => ({
                url: "/chat/message",
                method: "POST",
                credentials: "include",
                body: data
            }),
            transformErrorResponse: (response) => {
                if (response?.messages) {
                    response.messages = response.messages.reverse();
                }
                return response
            }
        }),
        myGroups: builder.query({
            query: () => ({
                url: "/chat/my/groups",
                credentials: "include"
            }),
            providesTags: ["Chat"]
        }),
        avaliableFriends: builder.query({
            query: (chatId) => {
                let url = "/user/friends"
                if (chatId) url += `?chatId=${chatId}`
                return {
                    url,
                    credentials: 'include'
                }
            },
            providesTags:["Chat"]
        }),
        newGroup:builder.mutation({
            query:({name,members})=>({
                url:"/chat/new",
                method:"POST",
                credentials:"include",
                body:{name,members}
            }),
            invalidatesTags:["Chat"]
        }),
        renameGroup:builder.mutation({
            query:({groupname,groupId})=>({
                url:`/chat/${groupId}`,
                method:"PUT",
                credentials:"include",
                body:{groupname}
            }),
            invalidatesTags:["Chat"]
        }),
        addGroupMembers:builder.mutation({
            query:({groupId, members})=>({
                url:'/chat/addMembers',
                method:"PUT",
                credentials:"include",
                body:{groupId, members}
            }),
            invalidatesTags:["Chat"]
        }),
        removeGroupMembers:builder.mutation({
            query:({userId,groupId})=>({
                url:'/chat/removeMember',
                method:"DELETE",
                credentials:"include",
                body:{userId,groupId}
            }),
            invalidatesTags:["Chat"]
        })
    })
})
export default api;
export const { useMyChatsQuery, useLazySearchUserQuery, useSendFriendRequestMutation, useGetNotificationQuery, useAcceptFriendRequestMutation, useOneToOneQuery, useChatDetailsQuery, useGetOldMessagesQuery, useSendAttachmentsMutation, useMyGroupsQuery,useAvaliableFriendsQuery,useNewGroupMutation,useRenameGroupMutation,useRemoveGroupMembersMutation,useAddGroupMembersMutation } = api
