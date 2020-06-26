<template>
  <div>
    <h1>Picker Area</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
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
      >{{ error.msg }}</b-alert
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      form: {
        email: ""
      },
      show: true
    };
  },
  methods: {
    async onSubmit(evt) {
      this.errors = null;
      evt.preventDefault();
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
    }
  }
};
</script>
