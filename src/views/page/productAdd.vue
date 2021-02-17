<template>
  <div class="addProducts">
    <a-steps :current="current" class="steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-info :categoryList='categoryList' :form='form' @next='next' v-if="current === 0"/>
      <sale-info @next='next' :form='form' @previous='previous' v-else/>
    </div>
  </div>
</template>
<script>
import api from '@/api/category';
import productAPI from '@/api/products';
import basicInfo from '@/components/basicInfo.vue';
import saleInfo from '@/components/saleInfo.vue';

export default {
  components: {
    basicInfo,
    saleInfo,
  },
  data() {
    return {
      current: 0,
      categoryList: [],
      form: {
        title: '',
        category: '',
        tags: [],
        desc: '',
        price: '',
        price_off: '',
        inventory: '',
        unit: '',
        images: [],
      },
      steps: [
        {
          title: '商品基本信息',
        },
        {
          title: '商品销售信息',
        },
      ],
    };
  },
  methods: {
    next(form) {
      this.form = form;
      if (this.current >= this.steps.length - 1) {
        // 进行表单提交
        // console.log(this.form);
        this.addProducts();
        return;
      }
      this.current += 1;
    },
    previous(form) {
      console.log(form);
      this.form = {
        ...this.form,
        ...form,
      };
      this.current -= 1;
    },
    getCategory() {
      api.getCategoryList().then((res) => {
        this.categoryList = res.data;
      });
    },
    // 新增商品
    addProducts() {
      productAPI.addProduct(this.form).then((res) => {
        console.log(res, '-------');
        this.$message.success('新增成功');
        this.$router.push({
          name: 'list',
        });
      });
    },
  },
  created() {
    this.getCategory();
  },
};
</script>
<style scoped lang='less'>
.addProducts{
  .steps{
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
}

</style>
