import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
 } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

export const useUserStore = defineStore('userStore', () => {
  let userData = null

  async function registerUser(displayName, email, password) {
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

      userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email
      }
    } catch (error) {
      console.error('Error creating user:' , error)
    }
    console.log(userData, userData.uid);
  }

  async function signInUser(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email
      }
    } catch (error) {
      console.error("Error signing user in: ", error);
    }
  }

  async function logoutUser() {
    try {
      await signOut(auth)
      userData = null
    } catch (error) {
      console.error("Error logging out the user: ", error);
    }
  }

  return {
    userData,
    registerUser,
    signInUser,
    logoutUser,
  }
})
