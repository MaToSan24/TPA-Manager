<script setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';

const router = useRouter();

</script>

<template>
  <div class="flex flex-column align-items-center justify-content-center" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    <h1 id="title">404</h1>
    <p id="subtitle" class="mb-5">Oops! Page not found.</p>
    <div class="flex gap-3">
      <RouterLink to="/"><Button icon="pi pi-home" label="Home" severity="secondary" /></RouterLink>
      <Button icon="pi pi-undo" label="Back" severity="secondary" @click="router.go(-1)" />
    </div>
  </div>
</template>

<style scoped>
#title {
  margin-bottom: 1rem;
  font-size: clamp(2rem, 6vw, 10rem) !important;
}

#subtitle {
  font-size: clamp(1.25rem, 2vw, 5rem) !important;
  color: #666;
  margin-bottom: 2rem;
}
</style>