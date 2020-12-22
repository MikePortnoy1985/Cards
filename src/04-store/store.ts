import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { learnPageSlice } from '../02-features/01-learning/learnPageSlice'

export const store = configureStore({
   reducer: {
      learnPage: learnPageSlice.reducer,
   },
   middleware: getDefaultMiddleware(),
})

export type AppType = ReturnType<typeof store.getState>
