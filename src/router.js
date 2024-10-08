import { createWebHistory, createRouter } from "vue-router";

import Login from "./pages/login.vue";
import Orders from "./pages/orders.vue";
import Settings from "./pages/settings.vue";
import Enquiries from "./pages/enquiries.vue";
import Customers from "./pages/customers.vue";
import Dashboard from "./pages/dashboard.vue";
import MainLayout from "./components/mainLayout.vue";
import ResetPassword from "./pages/resetPassword.vue";
import NotFound from "./components/error/notFound.vue";
import ForgotPassword from "./pages/forgotPassword.vue";
import AddBlog from "./pages/blog/addBlog.vue";
import AddBlogCategory from "./pages/blog/addBlogCategory.vue";
import BlogCategoryList from "./pages/blog/blogCategoryList.vue";
import BlogList from "./pages/blog/blogList.vue";
import AddProduct from "./pages/catalog/addProduct.vue";
import ProductList from "./pages/catalog/productList.vue";
import Brand from "./pages/catalog/brand.vue";
import BrandList from "./pages/catalog/brandList.vue";
import Category from "./pages/catalog/category.vue";
import CategoryList from "./pages/catalog/categoryList.vue";
import EditBlog from "./pages/blog/editBlog.vue";
import EditProduct from "./pages/catalog/editProduct.vue";
import EditBlogCategory from "./pages/blog/editBlogCategory.vue";
import EditCategoryList from "./pages/catalog/editCategoryList.vue";
import EditBrand from "./pages/catalog/editBrand.vue";
import EnquiryDetail from "./pages/enquiryDetail.vue";


const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/admin",
    component: MainLayout,
    children: [
      {
        path: "dashboard",
        component: Dashboard,
      },
      {
        path: "customers",
        component: Customers,
      },
      {
        path: "orders",
        component: Orders,
      },
      {
        path: "enquiries",
        component: Enquiries,
      },
      {
        path: "/enquiry/:id",
        component: EnquiryDetail,
      },
      {
        path: "settings",
        component: Settings,
      },
      {
        path: "product",
        component: AddProduct,
        children: [],
      },
      {
        path: "/edit-product/:id",
        component: EditProduct,
        name: "editProduct",
      },
      {
        path: "product/product-list",
        component: ProductList,
      },
      {
        path: "product/brand",
        component: Brand,
      },
      {
        path: "product/brand-list",
        component: BrandList,
      },
      {
        path: "product/edit-brand/:id",
        component: EditBrand,
        name: "editBrand",
      },
      // {
      //   path: "product/color",
      //   component: Color,
      // },
      // {
      //   path: "product/color-list",
      //   component: ColorList,
      // },
      {
        path: "product/category",
        component: Category,
      },
      {
        path: "product/edit-category/:id",
        component: EditCategoryList,
        name: "editCategory",
      },
      {
        path: "product/category-list",
        component: CategoryList,
      },
      {
        path: "blog",
        component: AddBlog,
      },
      {
        path: "/edit-blog/:id",
        component: EditBlog,
        name: "edit",
      },
      {
        path: "blog/add-blog-category",
        component: AddBlogCategory,
      },
      {
        path: "/edit-blog-category/:id",
        component: EditBlogCategory,
        name: "editBlogCategory",
      },
      {
        path: "blog/blog-category-list",
        component: BlogCategoryList,
      },

      {
        path: "blog/blog-list",
        component: BlogList,
      },
    ],
  },
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
