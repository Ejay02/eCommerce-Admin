import { mount } from "@vue/test-utils";
import NotFound from "@/components/error/notFound.vue";

describe("NotFound", () => {
  it("renders the 404 page", () => {
    const wrapper = mount(NotFound);
    expect(wrapper.find(".page_404").exists()).toBe(true);
  });

  it("displays the 404 header", () => {
    const wrapper = mount(NotFound);
    expect(wrapper.find(".four_zero_four_text h1").text()).toBe("404");
  });

  it("displays the error message", () => {
    const wrapper = mount(NotFound);
    expect(wrapper.find(".content_box_404 h3").text()).toBe(
      "Hmmm, looks like you're lost"
    );
    expect(wrapper.find(".content_box_404 p").text()).toBe(
      "The page you are looking for is not available!"
    );
  });

  it("displays the Go Home button", () => {
    const wrapper = mount(NotFound);
    expect(wrapper.find(".btn").exists()).toBe(true);
    expect(wrapper.find(".link_404").attributes().href).toBe(
      "/admin/dashboard"
    );
  });
});
