import { auth } from '../03-api/auth'
import { Dispatch } from 'redux'
import { setIsLogged, setError, setUserID, setLoading } from '../02-features/02-login/loginPageSlice'

export const authChecker = () => (dispatch: Dispatch) => {
   dispatch(setLoading(true))
   const id = localStorage.getItem('userID')
   auth.listenAuth.onIdTokenChanged((user) => {
      if (id) {
         if (id === user?.uid) {
            dispatch(setIsLogged(true))
            dispatch(setUserID(user.uid))
         } else {
            dispatch(setIsLogged(false))
            dispatch(setError('Authorization error. Please re-login'))
         }
         dispatch(setLoading(false))
      } else {
         dispatch(setLoading(false))
         return
      }
   })
}
