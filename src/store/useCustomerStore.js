import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useCustomerStore = defineStore("customer", () => {
  const state = reactive({
    customers: [],
    loading: false,
    totalPages: 0,
    currentPage: 1,
    total: 0,
  });

  const fetchCustomers = async (params = {}) => {
    state.loading = true;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/get-users`,
        {
          params,
        }
      );

      state.customers = response?.data?.users; // Update brands with paginated data
      state.total = response.data?.total;
      state.currentPage = params.page || 1; // Update current page
      state.totalPages = Math.ceil(state.total / (params.limit || 10)); // Update total pages
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
