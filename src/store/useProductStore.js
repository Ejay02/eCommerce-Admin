import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useProductStore = defineStore("product", () => {
  const state = reactive({
    products: [],
    loading: false,
    total: 0,
    currentPage: 1,
    totalPages: 0,
  });

  const fetchProducts = async (params = {}) => {
    state.loading = true;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/product`,
        { params }
      );

      // state.products = response?.data;
      state.products = response.data.products;
      state.total = response.data.total;
      state.currentPage = params.page || 1;
      state.totalPages = Math.ceil(state.total / (params.limit || 10));
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
