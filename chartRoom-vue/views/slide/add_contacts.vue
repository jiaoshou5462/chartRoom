<template>
  <htmlModal title="添加联系人" :width="'400px'" :show="true" @emit="action">
    <div class="pop_info">
      <div class="inp-box">
        <el-input placeholder="请输入昵称" v-model="name" @input="searchInput" clearable>
          <el-button size="mini" slot="append" icon="el-icon-search" title="搜索" @click="search"></el-button>
        </el-input>
      </div>
      <div class="list scroll-bar">
        <div class="item" v-for="(item,index) of list" :key="index">
          <div class="item-box">
            <div class="face">
              <img :src="`${baseUrl}${item.face}`" v-if="item.face" >
              <img :src="require('images/face.jpg')" v-else>
            </div>
            <div class="info">
              <span class="name">{{item.name}}</span>
              <p>{{item.account}}</p>
            </div>
            <div class="btn" @click="addContact(item)">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </htmlModal>
</template>
<script>
export default {
  data () {
    return{
      name:'',
      baseUrl: `${api.getFile}?face=`,
      list:[],
      searchTimer:null,
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
    
  },
  methods:{
    //确认
    search(){
      if(!this.name){
        this.list = [];
        return;
      };
      http.get({
        url: api.searchUser,
        params:{
          name:this.name,
          id:this.userObj.id,
        }
      }).then(res => {
        this.list = res.result;
      }).catch(()=>{});
    },
    searchInput(){
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(()=>{
        this.search();
      },300)
    },
    addContact(res){
      this.$confirm(`是否添加 "${res.name}" 为联系人？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$socket.emit('addContact', {
          targetId:res.id,
          id: this.userObj.id,
          name: this.userObj.name,
        },(res)=>{
          if(res.code==0){
            this.$message.success('已向对方发起添加申请');
          }else{
            this.$alert(res.msg);
          }
        });
      }).catch(() => {});
    },
    action(res){
			this.$emit('emit',res);
    },
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
  .inp-box{
    padding: 10px 0;
    width: 100%;
  }
  .list{
    height: 400px;
    width: 100%;
    overflow-y: auto;
    flex: auto;
    background: #f7f7f7;
    .item{
      padding: 10px 10px 0 10px;
      .item-box{
        .flex-center-center;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
      }
      .face{
        flex: 0 0 40px; height: 40px;
        margin-right: 10px;
        img{
          width: 100%;height: 100%;
          border-radius: 4px;
        }
      }
      .info{
        flex: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 10px;
        .name{
          font-size: 15px;
        }
        p{
          color: #999;
        }
      }
      .btn{
        flex: 0 0 35px;
        height: 35px;
        background: #67C23A;
        cursor: pointer;
        .flex-center-center;
        border-radius: 5px;
        i{
          color: #fff;
          font-size: 16px;
        }
        &:hover{
          opacity: 0.8;
        }
      }
      &:hover{
        background: #eee;
      }
      &.active{
        background: #ddd;
      }
    }
  }
}
.btn-box{
  text-align: right;
  .btn{
    width: 120px;
  }
}
</style>