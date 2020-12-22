import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../03-api/api'

export type CardType = {
   id: string
   eng: string
   rus: string
}

export type LearnPageStateType = ReturnType<typeof learnPageSlice.reducer>

export const fillState = createAsyncThunk('learnPage/fillState', async (arg, thunkAPI) => {
   try {
      const response = await api.getCards()
      return response.val()
   } catch (e) {
      return thunkAPI.rejectWithValue(e.error.message)
   }
})

export const learnPageSlice = createSlice({
   name: 'learnPage',
   initialState: {
      cards: [] as Array<CardType>,
      loading: false,
      error: '',
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fillState.fulfilled, (state, action) => {
         state.cards = action.payload
         state.loading = false
      })
      builder.addCase(fillState.pending, (state) => {
         state.loading = true
      })
      builder.addCase(fillState.rejected, (state, action) => {
         state.error = action.payload as string
         state.loading = false
      })
   },
})
