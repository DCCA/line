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
    <b-alert
      v-model="show"
      v-for="error in errors"
      variant="danger"
      class="mt-3"
      :key="error"
      >{{ error.msg }}</b-alert
    >
    <b-spinner v-if="loadingCards" label="Spinning"></b-spinner>
    <template v-else>
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
            {{ formatDate(item.pickUpDate) }}
          </p>
        </b-card-text>
        <b-card-text>
          <p>
            <span class="font-weight-bold">Created at:</span>
            {{ formatDate(item.created_at) }}
          </p>
        </b-card-text>
        <b-card-text>
          <p>
            <span class="font-weight-bold">Status:</span>
            {{ item.states }}
          </p>
        </b-card-text>
        <p class="d-none" id="itemId">{{ item._id }}</p>
        <b-link class="card-link" @click.prevent="deleteItem">DELETE</b-link>
      </b-card>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

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
      try {
        const response = await this.$store.dispatch("getItems");
      } catch (error) {
        if (error.errors) {
          this.errors = error.errors;
        } else {
          this.errors = [{ msg: error }];
        }
      }
      this.loadingCards = false;
    },
    async deleteItem(event) {
      this.errors = null;
      const card = event.target.parentNode.parentNode;
      const itemId = document.querySelector("#itemId").innerHTML;
      try {
        await this.$store.dispatch("deleteItem", itemId);
        card.remove();
      } catch (error) {
        if (error.errors) {
          this.errors = error.errors;
        } else {
          this.errors = [{ msg: error }];
        }
      }
    },
    formatDate(date) {
      return moment(date).format("LLLL");
    }
  },
  beforeMount() {
    this.errors = null;
    this.getItems();
  }
};
</script>

<style scoped></style>
