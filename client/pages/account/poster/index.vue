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
    <b-spinner v-if="loadingCards" label="Spinning"></b-spinner>
    <b-alert
      v-model="show"
      v-for="error in errors"
      variant="danger"
      class="mt-3"
      :key="error"
      >{{ error.msg }}</b-alert
    >
    <b-card
      v-for="item in items"
      :key="item._id"
      :title="item.name"
      class="my-3"
    >
      <b-card-text>
        <p>
          <span class="font-weight-bold">Picker Name:</span>
          {{ item.pickerName }}
        </p>
      </b-card-text>
      <b-card-text>
        <p>
          <span class="font-weight-bold">Picker E-mail:</span>
          {{ item.pickerEmail }}
        </p>
      </b-card-text>
      <b-card-text>
        <p>
          <span class="font-weight-bold">Pick Up Date:</span>
          {{ item.pickUpDate }}
        </p>
      </b-card-text>
      <b-card-text>
        <p>
          <span class="font-weight-bold">Status:</span>
          {{ item.states }}
        </p>
      </b-card-text>
      <b-link class="card-link" @click.prevent="deleteItem(item._id)"
        >DELETE</b-link
      >
    </b-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      cardErrors: null,
      loadingCards: false,
      errors: null,
      show: true
    };
  },
  computed: {
    ...mapState({
      items: state => state.items
    })
  },
  middleware: "auth",
  methods: {
    async getItems() {
      this.loadingCards = true;
      await this.$store.dispatch("getItems");
      this.loadingCards = false;
    },
    async deleteItem(itemId) {
      this.errors = null;
      try {
        await this.$store.dispatch("deleteItem", itemId);
      } catch (error) {
        if (error.errors) {
          this.errors = error.errors;
        } else {
          this.errors = [{ msg: error }];
        }
      }
    }
  },
  beforeMount() {
    this.errors = null;
    this.getItems();
  }
};
</script>

<style scoped></style>
