import BlogCategoryList from "@/pages/blog/blogCategoryList.vue";
import { describe, it, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";

import { useBlogCategoryStore } from "@/store/useBlogCategoryStore";
import { useModalStore } from "@/store/useModalStore";
import LoadingScreen from "@/components/loadingScreen.vue";
import Pagination from "@/components/pagination.vue";
import Empty from "@/components/empty.vue";

vi.mock("@/store/useBlogCategoryStore", () => ({
  useBlogCategoryStore: vi.fn(),
}));

vi.mock("@/store/useModalStore", () => ({
  useModalStore: vi.fn(),
}));

describe("BlogCategoryList Component", () => {
  it("renders LoadingScreen when categoryStore.loading is true", async () => {
    const categoryStore = {
      loading: true,
      categories: [],
      fetchCategories: vi.fn(),
    };
    const modalStore = {
      deleteModal: false,
      modalId: null,
      modalTitle: "",
      source: "",
    };

    useBlogCategoryStore.mockReturnValue(categoryStore);
    useModalStore.mockReturnValue(modalStore);

    const wrapper = mount(BlogCategoryList);

    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.findComponent(LoadingScreen).exists()).toBe(true);
    expect(wrapper.findComponent(Empty).exists()).toBe(true);
  });

  it("renders Empty component when categoryStore.categories is empty and loading is false", async () => {
    const categoryStore = {
      loading: false,
      categories: [],
      fetchCategories: vi.fn(),
    };
    const modalStore = {
      deleteModal: false,
      modalId: null,
      modalTitle: "",
      source: "",
    };

    useBlogCategoryStore.mockReturnValue(categoryStore);
    useModalStore.mockReturnValue(modalStore);

    const wrapper = mount(BlogCategoryList);

    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.findComponent(LoadingScreen).exists()).toBe(false);
    expect(wrapper.findComponent(Empty).exists()).toBe(true);
  });

  it("renders category items when categoryStore.categories is not empty and loading is false", async () => {
    const categoryStore = {
      loading: false,
      categories: [
        {
          _id: "1",
          title: "Category 1",
          createdAt: new Date().toISOString(),
        },
      ],
      fetchCategories: vi.fn(),
    };
    const modalStore = {
      deleteModal: false,
      modalId: null,
      modalTitle: "",
      source: "",
    };

    useBlogCategoryStore.mockReturnValue(categoryStore);
    useModalStore.mockReturnValue(modalStore);

    const wrapper = mount(BlogCategoryList);
    await flushPromises(); // Ensure all promises are resolved

    expect(wrapper.findAll(".category-item").length).toBe(1);
    expect(wrapper.find(".category-item h4").text()).toBe("Category 1");
    expect(wrapper.findComponent(Empty).exists()).toBe(false);
  });

  it("calls showDelModal with correct arguments", async () => {
    const categoryStore = {
      loading: false,
      categories: [
        {
          _id: "1",
          title: "Category 1",
          createdAt: new Date().toISOString(),
        },
      ],
      fetchCategories: vi.fn(),
    };
    const modalStore = {
      deleteModal: false,
      modalId: null,
      modalTitle: "",
      source: "",
    };

    useBlogCategoryStore.mockReturnValue(categoryStore);
    useModalStore.mockReturnValue(modalStore);

    const wrapper = mount(BlogCategoryList);
    await flushPromises(); // Ensure all promises are resolved

    wrapper.find("button").trigger("click");
    expect(modalStore.deleteModal).toBe(true);
    expect(modalStore.modalId).toBe("1");
    expect(modalStore.modalTitle).toBe("Category 1");
    expect(modalStore.source).toBe("blogCategoryList");
  });

  it("fetches categories on component mount", async () => {
    const categoryStore = {
      loading: false,
      categories: [],
      fetchCategories: vi.fn(),
    };
    const modalStore = {
      deleteModal: false,
      modalId: null,
      modalTitle: "",
      source: "",
    };

    useBlogCategoryStore.mockReturnValue(categoryStore);
    useModalStore.mockReturnValue(modalStore);

    mount(BlogCategoryList);
    await flushPromises(); // Ensure all promises are resolved

    expect(categoryStore.fetchCategories).toHaveBeenCalled();
  });
});
