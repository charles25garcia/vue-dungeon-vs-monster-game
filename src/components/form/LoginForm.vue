<template>
  <div class="container" align="center">
    <div class="col-md-6 login-form-1">
      <h5>Monster Slayer <br>Login</h5>
      <br>
      <br>

      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="userName"
          placeholder="Your Username..."
          v-model="userName"
          :class="{ hasErrors: $v.userName.$error }"
          @blur="$v.userName.$touch()"
        />
        <p
          class="error-message"
          v-if="$v.userName.$error && !$v.userName.required"
        >
          User Name is required.
        </p>
      </div>

      <div class="form-group">
        <input
          type="password"
          class="form-control"
          @keyup.enter="onLogin()"
          placeholder="Your Password..."
          v-model="password"
          :class="{ hasErrors: $v.password.$error }"
          @blur="$v.password.$touch()"
        />
        <p
          class="error-message"
          v-if="$v.password.$error && !$v.password.required"
        >
          Password is required.
        </p>
      </div>

      <div class="form-group">
        <button
          type="submit"
          class="btn btn-success btn-sm btnSubmit"
          @click.prevent="onLogin()"
          :disabled="isLoading"
        >
          Enter
        </button>
      </div>
      <div class="form-group">
        <router-link to="/registration" class="btnForgetPwd"
          >Click here to Sign Up!</router-link
        >
      </div>
      <div class="loading" v-show="isLoading"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";

import { required } from "vuelidate/lib/validators";

import { loginAction } from "../../@core/store/types/actionTypes";

import { saveAccount } from '../../shared/functions/localStorage/index';

export default {
  data() {
    return {
      userName: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    onLogin() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.isLoading = true;

      const { userName, password } = this;

      this.$store
        .dispatch(loginAction, { userName, password })
        .then(({ accountId }) => {
          this.$session.start();
          this.$session.set("jwt", accountId);
          Vue.http.headers.common["Authorization"] = accountId;

          saveAccount(accountId);

          this.$router.push("/character");
        })
        .catch(() =>
          this.$fire({
            title: "Failed",
            text: "Invalid Username or Password.",
            timer: 3000,
            customClass: "errorMessage",
          }).then(() => (this.isLoading = false))
        );
    },
  },
  validations: {
    userName: { required },
    password: { required },
  },
};
</script>

<style scoped>
.login-form-1 {
  margin-top: 3%;
  padding: 5%;
  /* background: rgba(66, 65, 65, 0.5); */
  /* box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19); */
  /* border: solid #7ba378 1px; */
}

.login-form-1 h3 {
  text-align: center;
  margin-bottom: 12%;
  color: #fff;
}

.btnSubmit {
  font-weight: 600;
  width: 50%;
  color: #d8d2d2;
  background-color: #144e21;
  border: none;
  border-radius: 2px;
  padding: 2%;
}
.btnForgetPwd {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
.btnForgetPwd:hover {
  text-decoration: none;
  color: #fff;
}

p {
  font-size: 12px;
}

h3:hover {
  color: #7ba378;
  cursor: default;
}

.btnForgetPwd:hover {
  color: #7ba378 !important;
}
</style>
