<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">LINE</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/account/poster">Poster Area</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/account/picker">Picker Area</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>Users</template>
            <b-dropdown-item to="/pick-up">Pick-up</b-dropdown-item>
            <b-dropdown-item to="/post">Post</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped></style>
