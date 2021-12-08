<template>
  <v-dialog
    v-model="show"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        elevation="2"
        icon
        outlined
        color="secondary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Create {{ types[this.typeIndex].name }} Application
      </v-card-title>

      <v-form @submit.prevent="onSubmit">
        <v-card-text class="spacing-vertical">
          <h3 class="align-center spacing-bottom">{{ types[typeIndex].dateFieldName }}</h3>
          <v-row justify="center">
            <v-date-picker v-model="picker"></v-date-picker>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            type="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import restClient from "../api/restClient";

export default {
  name: "CreateAppModal",
  props: {
    typeIndex: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      show: false,
      types: [
        {
          name: 'Recipient',
          path: '/api/addRecipientApplication',
          dateFieldName: 'On Date:',
        },
        {
          name: 'Donor',
          path: '/api/addDonorApplication',
          dateFieldName: 'Expires At:',
        },
      ],
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }
  },
  methods: {
    onSubmit() {
      restClient
        .post(this.types[this.typeIndex].path, { id: this.$store.state.id, dateTime: new Date(this.picker).getTime() }, { headers: { authorization: `Bearer ${this.$store.state.token}` } })
        .then(() => {
          this.show = false;
          this.$emit('app-created');
        });
    },
  },
};
</script>

<style scoped>
  .spacing-vertical {
    margin: 50px 0;
  }
  .spacing-bottom {
    margin: 10px 0;
  }
  .align-center {
    text-align: center;
  }
</style>