<template>
  <div>
    <OrdersCard 
    :pageSize="10" 
    
    />
    <!-- :title="` Orders`"  -->
  </div>
</template>

<script setup>
import OrdersCard from "@/components/cards/ordersCard.vue";
</script>

<style scoped></style>
