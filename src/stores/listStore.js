import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore/lite'
import { auth, listDb } from '../../firebaseConfig'

export const useListStore = defineStore('listStore', () => {

  const lists = ref([])

  async function getLists() {
    if (lists.value.length !== 0) return

    try {
      const q = query(collection(listDb, "lists"), where("ownerId", "==", auth.currentUser.uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((list) => {
        lists.value.push({listId: list.id, ...list.data()});
      })
      console.log(lists);
    } catch (error) {
      console.error("Failed to get lists: ", error);
    }
  }
  async function createList(title, description, date) {
    try {
      const listObject = {
        title,
        description,
        creationDate: date,
        ownerId: auth.currentUser.uid,
        ownerDisplayName: auth.currentUser.displayName,
        games: []
      }
      const listRef = await addDoc(collection(listDb, 'lists'), listObject)
      lists.value.push({
        ...listObject,
        id: listRef.id
      })
    } catch (error) {
      console.error("Failed to create list: ", error);
    }
  }

  return {
    createList,
    getLists
  }
})
