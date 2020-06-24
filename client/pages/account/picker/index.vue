<template>
  <div>
    <h1>Pick the following items:</h1>
    <b-card title="Item">
      <b-card-text>Get this item!</b-card-text>
      <b-card-text>A second paragraph of text in the card.</b-card-text>
      <b-link href="#" class="card-link">Already got the item</b-link>
      <b-link href="#" class="card-link">I don't want the item</b-link>
    </b-card>
  </div>
</template>

<script>
export default {
  middleware: "auth"
};
</script>

<style scoped>
</style>