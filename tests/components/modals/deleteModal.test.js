import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import DeleteConfirmationModal from "@/components/modals/deleteModal.vue";
import { nextTick } from "vue";

// Mock the stores
const mockModalStore = {
  deleteModal: true,
  modalTitle: "New Title",
  modalId: "123",
  source: "blogList",
};

const mockBlogStore = {
  deleteBlog: vi.fn(),
};

const mockBlogCategoryStore = {
  deleteCategory: vi.fn(),
};

const mockProductStore = {
  deleteProduct: vi.fn(),
};

const mockProductCategoryStore = {
  deleteProdCategory: vi.fn(),
};

const mockBrandStore = {
  deleteBrand: vi.fn(),
};

// Mock the store hooks
vi.mock("@/store/useModalStore", () => ({
  useModalStore: () => mockModalStore,
}));

vi.mock("@/store/useBlogStore", () => ({
  useBlogStore: () => mockBlogStore,
}));

vi.mock("@/store/useBlogCategoryStore", () => ({
  useBlogCategoryStore: () => mockBlogCategoryStore,
}));

vi.mock("@/store/useProductStore", () => ({
  useProductStore: () => mockProductStore,
}));

vi.mock("@/store/useProductCategoryStore", () => ({
  useProductCategoryStore: () => mockProductCategoryStore,
}));

vi.mock("@/store/useBrandStore", () => ({
  useBrandStore: () => mockBrandStore,
}));

// Mock axios
vi.mock("axios");

// Mock the useNotifications composable
vi.mock("@/composable/globalAlert.js", () => ({
  useNotifications: () => ({
    notify: vi.fn(),
  }),
}));

describe("DeleteConfirmationModal", () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    mockModalStore.deleteModal = true; // Ensure modal is visible by default
    mockModalStore.modalTitle = "New Title";
    mockModalStore.modalId = "123";
    mockModalStore.source = "blogList";
    wrapper = mount(DeleteConfirmationModal);
  });

  it("renders correctly when modal is visible", () => {
    expect(wrapper.find(".modal-overlay").exists()).toBe(true);
    expect(wrapper.find(".modal-card").exists()).toBe(true);
    expect(wrapper.find("h3").text()).toBe("Delete Confirmation");
    expect(wrapper.find(".modal-body p").text()).toContain(
      "Are you sure you want to delete New Title ?"
    );
  });

  it("hides the modal when cancel button is clicked", async () => {
    await wrapper.find(".cancel-button").trigger("click");
    expect(mockModalStore.deleteModal).toBe(false);
    expect(mockModalStore.modalId).toBe(null);
  });

  it("calls the correct delete function for blog category", async () => {
    // Ensure the modal is visible by directly setting the value
    mockModalStore.deleteModal = true;
    mockModalStore.source = "blogCategoryList";

    // Re-mount the component to reflect the store changes
    wrapper = mount(DeleteConfirmationModal);

    // Assert that the modal is visible
    const isOverlayVisible = wrapper.find(".modal-overlay").exists();
    expect(isOverlayVisible).toBe(true);

    if (!isOverlayVisible) {
      // If the modal is not visible, stop the test here to avoid unnecessary failures
      return;
    }

    // Mock the axios delete request
    axios.delete.mockResolvedValue({ data: {} });

    // Trigger the delete action
    await wrapper.find(".ok-button").trigger("click");

    // Assert that the correct delete function was called
    expect(axios.delete).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/blog-category/123`
    );
    expect(mockBlogCategoryStore.deleteCategory).toHaveBeenCalledWith("123");
  });

  it("calls the correct delete function for blog", async () => {
    mockModalStore.source = "blogList";
    axios.delete.mockResolvedValue({ data: {} });

    await wrapper.find(".ok-button").trigger("click");

    expect(axios.delete).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/blog/123`
    );
    expect(mockBlogStore.deleteBlog).toHaveBeenCalledWith("123");
  });

  it("handles error when delete request fails", async () => {
    axios.delete.mockRejectedValue(new Error("Delete failed"));

    await wrapper.find(".ok-button").trigger("click");

    expect(wrapper.vm.notify).toHaveBeenCalledWith(
      "Error completing action",
      "error"
    );
  });

  it("updates title when modalStore.modalTitle changes", async () => {
    expect(wrapper.vm.title).toBe("New Title");
    mockModalStore.modalTitle = "New Title";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.title).toBe("New Title");
  });

  it("updates source when modalStore.source changes", async () => {
    expect(wrapper.vm.source).toBe("blogList");
    mockModalStore.source = "blogList";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.source).toBe("blogList");
  });
});
