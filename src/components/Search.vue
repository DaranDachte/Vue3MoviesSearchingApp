<template>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <input type="text" class="search-input" placeholder="Input movie" v-model="searchMovie" />
  </form>
  <Loader v-if="searchStore.loader" />
  <div v-else>
    <Movie v-for="movie of movies" :key="movie.id" :movie="movie" :is-search="true" />
  </div>
</template>
<script setup lang="ts">
//import Loader from '../components/Loader.vue'
import Movie from '../components/Movie.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { Ref } from 'vue';
import { useSearchStore } from '../stores/SearchStore';
import Loader from './Loader.vue';
import type { Movie as MovieType } from '@/stores/MovieStore';

const searchStore = useSearchStore();
const store = storeToRefs(searchStore);

const searchMovie = ref('');
const movies: Ref<MovieType[]> = store.movies;
console.log(movies);
</script>

<style scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  outline: none;
}
</style>
