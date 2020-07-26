<template>
  <div class="home">
    <div class="window">
      <div class="left">
        <slideLeft></slideLeft>
      </div>
      <div class="right">
        <div class="head">
          <div class="name">{{userObj.name}}</div>
          <div class="time">（在线人数 {{onlineNum}}） {{currentTime}}</div>
        </div>
        <div class="message-box scroll-bar" ref="messageBox">
          <div class="msg-height" ref="msgHeight">
            <div class="msg-item" :class="{myself:item.name==userObj.name}" v-for="(item,index) of msgList" :key="index">
              <div class="msg-enter" v-if="item.isEnter">
                <span>{{item.name}}进入房间</span>
              </div>
              <div class="msg-enter" v-else-if="item.isLeave">
                <span>{{item.name}}离开房间</span>
              </div>
              <template v-else>
                <div class="msg-face">
                  <img :src="`${baseUrl}${item.face}`" v-if="item.face" title="查看资料">
                  <img :src="require('images/face.jpg')" v-else title="查看资料">
                </div>
                <div class="msg-item-info">
                  <div class="msg-head">
                    <span class="name">{{item.name}}</span>
                    <span class="time">{{item.time}}</span>
                  </div>
                  <div class="msg-content">
                    <span>
                      <i></i>
                      <pre>{{item.content}}</pre>
                    </span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <el-input v-model="content" class="edit-box" type="textarea" rows="5" maxlength="500" show-word-limit 
        placeholder="在这里输入内容 (Ctrl + Enter 键发送消息)"></el-input>
        <div class="tips">
          <span>Ctrl + Enter 键发送消息</span>
          <el-button size="small" type="primary" @click="submit">发 送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tools from 'src/utils/tools'

export default {
  data () {
    return {
      content:'',
      currentTime:'',
      timer:null,
      msgList:[],
      onlineNum:0,
      baseUrl: `${api.getFile}?face=`,
    }
  },
  computed: {
    userObj(){
      return this.$store.state.login.userObj;
    }
  },
  components: {
    slideLeft:()=>import('../slide/slide'),
  },
  mounted () {
    let userObj = localStorage.getItem('userObj');
    if(userObj){
      document.addEventListener('keypress',this.keypressCtrlEnter);
      this.setCurrentTime();

      //socket.io相关
      this.getSocketMsg();//订阅后台推送的消息
      this.enterRoom();//进入房间
      // this.beforeunload();
    }else{
      this.$router.replace({
        name:'login',
      })
    }
  },
  destroyed(){
    clearTimeout(this.timer);
    document.removeEventListener('keypress',this.keypressCtrlEnter);
    document.removeEventListener('beforeunload',this.bindLeave);
    this.leaveRoom();
  },
  methods: {
    getSocketMsg(){
      this.sockets.listener.subscribe('enterRoom', (data) => {
        data.isEnter = true;
        this.onlineNum = data.onlineNum;
        this.showMsg(data);
      });
      this.sockets.listener.subscribe('sendMsg', (data) => {
        this.showMsg(data);
      });
      this.sockets.listener.subscribe('leaveRoom', (data) => {
        if(data.name!=this.userObj.name){
          data.isLeave = true;
          this.onlineNum = data.onlineNum;
          this.showMsg(data);
        }
      });
    },
    setCurrentTime(){
      let nowData = tools.format(new Date(),'yyyy年MM月dd日 hh:mm:ss');
      this.currentTime = nowData;
      let timer = setTimeout(()=>{
        this.setCurrentTime();
      },1000)
    },
    //进入房间
    enterRoom(){
      this.$socket.emit('enterRoom', {
        account:this.userObj.account,
        name:this.userObj.name,
      });
    },
    //显示消息
    showMsg(data){
      let obj = {...data};
      this.msgList.push(obj);
      this.$nextTick(()=>{
        let msgHeight = this.$refs.msgHeight.offsetHeight;
        this.$refs.messageBox.scrollTop = msgHeight;
      })
    },
    submit(){
      if(!this.content){
        // this.$alert('消息不能为空');
        return;
      }
      //提交消息到后台
      this.$socket.emit('sendMsg', {
        content:this.content,
        account:this.userObj.account,
        name:this.userObj.name,
        face:this.userObj.face,
        time:tools.format(new Date(),'yyyy/MM/dd hh:mm:ss'),
      },(res)=>{
        this.content = '';
      });
    },
    keypressCtrlEnter(event){
      if(event.key=='\n' && event.code=="Enter" || event.key=='\n' && event.code=="NumpadEnter"){
        this.submit()
      }
    },
    beforeunload(){
      window.addEventListener('beforeunload',this.bindLeave);
    },
    bindLeave(e){
      this.leaveRoom();
      e.preventDefault();
      e.returnValue = '';
    },
    leaveRoom(){
      this.$socket.emit('leaveRoom', {
        account:this.userObj.account,
        name:this.userObj.name,
      });
    }
  },
  
}
</script>
<style lang="less" scoped>
@import (reference) '~css/common.less';
.home{
  height: 100vh;
  width: 100%;
  display: flex;
  background: #f1f1f1;
  .flex-center-center;
}
.window{
  margin-top: -40px;
  max-width: 95%;
  height: 700px;
  background: #fff;
  box-shadow: 0 0 10px #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 1000px;
}
.left{
  flex: 0 0 320px;
  border-right: 1px solid #eee;
}
.right{
  flex: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 5px;
}
.head{
  width: 100%;
  flex: 0 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  div{
    font-size: 16px;
  }
  .time{
    color: #666;
  }
}
.message-box{
  flex: auto;
  width: 100%;
  border: 1px solid #eee;
  box-shadow:inset 0 0 10px #eee;
  border-radius: 5px;
  background: #eee;
  overflow-y: auto;
  padding: 10px;
}
.edit-box{
  width: 100%;
  margin-top: 10px;
  /deep/ textarea{
    padding: 10px;
    background: #f7f7f7;
  }
  /deep/ .el-input__count{
    background: #f7f7f7;
  }
}
.tips{
  flex: none;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
  span{
    color: #999;
    margin-right: 10px;
    display: inline-block;
  }
}
.msg-enter{
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  span{
    display: inline-block;
    color: #666;
    background: #fff;
    padding: 5px 10px;
  }
}
.msg-item{
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding-left: 0;
  padding-right: 10%;
  .msg-face{
    flex: 0 0 40px;
    margin-right: 10px;
    margin-top: 2px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .msg-item-info{
    flex: auto;
    .msg-head{
      height: 24px;
      padding-bottom: 5px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span{
        display: inline-block;
      }
      .name{
        color: #333;
      }
      .time{
        color: #999;
        margin: 0 10px;
      }
    }
    .msg-content{
      margin-bottom: 10px;
      padding: 0 5px;
      span{
        max-width: 500px;
        display: inline-block;
        word-break: break-all;
        padding: 10px;
        background: #fff;
        border-radius: 5px;
        border-top-left-radius: 0;
        position: relative;
      }
      i{
        position: absolute;
        display: block;
        left: -6px;top: 0;
        width: 0;height: 0;
        border-top: 6px solid #fff;
        border-left: 6px solid transparent;
      }
    }
  }
  &.myself{
    justify-content: flex-end;
    flex-direction: row-reverse;
    padding-right: 0;
    padding-left: 10%;
    .msg-face{
      margin-right: 0;
      margin-left: 10px;
    }
    .msg-head{
      flex-direction: row-reverse;
    }
    .msg-content{
      text-align: right;
      span{
        border-top-right-radius: 0;
      }
      i{
        right: -5px;left: auto;
        width: 0;height: 0;
        transform: rotateY(180deg);
      }
    }
  }
}
</style>
