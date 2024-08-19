import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import NotificationComponent from "@/components/alert.vue";

describe("NotificationComponent", () => {
  let wrapper;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders correctly with default props", async () => {
    wrapper = mount(NotificationComponent, {
      props: {
        message: "Test message",
      },
    });

    await nextTick();

    expect(wrapper.text()).toContain("Test message");
    expect(wrapper.find(".notification").classes()).toContain("info");
    expect(wrapper.find("i").classes()).toContain("bi-exclamation-circle");
  });

  it("applies correct class and icon for success type", async () => {
    wrapper = mount(NotificationComponent, {
      props: {
        message: "Success message",
        type: "success",
      },
    });

    await nextTick();

    expect(wrapper.find(".notification").classes()).toContain("success");
    expect(wrapper.find("i").classes()).toContain("fa-circle-check");
  });

  it("applies correct class and icon for error type", async () => {
    wrapper = mount(NotificationComponent, {
      props: {
        message: "Error message",
        type: "error",
      },
    });

    await nextTick();

    expect(wrapper.find(".notification").classes()).toContain("error");
    expect(wrapper.find("i").classes()).toContain("fa-circle-xmark");
  });

  it("applies correct class and icon for warning type", async () => {
    wrapper = mount(NotificationComponent, {
      props: {
        message: "Warning message",
        type: "warning",
      },
    });

    await nextTick();

    expect(wrapper.find(".notification").classes()).toContain("warning");
    expect(wrapper.find("i").classes()).toContain(
      "bi-exclamation-triangle-fill"
    );
  });

  it("hides after specified duration", async () => {
    wrapper = mount(NotificationComponent, {
      props: {
        message: "Test message",
        duration: 1000,
      },
    });

    await nextTick();

    expect(wrapper.find(".notification").exists()).toBe(true);

    vi.advanceTimersByTime(1000);
    await nextTick();

    expect(wrapper.find(".notification").exists()).toBe(false);
  });

  it("uses custom duration", async () => {
    wrapper = mount(NotificationComponent, {
      props: {
        message: "Test message",
        duration: 5000,
      },
    });

    await nextTick();

    expect(wrapper.find(".notification").exists()).toBe(true);

    vi.advanceTimersByTime(3000);
    await nextTick();

    expect(wrapper.find(".notification").exists()).toBe(true);

    vi.advanceTimersByTime(2000);
    await nextTick();

    expect(wrapper.find(".notification").exists()).toBe(false);
  });
});
