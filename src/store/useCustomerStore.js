import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useCustomerStore = defineStore("customer", () => {
  const state = reactive({
    customers: [],
    loading: false,
  });

  const fetchCustomers = async () => {
    state.loading = true;
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/get-users`);

      state.customers = response.data;
    } catch (error) {
      notify("Error fetching customers", "error");
    } finally {
      state.loading = false;
    }
  };

  const deleteCustomer = (id) => {
    state.customers = state.customers.filter((customer) => customer._id !== id);
  };

  return { ...toRefs(state), fetchCustomers, deleteCustomer };
});
