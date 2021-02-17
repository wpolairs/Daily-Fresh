<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="商品标题" prop="title">
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" prop="category">
      <a-select v-model="form.category" placeholder="请填写商品类目" @change="changeCategory">
        <a-select-option
        v-for="category in categoryList"
        :key="category.id"
        :value="category.id"> {{ category.name }} </a-select-option>
      </a-select>
      <a-select v-model="form.c_items" placeholder="请填写商品子类目">
        <a-select-option
        v-for="c_item in c_itemsList"
        :key="c_item"
        :value="c_item"> {{ c_item }} </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item label="商品标签" prop="tags">
      <a-select
        mode="tags"
        style="width: 100%"
        :default-value="['包邮，最晚次日达']"
        placeholder="Tags Mode"
        :allowClear=true
        v-model="form.tags"
      >
        <a-select-option value="包邮，最晚次日达">
            包邮，最晚次日达
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="next"> 下一步 </a-button>
      <!-- <a-button style="margin-left: 10px" @click="resetForm"> Reset </a-button> -->
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  props: ['categoryList', 'form'],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      c_itemsList: [],
      rules: {
        title: [
          {
            required: true,
            message: '请填写商品标题',
            trigger: 'blur',
          },
        ],
        category: [
          {
            required: true,
            message: '请填写商品类目',
            trigger: 'blur',
          },
        ],
        tags: [
          {
            required: true,
            message: '请选择商品标签',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    changeCategory(categoryID) {
      this.categoryList.forEach((item) => {
        if (item.id === categoryID) {
          this.c_itemsList = item.c_items;
        }
      });
    },
  },
};
</script>
