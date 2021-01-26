import React, { useEffect, useState } from 'react'
// import { addCardToCards, CardType, fillState } from './learnPageSlice'
import LearnPage from './learnPage/LearnPage'
import { useDispatch, useSelector } from 'react-redux'
import { AppType } from '../../04-store/store'
import { appUserSignOut } from '../02-login/loginPageSlice'
import { ReactComponent as Loader } from '../../05-assets/Spinner.svg'
import { Redirect } from 'react-router-dom'
// import { api } from '../../03-api/api'
import s from './learnPage/LearnPage.module.scss'

export const LearnPageContainer: React.FC = () => {
   const { cards, loading, pageItemSize } = useSelector((state: AppType) => state.learnPage)
   const { userID, isLogged } = useSelector((state: AppType) => state.loginPage)
   const dispatch = useDispatch()

   const [value, setValue] = useState<number[]>([0, 4])

   // useEffect(() => {
   //    dispatch(fillState({ userID: userID, startValue: String(value[0]), endValue: String(value[1]) }))
   //    const subscriber = api
   //       .getCardsStream(userID)
   //       // .orderBy('time')
   //       .onSnapshot((dataSnapshot) => {
   //          let res = [] as Array<CardType>
   //          dataSnapshot.forEach((i) => {
   //             if (i !== null) {
   //                res = [...res, i.data() as CardType]
   //             }
   //          })
   //          dispatch(addCardToCards(res))
   //       })
   //    return () => subscriber()
   // }, [dispatch, userID, value])

   const logoutHandler = () => {
      dispatch(appUserSignOut())
   }

   const paginationHandlerNext = () => {
      setValue(value.map((i) => i + pageItemSize))
   }

   const paginationHandlerPrevious = () => {
      setValue(value.map((i) => i - pageItemSize))
   }

   const addCardToCollection = (valueEng: string, valueRus: string) => {
      // api.putCardToCollection(userID, valueEng, valueRus)
   }

   if (!isLogged) {
      return <Redirect to={'/'} />
   }

   if (loading || cards === undefined) {
      return <Loader />
   }

   return (
      <div className={s.learnPageWrapper}>
         <LearnPage
            cards={cards}
            logoutHandler={logoutHandler}
            paginationHandlerNext={paginationHandlerNext}
            paginationHandlerPrevious={paginationHandlerPrevious}
            pageItemSize={pageItemSize}
            addCardToCollection={addCardToCollection}
         />
      </div>
   )
}
