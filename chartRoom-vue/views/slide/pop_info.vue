<template>
  <htmlModal title="个人信息" :width="'500px'" :show="true" @emit="action">
    <div class="pop_info">
      <el-upload
        class="avatar-uploader"
        :action="actionUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="tips">点击上传头像</div>
      <div class="inp-box">
        <el-input placeholder="请输入用户名"></el-input>
      </div>
    </div>
    <div class="btn-box">
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button type="" @click="action(false)">关闭</el-button>
    </div>
  </htmlModal>
</template>
<script>
export default {
  data () {
    return{
      imageUrl: '',
      actionUrl:'',
    }
  },
  mounted(){

  },
  methods:{
    //确认
    confirm(){

    },
    action(res){
			this.$emit('emit',false);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
  components:{
    htmlModal: () => 	import('components/htmlModal'),
  }
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
	text-align: center;
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