import React from 'react'
import { CardType } from '../learnPageSlice'

type PropsType = {
   cards: Array<CardType>
   pageItemSize: number
   logoutHandler: () => void
   paginationHandlerNext: () => void
   paginationHandlerPrevious: () => void
}

const LearnPage: React.FC<PropsType> = ({
   cards,
   logoutHandler,
   paginationHandlerNext,
   paginationHandlerPrevious,
   pageItemSize,
}) => {
   return (
      <div>
         {cards.map((item) => {
            return (
               <div key={Math.random()}>
                  <h1>WTF</h1>
                  <h4>{item.id}</h4>
                  <span>{item.eng}</span>
                  <span>{item.rus}</span>
               </div>
            )
         })}
         <button onClick={logoutHandler}>Log out</button>
         <button onClick={paginationHandlerPrevious} disabled={cards[0].id === '1'}>
            Previous page
         </button>
         <button onClick={paginationHandlerNext} disabled={cards.length < pageItemSize}>
            Next page
         </button>
      </div>
   )
}

export default React.memo(LearnPage, (prevProps, nextProps) => {
   return prevProps.cards !== nextProps.cards
})
