<template>
  <div>
    <h1>Welcome Poster!</h1>
    <p>Here you can:</p>
    <ul>
      <li>
        <nuxt-link to="/account/poster/create-post">Post a new item</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/poster/edit-items"
          >Edit a existing item</nuxt-link
        >
      </li>
    </ul>
    <h2>Calendar</h2>
    <vue-cal
      :time-from="9 * 60"
      :time-to="18 * 60"
      :time-step="30"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="events"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default Vue.extend({
  data() {
    return {
      events: [
        {
          start: "2020-06-23 10:30",
          end: "2020-06-23 11:30",
          // You can also define event dates with Javascript Date objects:
          // start: new Date(2018, 11 - 1, 16, 10, 30),
          // end: new Date(2018, 11 - 1, 16, 11, 30),
          title: "Doctor appointment",
          content: '<i class="v-icon material-icons">local_hospital</i>',
          class: "health"
        }
      ]
    };
  },
  components: {
    VueCal
  }
});
</script>

<style scoped></style>
