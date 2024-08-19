import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import LoadingScreen from "@/components/loadingScreen.vue";

describe("LoadingScreen", () => {
  it("renders the loading spinner and text correctly", () => {
    const wrapper = mount(LoadingScreen);

    // Check if the spinner is rendered
    const spinner = wrapper.find(".spinner-border");
    expect(spinner.exists()).toBe(true);

    // Check if the loading text is rendered
    const loadingText = wrapper.find(".loading-text");
    expect(loadingText.exists()).toBe(true);
    expect(loadingText.text()).toBe("Loading, stand by...");
  });

  it("has correct styles for the loading screen", () => {
    const wrapper = mount(LoadingScreen);
    const loadingScreen = wrapper.find(".loading-screen");

    expect(loadingScreen.exists()).toBe(true);

    const style = window.getComputedStyle(loadingScreen.element);

    expect(style.cssText).toBeDefined;
  });

  it("applies the correct styles to the loading text", () => {
    const wrapper = mount(LoadingScreen);
    const loadingText = wrapper.find(".loading-text");

    expect(loadingText.exists()).toBe(true);

    const style = window.getComputedStyle(loadingText.element);

    expect(style.display).toBe("block");
    expect(style.fontSize).toBe("1.5em");
    expect(style.backgroundColor).toBe("rgba(0, 0, 0, 0)");
    expect(style.fontWeight).toBe("bold");
  });
});
