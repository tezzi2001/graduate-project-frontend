<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <h1 class="align-center">
          <CreateAppModal @app-created="loadRecipientApplications()" :type-index="0"/>
          Recipient Applications:
        </h1>
        <Card v-for="recipientApp in recipientApps" :key="recipientApp.id" :data="recipientApp" :date-delim="'on'"/>
        <p class="align-center" v-if="recipientApps.length === 0">There is no recipient applications</p>
      </v-col>
      <v-col>
        <h1 class="align-center">
          <CreateAppModal @app-created="loadDonorApplications()" :type-index="1"/>
          Donor Applications:
        </h1>
        <Card v-for="donorApp in donorApps" :key="donorApp.id" :data="donorApp" :date-delim="'to'" />
        <p class="align-center" v-if="donorApps.length === 0">There is no donor applications</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import restClient from "../api/restClient";
import Card from "@/components/Card";
import CreateAppModal from "@/components/CreateAppModal";

export default {
  name: "Home",
  components: { CreateAppModal, Card },
  data() {
    return {
      recipientApps: [],
      donorApps: [],
      show: false,
      addAppPaths: [
        'addRecipientApplication',
        'addDonorApplication',
      ],
    }
  },
  mounted() {
    this.loadDonorApplications();
    this.loadRecipientApplications();
  },
  methods: {
    loadDonorApplications() {
      restClient
        .get('/api/findDonorApplications', { headers: { authorization: `Bearer ${this.$store.state.token}` } })
        .then(response => this.donorApps = response.data);
    },
    loadRecipientApplications() {
      restClient
        .get('/api/findRecipientApplications', { headers: { authorization: `Bearer ${this.$store.state.token}` } })
        .then(response => this.recipientApps = response.data);
    },
  },
};
</script>

<style scoped>
  .align-center {
    text-align: center;
  }
</style>
