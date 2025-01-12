import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config';
const api=createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:`${server}/api/v1`}),
    tagTypes:["Chat","User","Message"],
    endpoints:(builder)=>({
        myChats:builder.query({
            query:()=>({
                url:"/chat/my",
                credentials:"include"
            }),
            providesTags:["Chat"],
        }),
        oneToOne:builder.query({
            query:()=>({
                url:"/chat/oneToOneChat",
                credentials:"include"
            }),
            providesTags:["Chat"],
        }),
        searchUser:builder.query({
            query:(name)=>({
                url:`/user/search?name=${name}`,
                credentials:"include"
            }),
            providesTags:["User"]
        }),
        sendFriendRequest:builder.mutation({
            query:(data)=>({
                url:"/user/sendRequest",
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["User"]
        }),
        getNotification:builder.query({
            query:()=>({
                url:"/user/notificaions",
                credentials:"include", 
            }),
            keepUnusedDataFor:0
        }),
        acceptFriendRequest:builder.mutation({
            query:(data)=>({
                url:"/user/acceptRequest",
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["Chat"]
        }), 
        chatDetails:builder.query({
            query:({chatId,populate=false})=>{
                let url=`/chat/${chatId}`
                if(populate)
                    url+="?populate=true"
                return{
                    url,
                    credentials:"include"
                }
            },
            providesTags:["Chat"],
        }),
        getOldMessages:builder.query({
            query:({chatId,page})=>({
                url:`/chat/message/${chatId}?page=${page}`,
                credentials:"include"
            }),
            providesTags:["Message"],
        }),

    })
})
export default api;
export const {useMyChatsQuery,useLazySearchUserQuery,useSendFriendRequestMutation,useGetNotificationQuery,useAcceptFriendRequestMutation,useOneToOneQuery,useChatDetailsQuery,useGetOldMessagesQuery}=api
