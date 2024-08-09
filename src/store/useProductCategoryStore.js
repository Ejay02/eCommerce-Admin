import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useProductCategoryStore = defineStore("product-category", () => {
  const state = reactive({
    categories: [],
    loading: false,
    totalPages: 0,
    currentPage: 1,
    total: 0,
  });

  const fetchProdCategories = async (params = {}) => {
    state.loading = true;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/category`,
        {
          params,
        }
      );

      state.categories = response?.data?.categories; // Update with paginated data
      state.total = response.data?.total;
      state.currentPage = params.page || 1; // Update current page
      state.totalPages = Math.ceil(state.total / (params.limit || 10)); // Update total pages
    } catch (error) {
      notify("Error fetching product categories:", error);
    } finally {
      state.loading = false;
    }
  };

  const deleteProdCategory = (id) => {
    state.categories = state.categories.filter(
      (category) => category._id !== id
    );
  };

  return { ...toRefs(state), fetchProdCategories, deleteProdCategory };
});
