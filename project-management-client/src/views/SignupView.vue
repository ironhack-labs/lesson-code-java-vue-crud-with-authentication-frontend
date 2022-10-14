<script setup>
import { ref } from "vue";
import router from "../router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const name = ref("");

const { signup } = useAuthStore();

async function handleSignupSubmit() {
  signup(email.value, password.value, name.value).then(() => {
    router.push("/login");
  });
}
</script>

<template>
  <div className="SignupPage">
    <h1>Sign Up</h1>

    <form @submit.prevent="handleSignupSubmit">
      <label>Email:</label>
      <input type="email" name="email" v-model="email" />

      <label>Password:</label>
      <input type="password" name="password" v-model="password" />

      <label>Name:</label>
      <input type="text" name="name" v-model="name" />

      <button type="submit">Sign Up</button>
    </form>

    <p>Already have account?</p>
    <RouterLink to="/login"> Login</RouterLink>
  </div>
</template>
