import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useBlogCategoryStore = defineStore("category", () => {
  const state = reactive({
    categories: [],
    loading: false,
  });

  const fetchCategories = async () => {
    state.loading = true;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blog-category`
      );
      state.categories = response.data;
    } catch (error) {
      notify("Error fetching categories:", error);
    } finally {
      state.loading = false;
    }
  };

  const deleteCategory = (id) => {
    state.categories = state.categories.filter(
      (category) => category._id !== id
    );
  };

  return { ...toRefs(state), fetchCategories, deleteCategory };
});
