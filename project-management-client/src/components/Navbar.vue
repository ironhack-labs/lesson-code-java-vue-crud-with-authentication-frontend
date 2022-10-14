<script setup>
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import router from "../router";
import { useAuthStore } from "../stores/auth";

const { user, isLoggedIn } = storeToRefs(useAuthStore());
const { logOutUser, authenticateUser } = useAuthStore();

async function handleLogOut() {
  logOutUser().then(() => {
    authenticateUser();
    router.push("/");
  });
}
</script>

<template>
  <nav className="Navbar">
    <RouterLink to="/">
      <button>Home</button>
    </RouterLink>

    <span v-if="isLoggedIn">
      <RouterLink to="/projects">
        <button>Projects</button>
      </RouterLink>

      <button @click="handleLogOut">Logout</button>
      <span v-if="user">{{ user.name }}</span>
    </span>

    <span v-if="!isLoggedIn">
      <RouterLink to="/signup">
        <button>Sign Up</button>
      </RouterLink>
      <RouterLink to="/login">
        <button>Login</button>
      </RouterLink>
    </span>
  </nav>
</template>
