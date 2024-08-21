import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import editBlog from "@/pages/blog/editBlog.vue";
import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";


// Mock dependencies
vi.mock("axios");
vi.mock("@/composable/globalAlert.js", () => ({
  useNotifications: () => ({
    notify: vi.fn(),
  }),
}));

vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: {
      id: "123",
    },
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
  routes: [{ path: "/admin/blog/blog-list", name: "BlogList" }],
});

describe("edit blog component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(editBlog, {
      global: {
        plugins: [router],
        stubs: {
          QuillEditor: {
            template: "<div></div>",
            methods: {
              getText: () => "Mocked quill content",
            },
          },
        },
      },
    });
  });

  function fillFormData(wrapper) {
    wrapper.vm.formData.title = "Test Title";
    wrapper.vm.formData.category = "Test Category";
    wrapper.vm.formData.author = "Test Author";
    wrapper.vm.formData.image = "http://test.com/image.jpg";
    wrapper.vm.formData.description = "Test Description";
  }

  it("renders correctly", () => {
    expect(wrapper.find("input#title").exists()).toBe(true);
    expect(wrapper.find("input#category").exists()).toBe(true);
    expect(wrapper.find("input#author").exists()).toBe(true);
    expect(wrapper.find("input#image").exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it("fetches blog details on mount", async () => {
    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/blog/123`
    );
  });

  it("sets form data with fetched blog details", async () => {
    const response = {
      data: { title: "Test Title", description: "Test Description" },
    };
    axios.get.mockResolvedValue(response);
    await wrapper.vm.fetchBlogDetails();
    expect(wrapper.vm.formData.title).toBe("Test Title");
    expect(wrapper.vm.formData.description).toBe("Test Description");
  });

  it("toggles preview when preview button is clicked", async () => {
    const previewButton = wrapper.find(".ce");
    await previewButton.trigger("click");
    expect(wrapper.vm.showPreview).toBe(true);
    await previewButton.trigger("click");
    expect(wrapper.vm.showPreview).toBe(false);
  });

  it("submits form data when form is submitted", async () => {
    axios.put.mockResolvedValue({ data: { success: true } });

    fillFormData(wrapper);
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger("click");

    expect(axios.put).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        title: "Test Title",
        category: "Test Category",
        author: "Test Author",
        image: "http://test.com/image.jpg",
        description: expect.any(String),
      })
    );
  });

  it("shows error notification when form submission fails", async () => {
    axios.put.mockRejectedValue(new Error("API Error"));
    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger("click");
    expect(wrapper.vm.notify).toHaveBeenCalledWith(
      "Error updating blog",
      "error"
    );
  });
});
