import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useOrderStore = defineStore("order", () => {
  const state = reactive({
    orders: [],
    loading: false,
  });

  const fetchOrders = async () => {
    state.loading = true;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/get-orders`
      );
      
      console.log('response:', response.data)
      state.orders = response?.data;
    } catch (error) {
      notify("Error fetching orders", "error");
    } finally {
      state.loading = false;
    }
  };

  const deleteOrder = (id) => {
    state.orders = state.orders.filter((order) => order._id !== id);
  };

  return { ...toRefs(state), fetchOrders, deleteOrder };
});
