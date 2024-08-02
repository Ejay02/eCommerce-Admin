import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useProductStore = defineStore("product", () => {
  const state = reactive({
    products: [],
    loading: false,
  });

  const fetchProducts = async (params = {}) => {
    state.loading = true;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/product`,
        { params }
      );

      state.products = response?.data;
    } catch (error) {
      notify("Error fetching products", "error");
    } finally {
      state.loading = false;
    }
  };

  const deleteProduct = (id) => {
    state.products = state.products.filter((product) => product._id !== id);
  };

  return { ...toRefs(state), fetchProducts, deleteProduct };
});
