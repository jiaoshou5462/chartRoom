<template>
  <div class="slide">
    <div class="menu">
      <div class="face" @click="popShow = true;">
        <img :src="face" v-if="face" title="编辑资料">
        <img :src="require('images/face.jpg')" v-else title="编辑资料">
      </div>
      <div class="logout">
        <i class="el-icon-switch-button" @click="logout"></i>
      </div>
    </div>
    <div class="contacts">
      <div class="search">
        <el-input placeholder="搜索联系人" v-model="search" size="mini">
          <el-button size="mini" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="list scroll-bar">
        <div class="item" v-for="(item,index) of list" :key="index" @click="clickItem(item)"
        :class="{active:item.account==selContact}">
          <div class="face">
            <img :src="`${baseUrl}${item.face}`" v-if="item.face" >
            <img :src="require('images/face.jpg')" v-else>
          </div>
          <div class="info">
            <span class="name">{{item.name}}</span>
            <p></p>
          </div>
        </div>
      </div>
    </div>

    <popInfo v-if="popShow" @emit="popEmit"></popInfo>
  </div>
</template>
<script>
export default {
  data () {
    return{
      popShow:false,
      baseUrl:api.getFile,
      baseUrl: `${api.getFile}?face=`,
      search:'',
      list:[],
      selContact:'',
    }
  },
  computed: {
    face(){
      if(this.$store.state.login.userObj.face){
        let url = `${api.getFile}?face=${this.$store.state.login.userObj.face}`
        return url;
      } else{
        return '';
      }
    }
  },
  mounted(){
    this.getContacts();
  },
  methods:{
    clickItem(item){
      this.selContact = item.account;
    },
    popEmit(res){
      if(res){
        
      }
      this.popShow = false;
    },
    getContacts(){
      this.list = [
        {account:'1',name:'啊啊啊',face:'1595756701517userID7.jpg'},
        {account:'2',name:'11123',face:'1595756701517userID7.jpg'},
        {account:'3',name:'是多少',face:'1595756701517userID7.jpg'},
        {account:'4',name:'发',face:'1595756701517userID7.jpg'},
      ]
    },
    //退出登录
    logout(){
      this.$confirm('是否退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.clear();
        this.$router.replace({
          name:'login',
        })
      }).catch(() => {});
    }
  },
  components:{
    popInfo: () => 	import('./pop_info'),
  }
}
</script>
<style lang="less" scoped>
@import (reference) '~css/common.less';
.slide{
  display: flex;
  height: 100%;
  width: 100%;
}
.menu{
  flex: 0 0 60px;
  background: #444;
  padding: 15px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .face{
    width: 100%;
    height: 50px;
    cursor: pointer;
    .flex-center-center;
    img{
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
  }
  .logout{
    width: 100%;
    flex: none;
    .flex-center-center;
    i{
      font-size: 30px;
      color: #ddd;
      cursor: pointer;
      &:hover{
        color: #fff;
      }
    }
  }
}
.contacts{
  flex: auto;
  display: flex;
  background: #f9f9f9;
  flex-direction: column;
  .search{
    padding: 20px 10px;
    border-bottom: 1px solid #eee;
  }
  .list{
    overflow-y: auto;
    flex: auto;
    .item{
      display: flex;
      align-content: center;
      padding: 10px;
      cursor: pointer;
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
        .name{
          font-size: 15px;
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
</style>