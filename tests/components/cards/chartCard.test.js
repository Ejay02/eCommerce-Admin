import { Bar } from "vue-chartjs";
import { mount } from "@vue/test-utils";
import { expect, describe, it, } from "vitest";
import BarChart from "@/components/cards/chartCard.vue";

describe("BarChart", () => {
  it("renders the BarChart component", () => {
    const wrapper = mount(BarChart);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the correct number of labels in the chart", () => {
    const wrapper = mount(BarChart);
    const { chartData } = wrapper.vm;

    expect(chartData.labels.length).toBe(12);
    expect(chartData.labels).toEqual([
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]);
  });

  it("uses the correct background color for the chart", () => {
    const wrapper = mount(BarChart);
    const { chartData } = wrapper.vm;

    expect(chartData.datasets[0].backgroundColor).toBe("#ffd333");
  });

  it("checks if the card class is applied", () => {
    const wrapper = mount(BarChart);
    const card = wrapper.find(".card");
    expect(card.exists()).toBe(true);
  });

  it("renders the Bar component", () => {
    const wrapper = mount(BarChart);
    const barComponent = wrapper.findComponent(Bar);
    expect(barComponent.exists()).toBe(true);
  });
});
