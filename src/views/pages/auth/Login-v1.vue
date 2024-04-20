<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <!-- <vuexy-logo /> -->
          <img
            src="@/assets/images/LOGO FILES/login.png"
            style="width: 70%"
            alt=""
          />
          <!-- <h2 class="brand-text text-primary ml-1">
              Madrasty
            </h2> -->
        </b-link>

        <b-card-title class="mb-1">
          Welcome to EDUPRO-SCHOOL-MANAGEMENT! 👋
        </b-card-title>
        <b-card-text class="mb-2">
          Please sign-in to your account and start the adventure
        </b-card-text>

        <!-- form -->
        <gform @submit="login">
          <!-- email -->
          <gfield
            v-model="userName"
            placeholder=""
            label-text="userName"
            id="login-email"
            name="UserName"
          >
          </gfield>
          <!-- forgot password -->
          <b-form-group>
            <div class="d-flex justify-content-between">
              <label for="login-password"> {{ $t("password") }}</label>
              <b-link :to="{ name: 'forget-password' }">
                <small>{{ $t("foregtPassword") }}</small>
              </b-link>
            </div>
            <gfield
              label="Password"
              v-model="password"
              name="login-password"
              :type="passwordFieldType"
              placeholder="············"
            >
            </gfield>
          </b-form-group>

          <!-- checkbox -->
          <b-form-group>
            <b-form-checkbox
              id="remember-me"
              v-model="status"
              name="checkbox-1"
            >
              {{ $t("rememberMe") }}
            </b-form-checkbox>
          </b-form-group>

          <!-- submit buttons -->
          <b-button type="submit" variant="primary" block>
            {{ $t("signIn") }}
          </b-button>
        </gform>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>
  
  <script>
import { mapActions } from "vuex";
// import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton,
  BFormGroup,
  BCard,
  BLink,
  BCardTitle,
  BCardText,
} from "bootstrap-vue";
// import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from "@/store/index";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    // BSV
    BButton,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    // VuexyLogo,
    BCardText,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      password: "",
      userName: "",
      updatedUserName: "",
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  mounted() {
    this.checkSympole = this.userName.indexOf("\\");
    this.prodctionUrl = document.location.host.indexOf("eduprosys.net");
  },
  methods: {
    ...mapActions({
      loginApi: "auth/login",
    }),
    beforeLoginValidation() {
      this.checkSympole = this.userName.indexOf("\\");
      this.prodctionUrl = document.location.host.indexOf("eduprosys.net");
      if (this.checkSympole !== -1 && this.prodctionUrl !== -1) {
        this.doneAlert({
          title: this.$t("notAllowToAddThisSyempol"),
          type: "error",
        });
        return false;
      }
      return true;
    },
    login() {
      if (!this.beforeLoginValidation()) return;
      this.checkUserName();
      this.loginApi({
        userName: this.updatedUserName,
        password: this.password,
      });
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Form Submitted",
          icon: "EditIcon",
          variant: "error",
        },
      });
    },
    checkUserName() {
      const check = this.userName.indexOf("\\");
      const prodction = document.location.host.indexOf("eduprosys.net");
      const hostName = document.location.host.split(".");
      const companyName = hostName[0];
      if (check === -1 && prodction !== -1) {
        this.updatedUserName = `${companyName}\\${this.userName}`;
      } else if (check !== -1 && prodction !== -1) {
        this.doneAlert({
          title: this.$t("notAllowToAddThisSyempol"),
          type: "error",
        });
      } else {
        this.updatedUserName = this.userName;
      }
    },
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Form Submitted",
              icon: "EditIcon",
              variant: "success",
            },
          });
        }
      });
    },
  },
};
</script>
  
  <style lang="scss">
@import "~@core/scss/vue/pages/page-auth.scss";
</style>
  