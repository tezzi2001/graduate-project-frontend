<template>
  <v-card class="card">
    <v-card-title elevation="10">
      {{ data.name }} - {{ data.region }} {{ dateDelim }} {{ formatDate }}
    </v-card-title>
    <v-card-subtitle>
      Група крові: {{ data.bloodGroup }}{{ data.rh }}
    </v-card-subtitle>
    <v-card-actions>
      <p class="spacing-left">Показати деталі</p>
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
          <p>{{ data.age }}{{ ageWord }}{{ data.sex }}{{ trailingComa }}</p>
          <p>e-mail: {{ data.email }}, телефон: {{ data.phone }}</p>
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
    ageWord() {
      switch (this.data.age) {
        case '':
        case null:
          return '';
        case 1:
          return ' рік, ';
        case 2:
        case 3:
        case 4:
          return ' роки, ';
        default:
          return ' років, ';
      }
    },
    trailingComa() {
      return this.data.sex ? ',' : '';
    },
  },
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