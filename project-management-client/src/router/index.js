import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectListView from "../views/ProjectListView.vue";
import ProjectDetailsView from "../views/ProjectDetailsView.vue";
import EditProjectView from "../views/EditProjectView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectListView,
      beforeEnter: checkAuth,
    },
    {
      path: "/projects/:projectId",
      component: ProjectDetailsView,
      beforeEnter: checkAuth,
    },
    {
      path: "/projects/edit/:projectId",
      component: EditProjectView,
      beforeEnter: checkAuth,
    },
    {
      path: "/signup",
      component: SignupView,
      beforeEnter: checkAnon,
    },
    {
      path: "/login",
      component: LoginView,
      beforeEnter: checkAnon,
    },
  ],
});

function checkAuth(to, from, next) {
  const auth = useAuthStore();
  auth.authenticateUser().then(() => {
    if (auth.isLoggedIn) next();
    else next("/login");
  });
}

function checkAnon(to, from, next) {
  const auth = useAuthStore();
  auth.authenticateUser().then(() => {
    if (!auth.isLoggedIn) next();
    else next("/");
  });
}

export default router;
