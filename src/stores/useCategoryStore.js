import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useCategoryStore = defineStore("category", () => {
  const state = reactive({
    categories: [],
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blog-category`
      );
      state.categories = response.data;
    } catch (error) {
      notify("Error fetching categories:", error);
    }
  };

  const deleteCategory = (id) => {
    state.categories = state.categories.filter(
      (category) => category._id !== id
    );
  };

  return { ...toRefs(state), fetchCategories, deleteCategory };
});
