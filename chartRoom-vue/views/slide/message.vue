<template>
  <htmlModal title="消息通知" :width="'400px'" :show="true" @emit="action">
    <div class="pop_info">
      <div class="list scroll-bar">
        <div class="item" v-for="(item,index) of list" :key="index">
          <div class="item-box">
            <div class="face">
              <img :src="`${baseUrl}${item.face}`" v-if="item.face" >
              <img :src="require('images/face.jpg')" v-else>
            </div>
            <div class="info">
              <span class="name">{{item.message}}</span>
              <p></p>
            </div>
            <div class="btn" @click="btnMethod(item,'agree')">同意</div>
            <div class="btn" style="background:#F56C6C" @click="btnMethod(item,'refuse')">拒绝</div>
          </div>
        </div>
        <div class="empty" v-if="!list.length">暂无数据</div>
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
    this.getMessage();
  },
  methods:{
    //确认
    getMessage(){
      http.get({
        url: api.getMessage,
        params:{
          id:this.userObj.id,
        }
      }).then(res => {
        this.list = res.result;
      }).catch(()=>{});
    },
    btnMethod(res,type){
      let sendType = type == 'agree' ? '1' : '2';
      this.$socket.emit('agreeRefuseContact', {
        id: res.id,
        user_id: res.user_id,
        add_user_id: res.add_user_id,
        type: sendType,
      },(res)=>{
        this.getMessage();
        if(res.code!=0){
          this.$alert(res.msg);
        }
      });
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
        height: 30px;
        margin-left: 10px;
        background: #67C23A;
        cursor: pointer;
        .flex-center-center;
        border-radius: 5px;
        font-size: 12px;
        color: #fff;
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
    .empty{
      width: 100%;
      padding-top: 20px;
      text-align: center;
      color: #999;
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