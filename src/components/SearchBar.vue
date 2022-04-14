<template>
  <v-container>
    <v-row class="search-box">
      <v-col>
        <v-combobox
          v-model="search.region"
          :items="regionList"
          label="Служба крові"
          @change="changeSearch()"
        ></v-combobox>
        <v-combobox
          v-model="search.rh"
          :items="rhList"
          label="Резус"
          @change="changeSearch()"
        ></v-combobox>
        <v-combobox
          v-model="search.groupNumber"
          :items="groupList"
          label="Група крові"
          @change="changeSearch()"
        ></v-combobox>
        <v-btn-toggle
          color="primary"
        >
        <v-switch
          v-model="search.showOwner"
          label="Мої заявки"
          @change="changeSearch()"
        ></v-switch>
        </v-btn-toggle>
      </v-col>
      <v-col class="button-col">
        <v-btn
          @click="dismiss()"
          outlined
          color="primary"
          small
        >
          Скинути
        </v-btn>
        <v-btn
        class="mt-2"
          @click="doSearch()"
          color="primary"
          small
        >
          Пошук
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import restClient from "../api/restClient";

export default {
  name: 'SearchBar',
  props: {
    type: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      search: {},
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
    };
  },
  methods: {
    changeSearch() {
      this.$emit('change-search', this.search);
    },
    doSearch() {
      this.$emit('do-search');
    },
    setSearch() {
      this.search = {
        showOwner: false,
        region: null,
        rh: null,
        groupNumber: null,
        type: this.type,
      };
    },
    dismiss() {
      this.setSearch();
      this.$emit('reset', { type: this.search.type });
    },
    pullRegions() {
      restClient
        .get('/api/regions', {}, { headers: { authorization: `Bearer ${this.$store.state.token}` } })
        .then(response => this.regionList = response.data);
    },
  },
  mounted() {
    this.setSearch();
    this.pullRegions();
  }
}
</script>

<style scoped>
.button-col {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  padding-right: 20px;
  align-items: center;
}
.search-box {
  box-sizing: border-box;
  border: 1px solid #c2185b;
  border-radius: 10px;
  margin: 20px 40px;
  padding: 0 30px;
}
</style>