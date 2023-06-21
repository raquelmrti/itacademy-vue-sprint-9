import { defineStore } from 'pinia'
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  deleteDoc
} from 'firebase/firestore/lite'
import { auth, listDb } from '../../firebaseConfig'

export const useListStore = defineStore('listStore', {
  state: () => ({
    lists: [],
    loading: true
  }),
  // getters: {
  //   sortedLists: (state) => state.lists.sort((a, b) => b.creationDate - a.creationDate)
  // },
  actions: {
    async getLists(userId) {
      this.lists.length = 0
      this.loading = true

      try {
        const q = query(collection(listDb, 'lists'), where('ownerId', '==', userId))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((list) => {
          this.lists.push({ listId: list.id, ...list.data() })
        })
      } catch (error) {
        console.error('Failed to get lists: ', error)
      } finally {
        this.loading = false
      }
    },
    getListById(id) {
      return this.lists.find((list) => list.listId === id)
    },
    async createList(listTitle, listDescription, date) {
      this.loading = true
      try {
        const listObject = {
          title: listTitle,
          description: listDescription,
          creationDate: date,
          lastUpdatedDate: date,
          ownerId: auth.currentUser.uid,
          ownerDisplayName: auth.currentUser.displayName,
          games: []
        }
        const listRef = await addDoc(collection(listDb, 'lists'), listObject)
        this.lists.push({
          ...listObject,
          listId: listRef.id
        })
      } catch (error) {
        console.error('Failed to create list: ', error)
      } finally {
        this.loading = false
      }
    },
    async deleteList(listId) {
      this.loading = true
      try {
        const listRef = doc(listDb, 'lists', listId)
        const listSnap = await getDoc(listRef)
        if (!listSnap.exists()) {
          throw new Error("List doesn't exist")
        }
        if (listSnap.data().ownerId !== auth.currentUser.uid) {
          throw new Error('No permission to delete this list')
        }

        await deleteDoc(listRef)
        this.lists = this.lists.filter((list) => list.listId !== listId)
      } catch (error) {
        console.error('Error deleting list: ', error.message)
      } finally {
        this.loading = false
      }
    }
  },
  persist: true
})
