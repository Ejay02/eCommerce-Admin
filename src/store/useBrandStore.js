import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useBrandStore = defineStore("brand", () => {
  const state = reactive({
    brands: [],
    loading: false,
  });

  const fetchBrands = async () => {
    state.loading = true;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/brand`
      );
      state.brands = response.data;
    } catch (error) {
      notify("Error fetching brands:", error);
    } finally {
      state.loading = false;
    }
  };

  const deleteBrand = (id) => {
    state.categories = state.categories.filter(
      (category) => category._id !== id
    );
  };

  return { ...toRefs(state), fetchBrands, deleteBrand };
});
