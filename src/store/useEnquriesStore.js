import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useEnquiryStore = defineStore("enquiry", () => {
  const state = reactive({
    enquiries: [],
    loading: false,
  });

  const fetchEnquiries = async () => {
    state.loading = true;
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/enquiry`);

      state.enquiries = response.data;
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
