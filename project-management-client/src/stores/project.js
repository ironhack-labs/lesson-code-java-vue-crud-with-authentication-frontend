import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", () => {
  const API_URL = "http://localhost:5005";

  const projects = ref([]);
  const project = ref({ title: "", description: "" });

  const getProjects = computed(() => projects);

  async function fetchProjects() {
    this.projects = [];

    try {
      const storedToken = localStorage.getItem("authToken");
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      };
      this.projects = await fetch(
        `${API_URL}/api/projects`,
        requestOptions
      ).then((response) => response.json());
    } catch (error) {
      console.log(error);
    }
  }

  async function addProject(title, description) {
    try {
      const storedToken = localStorage.getItem("authToken");
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      };

      await fetch(`${API_URL}/api/projects`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProject(projectId) {
    try {
      const storedToken = localStorage.getItem("authToken");
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.project.title,
          description: this.project.description,
        }),
      };

      await fetch(`${API_URL}/api/projects/${projectId}`, requestOptions).then(
        () => {
          this.project.title = "";
          this.project.description = "";
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchProject(projectId) {
    this.project = null;
    const storedToken = localStorage.getItem("authToken");
    try {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      };

      this.project = await fetch(
        `${API_URL}/api/projects/${projectId}`,
        requestOptions
      ).then((response) => response.json());
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProject(projectId) {
    try {
      const storedToken = localStorage.getItem("authToken");
      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      };

      await fetch(`${API_URL}/api/projects/${projectId}`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    project,
    projects,
    getProjects,
    fetchProjects,
    fetchProject,
    addProject,
    updateProject,
    deleteProject,
  };
});
