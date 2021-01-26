import firebase from './firebase'
import { nanoid } from '@reduxjs/toolkit'

const myDB = firebase.firestore()

export const api = {
   // getCards: (id: string, startValue: string, endValue: string) => myDB.collection(`${id}`).get(),
   // getCardsStream: (id: string) => myDB.collection(`${id}`),
   // putCardToCollection: (userId: string, valueEng: string, valueRus: string) => {
   //    const innerCardId = nanoid()
   //    const time = Date.now()
   //    myDB.collection(userId).add({
   //       eng: valueEng,
   //       id: innerCardId,
   //       rus: valueRus,
   //       time: time,
   //    })
   // },
}
