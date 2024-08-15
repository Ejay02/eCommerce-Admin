import router from "@/router";

describe("Router Configuration", () => {
  it("has the correct number of routes", () => {
    expect(router.getRoutes().length).toBe(25);
  });

  it("defines the correct routes", () => {
    const routes = router.getRoutes();
    expect(routes.find((route) => route.path === "/")).toBeDefined();
    expect(
      routes.find((route) => route.path === "/reset-password")
    ).toBeDefined();
    expect(
      routes.find((route) => route.path === "/forgot-password")
    ).toBeDefined();
    expect(routes.find((route) => route.path === "/admin")).toBeDefined();
    expect(
      routes.find((route) => route.path === "/:catchAll(.*)")
    ).toBeDefined();
  });

  it("defines the correct route names", () => {
    const routes = router.getRoutes();
    expect(routes.find((route) => route.name === "editProduct")).toBeDefined();
    expect(routes.find((route) => route.name === "editBrand")).toBeDefined();
    expect(routes.find((route) => route.name === "editCategory")).toBeDefined();
    expect(
      routes.find((route) => route.name === "editBlogCategory")
    ).toBeDefined();
    expect(routes.find((route) => route.name === "edit")).toBeDefined();
  });

  it("defines the correct route children", () => {
    const routes = router.getRoutes();
    const adminRoute = routes.find((route) => route.path === "/admin");
    expect(
      adminRoute.children.find((child) => child.path === "dashboard")
    ).toBeDefined();
    expect(
      adminRoute.children.find((child) => child.path === "customers")
    ).toBeDefined();
    expect(
      adminRoute.children.find((child) => child.path === "orders")
    ).toBeDefined();
    expect(
      adminRoute.children.find((child) => child.path === "enquiries")
    ).toBeDefined();
    expect(
      adminRoute.children.find((child) => child.path === "settings")
    ).toBeDefined();
    expect(
      adminRoute.children.find((child) => child.path === "product")
    ).toBeDefined();
    expect(
      adminRoute.children.find((child) => child.path === "product/product-list")
    ).toBeDefined();
    expect(
      adminRoute.children.find((child) => child.path === "product/brand")
    ).toBeDefined();
    expect(
      adminRoute.children.find((child) => child.path === "product/brand-list")
    ).toBeDefined();
    expect(
      adminRoute.children.find((child) => child.path === "product/category")
    ).toBeDefined();
    expect(
      adminRoute.children.find(
        (child) => child.path === "product/category-list"
      )
    ).toBeDefined();
    expect(
      adminRoute.children.find((child) => child.path === "blog")
    ).toBeDefined();
    expect(
      adminRoute.children.find(
        (child) => child.path === "blog/add-blog-category"
      )
    ).toBeDefined();
    expect(
      adminRoute.children.find(
        (child) => child.path === "blog/blog-category-list"
      )
    ).toBeDefined();
    expect(
      adminRoute.children.find((child) => child.path === "blog/blog-list")
    ).toBeDefined();
  });
});
