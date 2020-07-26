<template>
  <htmlModal title="个人信息" :width="'500px'" :show="true" @emit="action">
    <div class="pop_info">
      <el-upload
        class="avatar-uploader"
        :action="actionUrl"
        :show-file-list="false"
        :data="{
          'id':userObj.id
        }"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="tips">点击上传头像</div>
      <div class="inp-box">
        <el-input placeholder="请输入用户名" v-model="name"></el-input>
      </div>
    </div>
    <div class="btn-box">
      <el-button class="btn" type="" @click="action(false)">取消</el-button>
      <el-button class="btn" type="primary" @click="confirm">确定</el-button>
    </div>
  </htmlModal>
</template>
<script>
export default {
  data () {
    return{
      imageUrl: '',
      actionUrl: api.uploadfile,
      name:'',
    }
  },
  components:{
    htmlModal: () => 	import('components/htmlModal'),
  },
  computed: {
    userObj(){
      return this.$store.state.login.userObj;
    }
  },
  mounted(){
    if(this.userObj.face){
      this.imageUrl = `${api.getFile}?face=${this.userObj.face}`;
    }else{
      this.imageUrl = '';
    }
    this.name = this.userObj.name;
  },
  methods:{
    //确认
    confirm(){
      http.post({
        url:`${api.addName}`,
        params:{
          account:this.userObj.account,
          name:this.name,
        }
      }).then(res => {
        this.userObjUpdate('name',res.result.name);
        this.$emit('emit',true);
      }).catch(()=>{});
    },
    action(res){
			this.$emit('emit',false);
    },
    handleAvatarSuccess(res, file) {
      this.userObjUpdate('face',res.result);
      //图片url
      this.imageUrl = `${api.getFile}?face=${res.result}`;
    },
    userObjUpdate(key,newObj){
      let userObj = {...this.userObj};
      userObj[key] = newObj;
      this.$store.commit('setUser',userObj);
      localStorage.setItem('userObj',JSON.stringify(userObj));
      return userObj;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  
}
</script>
<style lang="less" scoped>
@import (reference) '~css/common.less';
.pop_info{
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .tips{
    padding: 10px 0;
  }
  .inp-box{
    padding: 10px;
  }
}
.btn-box{
  text-align: right;
  .btn{
    width: 120px;
  }
}
.avatar-uploader{
  border: 1px dashed #ccc;
  border-radius: 5px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>