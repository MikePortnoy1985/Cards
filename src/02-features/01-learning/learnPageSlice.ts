import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
export type CardType = {
   id: string
   eng: string
   rus: string
   name: string
}

export const fillState = createAsyncThunk(
   'learnPage/fillState',
   async (arg: { userID: string; startValue: string; endValue: string }, thunkAPI) => {
      try {
         // const dataSnapshot = await api.getCards(arg.id, arg.startValue, arg.endValue)
         // const result: CardType[] = []
         // dataSnapshot.forEach((item) => {
         //    if (item !== null) {
         //       const pitem = item.data() as CardType
         //       result.push(pitem)
         //    } else {
         //       result.push({ id: '1', rus: '', eng: '' })
         //    }
         // })
         // return result
      } catch (e) {
         return thunkAPI.rejectWithValue(e.message)
      }
   },
)

export const learnPageSlice = createSlice({
   name: 'learnPage',
   initialState: {
      cards: [] as Array<CardType>,
      loading: false,
      error: '',
      pageItemSize: 4,
   },
   reducers: {
      addCardToCards: (state, action: PayloadAction<Array<CardType>>) => {
         state.cards = action.payload
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fillState.fulfilled, (state, action) => {
         // state.cards = action.payload
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
