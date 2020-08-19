<template>
  <div class="slide">
    <div class="menu">
      <div class="top">
        <div class="face" @click="popShow = true;">
          <img :src="face" v-if="face" title="编辑资料">
          <img :src="require('images/face.jpg')" v-else title="编辑资料">
        </div>
        <div class="add-contact" @click="addShow = true;" title="添加联系人">
          <i class="el-icon-user-solid"></i>
          <i class="el-icon-plus posi"></i>
        </div>
        <div class="add-contact" @click="msgShow = true;" title="通知">
          <i class="el-icon-message-solid"></i>
          <span class="message posi" v-if="msgNum>0">{{msgNum}}</span>
        </div>
      </div>
      <div class="logout">
        <i class="el-icon-switch-button" @click="logout"></i>
      </div>
    </div>
    <div class="contacts">
      <div class="search">
        <el-input placeholder="搜索联系人" v-model="search" size="mini" @input="searchInput" clearable="">
          <el-button size="mini" slot="append" icon="el-icon-search"
          @click="searchContact" title="搜索"></el-button>
        </el-input>
      </div>
      <div class="list scroll-bar">
        <div class="item" @click="clickItem('commonRoom')" :class="{active:'commonRoom'==selContact}">
          <div class="face">
            <img :src="require('images/face.jpg')">
          </div>
          <div class="info">
            <span class="name">公共聊天室</span>
            <p>大家一起聊聊天</p>
          </div>
        </div>
        <div class="item" v-for="(item,index) of resList" :key="index" @click="clickItem(item)"
        :class="{active:item.id==selContact}">
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
    <!-- 修改个人信息 -->
    <pop-info v-if="popShow" @emit="popShow = false;"></pop-info>
    <!-- 添加联系人 -->
    <add-contacts v-if="addShow" @emit="addShow = false;"></add-contacts>
    <!-- 通知 -->
    <message v-if="msgShow" @emit="msgShow = false;"></message>
  </div>
</template>
<script>
export default {
  data () {
    return{
      popShow:false,
      addShow:false,
      msgShow:false,
      msgNum:'',//通知数量
      baseUrl: `${api.getFile}?face=`,
      search:'',
      list:[],//原列表
      resList:[],//搜索结果列表
      selContact:'commonRoom',
      searchTimer:null,
    }
  },
  components:{
    popInfo: () => 	import('./pop_info'),
    addContacts: () => 	import('./add_contacts'),
    message: () => 	import('./message'),
  },
  computed: {
    face(){
      if(this.$store.state.login.userObj.face){
        let url = `${api.getFile}?face=${this.$store.state.login.userObj.face}`
        return url;
      } else{
        return '';
      }
    },
    userObj(){
      return this.$store.state.login.userObj;
    }
  },
  mounted(){
    this.getContacts();
    this.getMessageNum();
    this.listenerSocket();
  },
  methods:{
    clickItem(item){
      if(item=='commonRoom'){
        this.selContact = 'commonRoom'
      }else{
        this.selContact = item.id;
      }
      this.$emit('emit',item);
    },
    listenerSocket(){
      this.sockets.listener.subscribe('getMessageNum', (data) => {
        this.msgNum = data.result;
      });
      this.sockets.listener.subscribe('getContacts', (data) => {
        this.list = data.result;
        this.$emit('list',this.list)
      });
    },
    searchContact(){
      if(!this.search.trim()){
        this.resList = JSON.parse(JSON.stringify(this.list));
      }else{
        let list = [];
        for(let item of this.list){
          if(item.name.includes(this.search)){
            list.push(item);
          }
        }
        this.resList = list;
      }
    },
    searchInput(){
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(()=>{
        this.searchContact();
      },300)
    },
    popEmit(res){
      if(res){
        
      }
      this.popShow = false;
    },
    getContacts(){
      http.get({
        url: api.getContacts,
        params:{
          id: this.userObj.id,
        },
      }).then((res)=>{
        this.list = res.result;
        this.searchContact();
        this.$emit('list',this.list)
      }).catch(() => {});
    },
    getMessageNum(){
      http.get({
        url:`${api.getMessageNum}`,
        params:{
          id: this.userObj.id,
        },
      }).then((res)=>{
        this.msgNum = res.result;
      }).catch(() => {});
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
  .add-contact{
    position: relative;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    cursor: pointer;
    color: #ddd;
    i{
      font-size: 30px;
    }
    .posi{
      position: absolute;
      right: 2px;top: 8px;
      font-size: 16px;
    }
    .message{
      background: #F56C6C;
      color: #fff;
      border-radius: 5px;
      font-size: 12px;
      padding: 0 5px;
      right: auto;
      left: 28px;
    }
    &:hover{
      color: #fff;
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name{
          font-size: 15px;
        }
        p{
          font-size: 12px;
          color: #999;
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