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
            <b-dropdown-item to="/auth/log-in">Log-in</b-dropdown-item>
            <b-dropdown-item @click="logOut">Log-out</b-dropdown-item>
            <b-dropdown-item to="/auth/sign-up">Sign-up</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$store.commit("resetAuth");
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped></style>
