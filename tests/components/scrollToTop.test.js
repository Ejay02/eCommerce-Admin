import { mount } from "@vue/test-utils";
import { scrollToTop } from "@/utils/scrollToTop";
import ScrollToTop from "@/components/scrollToTopBtn.vue";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock the scrollToTop utility function
vi.mock("@/utils/scrollToTop", () => ({
  scrollToTop: vi.fn(),
}));

describe("ScrollToTop", () => {
  let wrapper;

  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });

    wrapper = mount(ScrollToTop);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("does not render the button when isVisible is false", () => {
    expect(wrapper.find(".scroll-to-top").exists()).toBe(false);
  });

  it("renders the button when isVisible is true", async () => {
    window.scrollY = 201;
    // Manually call the handleScroll function
    wrapper.vm.handleScroll();
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".scroll-to-top").exists()).toBe(true);
  });

  it("calls scrollToTop when button is clicked", async () => {
    window.scrollY = 201;
    wrapper.vm.handleScroll();
    await wrapper.vm.$nextTick();
    await wrapper.find(".scroll-to-top").trigger("click");
    expect(scrollToTop).toHaveBeenCalled();
  });

  it("adds scroll event listener on mount", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    mount(ScrollToTop);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  it("removes scroll event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const wrapper = mount(ScrollToTop);
    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  it("updates isVisible when scrolling", async () => {
    expect(wrapper.vm.isVisible).toBe(false);

    window.scrollY = 201;
    wrapper.vm.handleScroll();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isVisible).toBe(true);

    window.scrollY = 199;
    wrapper.vm.handleScroll();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isVisible).toBe(false);
  });
});
