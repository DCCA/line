<template>
  <div>
    <h1>Create an Account</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-2" label="Your name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

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

      <b-form-group
        id="input-group-3"
        label="Your password:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.password"
          required
          placeholder="Enter your password"
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: ""
      },
      show: true,
      errors: null
    };
  },
  methods: {
    async onSubmit(evt) {
      this.errors = null;
      evt.preventDefault();
      const payload = this.form;
      try {
        const response = await this.$store.dispatch("signUp", payload);
        console.log(response);
        this.$router.push({ path: "log-in" });
      } catch (error) {
        if (error.errors) {
          this.errors = error.errors;
        } else {
          this.errors = [error];
        }
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
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
