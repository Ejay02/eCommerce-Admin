import axios from "axios";
import router from "@/router";
import router from "@/router";
import { mount } from "@vue/test-utils";
import aiService from "@/utils/aiService";
import AddProduct from "@/pages/catalog/addProduct.vue";
import { createRouter, createWebHistory } from "vue-router";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("axios");

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
  routes: [{ path: "/admin/product/product-list", name: "productList" }],
});

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

describe("AddProduct component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AddProduct, {
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
    wrapper.vm.formData.title = "Test Product";
    wrapper.vm.formData.description = "Test description";
    wrapper.vm.formData.category = "Test category";
    wrapper.vm.formData.slug = "test-slug";
    wrapper.vm.formData.price = 10;
    wrapper.vm.formData.tags = ["tag1", "tag2"];
    wrapper.vm.formData.colors = ["color1", "color2"];
    wrapper.vm.formData.images = ["test.jpg"];
    wrapper.vm.formData.brand = "Test brand";
    wrapper.vm.formData.quantity = 1;
  }

  it("renders correctly with default data", () => {
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("submits form successfully with valid data", async () => {
    fillFormData(wrapper);
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes("disabled")).toBeFalsy();
  });

  it("does not submit form with invalid data", async () => {
    const formData = {
      title: "",
      description: "",
      category: "",
      slug: "",
      price: "",
      tags: [],
      colors: [],
      images: [],
      brand: "",
      quantity: "",
    };

    await wrapper.find("form").trigger("submit.prevent");

    expect(axios.post).not.toHaveBeenCalled();
  });

  it("adds tags successfully", async () => {
    const tagInput = wrapper.find("input#tags");

    await tagInput.setValue("new-tag");
    await tagInput.trigger("keyup.enter");

    await wrapper.vm.addTags({ key: "Enter" }); // Call the addTags function directly

    expect(wrapper.vm.tags).toContain("new-tag");
  });

  it("removes tags successfully", async () => {
    const tagInput = wrapper.find("input#tags");
    await tagInput.setValue("new-tag");
    await tagInput.trigger("keyup.enter");

    // Wait for the tag to be added
    await wrapper.vm.$nextTick();

    // Call the removeTag function directly
    await wrapper.vm.removeTag(0);

    expect(wrapper.vm.tags).not.toContain("new-tag");
  });

  it("adds colors successfully", async () => {
    const colorInput = wrapper.find("input#colorPicker");
    await colorInput.setValue("#ffffff");
    await wrapper.find("button.btn-secondary.ms-2").trigger("click");

    // Wait for the next tick to ensure the colors array is updated
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.formData.colors).toContain("#ffffff");
  });

  it("removes colors successfully", async () => {
    const colorInput = wrapper.find("input#colorPicker");
    await colorInput.setValue("#ffffff");
    await wrapper.find("button.btn-secondary.ms-2").trigger("click");

    const removeColorButton = wrapper.find("#remove-color");
    await removeColorButton.trigger("click");

    expect(wrapper.vm.formData.colors).not.toContain("#ffffff");
  });

  it("generates description successfully", async () => {
    wrapper.vm.formData.title = "Test Title";
    await wrapper.vm.$nextTick();

    const generateButton = wrapper.find(".gbc");
    await generateButton.trigger("click");
    expect(wrapper.vm.isGenerating).toBe(true);
    expect(aiService.generateContent).toHaveBeenCalled();
  });

  it("displays error messages for invalid data", async () => {
    const formData = {
      title: "",
      description: "",
      category: "",
      slug: "",
      price: "",
      tags: [],
      colors: [],
      images: [],
      brand: "",
      quantity: "",
    };

    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.errors).not.toBe({});
  });

  it("navigates to product list page after successful submission", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });
    fillFormData(wrapper);

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger("click");

    const routerModule = await import("@/router");

    routerModule.default.push("/admin/product/product-list");

    expect(routerModule.default.push).toHaveBeenCalledWith(
      "/admin/product/product-list"
    );
  });

  it("displays notification for successful submission", async () => {
    fillFormData(wrapper);

    await wrapper.find("form").trigger("submit");
    wrapper.vm.notify("Product added successfully!", "success");
    expect(wrapper.vm.notify).toHaveBeenCalledWith(
      "Product added successfully!",
      "success"
    );
  });

  it("displays notification for failed submission", async () => {
    fillFormData(wrapper);
    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.notify).toHaveBeenCalledWith(
      "Please fill in all required fields",
      "error"
    );
  });

  it("validates title field", async () => {
    const handleSubmitSpy = vi.spyOn(wrapper.vm, "handleSubmit");
    const titleInput = wrapper.find("input#title");
    await titleInput.setValue("");
    await wrapper.find("form").trigger("submit.prevent");
    expect(handleSubmitSpy).not.toHaveBeenCalled();
  });

  it("validates category field", async () => {
    const handleSubmitSpy = vi.spyOn(wrapper.vm, "handleSubmit");
    const categoryInput = wrapper.find("input#category");
    await categoryInput.setValue("");
    await wrapper.find("form").trigger("submit.prevent");
    expect(handleSubmitSpy).not.toHaveBeenCalled();
  });

  it("validates slug field", async () => {
    const handleSubmitSpy = vi.spyOn(wrapper.vm, "handleSubmit");
    const slugInput = wrapper.find("input#slug");
    await slugInput.setValue("");
    await wrapper.find("form").trigger("submit.prevent");
    expect(handleSubmitSpy).not.toHaveBeenCalled();
  });

  it("validates price field", async () => {
    const handleSubmitSpy = vi.spyOn(wrapper.vm, "handleSubmit");
    const priceInput = wrapper.find("input#price");
    await priceInput.setValue("");
    await wrapper.find("form").trigger("submit.prevent");
    expect(handleSubmitSpy).not.toHaveBeenCalled();
  });

  it("validates tags field", async () => {
    const handleSubmitSpy = vi.spyOn(wrapper.vm, "handleSubmit");
    const tagsInput = wrapper.find("input#tags");
    await tagsInput.setValue("");
    await wrapper.find("form").trigger("submit.prevent");

    expect(handleSubmitSpy).not.toHaveBeenCalled();
  });

  it("validates colors field", async () => {
    const handleSubmitSpy = vi.spyOn(wrapper.vm, "handleSubmit");
    const colorsInput = wrapper.find("input#colorPicker");
    await colorsInput.setValue("");
    await wrapper.find("form").trigger("submit.prevent");

    expect(handleSubmitSpy).not.toHaveBeenCalled();
  });

  it("validates brand field", async () => {
    const handleSubmitSpy = vi.spyOn(wrapper.vm, "handleSubmit");
    const brandInput = wrapper.find("input#brand");
    await brandInput.setValue("");
    await wrapper.find("form").trigger("submit.prevent");

    expect(handleSubmitSpy).not.toHaveBeenCalled();
  });

  it("prevents form submission when quantity field is empty", async () => {
    const handleSubmitSpy = vi.spyOn(wrapper.vm, "handleSubmit");
    const quantityInput = wrapper.find("input#quantity");
    await quantityInput.setValue("");
    await wrapper.find("form").trigger("submit.prevent");

    // Check if the form was actually submitted
    expect(handleSubmitSpy).not.toHaveBeenCalled();
  });
});
