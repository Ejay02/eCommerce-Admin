import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";
import overviewCard from "@/components/cards/overviewCards.vue";

describe("overviewCard", () => {
  it("renders the overview component", () => {
    const wrapper = mount(overviewCard);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders all stat cards with correct data", () => {
    const wrapper = mount(overviewCard);

    const overviewCards = wrapper.findAll(".stat-card");
    console.log(" found:", overviewCards.length);
    expect(overviewCards.length).toBe(3); // Expecting 3 stat cards

    const stats = [
      {
        title: "Total Sales",
        amount: "903940.45",
        trend: "down",
        trendIcon: "fa-solid fa-arrow-trend-down",
        trendPercentage: "32%",
      },
      {
        title: "Average Order Value",
        amount: "19203.29",
        trend: "down",
        trendIcon: "fa-solid fa-arrow-trend-down",
        trendPercentage: "32%",
      },
      {
        title: "Total Orders",
        amount: "77849.00",
        trend: "up",
        trendIcon: "fa-solid fa-arrow-trend-up",
        trendPercentage: "32%",
      },
    ];

    overviewCards.forEach((card, index) => {
      const stat = stats[index];
      expect(card.find("p").text()).toBe(stat.title);
      expect(card.find(".amount h4").text()).toBe(`$${stat.amount}`);
      expect(card.find(".stat-bottom h6").classes()).toContain(
        stat.trend === "up" ? "text-success" : "text-danger"
      );

      // Check if all expected classes are present on the icon
      stat.trendIcon.split(" ").forEach((className) => {
        expect(card.find(".stat-bottom h6 i").classes()).toContain(className);
      });

      expect(card.find(".stat-bottom h6 span").text()).toBe(
        stat.trendPercentage
      );
    });
  });

  it("displays the correct comparison period", () => {
    const wrapper = mount(overviewCard);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    let lastMonth = currentMonth - 1;
    let year = currentYear;

    if (lastMonth < 0) {
      lastMonth = 11; // December of the previous year
      year -= 1;
    }

    const monthNames = new Intl.DateTimeFormat("en-US", { month: "long" })
      .format;
    const lastMonthName = monthNames(new Date(year, lastMonth));
    const expectedPeriod = `${lastMonthName} ${year}`;

    expect(wrapper.find(".stat-bottom p").text()).toContain(
      `Compared To ${expectedPeriod}`
    );
  });
});
