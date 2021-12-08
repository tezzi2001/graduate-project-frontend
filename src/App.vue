<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-icon
        color="secondary"
        large
      >
        mdi-heart-multiple
      </v-icon>
      <h2 class="ml-4">Blood Donation App</h2>

      <v-spacer></v-spacer>

      <v-btn
        @click="onClick"
        :to="{ name: this.routeName }"
        text
      >
        <span class="mr-2">{{ this.routeLabel }}</span>
        <v-icon>{{ this.routeIcon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import restClient from "./api/restClient";

export default {
  name: "App",

  computed: {
    routeName() {
      if (this.$store.state.token) {
        return 'SignIn';
      }
      return this.$route.name === 'SignIn' ? 'SignUp' : 'SignIn';
    },
    routeLabel() {
      if (this.$store.state.token) {
        return 'Sign Out';
      }
      return this.$route.name === 'SignIn' ? 'Sign Up' : 'Sign In';
    },
    routeIcon() {
      return this.$store.state.token ? 'mdi-logout' : 'mdi-login';
    },
  },
  methods: {
    onClick() {
      if (this.$store.state.token) {
        restClient
          .post('/auth/logout', {}, { headers: { authorization: `Bearer ${this.$store.state.token}` } })
          .then(() => this.$store.commit('deleteToken'));
      }
    },
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$router.push('Home');
    } else {
      this.$router.push('SignIn');
    }
  },
};
</script>
