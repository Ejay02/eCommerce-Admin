<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">Recent reviews</h3>
      <i class="bi bi-arrow-right fs-5"></i>
    </div>

    <div class="list-container">
      <a-list
        class="demo-loadmore-list border-top border-gray"
        :loading="initLoading"
        item-layout="horizontal"
        :data-source="list"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <div class=""></div>
              <a-rate :value="2" disabled />
            </template>
            <a-skeleton avatar :title="false" :loading="!!item.loading" active>
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <template #title>
                  <a href="https://www.antdv.com/">{{ item.name.last }}</a>
                </template>
                <template #avatar>
                  <a-avatar :src="item.picture.large" />
                </template>
              </a-list-item-meta>
            </a-skeleton>
          </a-list-item>
        </template>
      </a-list>
    </div>

    <div v-if="!initLoading && !loading" class="load-more-container">
      <a-button @click="onLoadMore">load more</a-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const initLoading = ref(true);
const loading = ref(false);
const data = ref([]);
const list = ref([]);
onMounted(() => {
  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      initLoading.value = false;
      data.value = res.results;
      list.value = res.results;
    });
});
const onLoadMore = () => {
  loading.value = true;
  list.value = data.value.concat(
    [...new Array(count)].map(() => ({
      loading: true,
      name: {},
      picture: {},
    }))
  );
  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      const newData = data.value.concat(res.results);
      loading.value = false;
      data.value = newData;
      list.value = newData;
      nextTick(() => {
        window.dispatchEvent(new Event("resize"));
      });
    });
};
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  height: 600px;
  display: flex;
  flex-direction: column;
}

.list-container {
  flex: 1;
  overflow-y: auto;
}

.load-more-container {
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
}
</style>
