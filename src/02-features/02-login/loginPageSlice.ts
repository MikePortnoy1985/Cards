import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth } from '../../03-api/auth'

export const appUserAuth = createAsyncThunk(
   'loginPage/appUserAuth',
   async (arg: { email: string; password: string }, thunkAPI) => {
      try {
         const response = await auth.auth(arg.email, arg.password)
         if (response.user === null) {
            return thunkAPI.rejectWithValue('Invalid user')
         } else {
            localStorage.setItem('userID', response.user.uid)
            return { id: response.user.uid }
         }
      } catch (e) {
         return thunkAPI.rejectWithValue(e.message)
      }
   },
)

export const appUserSignOut = createAsyncThunk('loginPage/appUserSignOut', async (_arg, thunkAPI) => {
   try {
      return await auth.signOut()
   } catch (e) {
      return thunkAPI.rejectWithValue('some error occur')
   }
})

export const loginPageSlice = createSlice({
   name: 'loginPage',
   initialState: {
      userID: '',
      isLogged: false,
      loading: false,
      error: '',
   },
   reducers: {
      setIsLogged: (state, action) => {
         state.isLogged = action.payload
      },
      setError: (state, action) => {
         state.error = action.payload
      },
      setUserID: (state, action) => {
         state.userID = action.payload
      },
      setLoading: (state, action) => {
         state.loading = action.payload
      },
   },
   extraReducers: (builder) => {
      builder.addCase(appUserAuth.pending, (state) => {
         state.loading = true
      })
      builder.addCase(appUserAuth.fulfilled, (state, action) => {
         state.userID = action.payload.id
         state.isLogged = true
         state.loading = false
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
         state.userID = ''
         state.isLogged = false
         state.loading = false
         localStorage.clear()
      })
      builder.addCase(appUserSignOut.rejected, (state, action) => {
         state.userID = ''
         state.loading = false
         state.error = action.payload as string
      })
   },
})

export const { setIsLogged, setError, setUserID, setLoading } = loginPageSlice.actions
