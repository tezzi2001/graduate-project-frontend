<template>
  <div class="container">
    <v-form ref="form" @submit.prevent="onSubmit">
      <h2>Увійти</h2>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        type="password"
        label="Пароль"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary" dark>
        Увійти
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import restClient from "../api/restClient";

export default {
  name: "SignIn",
  data() {
    return {
      emailRules: [
        v => !!v || 'E-mail необхідний',
        v => /^\S+@\S+\.\S+$/.test(v) || 'E-mail має бути дійсним',
      ],
      passwordRules: [
        v => !!v || 'Пароль необхідний',
      ],
      email: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      restClient.post('/auth/login',
        {
          email: this.email,
          password: this.password,
        })
        .then(response => {
          this.$store.commit('setToken', response.data.token);
          const id = response.data.id;
          this.$store.commit('setId', id);
          this.$router.push('Home');
        });
    },
  },
};
</script>

<style scoped>
  .container {
    margin: 0 auto;
    max-width: 50%;
  }
</style>