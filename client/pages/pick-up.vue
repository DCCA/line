<template>
  <div>
    <h1>Pick Something</h1>
    <p>Choose a product and schedule a pick-up</p>

    <h2>Do you have an account?</h2>
    <div>
      <b-button variant="outline-primary" to="/auth/log-in">Log-in</b-button>
      <b-button variant="outline-primary" to="/auth/sign-in"
        >Create Account</b-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped></style>
