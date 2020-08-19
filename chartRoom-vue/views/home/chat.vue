<template>
  <div class="right">
    <div class="head">
      <div class="name">{{chatItem.name}}</div>
    </div>
    <div class="message-box scroll-bar" ref="messageBox" @scroll="msgContentScroll" v-loading="msgLoading">
      <div class="msg-height" ref="msgHeight">
        <div class="msg-item" :class="{myself:item.name==userObj.name}" v-for="item of msgList" :key="item.id">
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
        </div>
      </div>
      <!-- 用于加载聊天记录之后计算滚动条高度 -->
      <div class="msg-cover" ref="recordHeight" v-show="recordList.length">
        <div class="msg-item"  v-for="item of recordList" :key="item.id">
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
      rows:20,//每次获取的聊天记录数
      isGetRecord:false,//聊天记录获取中
      recordList:[],//每次滚动到顶部获取聊天记录之后，塞入数据计算滚动条高度
      msgLoading:false,//消息框loading
      listener:null,
      pre_scrollTop:0,//上一次的滚动条位子
    }
  },
  props:['chatItem'],
  computed: {
    userObj(){
      return this.$store.state.login.userObj;
    }
  },
  components: {
  },
  mounted () {
    //socket.io相关
    let userObj = localStorage.getItem('userObj');
    if(userObj){
      document.addEventListener('keypress',this.keypressCtrlEnter);
      this.setCurrentTime();
      this.getLatestRecords(1,new Date().valueOf());
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
    //根据时间戳 往前获取指定条数的聊天记录 type=1 最新记录, type=2 小于改时间戳的记录
    getLatestRecords(type,timestamp){
      this.msgLoading = true;
      http.get({
        url:`${api.getRecordChat}`,
        params:{
          id:this.chatItem.user_id,
          targetId:this.chatItem.contact_id,
          timestamp: timestamp,
          rows:this.rows,
          type:type,
        },
        loading:false,
      }).then(res => {
        if(!res.result.length){
          this.msgLoading = false;
          if(type==1) this.$emit('showChatAll',this.chatItem);
          return;
        };
        if(type==2){//滚动到顶部 加载数据
          this.recordList = res.result;
          let recordHeight = 0;
          this.$nextTick(()=>{//新增记录渲染完成
            recordHeight = this.$refs.recordHeight.offsetHeight;//获取新增记录的高度
            this.msgList = res.result.concat(this.msgList);
            this.$nextTick(()=>{//主列表渲染完成
              let msgHeight = this.$refs.msgHeight.offsetHeight;
              this.$refs.messageBox.scrollTop = recordHeight;
              this.recordList = [];//清空新增列表
              this.isGetRecord = false;
              this.msgLoading = false;
            })
          })
        }else{//初次加载
          this.msgList = res.result.concat(this.msgList);
          this.$nextTick(()=>{
            let msgHeight = this.$refs.msgHeight.offsetHeight;
            this.$refs.messageBox.scrollTop = msgHeight;
            this.isGetRecord = false;
            this.msgLoading = false;
            this.$emit('showChatAll',this.chatItem);
          })
        }
      }).catch(()=>{
        this.isGetRecord = false;
        this.msgLoading = false;
      });
    },
    msgContentScroll(e){
      if(this.pre_scrollTop > e.target.scrollTop){
        if(e.target.scrollTop <= 30){
          //防止重复加载
          if(this.isGetRecord) return;
          this.isGetRecord = true;
          let timestamp = this.msgList[0].timestamp;
          this.getLatestRecords(2,timestamp);
        }
      }
      this.pre_scrollTop = e.target.scrollTop;
    },
    setCurrentTime(){
      let nowData = tools.format(new Date(),'yyyy年MM月dd日 hh:mm:ss');
      this.currentTime = nowData;
      let timer = setTimeout(()=>{
        this.setCurrentTime();
      },1000)
    },
    //显示消息
    showMsg(data){
      if(!this.$refs.msgHeight) return;
      let obj = {...data};
      this.msgList.push(obj);
      this.$nextTick(()=>{
        let msgHeight = this.$refs.msgHeight.offsetHeight;
        this.$refs.messageBox.scrollTop = msgHeight;
      })
    },
    submit(){
      if(!this.content){
        return;
      }
      //提交消息到后台
      this.$socket.emit('sendMsgChat', {
        content:this.content,
        id:this.userObj.id,
        targetId:this.chatItem.contact_id,
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

.right{
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;top: 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 5px;
  background: #fff;
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
  position: relative;
}
.msg-height{
  width: 100%;
  padding: 10px;
}
.msg-cover{
  position: absolute;
  padding: 10px;
  width: 100%;
  left: 0;top: 0;
  opacity: 0.5;
  z-index: -1;
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
