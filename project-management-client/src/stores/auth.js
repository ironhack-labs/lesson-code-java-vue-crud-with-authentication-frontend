import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const API_URL = "http://localhost:5005";

  let user = ref(null);
  let isLoggedIn = ref(false);
  let isLoading = ref(true);

  async function authenticateUser() {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(`${API_URL}/auth/verify/`, requestOptions);

        if (response.ok) {
          this.isLoggedIn = true;
          this.isLoading = false;
          this.user = response.data;
        } else {
          this.isLoggedIn = false;
          this.isLoading = false;
          this.user = null;
        }
      } catch (error) {
        this.isLoggedIn = false;
        this.isLoading = false;
        this.user = null;
      }
    } else {
      this.isLoggedIn = false;
      this.isLoading = false;
      this.user = null;
    }
  }

  async function login(email, password) {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      };

      await fetch(`${API_URL}/auth/login`, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          storeToken(responseJson.authToken);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function signup(email, password, name) {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      };

      await fetch(`${API_URL}/auth/signup`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  }

  function storeToken(token) {
    localStorage.setItem("authToken", token);
  }

  function removeToken() {
    localStorage.removeItem("authToken");
  }

  async function logOutUser() {
    removeToken();
  }

  return {
    user,
    isLoading,
    isLoggedIn,
    signup,
    login,
    logOutUser,
    authenticateUser,
  };
});
