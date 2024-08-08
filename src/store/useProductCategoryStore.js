import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useProductCategoryStore = defineStore("product-category", () => {
  const state = reactive({
    categories: [],
    loading: false,
  });

  const fetchProdCategories = async () => {
    state.loading = true;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/category`
      );
      state.categories = response.data;
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
