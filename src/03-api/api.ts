import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
   apiKey: 'AIzaSyAgxVrU7bL_aHEwmL6N1dfQPAnOHJOqEYI',
   authDomain: 'cards-586db.firebaseapp.com',
   databaseURL: 'https://cards-586db-default-rtdb.firebaseio.com',
   projectId: 'cards-586db',
   storageBucket: 'cards-586db.appspot.com',
   messagingSenderId: '188058709633',
   appId: '1:188058709633:web:fdcc4a10715583c9fe6780',
}

firebase.initializeApp(firebaseConfig)

export const api = {
   getCards: (startValue: string, endValue: string) =>
      firebase.database().ref('/cards').orderByKey().startAt(startValue).endAt(endValue).once('value'),
   getCardsByUser: (id: string) => firebase.database().ref(`/cards/${id}`).once('value'),
   registration: (email: string, password: string) => firebase.auth().createUserWithEmailAndPassword(email, password),
   auth: (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password),
   signOut: () => firebase.auth().signOut(),
}
