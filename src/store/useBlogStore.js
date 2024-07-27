import { defineStore } from "pinia";
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

export const useBlogStore = defineStore("blog", () => {
  const state = reactive({
    blogs: [],
    loading: false,
  });

  const fetchBlogs = async () => {
    state.loading = true;
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog`);

      state.blogs = response.data;
    } catch (error) {
      notify("Error fetching blogs", "error");
    } finally {
      state.loading = false;
    }
  };

  const deleteBlog = (id) => {
    state.blogs = state.blogs.filter((blog) => blog._id !== id);
  };

  return { ...toRefs(state), fetchBlogs, deleteBlog };
});
