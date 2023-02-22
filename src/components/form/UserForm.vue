<template>
  <div class="registrantionForm form-group form-group-sm">
    <form>
      <h3>Registration</h3>
      <div class="container formBody">
        <!-- Full Name Field -->
        <div class="mb-3">
          <label for="fullName" class="form-label">Full Name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="fullName"
            placeholder="Full Name ..."
            v-model="fullName"
            :class="{ hasErrors: $v.fullName.$error }"
            @blur="$v.fullName.$touch()"
          />
        </div>

        <p
          class="error-message"
          v-if="$v.fullName.$error && !$v.fullName.required"
        >
          Full Name is required.
        </p>

        <!-- Email Field -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="email"
            placeholder="Email ..."
            v-model="email"
            :class="{ hasErrors: $v.email.$error }"
            @blur="$v.email.$touch()"
          />
        </div>

        <p class="error-message" v-if="$v.email.$error && !$v.email.required">
          Email is required.
        </p>
        <p class="error-message" v-if="$v.email.$error && !$v.email.email">
          Must be valid email.
        </p>

        <!-- UserName Field -->
        <div class="mb-3">
          <label for="userName" class="form-label">User Name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="userName"
            placeholder="User Name ..."
            v-model="userName"
            :class="{ hasErrors: $v.userName.$error }"
            @blur="$v.userName.$touch()"
          />
        </div>

        <p
          class="error-message"
          v-if="$v.userName.$error && !$v.userName.required"
        >
          User Name is required.
        </p>
        <p
          class="error-message"
          v-if="$v.userName.$error && !$v.userName.minLength"
        >
          User Name should have atleast 6 characters.
        </p>

        <!-- Password Field -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control form-control-sm"
            id="password"
            placeholder="Password ..."
            v-model="password"
            :class="{ hasErrors: $v.password.$error }"
            @blur="$v.password.$touch()"
          />
        </div>

        <p
          class="error-message"
          v-if="$v.password.$error && !$v.password.required"
        >
          Password is required.
        </p>
        <p
          class="error-message"
          v-if="$v.password.$error && !$v.password.minLength"
        >
          Password should have atleast 6 characters.
        </p>

        <!-- Character Name Field -->
        <div class="mb-3">
          <label for="characterName" class="form-label">Character Name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="characterName"
            placeholder="Character Name ..."
            v-model="characterName"
            :class="{ hasErrors: $v.characterName.$error }"
            @blur="$v.characterName.$touch()"
          />
        </div>

        <p
          class="error-message"
          v-if="$v.characterName.$error && !$v.characterName.required"
        >
          Character Name is required.
        </p>
        <p
          class="error-message"
          v-if="$v.characterName.$error && !$v.characterName.minLength"
        >
          Character Name should have atleast 6 characters.
        </p>

        <p
          class="error-message"
          v-if="$v.characterName.$error && !$v.characterName.maxLength"
        >
          Character Name should not exceed the max length of 20 characters.
        </p>

        <!-- Character Class  Field -->
        <div class="mb-3">
          <label for="characterClass" class="form-label"
            >Select Character Class:
          </label>
          <select
            id="characterClass"
            class="form-control form-control-sm"
            v-model="characterClass"
            :class="{ hasErrors: $v.characterClass.$error }"
            @blur="$v.characterClass.$touch()"
          >
            <option
              v-for="character in characterClasses"
              :key="character.id"
              :value="character.id"
            >
              {{ character.name }}
            </option>
          </select>

          <p
            class="error-message"
            v-if="$v.characterClass.$error && !$v.characterClass.required"
          >
            Character Class is required.
          </p>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-default btn-sm"
        @click.prevent="submitForm()"
      >
        Create
      </button>

      <button
        class="btn btn-secondary btn-sm back"
        type="button"
        @click="onBackClick()"
      >
        Back
      </button>
    </form>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

import characterClassData from "../../data/characterClass.js";
import { addUserAction } from "../../@core/store/types/actionTypes";

export default {
  components: {},
  data() {
    return {
      fullName: "",
      email: "",
      userName: "",
      password: "",
      characterName: "",
      characterClasses: characterClassData,
      characterClass: 1,
    };
  },
  created() {
  },
  methods: {
    onBackClick() {
      this.$router.go(-1);
    },
    submitForm() {
      this.$v.$touch();

      if (this.$v.$error) return;

      const {
        userName,
        fullName,
        email,
        password,
        characterName,
        characterClass,
      } = this;

      this.$store
        .dispatch(addUserAction, {
          fullName,
          email,
          username: userName,
          password,
          characterName,
          classType: characterClass,
        })
        .then(() =>
          this.$fire({
            title: "Success",
            text: "Your account has been created.",
            type: "success",
            timer: 3000,
          }).then(() => this.$router.push("/login"))
        )
        .catch((err) =>
          this.$fire({
            title: "Failed",
            text: "Failed to create your account.",
            type: "error",
            timer: 3000,
          }).then(() => console.log(err))
        );
    },
  },
  validations: {
    characterClass: { required },
    email: { required, email },
    fullName: { required },
    userName: { required, minLength: minLength(6) },
    password: { required, minLength: minLength(6) },
    characterName: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20),
    },
  },
};
</script>

<style>
.registrantionForm {
  /* padding: 0.2%; */
  margin-top: 2%;
  height: 100%;
  width: 70%;
  margin-left: 15%;
  font-size: 13px;
  color: white;
}

.formBody {
  overflow: scroll;
  max-height: 79vh;
  padding-bottom: 3%;
  /* border: solid #7ba378 1px; */
}

form button.btn {
  color: white !important;
}

.back {
  margin-left: 5px;
}
</style>