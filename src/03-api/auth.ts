import firebase from './firebase'

const dbAuth = firebase.auth()

export const auth = {
   registration: (email: string, password: string) => dbAuth.createUserWithEmailAndPassword(email, password),

   auth: (email: string, password: string) => dbAuth.signInWithEmailAndPassword(email, password),

   listenAuth: dbAuth,

   signOut: () => dbAuth.signOut(),
}
