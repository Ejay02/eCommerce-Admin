<template>
  <h3 class="mb-4">Dashboard</h3>
  <OverviewCards />
  <div class="d-flex justify-content-between gap-3">
    <ActiveUsersCard class="flex-grow-0" />
    <ChartCard />
  </div>
  <OrdersCard :pageSize="4" :title="`Recent Orders`" />
  <div class="d-flex justify-content-between gap-3">
    <ActivityCard />
    <ReviewsCard />
  </div>
</template>

<script setup>
import ChartCard from "@/components/cards/chartCard.vue";
import OrdersCard from "@/components/cards/ordersCard.vue";
import ReviewsCard from "@/components/cards/reviewsCard.vue";
import ActivityCard from "@/components/cards/activityCard.vue";
import OverviewCards from "@/components/cards/overviewCards.vue";
import ActiveUsersCard from "@/components/cards/activeUsersCard.vue";
</script>

<style scoped></style>
