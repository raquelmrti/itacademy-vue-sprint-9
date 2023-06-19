import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../../firebaseConfig'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userData: null
  }),

  actions: {
    updateUserData(user) {
      this.userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email
      }
    },
    async registerUser(displayName, email, password) {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)

        // add user display name
        try {
          await updateProfile(auth.currentUser, {
            displayName
          })
        } catch (error) {
          console.error('Error updating profile: ', error)
        }
        this.updateUserData(user)
      } catch (error) {
        console.error('Error creating user:', error)
      }
    },
    async signInUser(email, password) {
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.updateUserData(user)
      } catch (error) {
        console.error('Error signing user in: ', error)
      }
    },
    async logoutUser() {
      try {
        await signOut(auth)
        this.userData = null
      } catch (error) {
        console.error('Error logging out the user: ', error)
      }
    },

    getCurrentUser() {
      return new Promise((resolve, reject) => {
        const unsubcribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.updateUserData(user)
            }
            resolve(user)
          },
          (e) => reject(e)
        )
        unsubcribe()
      })
    }
  }
})
