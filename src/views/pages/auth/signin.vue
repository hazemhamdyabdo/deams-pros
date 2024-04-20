<template>
  <div class="account-page">
    <!-- Main Wrapper -->
    <div class="main-wrapper">
      <div class="account-content">
        <div class="login-wrapper">
          <div class="login-content">
            <div class="login-userset">
              <div class="login-logo logo-normal">
                <img src="../../../assets/img/logo.png" alt="img" />
              </div>
              <router-link to="/index" class="login-logo logo-white">
                <img src="../../../assets/img/logo-white.png" alt="" />
              </router-link>
              <div class="login-userheading">
                <h3>Sign In</h3>
                <h4>Please login to your account</h4>
              </div>
              <Form
                class="login"
                :validation-schema="schema"
                v-slot="{ errors }"
              >
                <!-- @submit="onSubmit" -->

                <div class="form-login">
                  <label>Email</label>
                  <div class="form-addons">
                    <Field
                      name="email"
                      type="text"
                      value="admin@dreamguystech.com"
                      class="form-control"
                      :class="{ 'is-invalid': errors.email }"
                    />

                    <div class="invalid-feedback">{{ errors.email }}</div>
                    <div class="emailshow text-danger" id="email"></div>
                    <img src="../../../assets/img/icons/mail.svg" alt="img" />
                  </div>
                </div>
                <div class="form-login">
                  <label>Password</label>
                  <div class="pass-group">
                    <Field
                      v-if="showPassword"
                      name="password"
                      type="text"
                      value="123456"
                      class="form-control pass-input"
                      :class="{ 'is-invalid': errors.password }"
                    />
                    <Field
                      v-else
                      name="password"
                      type="password"
                      value="123456"
                      class="form-control pass-input"
                      :class="{ 'is-invalid': errors.password }"
                    />
                    <span
                      @click="toggleShow"
                      class="fas toggle-password"
                      :class="{
                        'fa-eye': showPassword,
                        'fa-eye-slash': !showPassword,
                      }"
                    ></span>
                    <div class="invalid-feedback">
                      {{ errors.password }}
                    </div>
                    <div class="emailshow text-danger" id="password"></div>
                  </div>
                </div>
                <div class="form-login">
                  <div class="alreadyuser">
                    <h4>
                      <router-link to="forgetpassword" class="hover-a"
                        >Forgot Password?</router-link
                      >
                    </h4>
                  </div>
                </div>
                <div class="form-login">
                  <router-link class="btn btn-login" to="dashboard"
                    >Sign In</router-link
                  >
                </div>
              </Form>
              <gform @submit="onSubmit">
                <b-row>
                  <b-col md="8">
                    <gfield
                      v-model="userName"
                      placeholder=""
                      label-text="userName"
                      id="login-email"
                      name="UserName"
                    >
                    </gfield>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="8">
                    <gfield
                      label-text="Password"
                      v-model="password"
                      name="login-password"
                      placeholder=""
                    >
                    </gfield>
                  </b-col>
                </b-row>
                <div class="form-login">
                  <button class="btn btn-login" to="dashboard">Sign In</button>
                </div>
              </gform>
              <div class="signinform text-center">
                <h4>
                  Don’t have an account?
                  <router-link to="signup" class="hover-a">Sign Up</router-link>
                </h4>
              </div>
              <div class="form-setlogin">
                <h4>Or sign up with</h4>
              </div>
              <div class="form-sociallink">
                <ul>
                  <li>
                    <a href="javascript:void(0);">
                      <img
                        src="../../../assets/img/icons/google.png"
                        class="me-2"
                        alt="google"
                      />
                      Sign Up using Google
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <img
                        src="../../../assets/img/icons/facebook.png"
                        class="me-2"
                        alt="google"
                      />
                      Sign Up using Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="login-img">
            <img src="../../../assets/img/login.jpg" alt="img" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Main Wrapper -->
</template>
<script>
/**
 * @TODO: 1-datepacker: g-datepicker
 */
import { Form, Field } from "vee-validate";
import { mapActions } from "vuex";
import * as Yup from "yup";
export default {
  components: {
    Form,
    Field,
  },
  data() {
    return {
      showPassword: false,
      password: null,
      userName: null,
      updatedUserName: null,
      checkSympole: null,
      prodctionUrl: null,
    };
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
  },
  methods: {
    ...mapActions({
      loginApi: "auth/login",
    }),
    beforeLoginValidation() {
      this.checkSympole = this.userName?.indexOf("\\");
      // this.prodctionUrl = document.location.host.indexOf("eduprosys.net"); // ! idk
      if (this.checkSympole === -1) {
        // change not
        this.doneAlert({
          title: this.$t("notAllowToAddThisSyempol"),
          type: "error",
        });
        return false;
      }
      return true;
    },
    checkUserName() {
      const check = this.userName?.indexOf("\\");
      // const prodction = document.location.host.indexOf("eduprosys.net"); // ! idk
      const hostName = document.location.host.split(".");
      if (check === -1) {
        this.updatedUserName = `${hostName[0]}\\${this.userName}`;
      } else if (check === -1) {
        // change not
        this.doneAlert({
          title: this.$t("notAllowToAddThisSyempol"),
          type: "error",
        });
      } else {
        this.updatedUserName = this.userName;
      }
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    async onSubmit() {
      if (!this.beforeLoginValidation()) return;
      this.checkUserName();
      const body = {
        userName: this.updatedUserName,
        password: this.password,
      };
      await this.loginApi(body);
    },
  },
  mounted() {
    this.checkSympole = this.userName?.indexOf("\\");
  },
  setup() {
    let users = localStorage.getItem("storedData");
    if (users === null) {
      let password = [
        {
          email: "admin@dreamguystech.com",
          password: "123456",
        },
      ];
      const jsonData = JSON.stringify(password);
      localStorage.setItem("storedData", jsonData);
    }
    const schema = Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });

    return {
      schema,
    };
  },
};
</script>
