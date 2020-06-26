<template>
  <div>
    <h1>Picker Area</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Search</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-alert
      v-model="show"
      v-for="error in errors"
      variant="danger"
      class="mt-3"
      :key="error"
    >{{ error.msg }}</b-alert>
    <b-spinner v-if="loading" label="Spinning"></b-spinner>
    <table class="my-3 table">
      <tr class="font-weight-bold">
        <td>Item:</td>
        <td>Picker Email:</td>
        <td>Pick Up Date:</td>
        <td>Created At:</td>
        <td>Status:</td>
      </tr>
      <tr v-for="item in pickerItemsList" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.pickerEmail }}</td>
        <td>{{ formatDate(item.pickUpDate) }}</td>
        <td>{{ formatDate(item.created_at) }}</td>
        <td>{{ item.states }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      form: {
        email: ""
      },
      show: true,
      errors: null,
      loading: false,
      pickerItemsList: null
    };
  },
  computed: mapState(["pickerItems"]),
  methods: {
    async onSubmit(evt) {
      this.errors = null;
      this.loading = true;
      evt.preventDefault();
      const pickerEmail = this.form.email;
      try {
        await this.$store.dispatch("getPickerItems", pickerEmail);
        this.pickerItemsList = this.pickerItems;
      } catch (error) {
        this.pickerItemsList = null;
        if (error.errors) {
          this.errors = error.errors;
        } else {
          this.errors = [{ msg: error }];
        }
      }
      this.loading = false;
    },
    onReset(evt) {
      this.errors = null;
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    formatDate(date) {
      return moment(date).format("MMM, d, H:mm");
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
}
</style>
