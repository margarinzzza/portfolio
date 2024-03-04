import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import axios from '../axios'

const initialState = {
    chatsStatus: 'loading',
    chatStatus: 'loading',
    messagesStatus: 'loading',
    chats: {
        selectedChat: {},
        chatsData: [],
        chatsDataTape: 1,
        arrLength: null
    },
    messages: {
        messagesData: [],
        messagesDataTape: 1,
        arrLength: null
    },
    onlineUsers: []
}

export const getMessages = createAsyncThunk('getMessages', async (params, { rejectWithValue }) => {
    return await axios.post(`/getMessages`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const getChats = createAsyncThunk('getChats', async (params, { rejectWithValue }) => {
    return await axios.post(`/getChats`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const goToChat = createAsyncThunk('goToChat', async (params, { rejectWithValue }) => {
    const { myId, userId, myChats } = params
    let chatRef, isChatFound = false
    for (const id of myChats) {
        await axios.get(`/parseChatId/${id}`).then(response => {
            const chatData = response.data.chat
            if (chatData.type === 'personal') {
                if ((chatData.creator.toString() === myId || chatData.creator.toString() === userId) && (chatData.participants[0].toString() === myId || chatData.participants[0].toString() === userId)) {
                    isChatFound = true
                    chatRef = id
                }
            }
        })
    }
    if (!isChatFound) return await axios.post(`/createChat`, params).then(response => { return { type: 'created', data: response.data, chatRef: response.data.chat._id } }).catch(e => rejectWithValue(e.response.data))
    return { type: 'redirect', chatRef }
})

export const sendMessage = createAsyncThunk('sendMessage', async (params, { rejectWithValue }) => {
    return await axios.post(`/sendMessage`, params).then(response => response.data).catch(e => rejectWithValue(e.response.data))
})

export const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(goToChat.pending, (state) => {
                state.chatsStatus = 'loading'
                state.chatStatus = 'loading'
            })
            .addCase(goToChat.fulfilled, (state, action) => {
                const { type, chatRef } = action.payload
                if (type === 'created') state.chats.chatsData.push(chatRef)
                state.chatStatus = 'loaded'
                state.chatsStatus = 'loaded'
            })
            .addCase(goToChat.rejected, (state) => {
                state.chatsStatus = 'err'
                state.chatStatus = 'err'
            })

            .addCase(getMessages.pending, (state) => { state.chatsStatus = 'loading' })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.chatsStatus = 'loaded'
                state.messages.messagesData = action.payload.messageData
                state.messages.arrLength = action.payload.arrLength
                const chatsData = current(state.chats.chatsData)
                const chatIdx = chatsData.findIndex(el => el._id == action.payload.chatId)
                if (chatsData[chatIdx]?.messages.length > 0) state.chats.chatsData[chatIdx].messages[0].whoRead.push(action.payload.userId)
            })
            .addCase(getMessages.rejected, (state) => { state.chatsStatus = 'err' })

            .addCase(getChats.pending, (state) => { state.chatsStatus = 'loading' })
            .addCase(getChats.fulfilled, (state, action) => {
                state.chatsStatus = 'loaded'
                state.chats.chatsData = action.payload.tape
                state.chats.arrLength = action.payload.arrLength
            })
            .addCase(getChats.rejected, (state) => { state.chatsStatus = 'err' })

            .addCase(sendMessage.pending, (state) => {
                state.eventLoading = 'loading'
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                let modifiedEventsData = [...current(state.eventsData)]
                current(state.eventsData).forEach((el, idx) => {
                    if (el._id === action.payload.data._id) modifiedEventsData[idx] = action.payload.data
                })
                state.eventsData = modifiedEventsData
                state.eventData = action.payload.data
                state.eventLoading = 'loaded'
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.eventActionsError = action.payload.msg
                state.eventLoading = 'err'
            })
    },
    reducers: {
        setChat: (state, action) => {
            state.chats.selectedChat = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        },
        setChatsDataTape: (state) => {
            state.chats.chatsDataTape += 1
        },
        setMessagesDataTape: (state) => {
            state.messages.messagesDataTape += 1
        },
        resetChat: (state) => {
            state.chats.selectedChat = {}
        },
        refreshChat: (state, action) => {
            let { link, receiverId, name, chatId, createdAt, isModified, status, text, whoRead } = action.payload.data
            const { isInChat } = action.payload
            const chatsData = current(state.chats.chatsData)
            const chatIdx = chatsData.findIndex(el => el._id === chatId)
            if (isInChat) {
                const isIAmRead = whoRead.find(el => el === receiverId)
                if (!isIAmRead) whoRead.push(receiverId)
                state.messages.messagesData.push(action.payload.data)
            }
            const newLastMsg = { userId: { link, name }, createdAt, isModified, status, text, whoRead }
            state.chats.chatsData[chatIdx].messages[0] = newLastMsg
        },
        updateMsg: (state, action) => {
            let { text, updatedAt, _id } = action.payload.data.msgData
            let { chatId } = action.payload.data
            const { isInChat } = action.payload
            const chatsData = current(state.chats.chatsData)
            const messages = current(state.messages.messagesData)
            const chatIdx = chatsData.findIndex(el => el._id === chatId)
            const msgIdx = messages.findIndex(el => el._id === _id)
            const lastMsg = state.chats.chatsData[chatIdx].messages[0]
            if (isInChat) {
                state.messages.messagesData[msgIdx].text = text
                state.messages.messagesData[msgIdx].isModified = true
                state.messages.messagesData[msgIdx].updatedAt = updatedAt
            }
            if (lastMsg._id === _id) state.chats.chatsData[chatIdx].messages[0].text = text
        },
        deleteMsg: (state, action) => {
            console.log(action.payload)
            let msgData = action.payload.data.msgData
            let { chatId, newLastMsg, delForAll } = action.payload.data
            const { isInChat, isMyself } = action.payload
            const chatsData = current(state.chats.chatsData)
            const messages = current(state.messages.messagesData)
            const chatIdx = chatsData.findIndex(el => el._id === chatId)
            const lastMsg = state.chats.chatsData[chatIdx].messages[0]
            if (!delForAll && isMyself) state.chats.chatsData[chatIdx].messages = newLastMsg
            if (delForAll) state.chats.chatsData[chatIdx].messages = newLastMsg
            if (isInChat) state.messages.messagesData = msgData
        },
    }
})

export const chatSliceActions = chatSlice.actions
export default chatSlice.reducer 