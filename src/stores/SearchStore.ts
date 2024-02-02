import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useMovieStore } from './MovieStore';
import type { Movie } from './MovieStore';
const url =
  'https://api.themoviedb.org/3/search/movie?api_key=df6dc9d55e72d2a2695d17e7a79d1368&query=';

//Option Api
/* export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    loader: false,
    movies: []
  }),
  actions: {
    async getMovies(search) {
      this.loader = true
      const res = await fetch(`${url}${search}`)
      const data = await res.json()
      this.movies = data.results
      this.loader = false
    },
    addToUserMovies(object) {
      const movieStore = useMovieStore()
      movieStore.movies.push({ ...object, isWatched: false })
      movieStore.activeTab = 1
    }
  }
}) */

//Composition API
export const useSearchStore = defineStore('searchStore', () => {
  const loader = ref(false);
  const movies = ref([]);
  const getMovies = async (search: string) => {
    loader.value = true;
    const res = await fetch(`${url}${search}`);
    const data = await res.json();
    movies.value = data.results;
    loader.value = false;
  };

  const addToUserMovies = (object: Movie) => {
    const movieStore = useMovieStore();
    movieStore.movies.push({ ...object, isWatched: false });
    movieStore.activeTab = 1;
  };

  return { getMovies, addToUserMovies, loader, movies };
});
