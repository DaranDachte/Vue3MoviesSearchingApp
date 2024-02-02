<script setup lang="ts">
import Movie from './components/Movie.vue';
import Search from './components/Search.vue';
//import { RouterLink, RouterView } from 'vue-router'
import { useMovieStore } from './stores/MovieStore';

const movieStore = useMovieStore();

const setTab = (id: number) => {
  movieStore.setActiveTab(id);
};
</script>

<template>
  <main
    class="min-w-full min-h-full h-dvh bg-[url('src/assets/img/bg2.jpg')] bg-cover bg-no-repeat bg-fixed bg-center overflow-auto"
  >
    <div class="m-auto max-w-[50rem]">
      <header class="flex justify-center items-center mt-[2rem] p-5">
        <img src="./assets//img//MovieHeader.svg" alt="logo" class="mr-5 max-w-12" />
        <h2 class="text-[2rem]">My Favorite Movies</h2>
      </header>

      <div class="flex justify-center mb-[2rem]">
        <button
          class="border-0 w-24 h-10 text-[1rem] my-2.5 mr-[1rem] cursor-pointer rounded bg-[#efefef] hover:bg-fuchsia-600"
          @click="setTab(1)"
        >
          Favorite
        </button>
        <button
          class="border-0 w-24 h-10 text-[1rem] my-2.5 ml-[1rem] cursor-pointer rounded bg-[#efefef] hover:bg-fuchsia-600"
          @click="setTab(2)"
        >
          Search
        </button>
      </div>
      <div>
        <h3 class="text-[1.5rem]">Watched Movies (count :{{ movieStore.watchedMovies.length }})</h3>
        <Movie
          v-for="movie of movieStore.watchedMovies"
          :key="movie.id"
          :movie="movie"
          :is-search="false"
        />
      </div>
      <div v-if="movieStore.activeTab === 1">
        <h3 class="text-[1.25rem]">All Movies (count:{{ movieStore.totalCountMovies }})</h3>
        <Movie
          v-for="movie of movieStore.movies"
          :key="movie.id"
          :movie="movie"
          :is-search="false"
        />
      </div>
      <div v-else><Search /></div>
    </div>
  </main>
</template>
