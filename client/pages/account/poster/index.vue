<template>
  <div>
    <h1>Welcome Poster!</h1>
    <p>Here you can:</p>
    <ul>
      <li>
        <nuxt-link to="/account/poster/create-post">Post a new item</nuxt-link>
      </li>
    </ul>
    <h2>Posted Items</h2>
    <b-card v-for="item in items" :key="item._id" :title="item.name" class="my-3">
      <b-card-text>
        <p>
          <span class="font-weight-bold">Picker Name:</span>
          {{item.pickerName}}
        </p>
      </b-card-text>
      <b-card-text>
        <p>
          <span class="font-weight-bold">Picker E-mail:</span>
          {{item.pickerEmail}}
        </p>
      </b-card-text>
      <b-card-text>
        <p>
          <span class="font-weight-bold">Pick Up Date:</span>
          {{item.pickUpDate}}
        </p>
      </b-card-text>
      <b-card-text>
        <p>
          <span class="font-weight-bold">Status:</span>
          {{item.states}}
        </p>
      </b-card-text>
      <b-link href="#" class="card-link">DELETE</b-link>
    </b-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      items: state => state.items
    })
  },
  middleware: "auth",
  methods: {
    async getItems() {
      this.$store.dispatch("getItems");
    }
  },
  beforeMount() {
    this.getItems();
  }
};
</script>

<style scoped></style>
