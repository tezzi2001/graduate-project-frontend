<template>
  <v-form>
    <v-container>
      <v-row class="mt-15" no-gutters>
        <v-col class="align-items-center-col">
          <v-avatar color="secondary" size="200">
            <span class="white--text text-h2">{{initials}}</span>
          </v-avatar>
          <div class="input mt-7">
            <v-icon large class="mr-3">mdi-account</v-icon>
            <v-text-field label="Ім'я Прізвище" v-model="user.name" :disabled="!editMode"></v-text-field>
          </div>
          <div class="input">
            <v-icon large class="mr-3">mdi-email</v-icon>
            <v-text-field label="Пошта" v-model="user.email" :disabled="!editMode"></v-text-field>
          </div>
           <div class="input">
            <v-icon large class="mr-3">mdi-phone</v-icon>
            <v-text-field label="Телефон" v-model="user.phone" :disabled="!editMode"></v-text-field>
          </div>
        </v-col>
        <v-col>
          <div class="input">
            <v-icon large class="mr-2 mb-6">mdi-human-male-female</v-icon>
            <v-combobox
              v-model="user.sex"
              :items="sexList"
              label="Стать"
              :disabled="!editMode"
              dense
            ></v-combobox>
          </div>
          <div class="input">
            <v-icon large class="mr-2 mb-6">mdi-map-marker</v-icon>
            <v-combobox
              v-model="user.region"
              :items="regionList"
              label="Служба крові"
              :disabled="!editMode"
              dense
            ></v-combobox>
          </div>
          <div class="input">
            <v-icon large class="mr-2 mb-6">mdi-water</v-icon>
            <v-combobox
              v-model="user.groupNumber"
              :items="groupList"
              label="Група Крові"
              :disabled="!editMode"
              dense
            ></v-combobox>
          </div>
          <div class="input">
            <v-icon large class="mr-2 mb-6">mdi-water-plus</v-icon>
            <v-combobox
              v-model="user.rh"
              :items="rhList"
              label="Резус"
              :disabled="!editMode"
              dense
            ></v-combobox>
          </div>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="user.formatBirthday"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <div class="input">
                <v-icon large class="mr-2 mb-6">mdi-calendar</v-icon>
                <v-text-field
                  v-model="user.formatBirthday"
                  label="Дата народження"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :disabled="!editMode"
                  dense
                ></v-text-field>
              </div>
            </template>
            <v-date-picker
              v-model="user.formatBirthday"
              no-title
              scrollable
              locale="uk-UA"
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Скасувати
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(user.formatBirthday)"
              >
                Вибрати
              </v-btn>
            </v-date-picker>
          </v-menu>
          <div class="input">
            <v-icon large class="mr-2 mb-6">mdi-doctor</v-icon>
            <v-textarea
                name="diseases"
                label="Перенесені хвороби"
                v-model="user.diseases"
                :disabled="!editMode"
                dense
              ></v-textarea>
          </div>
        </v-col>
      </v-row>
      <v-row class="align-items-center-row mt-15">
        <v-btn v-if="!editMode" @click="editModeOn" color="primary">Редагувати</v-btn>
        <v-btn v-if="editMode" @click="dismiss" class="mr-5" outlined color="primary">Скасувати</v-btn>
        <v-btn v-if="editMode" @click="submit" color="primary">Обновити</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import restClient from "../api/restClient";

export default {
  name: 'Profile',
  data() {
    return {
      user: {
        id: this.$store.state.id,
        name: 'Bohdan ondarenko',
        email: 'bohdan@bondarenko.com',
        phone: '+380966530372',
        sex: 'Male',
        region: 'Буча',
        rh: '-',
        groupNumber: 1,
        birthDay: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        diseases: '',
        formatBirthday: '',
      },
      sexList: [
        'Чоловік',
        'Жінка',
      ],
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
      editMode: false,
      menu: false,
    };
  },
  computed: {
    initials() {
      return this.user.name
        .split(' ')
        .map(name => name.substring(0, 1).toUpperCase())
        .reduce((a, b) => a + b);
    },
  },
  methods: {
    editModeOn() {
      this.editMode = true;
    },
    dismiss() {
      this.pullData();
      this.editMode = false;
    },
    submit() {
      this.pushData();
      this.editMode = false;
    },
    pullData() {
      restClient
        .get(`/api/user/${this.$store.state.id}`, {}, { headers: { authorization: `Bearer ${this.$store.state.token}` } })
        .then(response => {
          this.user = response.data;
          this.user.formatBirthday = new Date(this.user.birthDay).toISOString().substr(0, 10);
        });
    },
    pushData() {
      this.user.birthDay = new Date(this.user.formatBirthday).getTime();
      restClient.post(`/api/user`, JSON.parse(JSON.stringify(this.user)), { headers: { authorization: `Bearer ${this.$store.state.token}` } });
    },
    pullRegions() {
      restClient
        .get('/api/regions', {}, { headers: { authorization: `Bearer ${this.$store.state.token}` } })
        .then(response => this.regionList = response.data);
    },
  },
  mounted() {
    this.pullData();
    this.pullRegions();
  },
}
</script>

<style>
.input {
  display: flex;
  height: 55px;
  width: 400px;
}
.align-items-center-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.align-items-center-row {
  display: flex;
  justify-content: center;
}
</style>