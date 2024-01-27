import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref, computed, watch } from 'vue'

//Option Api
//export const useMovieStore = defineStore('movieStore', {
//  state: () => ({
//   movies: [],
//  activeTab: 2
//}),
// getters: {
//  watchedMovies() {
//    return this.movies.filter((el) => el.isWatched)
//  },
//  totalCountMovies() {
//   return this.movies.length
//  }
// },
// actions: {
//  setActiveTab() {
//   this.activeTab = id
// },
// toggleWatched(id) {
//  const idx = this.movies.findIndex((el) => el.id === id)
//  this.movies[idx].isWatched = !this.movies[idx].isWatched
// },
//  deleteMovie(id) {
//    this.movies.filter((el) => el.id !== id)
// }
// }
//})

// Composition Api
export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  isWatched: boolean
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref<Movie[]>([])
  const activeTab: Ref<number> = ref<number>(2)

  const moviesInLocalStorage = localStorage.getItem('movies')
  if (moviesInLocalStorage) {
    movies.value = JSON.parse(moviesInLocalStorage)._value
  }

  const watchedMovies = computed(() => {
    return movies.value.filter((el: Movie) => el.isWatched)
  })

  const totalCountMovies = computed(() => {
    return movies.value.length
  })

  const setActiveTab = (id: number) => {
    activeTab.value = id
  }
  const toggleWatched = (id: number) => {
    const idx = movies.value.findIndex((el) => el.id === id)
    movies.value[idx].isWatched = !movies.value[idx].isWatched
  }
  const deleteMovie = (id: number) => {
    movies.value = movies.value.filter((el) => el.id !== id)
  }

  watch(
    () => movies,
    (state) => {
      localStorage.setItem('movies', JSON.stringify(state))
      console.log(state)
    },
    { deep: true }
  )

  return {
    movies,
    activeTab,
    watchedMovies,
    toggleWatched,
    totalCountMovies,
    setActiveTab,
    deleteMovie
  }
})
