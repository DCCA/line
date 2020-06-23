<template>
  <div class="wrapper">
    <app-header></app-header>
    <Nuxt class="content container" />
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default Vue.extend({
  components: {
    appHeader: Header,
    appFooter: Footer
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=MuseoModerno&display=swap");

html,
body {
  font-family: "MuseoModerno", cursive;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.content {
  margin: 2rem auto;
}

.wrapper {
  min-height: 100vh;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
