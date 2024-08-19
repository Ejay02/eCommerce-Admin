import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import EmptyContainer from "@/components/empty.vue";

// Mock the 'a-empty' component
const MockEmpty = {
  props: ["image", "description"],
  template: `
    <div>
      <img :src="image" alt="Empty Image" class="mock-image" />
      <p>{{ description }}</p>
    </div>
  `,
};

describe("EmptyContainer", () => {
  it("renders empty state with correct image and description", () => {
    const wrapper = mount(EmptyContainer, {
      global: {
        components: {
          "a-empty": MockEmpty,
        },
      },
    });

    // Check if the empty component exists
    const emptyComponent = wrapper.findComponent(MockEmpty);
    expect(emptyComponent.exists()).toBe(true);

    // Check if the image and description are rendered correctly
    const emptyImage = emptyComponent.find(".mock-image");
    expect(emptyImage.exists()).toBe(true);

    const emptyDescription = emptyComponent.find("p");
    expect(emptyDescription.text()).toBe("Nothing here yet");
  });

  it("renders empty card with correct styles", () => {
    const wrapper = mount(EmptyContainer);

    // Check if the empty card exists
    const emptyCard = wrapper.find(".empty-card");
    expect(emptyCard.exists()).toBe(true);

    // Check if the correct class is defined
    expect(emptyCard.element.style.width).toBeDefined;
    expect(emptyCard.element.style.height).toBeDefined;
    expect(emptyCard.element.style.border).toBeDefined;
    expect(emptyCard.element.style.borderRadius).toBeDefined;
    expect(emptyCard.element.style.background).toBeDefined;
  });
});
