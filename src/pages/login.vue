<template>
  <div class="login py-5">
    <br />

    <div class="my-5 w-25 bg-white rounded-3 mx-auto p-4">
      <h3 class="text-center">Welcome Back!</h3>
      <p class="text-center">Login to your account to continue</p>
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <a-space direction="vertical" class="form-floating mb-3 w-100">
          <a-input
            v-model:value="email"
            placeholder="name@example.com"
            id="email"
            aria-required="true"
            @blur="validateEmail"
          />
          <p v-if="emailError" class="text-danger">{{ emailError }}</p>
        </a-space>
        <!-- Password -->
        <a-space
          direction="vertical"
          size="middle"
          class="form-floating mb-3 w-100"
        >
          <a-input-password
            v-model:value="password"
            placeholder="password"
            id="password"
            aria-required="true"
            @blur="validatePassword"
          />
          <p v-if="passwordError" class="text-danger">{{ passwordError }}</p>
        </a-space>
        <div class="d-flex justify-content-between">
          <div class="col-auto">
            <!-- <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="autoSizingCheck2"
              />
              <label class="form-check-label" for="autoSizingCheck2">
                Remember me
              </label>
            </div> -->
          </div>
          <router-link to="/forgot-password">
            <span class="forgot"> Forgot Password? </span>
          </router-link>
        </div>
        <!-- Button -->
        <div class="mt-3">
          <div class="text-decoration-none text-secondary">
            <button
              @click="handleLogin"
              class="btn border-0 px-3 py-2 fw-bold w-100 text-center"
              type="submit"
              :disabled="!isFormValid"
            >
              Log In
            </button>
          </div>
        </div>
      </form>

      <!-- continue -->
      <div class="or-continue">
        <hr class="line" />
        <span class="text-center text-uppercase">or continue with</span>
        <hr class="line" />
      </div>

      <!-- social buttons -->

      <!-- gh -->
      <button
        :disabled="!isFormValid"
        class="btn border-0 py-2 fw-bold w-100 text-center ghub"
        type="submit"
        @click="githubLogin"
      >
        <i class="fa-brands fa-github me-1"></i>
        <span class="m-3"> Sign in with Github </span>
      </button>

      <!-- google -->
      <button
        :disabled="!isFormValid"
        @click="googleLogin"
        class="btn mt-2 border-0 py-2 fw-bold w-100 text-center g"
      >
        <i class="fa-brands fa-google me-3"></i>
        <span class="m-2"> Sign in with Google </span>
      </button>

      <!-- fb -->
      <button
        :disabled="!isFormValid"
        class="mt-2 border-0 py-2 fw-bold w-100 text-center fb btn"
        type="submit"
      >
        <i class="fa-brands fa-facebook me-3"></i>
        <span> Sign in with Facebook </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import router from "../router";
import { ref, computed } from "vue";
import { useUserStore } from "../store/useUserStore";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = !emailPattern.test(email.value)
    ? "Invalid email address"
    : "";
};

const validatePassword = () => {
  passwordError.value =
    password.value.length < 6 ? "Password must be at least 6 characters" : "";
};

const isFormValid = computed(() => {
  return (
    email.value && password.value && !emailError.value && !passwordError.value
  );
});

const handleLogin = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/admin-login`,
      {
        email: email.value,
        password: password.value,
      }
    );

    if (response.data) {
      const userStore = useUserStore();
      userStore.setUser(response.data);

      // Set the Authorization header for all future requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      notify("Login successful!", "success");
      router.push("/admin/dashboard");
    }
  } catch (error) {
    notify("Invalid Credentials", "error");
  }
};

const googleLogin = () => {
  router.push("/admin/dashboard");
};

const githubLogin = () => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${
    import.meta.env.VITE_GITHUB_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_GITHUB_REDIRECT_URI}&scope=read:user`;

  window.location.href = githubAuthUrl;
};
</script>

<style scoped>
.login {
  background-color: #ffd333;
  min-height: 100vh;
}

.login p,
.login label {
  color: gray;
  font-size: 12px;
}

.login h3 {
  font-size: 20px;
}

.btn {
  background-color: #ffd333;
  /* width: 32%; */
  font-size: 13px;
}

.or-continue {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
  color: gray;
}

.or-continue span,
.forgot {
  font-size: 12px;
}

.line {
  flex: 1;
  border: 0;
  height: 1px;
  background: gray;
}

@media (max-width: 768px) {
  .d-flex.flex-md-row {
    flex-direction: column;
  }
}

.text-danger {
  color: red;
}
</style>
