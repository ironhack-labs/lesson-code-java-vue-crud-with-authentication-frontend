import { ref } from "vue";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", () => {
  const API_URL = "http://localhost:5005";

  const task = ref({ title: "", description: "" });

  async function addTask(title, description, projectId) {
    try {
      const storedToken = localStorage.getItem("authToken");
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, projectId }),
      };

      await fetch(`${API_URL}/api/tasks`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    task,
    addTask,
  };
});
