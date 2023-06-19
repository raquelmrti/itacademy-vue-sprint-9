import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyC8aS9Ue1he0z7hbJ5NmaZoekuwCVcVb9I',
  authDomain: 'playshelf-ita-sprint-9.firebaseapp.com',
  projectId: 'playshelf-ita-sprint-9',
  storageBucket: 'playshelf-ita-sprint-9.appspot.com',
  messagingSenderId: '1070367641040',
  appId: '1:1070367641040:web:5b57eef659863114bd7dd5'
}

initializeApp(firebaseConfig)
const auth = getAuth()
const listDb = getFirestore()

export { auth, listDb }

