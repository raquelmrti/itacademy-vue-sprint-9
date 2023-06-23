import { defineStore } from 'pinia'
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore/lite'
import { auth, listDb } from '../../firebaseConfig'

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    loading: true,
    API_URL: 'https://playshelf.up.railway.app/https://api.igdb.com/v4',
    CLIENT_ID: 'f13c52zdby8yt6x257hh4a23jieze5',
    AUTH: 'Bearer 4mxxgj2wyvw4zx4xsqyr50bacj5s3i',
    headers: new Headers({
      Accept: 'application/json',
      'Client-ID': 'f13c52zdby8yt6x257hh4a23jieze5',
      Authorization: 'Bearer g406iqy9c899vkfq6i1mt6ymve9ij3'
    }),
    fetchedGames: [],
    addedGames: []
  }),
  actions: {
    addGameToList(game) {
      this.addedGames.push(game)

    },
    async searchGames(searchTerm) {
      this.loading = true
      const url = this.API_URL + '/games'
      const requestOptions = {
        method: 'POST',
        headers: this.headers,
body: `f id,first_release_date,name,platforms,genres,name,screenshots,cover,summary,url,involved_companies; search "${searchTerm}"; limit 10;`
      }

      try {
        const response = await fetch(url, requestOptions)
        const result = await response.json()
        this.fetchedGames = result.map((game) => game)
      } catch (error) {
        console.log('error', error)
      } finally {
        this.loading = false
      }
    }
  }
})