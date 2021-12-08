<template>
  <div class="container">
    <v-form ref="form" @submit.prevent="onSubmit">
      <h2>Sign Up</h2>
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
        label="Password"
        required
      ></v-text-field>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="region"
        :rules="regionRules"
        label="Region"
        required
      ></v-text-field>
      <v-text-field
        v-model="sex"
        :rules="sexRules"
        label="Sex"
        required
      ></v-text-field>
      <v-text-field
        v-model="phone"
        :rules="phoneRules"
        label="Phone"
        required
      ></v-text-field>
      <v-text-field
        v-model="age"
        :rules="ageRules"
        label="Age"
        required
      ></v-text-field>
      <v-text-field
        v-model="rh"
        :rules="rhRules"
        label="RH"
        required
      ></v-text-field>
      <v-text-field
        v-model="groupNumber"
        :rules="groupNumberRules"
        label="Blood Group Number"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary" dark>
        Sign Up
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
        v => !!v || 'E-mail is required',
        v => /^\S+@\S+\.\S+$/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      nameRules: [
        v => !!v || 'Name is required',
      ],
      regionRules: [
        v => !!v || 'Region is required',
      ],
      rhRules: [
        v => !!v || 'RH is required!',
        v => v === '+' || v === '-' || 'RH should be - or +',
      ],
      groupNumberRules: [
        v => !!v || 'Blood Group Number is required!',
        v => (1 <= v && v <= 4) || 'Blood Group Number should be in range 1...4!',
      ],
      sexRules: [
        v => !!v || 'Sex is required!',
        v => v === 'Male' || v === 'Female' || 'Sex must be a Male or a Female!',
      ],
      ageRules: [
        v => !!v || 'Age is required!',
        v => !isNaN(v) || 'Age must be a number!',
      ],
      phoneRules: [
        v => !!v || 'Phone is required!',
        v => /^\+380\d{9}$/.test(v) || 'Phone must be valid. Format: +380XXXXXXXXX',
      ],
      email: '',
      password: '',
      name: '',
      region: '',
      sex: '',
      phone: '',
      age: '',
      rh: '',
      groupNumber: '',
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
        sex: this.sex,
        phone: this.phone,
        age: this.age,
        rh: this.rh,
        groupNumber: this.groupNumber,
      })
      .then(() => {
        this.$router.push('SignIn');
      })
      .catch(error => console.log(error));
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