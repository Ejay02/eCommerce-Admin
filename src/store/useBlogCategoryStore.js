import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useBlogCategoryStore = defineStore("blog-category", () => {
  const state = reactive({
    categories: [],
    loading: false,
    totalPages: 0,
    currentPage: 1,
    total: 0,
  });

  const fetchCategories = async (params = {}) => {
    state.loading = true;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blog-category`,
        { params }
      );

      state.categories = response?.data?.categories; // Update with paginated data
      state.total = response.data?.total;
      state.currentPage = params.page || 1; // Update current page
      state.totalPages = Math.ceil(state.total / (params.limit || 10)); // Update total pages
    } catch (error) {
      notify("Error fetching blog categories:", error);
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
