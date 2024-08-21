import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import BlogList from "@/pages/blog/blogList.vue";
import { useBlogStore } from "@/store/useBlogStore";
import { useModalStore } from "@/store/useModalStore";
import LoadingScreen from "@/components/loadingScreen.vue";
import Empty from "@/components/empty.vue";
import Pagination from "@/components/pagination.vue";

// Mock the router
vi.mock("vue-router", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe("BlogList", () => {
  let wrapper;
  let blogStore;
  let modalStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    blogStore = useBlogStore();
    modalStore = useModalStore();

    // Mock the store methods
    blogStore.fetchBlogs = vi.fn();

    wrapper = mount(BlogList, {
      global: {
        components: {
          LoadingScreen,
          Empty,
          Pagination,
        },
        stubs: ["router-link"],
      },
    });
  });

  it("renders LoadingScreen when loading", async () => {
    blogStore.loading = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(LoadingScreen).exists()).toBe(true);
  });

  it("renders Empty component when no blogs", async () => {
    blogStore.blogs = [];
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Empty).exists()).toBe(true);
  });

  it("renders blog list when blogs are available", async () => {
    blogStore.blogs = [
      {
        _id: "1",
        title: "Blog 1",
        description: "Description 1",
        author: "Author 1",
        category: "Category 1",
      },
      {
        _id: "2",
        title: "Blog 2",
        description: "Description 2",
        author: "Author 2",
        category: "Category 2",
      },
    ];
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(".blog-item").length).toBe(2);
  });

  it("truncates blog description correctly", () => {
    const longDescription =
      "This is a very long description that should be truncated to only five words";
    const truncated = wrapper.vm.truncateDescription(longDescription);
    expect(truncated).toBe("This is a very long...");
  });

  it("calls showDelModal with correct parameters when delete button is clicked", async () => {
    blogStore.blogs = [
      {
        _id: "1",
        title: "Blog 1",
        description: "Description 1",
        author: "Author 1",
        category: "Category 1",
      },
    ];
    await wrapper.vm.$nextTick();

    const deleteButton = wrapper.find(".bi-trash");
    await deleteButton.trigger("click");

    expect(modalStore.deleteModal).toBe(true);
    expect(modalStore.modalId).toBe("1");
    expect(modalStore.modalTitle).toBe("Blog 1");
    expect(modalStore.source).toBe("blogList");
  });

  it("calls fetchBlogs on mount", () => {
    expect(blogStore.fetchBlogs).toHaveBeenCalled();
  });

  it("calls fetchBlogs with correct parameters when goToPage is called", async () => {
    blogStore.totalPages = 5;
    await wrapper.vm.goToPage(2);
    await wrapper.vm.$nextTick(); // Wait for any DOM updates
    expect(blogStore.fetchBlogs).toHaveBeenCalledWith({ page: 2, limit: 10 });
  });

  it("renders Pagination component when blogs are available", async () => {
    blogStore.blogs = [
      {
        _id: "1",
        title: "Blog 1",
        description: "Description 1",
        author: "Author 1",
        category: "Category 1",
      },
    ];
    blogStore.totalPages = 5;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Pagination).exists()).toBe(true);
  });
});
