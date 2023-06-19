import { defineStore } from 'pinia'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore/lite'
import { auth, listDb } from '../../firebaseConfig'

export const useListStore = defineStore('listStore', {
  state: () => ({
    lists: []
  }),
  actions: {
    async getLists(userId) {
      this.lists.length = 0

      try {
        const q = query(collection(listDb, 'lists'), where('ownerId', '==', userId))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((list) => {
          this.lists.push({ listId: list.id, ...list.data() })
        })
      } catch (error) {
        console.error('Failed to get lists: ', error)
      }
    },
    async createList(title, description, date) {
      try {
        const listObject = {
          title,
          description,
          creationDate: date,
          lastUpdatedDate: date,
          ownerId: auth.currentUser.uid,
          ownerDisplayName: auth.currentUser.displayName,
          games: []
        }
        const listRef = await addDoc(collection(listDb, 'lists'), listObject)
        this.lists.push({
          ...listObject,
          id: listRef.id
        })
      } catch (error) {
        console.error('Failed to create list: ', error)
      }
    }
  }
})
