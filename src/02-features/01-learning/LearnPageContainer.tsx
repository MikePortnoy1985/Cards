import React, { useEffect, useState } from 'react'
import { fillState, LearnPageStateType } from './learnPageSlice'
import LearnPage from './learnPage/LearnPage'
import { useDispatch, useSelector } from 'react-redux'
import { AppType } from '../../04-store/store'
import { appUserSignOut } from '../02-login/loginPageSlice'
import { ReactComponent as Loader } from '../../05-assets/Spinner-1s-200px.svg'
import { Redirect } from 'react-router-dom'

export const LearnPageContainer: React.FC = () => {
   const { cards, loading, pageItemSize } = useSelector<AppType, LearnPageStateType>((state) => state.learnPage)
   const id = useSelector<AppType, string | null>((state) => state.loginPage.user.uid)
   const isLogged = useSelector<AppType, boolean>((state) => state.loginPage.isLogged)
   const dispatch = useDispatch()

   const [value, setValue] = useState<number[]>([0, 4])

   useEffect(() => {
      if (id) {
         dispatch(fillState({ id, startValue: String(value[0]), endValue: String(value[1]) }))
      }
   }, [dispatch, id, value])

   const logoutHandler = async () => {
      await dispatch(appUserSignOut())
   }

   const paginationHandlerNext = () => {
      setValue(value.map((i) => i + pageItemSize))
   }

   const paginationHandlerPrevious = () => {
      setValue(value.map((i) => i - pageItemSize))
   }

   if (!isLogged) {
      return <Redirect to={'/'} />
   }

   if (loading || cards === undefined) {
      return <Loader />
   }

   return (
      <>
         <LearnPage
            cards={cards}
            logoutHandler={logoutHandler}
            paginationHandlerNext={paginationHandlerNext}
            paginationHandlerPrevious={paginationHandlerPrevious}
            pageItemSize={pageItemSize}
         />
      </>
   )
}
