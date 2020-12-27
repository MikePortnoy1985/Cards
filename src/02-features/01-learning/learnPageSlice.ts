import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
         const dataSnapshot = await api.getCards(arg.id, arg.startValue, arg.endValue)
         const result: CardType[] = []
         dataSnapshot.forEach((item) => {
            if (item !== null) {
               const pitem = item.val()
               result.push(pitem)
            } else {
               result.push({ id: '1', rus: '', eng: '' })
            }
         })
         return result
      } catch (e) {
         return thunkAPI.rejectWithValue(e.message)
      }
   },
)

export const learnPageSlice = createSlice({
   name: 'learnPage',
   initialState: {
      cards: [{ id: '1', rus: 'болванка', eng: '' }],
      loading: false,
      error: '',
      pageItemSize: 4,
   },
   reducers: {
      addCardToCards: (state, action: PayloadAction<CardType>) => {
         state.cards.push(action.payload)
      },
   },
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

export const { addCardToCards } = learnPageSlice.actions
