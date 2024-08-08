import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useBrandStore = defineStore("brand", () => {
  const state = reactive({
    brands: [],
    loading: false,
    totalPages: 0,
    currentPage: 1,
    total: 0,
  });

  const fetchBrands = async (params = {}) => {
    state.loading = true;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/brand`,
        {
          params,
        }
      );

      state.brands = response?.data?.brands; // Update brands with paginated data
      state.total = response.data?.total;
      state.currentPage = params.page || 1; // Update current page
      state.totalPages = Math.ceil(state.total / (params.limit || 10)); // Update total pages
    } catch (error) {
      notify("Error fetching brands:", error);
    } finally {
      state.loading = false;
    }
  };

  const deleteBrand = (id) => {
    state.brands = state.brands.filter((brand) => brand._id !== id);
  };

  return { ...toRefs(state), fetchBrands, deleteBrand };
});
