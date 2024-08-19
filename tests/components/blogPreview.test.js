import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BlogCard from "@/components/blogPreview.vue";

describe("BlogCard.vue", () => {
  const mockFormData = {
    title: "Test Blog Title",
    author: "Test Author",
    category: "Test Category",
    image: "https://example.com/test-image.jpg",
    description: "<p>This is a test description.</p>",
  };

  it("renders the title", () => {
    const wrapper = mount(BlogCard, {
      props: {
        formData: mockFormData,
      },
    });
    expect(wrapper.find(".title").text()).toBe(mockFormData.title);
  });

  it("renders the author", () => {
    const wrapper = mount(BlogCard, {
      props: {
        formData: mockFormData,
      },
    });
    expect(wrapper.find(".author").text()).toBe(mockFormData.author);
  });

  it("renders the date", () => {
    const wrapper = mount(BlogCard, {
      props: {
        formData: mockFormData,
      },
    });
    const date = new Date().toLocaleDateString();
    expect(wrapper.find(".date").text()).toBe(date);
  });

  it("renders the category", () => {
    const wrapper = mount(BlogCard, {
      props: {
        formData: mockFormData,
      },
    });
    expect(wrapper.find(".category-tag").text()).toBe(mockFormData.category);
  });

  it("renders the image with correct src", () => {
    const wrapper = mount(BlogCard, {
      props: {
        formData: mockFormData,
      },
    });
    expect(wrapper.find("img").attributes("src")).toBe(mockFormData.image);
  });

  it("renders the description correctly", () => {
    const wrapper = mount(BlogCard, {
      props: {
        formData: mockFormData,
      },
    });
    expect(wrapper.find(".desc").html()).toContain(mockFormData.description);
  });
});
