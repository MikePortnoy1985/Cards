import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../03-api/api'

export type CardType = {
   id: string
   eng: string
   rus: string
}

export type LearnPageStateType = ReturnType<typeof learnPageSlice.reducer>

export const fillState = createAsyncThunk(
   'learnPage/fillState',
   async (arg: { id: string; startValue: string; endValue: string }, thunkAPI) => {
      try {
         return await api.getCards(arg.startValue, arg.endValue)
      } catch (e) {
         return thunkAPI.rejectWithValue(e.message)
      }
   },
)

export const learnPageSlice = createSlice({
   name: 'learnPage',
   initialState: {
      cards: [{ id: '0', rus: '', eng: '' }],
      loading: false,
      error: '',
      pageItemSize: 4,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fillState.fulfilled, (state, action) => {
         const result = [] as Array<CardType>
         action.payload.forEach((item) => {
            if (item !== null) {
               result.push(item.val())
            }
         })
         state.cards = result
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
