import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    auth: null,
  },
  reducers: {
    addAuth: (state, action) => {
      state.auth = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { addAuth } = counterSlice.actions

export default counterSlice.reducer