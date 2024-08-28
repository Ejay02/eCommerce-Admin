import axios from "axios";
import router from "@/router";
import { mount } from "@vue/test-utils";
import Brand from "@/pages/catalog/brand.vue";
import { describe, it, expect, vi } from "vitest";

vi.mock("axios");
vi.mock("@/router", () => {
  const push = vi.fn();
  return {
    default: {
      push,
    },
  };
});

describe("Brand component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Brand);
  });

  it("renders form with input and button", () => {
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("input[type='text']").exists()).toBe(true);
    expect(wrapper.find("button[type='submit']").exists()).toBe(true);
  });

  it("calls handleSubmit on form submission", async () => {
    console.log('am i ??', wrapper.html())
    const handleSubmit = vi.spyOn(wrapper.vm, "handleSubmit");
    await wrapper.find("form").trigger("submit.prevent");
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("sends request to create brand on handleSubmit", async () => {
    await wrapper.find("input[type='text']").setValue("Test Brand");
    await wrapper.find("form").trigger("submit.prevent");
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/brand`,
      { title: "Test Brand" }
    );
  });

  it("displays success notification on successful brand creation", async () => {
    const notify = vi.spyOn(wrapper.vm, "notify");
    await wrapper.find("input[type='text']").setValue("Test Brand");
    axios.post.mockResolvedValueOnce({ data: true });
    await wrapper.find("form").trigger("submit.prevent");
    expect(notify).toHaveBeenCalledTimes(1);
    expect(notify).toHaveBeenCalledWith("Brand added successfully!", "success");
  });

  it("displays error notification on failed brand creation", async () => {
    const notify = vi.spyOn(wrapper.vm, "notify");
    await wrapper.find("input[type='text']").setValue("Test Brand");
    axios.post.mockRejectedValueOnce(new Error("Error adding brand"));
    await wrapper.find("form").trigger("submit.prevent");
    expect(notify).toHaveBeenCalledTimes(1);
    expect(notify).toHaveBeenCalledWith("Error adding brand", "error");
  });

  it("disables submit button when form is empty", () => {
    expect(wrapper.find("button[type='submit']").attributes("disabled")).toBe(
      "disabled"
    );
  });

  it("enables submit button when form is filled", async () => {
    await wrapper.find("input[type='text']").setValue("Test Brand");
    expect(wrapper.find("button[type='submit']").attributes("disabled")).toBe(
      undefined
    );
  });
});
