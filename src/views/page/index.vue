<template>
  <div class="index">
    <!-- 卡片 -->
    <card />
    <echarts />
  </div>
</template>

<script>
import card from '@/components/card.vue';
import Echarts from '@/components/echarts.vue';

export default {
  components: {
    card,
    Echarts,
  },
};
</script>
