import React, { useEffect } from 'react'
import { fillState, LearnPageStateType } from './learnPageSlice'
import { LearnPage } from './learnPage/LearnPage'
import { useDispatch, useSelector } from 'react-redux'
import { AppType } from '../../04-store/store'
import { ReactComponent as Loader } from '../../05-assets/Spinner-1s-200px.svg'

export const LearnPageContainer: React.FC = () => {
   const { cards, loading } = useSelector<AppType, LearnPageStateType>((state) => state.learnPage)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(fillState())
   }, [dispatch])

   if (loading) {
      return <Loader />
   }

   return <LearnPage cards={cards} />
}
