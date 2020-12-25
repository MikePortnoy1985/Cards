import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { learnPageSlice } from '../02-features/01-learning/learnPageSlice'
import { loginPageSlice } from '../02-features/02-login/loginPageSlice'

export const store = configureStore({
   reducer: {
      learnPage: learnPageSlice.reducer,
      loginPage: loginPageSlice.reducer,
   },
   middleware: getDefaultMiddleware(),
})

export type AppType = ReturnType<typeof store.getState>
