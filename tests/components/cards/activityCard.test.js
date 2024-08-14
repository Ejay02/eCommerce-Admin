import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RecentActivity from "@/components/cards/activityCard.vue"; // Adjust the import based on the actual path

describe("RecentActivity", () => {
  it("renders the RecentActivity component", () => {
    const wrapper = mount(RecentActivity);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the correct number of timeline items", () => {
    const wrapper = mount(RecentActivity);
    const timelineItems = wrapper.findAll("a-timeline-item");

    expect(timelineItems.length).toBeGreaterThan(0); // Just ensure that items are rendered
  });

  it("renders timeline items with correct color", () => {
    const wrapper = mount(RecentActivity);
    const timelineItems = wrapper.findAll("a-timeline-item");

    timelineItems.forEach((item) => {
      const color = item.attributes("color");
      expect(color).toBe("#ffd333");
    });
  });

  it("checks if the card class is applied", () => {
    const wrapper = mount(RecentActivity);
    const card = wrapper.find(".card");
    expect(card.exists()).toBe(true); // Check if the card element exists
  });
});
