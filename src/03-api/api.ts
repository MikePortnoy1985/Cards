import firebase from 'firebase'

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

const base = firebase.database()

export const api = {
   getCards: () => base.ref('/cards').once('value'),
}
