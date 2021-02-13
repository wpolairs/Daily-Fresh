<template>
  <div class="search-box">
    <a-form-model
      layout="inline"
      :model="searchFrom"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="搜索关键词">
        <a-input v-model="searchFrom.searchWord" placeholder="搜索关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          show-search
          placeholder="请选择商品类目"
          style="width: 200px"
          @change="handleChange"
        >
          <a-select-option
            :value='category.name'
            v-for='category in categoryData'
            :key='category.id'
          >
            {{ category.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>

export default {
  props: ['categoryData'],
  data() {
    return {
      searchFrom: {
        searchWord: '', // 检索关键词
        category: '', // 商品类目
      },
    };
  },
  methods: {
    // 点击搜索时触发
    handleSubmit() {
      this.$emit('searchForm', this.searchFrom);
    },
    // 商品类目切换时触发
    handleChange(value) {
      this.searchFrom.category = value;
      this.categoryData.forEach((category) => {
        if (category.name === value) {
          this.searchFrom.category = category.id;
        }
      });
      this.$emit('searchForm', this.searchFrom);
    },
  },
  created() {
  },
};
</script>

<style scoped lang='less'>
.search-box{
    margin-top: 15px;
    padding: 0 24px;
}
</style>
