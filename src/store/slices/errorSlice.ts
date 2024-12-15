import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ErrorState {
  error: string
}

const initialState: ErrorState = {
  error: ''
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    errorMessage(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  }
})

export const { errorMessage } = errorSlice.actions
export default errorSlice.reducer