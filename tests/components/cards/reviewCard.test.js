import { mount, flushPromises, waitFor } from "@vue/test-utils";
import { expect, describe, it, vi } from "vitest";
import reviewCard from "@/components/cards/reviewsCard.vue";

describe("reviewCard", () => {
  it("renders the component", () => {
    const wrapper = mount(reviewCard);
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the loading state initially", () => {
    const wrapper = mount(reviewCard);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
  });

  it("fetches and displays the data", async () => {
    const wrapper = mount(reviewCard);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test="list"]').exists()).toBe(true);
  });

  it("displays the load more button when data is loaded", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                name: { last: "Doe" },
                picture: { large: "https://example.com/picture" },
              },
            ],
          }),
      })
    );

    global.fetch = mockFetch;

    const wrapper = mount(reviewCard);
    await wrapper.vm.$nextTick();
    await flushPromises(); // Wait for all pending promises to resolve

    expect(wrapper.vm.initLoading).toBe(false);
    expect(wrapper.find('[data-test="load-more"]').exists()).toBe(true);
  });

  it("loads more data when the button is clicked", async () => {
    const wrapper = mount(reviewCard);
    await wrapper.vm.$nextTick();
    await flushPromises(); // Wait for all pending promises to resolve

    let loadMoreButton;
    while (!loadMoreButton) {
      await wrapper.vm.$nextTick();
      loadMoreButton = wrapper.find('[data-test="load-more"]');
    }

    await loadMoreButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test="list"]').exists()).toBe(true);
  });
});
