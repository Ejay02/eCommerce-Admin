b
<template>
  <a-layout style="min-height: 100vh" class="home">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <router-link to="/admin/dashboard" style="text-decoration: none">
        <div
          class="logo m-2 rounded d-flex align-items-center justify-content-center"
        >
          <!-- <i class="bi bi-brilliance fs-4"></i> -->
          <i class="fa-solid fa-yin-yang fs-4"></i>
          <h2 v-if="!collapsed" class="fs-5 text-center text-white py-3 m-4">
            <span>BuyZone</span>
          </h2>
        </div>
      </router-link>

      <!--  -->
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <!-- dash -->
        <a-menu-item key="1">
          <router-link to="/admin/dashboard" style="text-decoration: none">
            <i class="bi bi-speedometer2"></i>
            <span class="m-4">Dashboard</span>
          </router-link>
        </a-menu-item>

        <!-- cust -->
        <a-menu-item key="2">
          <router-link to="/admin/customers" style="text-decoration: none">
            <i class="bi bi-people"></i>
            <span class="m-4">Customers</span>
          </router-link>
        </a-menu-item>

        <!-- catalog -->
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <i class="bi bi-archive"></i>
              <span class="m-4">Catalog</span>
            </span>
          </template>
          <a-menu-item key="3">
            <router-link
              to="/admin/product"
              class=""
              style="text-decoration: none"
            >
              <i class="bi bi-database-add"></i>

              <span class="m-2">Add Product</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="4">
            <router-link
              to="/admin/product/product-list"
              style="text-decoration: none"
            >
              <i class="bi bi-card-list"></i>
              <span class="m-4">Product List</span>
            </router-link>
          </a-menu-item>

          <!-- brand -->
          <a-menu-item key="5">
            <router-link
              to="/admin/product/brand"
              style="text-decoration: none"
            >
              <i class="fa-brands fa-pied-piper-alt"></i>
              <span class="m-4">Brand</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="6">
            <router-link
              to="/admin/product/brand-list"
              style="text-decoration: none"
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span class="m-4">Brand List</span>
            </router-link>
          </a-menu-item>

          <!-- category -->
          <a-menu-item key="7">
            <router-link
              to="/admin/product/category"
              style="text-decoration: none"
            >
              <i class="bi bi-collection"></i>
              <span class="m-4">Category</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="8">
            <router-link
              to="/admin/product/category-list"
              style="text-decoration: none"
            >
              <i class="fa-solid fa-layer-group"></i>
              <span class="m-4">Category List</span>
            </router-link>
          </a-menu-item>

          <!-- color -->
          <!-- <a-menu-item key="9">
            <router-link
              to="/admin/product/color"
              style="text-decoration: none"
            >
              <i class="bi bi-palette"></i>
              <span class="m-4">Color</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="10">
            <router-link
              to="/admin/product/color-list"
              style="text-decoration: none"
            >
              <i class="fa-solid fa-list"></i>
              <span class="m-4">Color List</span>
            </router-link>
          </a-menu-item> -->
          <!--  -->
        </a-sub-menu>

        <!-- orders -->
        <!-- <a-menu-item key="11">
          <router-link to="/admin/orders" style="text-decoration: none">
            <span>
              <i class="fa-solid fa-cart-shopping"></i>
              <span class="m-4">Orders</span>
            </span>
          </router-link>
        </a-menu-item> -->

        <!-- enquiry -->
        <a-menu-item key="12">
          <router-link to="/admin/enquiries" style="text-decoration: none">
            <i class="bi bi-chat-square-text"></i>
            <span class="m-4">Enquiries</span>
          </router-link>
        </a-menu-item>

        <!-- blog -->
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <i class="fa-solid fa-blog"></i>
              <span class="m-4">Blog</span>
            </span>
          </template>
          <a-menu-item key="46">
            <router-link to="/admin/blog" style="text-decoration: none">
              <i class="bi bi-file-plus"></i>
              <span class="m-4">Add Blog</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="47">
            <router-link
              to="/admin/blog/blog-list"
              style="text-decoration: none"
            >
              <i class="bi bi-list"></i>
              <span class="m-4">Blog List</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="48">
            <router-link
              to="/admin/blog/add-blog-category"
              style="text-decoration: none"
            >
              <i class="fa-solid fa-plus"></i>
              <span class="m-4">Add Blog Category</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="49">
            <router-link
              to="/admin/blog/blog-category-list"
              style="text-decoration: none"
            >
              <i class="bi bi-list-nested"></i>
              <span class="m-4">Blog Category List</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>

        <!-- setting -->
        <a-menu-item key="9">
          <router-link to="/admin/settings" style="text-decoration: none">
            <i class="fa-solid fa-gears"></i>
            <span class="m-4">Settings</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- head -->
      <a-layout-header
        style="background: #fff; padding: 0"
        class="d-flex justify-content-between ps-3 pe-5"
      >
        <div class="row gap-4 align-items-center">
          <div class="col-auto position-relative">
            <input
              type="search"
              id="search"
              class="form-control pe-5 align-items-center"
              aria-describedby="passwordHelpInline"
              placeholder="Search for the truth... ✨"
            />
            <i
              class="bi bi-search position-absolute top-50 end-0 translate-middle-y me-4"
            ></i>
          </div>
        </div>

        <!-- end -->
        <div class="d-flex gap-4 align-items-center">
          <!-- notification -->
          <div class="position-relative">
            <router-link
              to="/admin/enquiries"
              class="text-decoration-none text-secondary"
            >
              <i class="bi bi-bell fs-4"></i>
              <span class="badge bg-danger rounded-circle position-absolute">
                7</span
              >
            </router-link>
          </div>

          <a-dropdown>
            <div
              class="profile d-flex gap-3 align-items-center text-decoration-none text-secondary"
            >
              <!-- avatar -->
              <div>
                <div v-if="avatar">
                  <img
                    :src="avatar"
                    alt="user image"
                    style="width: 50px; height: 50px; border-radius: 5px"
                  />
                </div>
                <div v-else>
                  <div
                    class="default-avatar"
                    :style="{
                      width: '50px',
                      height: '50px',
                      borderRadius: '5px',
                      background: 'cornflowerblue',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }"
                  >
                    {{ user?.firstname.charAt(0)
                    }}{{ user?.lastname.charAt(0) }}
                  </div>
                </div>
              </div>
              <!-- deets -->
              <div>
                <h5 class="mb-0">{{ user?.firstname }} {{ user?.lastname }}</h5>

                <p class="mb-0">{{ user?.email }}</p>
              </div>
            </div>
            <!-- dropdown -->
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <router-link
                    to="/admin/settings"
                    class="d-flex gap-3 align-items-center text-decoration-none text-secondary"
                  >
                    <i class="fa-solid fa-gears"></i>
                    Settings
                  </router-link>
                </a-menu-item>
                <a-menu-item>
                  <div
                    class="d-flex gap-3 align-items-center text-decoration-none text-secondary"
                  >
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    <span class="">Switch Account</span>
                  </div>
                </a-menu-item>
                <a-menu-item>
                  <a
                    href="https://buyzone-demo.netlify.app/"
                    target="_blank"
                    class="d-flex gap-3 align-items-center text-decoration-none text-secondary"
                  >
                    <i class="fas fa-external-link-alt"></i>

                    Visit Site</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <div
                    data-test="logout"
                    @click="handleLogout"
                    class="d-flex gap-3 align-items-center text-decoration-none text-secondary"
                  >
                    <i class="fa-solid fa-power-off"></i>
                    <span>Logout</span>
                  </div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- body -->
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0"> </a-breadcrumb>
        <div
          class="mb-5"
          :style="{
            padding: '1px',
            background: 'transparent',
            minHeight: '360px',
          }"
        >
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";
import router from "../router";
import { storeToRefs } from "pinia";

import { useUserStore } from "@/store/useUserStore";
import { useNotifications } from "@/composable/globalAlert.js";

const collapsed = ref(false);
const selectedKeys = ref(["1"]);
const { notify } = useNotifications();

const userStore = useUserStore();

userStore.loadUserFromStorage();

const { user } = storeToRefs(userStore);

const avatar = ref(localStorage.getItem("avatar"));

const handleLogout = async () => {
  try {
    userStore.clearUser();

    notify("Logout successful!", "success");

    router.push("/");
  } catch (error) {
    notify("Logout failed. Please try again.", "error");
  }
};
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

#search::placeholder {
  color: gray;
  font-size: 0.8em;
}

.bi-search {
  color: gray;
}

.profile {
  cursor: pointer;
}

.logo i {
  transition: transform 0.3s ease-in-out;
}

@keyframes spin-zoom {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.5);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.logo:hover i {
  animation: spin-zoom 0.5s ease-in-out;
}
</style>
