import React from 'react'
import { CardType } from '../learnPageSlice'

type PropsType = {
   cards: Array<CardType>
}

export const LearnPage: React.FC<PropsType> = ({ cards }) => {
   return (
      <div>
         {cards.map((item) => {
            return (
               <>
                  <h1>WTF</h1>
                  <h4>{item.id}</h4>
                  <span>{item.eng}</span>
                  <span>{item.rus}</span>
               </>
            )
         })}
      </div>
   )
}
