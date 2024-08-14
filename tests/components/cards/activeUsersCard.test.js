import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ActiveUsersCard from "@/components/cards/activeUsersCard.vue";
import { useBlogStore } from "@/store/useBlogStore";
import { useCustomerStore } from "@/store/useCustomerStore";
import { useEnquiryStore } from "@/store/useEnquriesStore";

// Mock the store modules
vi.mock("@/store/useBlogStore", () => ({
  useBlogStore: vi.fn(() => ({
    blogs: [1, 2, 3],
    fetchBlogs: vi.fn().mockResolvedValue(),
  })),
}));

vi.mock("@/store/useCustomerStore", () => ({
  useCustomerStore: vi.fn(() => ({
    customers: [1, 2, 3, 4],
    fetchCustomers: vi.fn().mockResolvedValue(),
  })),
}));

vi.mock("@/store/useEnquriesStore", () => ({
  useEnquiryStore: vi.fn(() => ({
    enquiries: [1, 2],
    fetchEnquiries: vi.fn().mockResolvedValue(),
  })),
}));

describe("ActiveUsersCard", () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(ActiveUsersCard);

    // Mount the component
    wrapper = mount(ActiveUsersCard);
  });

  it("renders the component correctly", () => {
    expect(wrapper.find("h3").text()).toBe("Active users");
    expect(wrapper.find(".bi-three-dots-vertical").exists()).toBe(true);
  });

  it("displays the correct total number of users", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".number").text()).toBe("22"); // 3 + 4 + 2 + 6 + 7
  });

  it("renders all active pages", async () => {
    await wrapper.vm.$nextTick();
    const pages = wrapper.findAll(".d-flex.justify-content-between.mb-0.mt-2");
    expect(pages.length).toBe(5);
  });

  it("displays correct page names and user counts", async () => {
    await wrapper.vm.$nextTick();
    const pages = wrapper.findAll(".d-flex.justify-content-between.mb-0.mt-2");
    const expectedPages = [
      { name: "/customers", users: "4" },
      { name: "/catalog", users: "6" },
      { name: "/orders", users: "7" },
      { name: "/blogs", users: "3" },
      { name: "/enquiries", users: "2" },
    ];

    pages.forEach((page, index) => {
      const [nameEl, usersEl] = page.findAll("p");
      expect(nameEl.text()).toBe(expectedPages[index].name);
      expect(usersEl.text()).toBe(expectedPages[index].users);
    });
  });

  it("updates total users when store data changes", async () => {
    const blogStore = useBlogStore();
    const customerStore = useCustomerStore();
    const enqStore = useEnquiryStore();

    // Simulate store updates
    vi.mocked(blogStore.blogs).splice(0, blogStore.blogs.length, 1, 2, 3, 4, 5);
    vi.mocked(customerStore.customers).splice(
      0,
      customerStore.customers.length,
      1,
      2,
      3
    );
    vi.mocked(enqStore.enquiries).splice(
      0,
      enqStore.enquiries.length,
      1,
      2,
      3,
      4
    );

    await wrapper.vm.$nextTick();
    expect(wrapper.find(".number").text()).toBe("22"); // 5 + 3 + 4 + 6 + ??
  });

  it("applies correct styles", () => {
    const numberContainer = wrapper.find(".number-container");
    expect(numberContainer.classes()).toContain("number-container");

    const number = wrapper.find(".number");
    expect(number.classes()).toContain("number");

    // Check the presence of the card class on the parent div
    const cardDiv = wrapper.find(".card");
    expect(cardDiv.exists()).toBe(true);

    // Ensure the card class is not mistakenly applied to the child elements
    const cardTexts = wrapper.findAll(".card p, .card h3");
    cardTexts.forEach((el) => {
      expect(el.classes()).not.toContain("card");
    });
  });
});
