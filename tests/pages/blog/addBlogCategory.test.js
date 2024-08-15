import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AddBlogCategory from "@/pages/blog/addBlogCategory.vue"; // Adjust the import path as needed
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

// Mock dependencies
vi.mock("axios");
vi.mock("@/composable/globalAlert.js", () => ({
  useNotifications: () => ({
    notify: vi.fn(),
  }),
}));

// Mock the router and use the `push` function within the mock itself
vi.mock("@/router", () => {
  const push = vi.fn();
  return {
    default: {
      push,
    },
  };
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/admin/blog/blog-category-list", name: "BlogCategoryList" },
  ],
});

describe("AddBlogCategory component", () => {
  let wrapper;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(AddBlogCategory, {
      global: {
        plugins: [router],
        stubs: ["RouterLink"],
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.find("h3").exists()).toBe(true);
    expect(wrapper.find("input#title").exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it("disables submit button when form is empty", async () => {
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes()).toHaveProperty("disabled");
  });

  it("enables submit button when title is filled", async () => {
    await wrapper.find("input#title").setValue("Test Category");
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes()).not.toHaveProperty("disabled");
  });

  it("submits form data when form is submitted", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    await wrapper.find("input#title").setValue("Test Category");
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger("click");

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/blog-category"),
      { title: "Test Category" }
    );
  });

  it("shows success notification and redirects on successful submission", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    await wrapper.find("input#title").setValue("Test Category");
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger("click");

    const routerModule = await import("@/router"); // Import the mocked router
    expect(wrapper.vm.notify).toHaveBeenCalledWith(
      "Category added successfully!",
      "success"
    );
    expect(routerModule.default.push).toHaveBeenCalledWith(
      "/admin/blog/blog-category-list"
    );
  });

  it("shows error notification on submission failure", async () => {
    axios.post.mockRejectedValue(new Error("API Error"));

    await wrapper.find("input#title").setValue("Test Category");
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger("click");

    expect(wrapper.vm.notify).toHaveBeenCalledWith(
      "Error adding category",
      "error"
    );
  });

  it("trims whitespace from title before submission", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    await wrapper.find("input#title").setValue("  Test Category  ");
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger("click");

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      title: "Test Category", // Expect the trimmed title here
    });
  });

  it("prevents submission with only whitespace in title", async () => {
    await wrapper.find("input#title").setValue("   ");
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes()).toHaveProperty("disabled");
  });

  it("handles null or undefined title value", async () => {
    wrapper.vm.title = null;
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes()).toHaveProperty("disabled");

    wrapper.vm.title = undefined;
    await wrapper.vm.$nextTick();

    expect(submitButton.attributes()).toHaveProperty("disabled");
  });
});
