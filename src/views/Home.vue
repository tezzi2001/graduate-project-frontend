<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <h1 class="align-center">
          <CreateAppModal @app-created="loadRecipientApplications()" :type-index="0"/>
          Заявки реципієнтів:
        </h1>
        <search-bar @do-search="loadRecipientApplications()" @change-search="changeSearch" @reset="resetSearch" type="recipient"></search-bar>
        <Card v-for="recipientApp in recipientApps" :key="recipientApp.id" :data="recipientApp" :date-delim="'на'"/>
        <p class="align-center" v-if="recipientApps.length === 0">Заявки реципієнтів не занайдені.</p>
      </v-col>
      <v-col>
        <h1 class="align-center">
          <CreateAppModal @app-created="loadDonorApplications()" :type-index="1"/>
          Заявки донорів:
        </h1>
        <search-bar @do-search="loadDonorApplications()" @change-search="changeSearch" @reset="resetSearch" type="donor"></search-bar>
        <Card v-for="donorApp in donorApps" :key="donorApp.id" :data="donorApp" :date-delim="'до'" />
        <p class="align-center" v-if="donorApps.length === 0">Заявки донорів не занайдені.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import restClient from "../api/restClient";
import Card from "@/components/Card";
import CreateAppModal from "@/components/CreateAppModal";
import SearchBar from '@/components/SearchBar.vue';

export default {
  name: "Home",
  components: { CreateAppModal, Card, SearchBar },
  data() {
    return {
      recipientApps: [],
      donorApps: [],
      show: false,
      addAppPaths: [
        'addRecipientApplication',
        'addDonorApplication',
      ],
      search: {
        recipient: {
          userId: 0,
          rh: '',
          groupNumber: 0,
          region: '',
        },
        donor: {
          userId: 0,
          rh: '',
          groupNumber: 0,
          region: '',
        },
      },
    };
  },
  mounted() {
    this.loadDonorApplications();
    this.loadRecipientApplications();
  },
  methods: {
    loadDonorApplications() {
      const searchParams = new URLSearchParams(this.search.donor);
      restClient
        .get('/api/findDonorApplications?' + searchParams.toString(), { headers: { authorization: `Bearer ${this.$store.state.token}` } })
        .then(response => this.donorApps = response.data);
    },
    loadRecipientApplications() {
      const searchParams = new URLSearchParams(this.search.recipient);
      restClient
        .get('/api/findRecipientApplications?' + searchParams.toString(), { headers: { authorization: `Bearer ${this.$store.state.token}` } })
        .then(response => this.recipientApps = response.data);
    },
    changeSearch(event) {
      console.log(event);
      if (event.userId) {
        this.search[event.type].userId = event.userId;
      }
      if (event.rh) {
        this.search[event.type].rh = event.rh;
      }
      if (event.groupNumber) {
        this.search[event.type].groupNumber = event.groupNumber;
      }
      if (event.region) {
        this.search[event.type].region = event.region;
      }
      this.search[event.type].userId = event.showOwner ? this.$store.state.id : 0;
    },
    resetSearch(event) {
      this.search[event.type] = {
        userId: 0,
        rh: '',
        groupNumber: 0,
        region: '',
      };
      this[`load${this.capitalize(event.type)}Applications`]();
    },
    capitalize(s) {
      return s[0].toUpperCase() + s.slice(1);
    },
  },
};
</script>

<style scoped>
  .align-center {
    text-align: center;
  }
</style>
