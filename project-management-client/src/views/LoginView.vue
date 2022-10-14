<script setup>
import { ref } from "vue";
import router from "../router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");

const { login, authenticateUser } = useAuthStore();

async function handleLoginSubmit() {
  login(email.value, password.value).then(() => {
    authenticateUser();
    router.push("/");
  });
}
</script>

<template>
  <div className="LoginPage">
    <h1>Login</h1>

    <form @submit.prevent="handleLoginSubmit">
      <label>Email:</label>
      <input type="email" name="email" v-model="email" />

      <label>Password:</label>
      <input type="password" name="password" v-model="password" />

      <button type="submit">Login</button>
    </form>

    <p>Don't have an account yet?</p>
    <RouterLink to="/signup"> Sign up</RouterLink>
  </div>
</template>
