import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import blog from "@/pages/blog/addBlog.vue";
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import aiService from "@/utils/aiService";

// Mock dependencies
vi.mock("axios");
vi.mock("@/utils/aiService", () => ({
  default: {
    generateContent: vi.fn().mockResolvedValue("Generated content"),
  },
}));
vi.mock("@/composable/globalAlert.js", () => ({
  useNotifications: () => ({
    notify: vi.fn(),
  }),
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/admin/blog/blog-list", name: "BlogList" }],
});

describe("blog component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(blog, {
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

  it("disables submit button when form is not filled", async () => {
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes()).toHaveProperty("disabled");
  });

  it("enables submit button when form is filled", async () => {
    fillFormData(wrapper);
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes("disabled")).toBeFalsy();
  });

  it("toggles preview when preview button is clicked", async () => {
    fillFormData(wrapper);
    await wrapper.vm.$nextTick();

    const previewButton = wrapper.find(".ce");
    await previewButton.trigger("click");
    expect(wrapper.vm.showPreview).toBe(true);

    await previewButton.trigger("click");
    expect(wrapper.vm.showPreview).toBe(false);
  });

  it("calls generateBlogContent when button is clicked", async () => {
    wrapper.vm.formData.title = "Test Title";
    await wrapper.vm.$nextTick();

    const generateButton = wrapper.find(".gbc");
    await generateButton.trigger("click");
    expect(wrapper.vm.isGenerating).toBe(true);
    expect(aiService.generateContent).toHaveBeenCalled();
  });

  it("submits form data when form is submitted", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    fillFormData(wrapper);
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger("click");

    expect(axios.post).toHaveBeenCalledWith(
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
    axios.post.mockRejectedValue(new Error("API Error"));

    fillFormData(wrapper);
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger("click");

    expect(wrapper.vm.notify).toHaveBeenCalledWith(
      "Error creating blog",
      "error"
    );
  });
});
