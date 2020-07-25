<template>
  <div class="slide">
    <div class="menu">
      <div class="face">
        <img :src="require('images/face.jpg')" alt="">
      </div>
    </div>
    <div class="contacts">
      <div class="search"></div>
      <div class="list"></div>
    </div>

    <popInfo v-if="popShow"></popInfo>
  </div>
</template>
<script>
export default {
  data () {
    return{
      popShow:true,
    }
  },
  mounted(){

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
  .face{
    width: 100%;
    height: 50px;
    .flex-center-center;
    img{
      width: 40px;
      height: 40px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
.contacts{
  flex: auto;
}
</style>