<template>
  <div class="login">
    <div class="title" v-if="isRegister">注册成功，给自己取个昵称吧</div>
    <div class="form-box">
      <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
        <el-form-item v-if="isRegister">
          <el-input v-model="name" 
          @focus="inputFocus=true" @blur="inputFocus=false" placeholder="昵称"></el-input>
        </el-form-item>
        <template v-if="!isRegister">
          <el-form-item prop="account">
            <el-input v-model="form.account" 
            @focus="inputFocus=true" @blur="inputFocus=false" placeholder="用户名 (必填)"></el-input>
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password"
            @focus="inputFocus=true" @blur="inputFocus=false" placeholder="密码 (必填)"></el-input>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" class="submit" @click="clickSubmit" v-if="!isRegister">登录 / 注册</el-button>
          <el-button type="primary" class="submit" @click="addName" v-if="isRegister">完成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      name:'',
      form:{
        account:'',
        password:'',
      },
      rules:{
        account:[
          { required: true, message: '请输入账号', trigger: 'change' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'change' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'change' }
        ],
      },
      inputFocus:false,
      isRegister:false,//是否是新用户
    }
  },
  mounted () {
    // document.addEventListener('keyup',this.keyupEnter);
  },
  destroyed(){
    // document.removeEventListener('keyup',this.keyupEnter);
  },
  methods: {
    //点击提交
    clickSubmit(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.findUser();
        } else {
          return false;
        }
      });
    },
    toHome(res){
      let userObj = JSON.stringify(res.result);
      localStorage.setItem('userObj',userObj);
      this.$router.replace({
        name:'home'
      });
    },
    //添加昵称
    addName(){
      http.post({
        url:`${api.addName}`,
        params:{
          account:this.form.account,
          name:this.name,
        }
      }).then(res => {
        this.toHome(res);
      }).catch(()=>{});
    },
    //查询用户是否存在 如果存在 且用户名密码正确，会直接登录
    findUser(){
      http.post({
        url:`${api.findUser}`,
        params: this.form,
      }).then(res => {
        if(res.result == 0){//用户不存在
          this.register();
        }else{
          this.toHome(res);
        }
      }).catch(()=>{});
    },
    register(){
      this.$confirm('该用户名还没有被注册，是否注册该账号？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.post({
          url:`${api.register}`,
          params: this.form,
        }).then(res => {
          this.isRegister = true;
        }).catch(()=>{});
      }).catch(() => {});
    },
    keyupEnter(event){
      if(event.key=='Enter' && this.inputFocus){
        this.clickSubmit()
      }
    },
   
  },
  computed: {

  },
  components: {
  }
}
</script>
<style lang="less" scoped>
@import (reference) '~css/common.less';
.login{
  width: 100%;
  height: 100vh;
  display: flex;
  .title{
    width: 100%;
    padding: 20px 0;
    font-size: 40px;
    text-align: center;
    color: #999;
    position: absolute;
    left: 0;
    top: 10%;
  }
  .flex-center-center;
  .form-box{
    width: 300px;
    margin-top: -60px;
    .submit{
      width: 100%;
    }
  }
}
</style>
