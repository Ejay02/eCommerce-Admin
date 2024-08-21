import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import editBlogCategory from "@/pages/blog/editBlogCategory.vue";
import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";

// Mock dependencies
vi.mock("axios");

vi.mock("@/composable/globalAlert.js", () => ({
  useNotifications: () => ({
    notify: vi.fn(),
  }),
}));

vi.mock("vue-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRoute: () => ({
      params: {
        id: "123",
      },
    }),
  };
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/admin/blog/blog-category-list", name: "BlogCategoryList" },
  ],
});

describe("edit blog category component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(editBlogCategory, {
      global: {
        plugins: [router],
      },
      props: {
        id: "123",
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.find("input#title").exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it("fetches blog category details on mount", async () => {
    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/blog-category/123`
    );
  });

  it("sets form data with fetched blog category details", async () => {
    const response = { data: { title: "Test Title" } };
    axios.get.mockResolvedValue(response);
    await wrapper.vm.fetchBlogCatDetails();
    expect(wrapper.vm.formData.title).toBe("Test Title");
  });

  it("submits form data when form is submitted", async () => {
    wrapper.vm.formData = { title: "" }; // Reset formData properties
    axios.put.mockResolvedValue({ data: { success: true } });
    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger("click");
    expect(axios.put).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/blog-category/123`,
      expect.objectContaining({
        title: "",
      })
    );
  });

  it("shows error notification when form submission fails", async () => {
    axios.put.mockRejectedValue(new Error("API Error"));
    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger("click");
    expect(wrapper.vm.notify).toHaveBeenCalledWith(
      "Error updating category: ",
      "error"
    );
  });
});
