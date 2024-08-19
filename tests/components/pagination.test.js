import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Pagination from "@/components/pagination.vue";

describe("Pagination.vue", () => {
  it("renders the current page and total pages", () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    });

    expect(wrapper.text()).toContain("Page 1 of 5");
  });

  it('disables the "Previous" button when on the first page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    });

    const prevButton = wrapper.find("button:first-child");
    expect(prevButton.attributes("disabled")).toBeDefined();
  });

  it('disables the "Next" button when on the last page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 5,
        totalPages: 5,
      },
    });

    const nextButton = wrapper.find("button:last-child");
    expect(nextButton.attributes("disabled")).toBeDefined();
  });

  it('emits "pageChange" with the correct page number when "Previous" is clicked', async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 2,
        totalPages: 5,
      },
    });

    await wrapper.find("button:first-child").trigger("click");
    expect(wrapper.emitted("pageChange")).toBeTruthy();
    expect(wrapper.emitted("pageChange")[0]).toEqual([1]);
  });

  it('emits "pageChange" with the correct page number when "Next" is clicked', async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 2,
        totalPages: 5,
      },
    });

    await wrapper.find("button:last-child").trigger("click");
    expect(wrapper.emitted("pageChange")).toBeTruthy();
    expect(wrapper.emitted("pageChange")[0]).toEqual([3]);
  });
});
