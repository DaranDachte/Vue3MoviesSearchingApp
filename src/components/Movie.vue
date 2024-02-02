<template>
  <div class="movie">
    <img
      :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
      :alt="movie.original_title"
      class="movie-img"
    />
    <div>
      <div class="movie-name">{{ movie.original_title }} ({{ movie.release_date }})</div>
      <span class="movie-overview">{{ movie.overview }}</span>
      <teleport to="#modal-container">
        <div
          v-if="showModal"
          class="flex flex-col items-center justify-center mt-[18rem] rounded fixed top-0 w-1/5 start-3/4 h-[15rem] z-10 bg-fuchsia-600/50"
        >
          <p>Popularity: {{ movie.popularity }}</p>
          <p>Vote Average: {{ movie.vote_average }}</p>
          <p>Vote count : {{ movie.vote_count }}</p>
          <p>Original language: {{ movie.original_language }}</p>
          <p class="text-center">Original Title: {{ movie.original_title }}</p>
          <button class="mt-[1rem]" @click="showModal = false">Close Modal</button>
        </div>
      </teleport>
      <div class="movie-buttons" v-if="!isSearch">
        <button
          class="bg-[#1eb4c3] hover:bg-fuchsia-600 w-[7rem] font-medium rounded mr-[1rem]"
          @click="movieStore.toggleWatched(movie.id)"
        >
          <span v-if="!movie.isWatched">Watched</span>
          <span v-else>Unwatched</span>
        </button>
        <button
          class="bg-[#ff2a2a] rounded w-[7rem] font-medium"
          @click="movieStore.deleteMovie(movie.id)"
        >
          Delete
        </button>
      </div>
      <div class="movie-buttons" v-else>
        <button
          class="bg-[#1eb4c3] w-[5rem] mr-[0.5rem] rounded hover:bg-fuchsia-600"
          @click="searchStore.addToUserMovies(movie)"
        >
          Add
        </button>
        <button
          class="bg-[#1eb4c3] w-[5rem] ml-[0.5rem] rounded hover:bg-fuchsia-600"
          @click="showModal = true"
        >
          Details
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.movie {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 30px;
  margin-bottom: 20px;
  border: 2px solid #efefef;
  padding: 10px;
  border-radius: 10px;
  background: #ccc;
}

.movie-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.movie-name {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px;
}

.movie-overview {
  display: block;
  margin-bottom: 20px;
  cursor: pointer;
}

.movie-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import { useSearchStore } from '@/stores/SearchStore';
import type { Movie } from '../stores/MovieStore';
const movieStore = useMovieStore();
const searchStore = useSearchStore();
const showModal = ref(false);

type MovieComponentProps = {
  movie: Movie;
  isSearch: boolean;
};
defineProps<MovieComponentProps>();
</script>
