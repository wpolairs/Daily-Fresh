<template>
<div class="saleInfo">
  <a-form-model
    ref="saleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="商品售价" prop="price">
      <a-input v-model="form.price"/>
    </a-form-model-item>
    <a-form-model-item label="折扣价格" prop="price_off">
      <a-input v-model="form.price_off"/>
    </a-form-model-item>
    <a-form-model-item label="商品库存" prop="inventory">
      <a-input v-model="form.inventory" />
    </a-form-model-item>
    <a-form-model-item label="计量单位" prop="unit">
      <a-input v-model="form.unit" />
    </a-form-model-item>
     <a-form-model-item label="商品相册" prop="unit">
       <a-upload
      :action='actionUrl'
      list-type="picture-card"
      :file-list="fileList"
      name='avatar'
      @preview="handlePreview"
      @change="handleChange"
      @remove="handleChange"
      >
      <div v-if="fileList.length < 8">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 5 }">
      <a-button type="primary" @click="previous" class="previous"> 上一步 </a-button>
      <a-button type="primary" @click="next" class="submitBtn"> 提交 </a-button>
      <!-- <a-button style="margin-left: 10px" @click="resetForm"> Reset </a-button> -->
    </a-form-model-item>
  </a-form-model>
</div>

</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ['form'],
  data() {
    return {
      actionUrl: `https://mallapi.duyiedu.com/upload/images?appkey=${this.$store.state.user.appkey}`,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        price: [
          {
            required: true,
            message: '请填写商品价格',
            trigger: 'blur',
          },
        ],
        inventory: [
          {
            required: true,
            message: '请填写商品库存',
            trigger: 'blur',
          },
        ],
        images: [
          {
            required: true,
            message: '请上传商品图片',
            trigger: 'blur',
          },
        ],
      },
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  methods: {
    next() {
      this.$refs.saleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    previous() {
      this.$emit('previous', this.form);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      console.log(file);
      const imagesFile = file;
      if (!file.url && !file.preview) {
        imagesFile.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = imagesFile.url || imagesFile.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
  },
  created() {
    if (this.form.images.length > 0) {
      const { images } = this.form;
      this.fileList = images.map((item, index) => ({
        uid: index,
        name: 'image.png',
        status: 'done',
        url: item,
      }));
    }
  },
};
</script>
<style scoped lang='less'>
.saleInfo{
  .previous{
    margin-right: 20px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
}

</style>
