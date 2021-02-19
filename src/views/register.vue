<template>
  <div class="register">
    <a-form-model
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="Email" required>
        <a-input v-model="ruleForm.email" type="email" autocomplete="off" placeholder="请输入邮箱"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="用户名" required>
        <a-input v-model="ruleForm.username" type="string" autocomplete="off" placeholder="请输入用户名"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password" required>
        <a-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
        placeholder="请输入密码" />
      </a-form-model-item>
      <a-form-model-item
        has-feedback
        label="密码"
        prop="checkPass"
        required
      >
        <a-input
          v-model="ruleForm.checkPass"
          type="password"
          placeholder="请再次输入密码"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="验证码" required :wrapper-col="{ span: 8, offset: 0 }">
        <a-input v-model="ruleForm.code" type="string" autocomplete="off" />
        <a-button @click="getCode" type="primary">点击获取验证码</a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
        <a-button type="primary" @click="submitForm">
          注册
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: '',
        username: '',
        code: '',
        password: '',
        checkPass: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    //   获取验证码
    getCode() {
      api.getCode({ email: this.ruleForm.email }).then(() => {
        this.$message.success('验证码已发送');
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    // 提交注册信息
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          api.register(this.ruleForm).then(() => {
            this.$message.success('注册成功，3秒后将跳转登录页面', 3);
            this.$router.push({
              name: 'login',
            });
          }).catch((error) => {
            this.$message.error(error);
          });
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang='less'>
.register{
    width: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
