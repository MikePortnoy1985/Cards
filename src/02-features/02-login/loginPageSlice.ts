import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../03-api/api'

export type UserType = {
   uid: string | null
   email: string | null
}

export type LearnPageStateType = ReturnType<typeof loginPageSlice.reducer>

export const appUserAuth = createAsyncThunk(
   'loginPage/appUserAuth',
   async (arg: { email: string; password: string }, thunkAPI) => {
      try {
         const response = await api.auth(arg.email, arg.password)
         if (response.user === null) {
            return thunkAPI.rejectWithValue('Invalid user')
         } else {
            return { id: response.user.uid, email: response.user.email }
         }
      } catch (e) {
         return thunkAPI.rejectWithValue(e.message)
      }
   },
)

export const appUserSignOut = createAsyncThunk('loginPage/appUserSignOut', async (_arg, thunkAPI) => {
   try {
      return await api.signOut()
   } catch (e) {
      return thunkAPI.rejectWithValue('some error occur')
   }
})

export const loginPageSlice = createSlice({
   name: 'loginPage',
   initialState: {
      user: {} as UserType,
      isLogged: false,
      loading: false,
      error: '',
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(appUserAuth.fulfilled, (state, action) => {
         state.user.uid = action.payload.id
         state.user.email = action.payload.email
         state.isLogged = true
         state.loading = false
      })
      builder.addCase(appUserAuth.pending, (state) => {
         state.loading = true
      })
      builder.addCase(appUserAuth.rejected, (state, action) => {
         state.error = action.payload as string
         state.isLogged = false
         state.loading = false
      })
      builder.addCase(appUserSignOut.pending, (state) => {
         state.loading = true
      })
      builder.addCase(appUserSignOut.fulfilled, (state) => {
         state.user = {} as UserType
         state.isLogged = false
         state.loading = false
      })
      builder.addCase(appUserSignOut.rejected, (state, action) => {
         state.user = {} as UserType
         state.loading = false
         state.error = action.payload as string
      })
   },
})
