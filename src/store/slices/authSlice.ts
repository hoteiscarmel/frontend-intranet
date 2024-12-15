import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  id: string
  name: string
  mail: string
  profile_pic: string
  message: string
}

interface AuthState {
  isAuthenticated: boolean
  userJWT: string
  user: UserState
  currentRoomUser: UserState
}

export const initialUserState: UserState = {
  id: '',
  name: '',
  mail: '',
  profile_pic: '',
  message: ''
}

export const initialState: AuthState = {
  isAuthenticated: false,
  userJWT: '',
  user: initialUserState,
  currentRoomUser: initialUserState
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: UserState, userJWT: string }>) {
      state.isAuthenticated = true
      state.userJWT = action.payload.userJWT
      state.user = action.payload.user
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = initialState.user
    },
    setCurrentRoomContact(state, action: PayloadAction<UserState>) {
      state.currentRoomUser = action.payload
    },
  }
})

export const { login, logout, setCurrentRoomContact } = authSlice.actions
export default authSlice.reducer