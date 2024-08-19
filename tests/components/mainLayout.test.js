import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import { createPinia, setActivePinia } from "pinia";
import AppLayout from "@/components/mainLayout.vue";
import { useUserStore } from "@/store/useUserStore";
import { useNotifications } from "@/composable/globalAlert";
import { nextTick } from "vue";
import { userStore } from "@/store/useUserStore";

// Mock the useNotifications composable
vi.mock("@/composable/globalAlert.js", () => ({
  useNotifications: vi.fn().mockReturnValue({
    notify: vi.fn(),
  }),
}));

describe("AppLayout.vue", () => {
  let wrapper;
  let router;

  beforeEach(() => {
    // Set up Pinia
    setActivePinia(createPinia());

    // Create a router instance with routes
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/", component: { template: "<div>Home</div>" } },
        {
          path: "/admin/dashboard",
          component: { template: "<div>Dashboard</div>" },
        },
        {
          path: "/admin/customers",
          component: { template: "<div>Customers</div>" },
        },
        {
          path: "/admin/product",
          component: { template: "<div>Add Product</div>" },
        },
        {
          path: "/admin/product/product-list",
          component: { template: "<div>Product List</div>" },
        },
        {
          path: "/admin/product/brand",
          component: { template: "<div>Brand</div>" },
        },
        {
          path: "/admin/product/brand-list",
          component: { template: "<div>Brand List</div>" },
        },
        {
          path: "/admin/product/category",
          component: { template: "<div>Category</div>" },
        },
        {
          path: "/admin/product/category-list",
          component: { template: "<div>Category List</div>" },
        },
        {
          path: "/admin/enquiries",
          component: { template: "<div>Enquiries</div>" },
        },
        { path: "/admin/blog", component: { template: "<div>Add Blog</div>" } },
        {
          path: "/admin/blog/blog-list",
          component: { template: "<div>Blog List</div>" },
        },
        {
          path: "/admin/blog/add-blog-category",
          component: { template: "<div>Add Blog Category</div>" },
        },
        {
          path: "/admin/blog/blog-category-list",
          component: { template: "<div>Blog Category List</div>" },
        },
        {
          path: "/admin/settings",
          component: { template: "<div>Settings</div>" },
        },
      ],
    });

    // Mount the component with the router
    wrapper = mount(AppLayout);
  });

  it("renders the logo and navigation links", async () => {
    // Check if the logo and navigation items are rendered
    expect(wrapper.find(".logo").exists()).toBe(true);

    const dashboardItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Dashboard"));
    expect(dashboardItem.length > 0).toBe(true);

    const customersItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Customers"));
    expect(customersItem.length > 0).toBe(true);

    const addProductItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Add Product"));
    expect(addProductItem.length > 0).toBe(true);

    const productListItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Product List"));
    expect(productListItem.length > 0).toBe(true);

    const brandItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Brand"));
    expect(brandItem.length > 0).toBe(true);

    const brandListItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Brand List"));
    expect(brandListItem.length > 0).toBe(true);

    const categoryItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Category"));
    expect(categoryItem.length > 0).toBe(true);

    const categoryListItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Category List"));
    expect(categoryListItem.length > 0).toBe(true);

    const enquiriesItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Enquiries"));
    expect(enquiriesItem.length > 0).toBe(true);

    const addBlogItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Add Blog"));
    expect(addBlogItem.length > 0).toBe(true);

    const blogListItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Blog List"));
    expect(blogListItem.length > 0).toBe(true);

    const addBlogCategoryItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Add Blog Category"));
    expect(addBlogCategoryItem.length > 0).toBe(true);

    const blogCategoryListItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Blog Category List"));
    expect(blogCategoryListItem.length > 0).toBe(true);

    const settingsItem = wrapper
      .findAll("a-menu-item")
      .filter((item) => item.text().includes("Settings"));
    expect(settingsItem.length > 0).toBe(true);
  });

  it("should render the layout and menu items correctly", () => {
    // Check if the layout renders correctly
    expect(wrapper.find(".logo").exists()).toBe(true);
    expect(wrapper.find(".profile").exists()).toBe(true);
    expect(wrapper.find('input[type="search"]').exists()).toBe(true);
  });

  //  TODO
  // it("should call notify function on logout", async () => {
  //   const dropdown = wrapper.find("a-dropdown");
  //   await dropdown.trigger("click"); // Open dropdown
  //   await nextTick();

  //   const logoutButton = wrapper.find('[data-test="logout"]');
  //   expect(logoutButton.exists()).toBe(true); // Ensure button exists

  //   await logoutButton.trigger("click");

  //   const { notify } = useNotifications();
  //   expect(notify).toHaveBeenCalledWith("Logout successful!", "success");
  // });

  // it("toggles the sidebar collapse state", async () => {
  //   const sider = wrapper.find("a-layout-sider");
  //   expect(sider.props("collapsed")).toBe(false);

  //   await sider.vm.$emit("collapse", true);
  //   await nextTick();

  //   expect(sider.props("collapsed")).toBe(true);
  // });

  // it("displays user avatar or initials", async () => {
  //   const userStore = useUserStore();
  //   userStore.user = {
  //     firstname: "John",
  //     lastname: "Doe",
  //     email: "john.doe@example.com",
  //   };
  //   localStorage.setItem("avatar", "http://example.com/avatar.jpg");

  //   // Re-mount component to re-apply the avatar from local storage
  //   wrapper = mount(AppLayout, {
  //     global: {
  //       plugins: [createTestingPinia()],
  //     },
  //   });
  //   // Check if the avatar is displayed
  //   expect(wrapper.find("img").exists()).toBe(true);
  //   expect(wrapper.find("img").attributes("src")).toBe(
  //     "http://example.com/avatar.jpg"
  //   );

  //   // Clear the avatar and check if initials are displayed
  //   localStorage.removeItem("avatar");

  //   await wrapper.vm.$nextTick(); // Wait for the DOM to update
  //   expect(wrapper.find(".default-avatar").exists()).toBe(true);
  // });

  // it("handles logout correctly", async () => {
  //   const dropdown = wrapper.find("a-dropdown");
  //   await dropdown.trigger("click"); // Open dropdown
  //   await nextTick();

  //   const logoutButton = wrapper.find('[data-test="logout"]');
  //   expect(logoutButton.exists()).toBe(true);

  //   await logoutButton.trigger("click");

  //   const { notify } = useNotifications();
  //   expect(notify).toHaveBeenCalledWith("Logout successful!", "success");

  //   // Check if router.push was called (you might need to mock the router)
  //   // expect(mockRouter.push).toHaveBeenCalledWith("/");
  // });

  it("displays search input and notifications", async () => {
    // Check if search input is rendered
    expect(wrapper.find('input[type="search"]').exists()).toBe(true);
    expect(wrapper.find("i.bi-search").exists()).toBe(true);

    // Check if notifications are displayed
    expect(wrapper.find("i.bi-bell").exists()).toBe(true);
  });

  it("renders the breadcrumb component", () => {
    // Check if the breadcrumb component is rendered
    expect(wrapper.find("a-breadcrumb").exists()).toBe(true);
  });

  it("renders the router-view correctly", async () => {
    // Check if router-view is rendered correctly
    expect(wrapper.find("router-view").exists()).toBe(true);
  });
});
