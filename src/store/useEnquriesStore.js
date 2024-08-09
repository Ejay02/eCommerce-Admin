import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useEnquiryStore = defineStore("enquiry", () => {
  const state = reactive({
    enquiries: [],
    loading: false,
    totalPages: 0,
    currentPage: 1,
    total: 0,
  });

  const fetchEnquiries = async (params = {}) => {
    state.loading = true;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/enquiry`,
        { params }
      );

      state.enquiries = response?.data?.enquiries; // Update with paginated data
      state.total = response.data?.total;
      state.currentPage = params.page || 1; // Update current page
      state.totalPages = Math.ceil(state.total / (params.limit || 10)); // Update total pages
    } catch (error) {
      notify("Error fetching enquiries", "error");
    } finally {
      state.loading = false;
    }
  };

  const deleteEnquiry = (id) => {
    state.enquiries = state.enquiries.filter((enquiry) => enquiry._id !== id);
  };

  return { ...toRefs(state), fetchEnquiries, deleteEnquiry };
});
