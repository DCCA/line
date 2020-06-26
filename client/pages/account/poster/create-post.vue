<template>
  <div>
    <h1>Post a new item</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="item-name" label="Item name:" label-for="item-name">
        <b-form-input
          id="item-name"
          v-model="form.itemName"
          required
          placeholder="Enter the item name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="picker-name"
        label="Picker name:"
        label-for="picker-name"
      >
        <b-form-input
          id="picker-name"
          v-model="form.pickerName"
          type="text"
          required
          placeholder="Enter the picker name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="picker-email"
        label="Picker email:"
        label-for="picker-email"
      >
        <b-form-input
          id="picker-email"
          v-model="form.pickerEmail"
          type="email"
          required
          placeholder="Enter the picker email"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="datepicker">Choose a date for the pick-up</label>
        <b-form-datepicker
          id="datepicker"
          v-model="form.date"
          class="mb-2"
        ></b-form-datepicker>
      </b-form-group>

      <b-form-group label="Choose a time for the pick-up">
        <b-time v-model="form.time" locale="en"></b-time>
      </b-form-group>

      <b-button type="submit" variant="primary">Post</b-button>
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
    <b-alert v-model="show" v-if="success" variant="success" class="mt-3">{{
      this.success
    }}</b-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        itemName: "",
        pickerName: "",
        pickerEmail: "",
        date: "",
        time: ""
      },
      show: true,
      errors: null,
      success: null
    };
  },
  methods: {
    async onSubmit(evt) {
      this.errors = null;
      this.success = null;
      evt.preventDefault();
      // Dispatch action
      try {
        // Get form values
        const itemName = this.form.itemName;
        const pickerName = this.form.pickerName;
        const pickerEmail = this.form.pickerEmail;
        // new Date(ano, mês, dia, hora, minuto, segundo, milissegundo);
        // Converter data em ISO Format
        const arrDate = this.form.date.split("-");
        const arrTime = this.form.time.split(":");
        const pickUpDate = new Date(
          arrDate[0],
          arrDate[1],
          arrDate[2],
          arrTime[0],
          arrTime[1]
        ).toISOString();

        const payload = {
          itemName,
          pickerName,
          pickerEmail,
          pickUpDate
        };
        const response = await this.$store.dispatch("createItem", payload);
        this.success = `Item #${response} created!`;
        this.form = {
          itemName: "",
          pickerName: "",
          pickerEmail: "",
          date: "",
          time: ""
        };
      } catch (error) {
        if (error.errors) {
          this.errors = error.errors;
        } else {
          this.errors = [{ msg: error }];
        }
      }
    },
    onReset(evt) {
      this.errors = null;
      this.success = null;
      evt.preventDefault();
      // Reset our form values
      this.form.itemName = "";
      this.form.pickerName = "";
      this.form.pickerEmail = "";
      this.form.date = "";
      this.form.time = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
