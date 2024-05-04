import { createVuetify } from "vuetify";

// Translations provided by Vuetify
import { en, ar } from "vuetify/locale";

const vuetify = createVuetify({
  locale: {
    locale: "ar",
    fallback: "en",
    messages: { ar, en },
  },
});

export default vuetify;
