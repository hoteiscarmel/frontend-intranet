import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUserState, UserState } from './authSlice';

type Section = 'rooms' | 'contacts' | 'favorites' | 'archiveds' | 'calls'

interface Filter {
  searched: string
  section: Section
}

interface WasSendSource {
  type: 'image' | 'video'
  content: string
}

interface WasMessage {
  wasSendText: string
  wasSendSource: WasSendSource
}

export interface Message {
  id: string
  text: string
  image_url: string
  video_url: string
  seen_by: string []
  archived_by: string []
  is_group: boolean
  sender_id: string
  room_id: string
}

export interface Room {
  id: string
  sender_id: string
  receive_id: string
  allContacts: UserState []
  archived_by: string []
  messages: Message []
}

interface ChatState {
  rooms: Room []
  contacts: UserState []
  onlineUsers: UserState []
  selectedContact: UserState
  isMobileRoom: boolean
  isOpenRoom: boolean
  isOnlineCurrentUser: boolean
  selectedRoom: Room
  filter: Filter
  wasMessage: WasMessage
}

export const initialRoomState: Room = {
  id: '',
  sender_id: '',
  receive_id: '',
  allContacts: [],
  archived_by: [],
  messages: []
}

const intialFilterState: Filter  = {
  searched: '',
  section: 'contacts'
}

const initialWasMessageState: WasMessage = {
  wasSendText: '',
  wasSendSource: {
    type: 'image',
    content: ''
  },
}

const initialState: ChatState = {
  rooms: [],
  contacts: [],
  onlineUsers: [],
  selectedContact: initialUserState,
  isMobileRoom: false,
  isOpenRoom: false,
  isOnlineCurrentUser: false,
  selectedRoom: initialRoomState,
  filter: intialFilterState,
  wasMessage: initialWasMessageState
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setIsMobileRoom(state, action: PayloadAction<boolean>) {
      state.isMobileRoom = action.payload
    },
    setIsOpenRoom(state, action: PayloadAction<boolean>) {
      state.isOpenRoom = action.payload
    },
    setSectionFilter(state, action: PayloadAction<Section>) {
      state.filter = {
        ...state.filter,
        section: action.payload
      }
    },
    setSearched(state, action: PayloadAction<string>){
      state.filter = {
        ...state.filter,
        searched: action.payload
      }
    },
    setMessageText(state, action: PayloadAction<string>) {
      state.wasMessage = {
        ...state.wasMessage,
        wasSendText: action.payload
      }
    },
    setRooms(state, action: PayloadAction<Room []>) {
      state.rooms = action.payload
    },
    setRoomSelected(state, action: PayloadAction<Room>) {
      state.selectedRoom = action.payload
    },
    setOnlineUsers(state, action: PayloadAction<UserState []>) {
      state.onlineUsers = action.payload
    },
    setIsOnlineCurrentUser(state, action: PayloadAction<boolean>) {
      state.isOnlineCurrentUser = action.payload
    },
    setContacts(state, action: PayloadAction<UserState []>) {
      state.contacts = action.payload
    },
    setSelectedContact(state, action: PayloadAction<UserState>) {
      state.selectedContact = action.payload
    },
    setInitialChat(){
      return initialState
    }
  }
})


export const {
  setIsMobileRoom,
  setIsOpenRoom,
  setSectionFilter,
  setSearched,
  setMessageText,
  setRooms,
  setRoomSelected,
  setOnlineUsers,
  setIsOnlineCurrentUser,
  setContacts,
  setSelectedContact,
  setInitialChat
} = chatSlice.actions
export default chatSlice.reducer