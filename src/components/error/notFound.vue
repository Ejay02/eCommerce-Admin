<template>
  <div>
    <section class="page_404">
      <div class="container">
        <div class="content">
          <div class="four_zero_four_text">
            <h1>404</h1>
          </div>
          <div class="four_zero_four_bg"></div>
          <div class="content_box_404">
            <h3>Look like you're lost</h3>
            <p>The page you are looking for is not available!</p>
            <button
              class="btn border-0 px-3 py-2 text-white fw-bold w-30 text-center te"
              type="submit"
            >
              <a href="/admin" class="link_404">Home</a>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
.page_404 {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.container {
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.four_zero_four_text h1 {
  font-size: 80px;
  color: #000;
  margin: 0;
}

.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
  background-size: cover;
  width: 100%;
  max-width: 600px;
}

.content_box_404 h3 {
  font-size: 25px;
}

.btn {
  background-color: #ffd333;
  color: aquamarine !important;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 20px 0;
}

.link_404 {
  color: black;
  text-decoration: none;
}

.link_404:hover {
  text-decoration: underline;
}
</style>
