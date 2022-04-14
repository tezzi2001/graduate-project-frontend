<template>
  <div class="container">
    <v-form ref="form" @submit.prevent="onSubmit">
      <h2>Зареєструватися</h2>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="phone"
        :rules="phoneRules"
        label="Телефон"
        required
      ></v-text-field>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="І'мя Прізвище"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        type="password"
        label="Пароль"
        required
      ></v-text-field>
      <v-combobox
        v-model="region"
        :rules="regionRules"
        :items="regionList"
        label="Служба крові"
      ></v-combobox>
      <v-combobox
        v-model="rh"
        :rules="rhRules"
        :items="rhList"
        label="Резус"
      ></v-combobox>
      <v-combobox
        v-model="groupNumber"
        :rules="groupNumberRules"
        :items="groupList"
        label="Група крові"
      ></v-combobox>
      <v-btn type="submit" color="primary" dark>
        Зареєструватися
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import restClient from "../api/restClient";

export default {
  name: "SignUp",
  data() {
    return {
      emailRules: [
        v => !!v || 'E-mail необхідний',
        v => /^\S+@\S+\.\S+$/.test(v) || 'E-mail має бути дійсним',
      ],
      passwordRules: [
        v => !!v || 'Пароль необхідний',
      ],
      nameRules: [
        v => !!v || 'Імя та Прізвище необхідні',
      ],
      regionRules: [
        v => !!v || 'Служба крові необхідна',
      ],
      rhRules: [
        v => !!v || 'Резус необхідний!',
        v => v === '+' || v === '-' || 'Резус має бути - або +',
      ],
      groupNumberRules: [
        v => !!v || 'Група крові необхідна!',
        v => (1 <= v && v <= 4) || 'Група крові має бути в діапазоні 1...4!',
      ],
      phoneRules: [
        v => !!v || 'Телефон необхідний!',
        v => /^\+380\d{9}$/.test(v) || 'Телефон має бути дійсним. Формат: +380XXXXXXXXX',
      ],
      email: '',
      password: '',
      name: '',
      region: '',
      phone: '',
      rh: '',
      groupNumber: '',
      regionList: [],
      rhList: [
        '+',
        '-',
      ],
      groupList: [
        1,
        2,
        3,
        4,
      ],
    }
  },
  methods: {
    onSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      restClient.post('/auth/register',
      {
        email: this.email,
        password: this.password,
        name: this.name,
        region: this.region,
        phone: this.phone,
        rh: this.rh,
        groupNumber: this.groupNumber,
      })
      .then(() => {
        this.$router.push('SignIn');
      })
      .catch(error => console.log(error));
    },
    pullRegions() {
      restClient
        .get('/api/regions', {}, { headers: { authorization: `Bearer ${this.$store.state.token}` } })
        .then(response => this.regionList = response.data);
    },
  },
  mounted() {
    this.pullRegions();
  },
};
</script>

<style scoped>
  .container {
    margin: 0 auto;
    max-width: 50%;
  }
</style>