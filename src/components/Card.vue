<template>
  <v-card class="card">
    <v-card-title elevation="10">
      {{ data.name }} - {{ data.region }} {{ dateDelim }} {{ formatDate }}
    </v-card-title>
    <v-card-subtitle>
      Blood Group: {{ data.bloodGroup }}{{ data.rh }}
    </v-card-subtitle>
    <v-card-actions>
      <p class="spacing-left">Show details</p>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          <p>{{ data.age }} y.o., {{ data.sex }}</p>
          <p>email: {{ data.email }}, phone: {{ data.phone }}</p>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    dateDelim: {
      required: true,
      type: String,
    },
    data: {
      required: true,
      type: Object,
      default: function () {
        return {
          id: 0,
          name: '',
          region: '',
          bloodGroup: 0,
          rh: '',
          age: 0,
          sex: '',
          email: '',
          phone: '',
          dateTime: '',
        }
      },
    },
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    formatDate() {
      return new Date(this.data.dateTime).toLocaleDateString("en-US");
    },
  }
};
</script>

<style scoped>
  .card {
    margin: 20px 40px;
  }
  .spacing-left {
    margin-left: 10px;
  }
</style>