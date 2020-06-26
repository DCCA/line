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
    >{{ error.msg }}</b-alert>
    <b-spinner v-if="loadingCards" label="Spinning"></b-spinner>
    <template v-else>
      <table class="my-3 table">
        <tr class="font-weight-bold">
          <td>Item</td>
          <td>Picker Name</td>
          <td>Picker Email</td>
          <td>Pick Up Date</td>
          <td>Created At</td>
          <td>Status</td>
          <td>Actions</td>
        </tr>
        <tr
          v-for="item in items"
          :key="item._id"
          :title="item.name"
          class="align-middle"
          :class="{'bg-secondary': isPicked(item.states)}"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.pickerName }}</td>
          <td>{{ item.pickerEmail}}</td>
          <td>{{ formatDate(item.pickUpDate) }}</td>
          <td>{{ formatDate(item.created_at) }}</td>
          <td>
            {{item.states}}
            <p class="d-none" id="itemId">{{ item._id }}</p>
          </td>
          <td>
            <b-button-group vertical>
              <b-button @click.prevent="deleteItem" variant="danger">Delete</b-button>
              <b-button variant="success" :disabled="isPicked(item.states)">Picked</b-button>
            </b-button-group>
          </td>
        </tr>
      </table>
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
      const card = event.target.parentNode.parentNode.parentNode;
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
      return moment(date).format("MMM, d, H:mm");
    },
    isPicked(status) {
      if (status === "picked") {
        return true;
      }
      return false;
    }
  },
  beforeMount() {
    this.errors = null;
    this.getItems();
  }
};
</script>

<style scoped>
td {
  vertical-align: middle;
}
</style>
