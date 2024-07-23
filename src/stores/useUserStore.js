import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    user: null,
  }),

  actions: {
    setUser(data) {
      // Check if data contains both user information and token
      if (data && data.token && data.id) {
        this.token = data.token; // Assign the token
        this.user = {
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          mobile: data.mobile,
        }; // Create a user object from the response data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        console.error("Invalid user data:", data); // Log invalid data
      }
    },

    loadUserFromStorage() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token) {
        this.token = token;
      } else {
        this.token = null;
      }

      if (user) {
        try {
          this.user = JSON.parse(user);
        } catch (error) {
          console.error("Failed to parse user data from local storage:", error);
          this.user = null; 
        }
      } else {
        this.user = null;
      }
    },

    clearUser() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
