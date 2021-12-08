import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.pink.darken2,
        secondary: colors.pink.lighten2,
        accent: colors.pink.accent3,
        error: colors.red.accent4,
        info: colors.lightBlue.accent4,
        success: colors.green,
        warning: colors.orange,
      },
    },
  },
});

export default vuetify;
