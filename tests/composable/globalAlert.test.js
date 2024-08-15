import { describe, it, expect, vi } from "vitest";
import { useNotifications } from "@/composable/globalAlert";

describe("useNotifications", () => {
  it("adds a notification", () => {
    const { notify } = useNotifications();
    notify("Hello, world!", "success", 1000);
    expect(document.body.children.length).toBe(1);
  });

  it("removes a notification after duration", async () => {
    const { notify } = useNotifications();
    notify("Hello, world!", "success", 100);
    for (let i = 0; i < 30; i++) {
      // wait for up to 3 seconds
      if (document.body.children.length === 0) break;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    expect(document.body.children.length).toBe(0);
  });

  it("supports multiple notifications", () => {
    const { notify } = useNotifications();
    notify("Hello, world!", "success", 1000);
    notify("Another notification", "info", 1000);
    expect(document.body.children.length).toBe(2);
  });
});
