<template>
  <div>
    <h1>Log-in</h1>
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

      <b-form-group id="input-group-3" label="Your password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          required
          placeholder="Enter your password"
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Log-in</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true,
      errors: null
    };
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      token: state => state.token
    })
  },
  methods: {
    async onSubmit(evt) {
      this.errors = null;
      evt.preventDefault();
      try {
        const response = await this.$store.dispatch("logIn", this.form);
      } catch (error) {
        if (error.errors) {
          this.errors = error.errors;
        } else {
          this.errors = [error];
        }
      }
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