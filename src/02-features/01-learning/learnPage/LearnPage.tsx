import React from 'react'
import CardInputs from '../cardInputs/CardInputs'
import { CardType } from '../learnPageSlice'
import s from './LearnPage.module.scss'

type PropsType = {
   cards: Array<CardType>
   pageItemSize: number
   logoutHandler: () => void
   paginationHandlerNext: () => void
   paginationHandlerPrevious: () => void
   addCardToCollection: (valueEng: string, valueRus: string) => void
}

const LearnPage: React.FC<PropsType> = ({
   cards,
   logoutHandler,
   paginationHandlerNext,
   paginationHandlerPrevious,
   pageItemSize,
   addCardToCollection,
}) => {
   return (
      <div className={s.learnPageContainer}>
         <div className={s.cardsWrapper}>
            {cards.map((item) => {
               return (
                  <div key={Math.random()} className={s.card}>
                     <h3>WTF</h3>
                     <ol>
                        <li> Eng: {item.eng}</li>
                        <li> Rus: {item.rus}</li>
                     </ol>
                  </div>
               )
            })}
         </div>
         <div className={s.inputsWrapper}>
            <button
               onClick={paginationHandlerPrevious}
               // disabled={cards[0].id === '1'}
            >
               Previous page
            </button>
            <button onClick={paginationHandlerNext} disabled={cards.length < pageItemSize}>
               Next page
            </button>
            <CardInputs addCardToCollection={addCardToCollection} />
         </div>
         <button className={s.logOut} onClick={logoutHandler}>
            Log out
         </button>
      </div>
   )
}

export default React.memo(LearnPage, (prevProps, nextProps) => {
   return prevProps.cards === nextProps.cards
})
