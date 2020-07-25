<template>
	<div class="content-layout">
		<div class="header">
			<div class="logo" v-if="showBack">
				<img src="../../assets/images/logo.png" @click="toHome" >
			</div>
      <div class="back" v-else @click="$router.back(-1)">
        <van-icon name="arrow-left" />
        返回
      </div>
			<div class="user">
				<span>您好，{{userName}}</span>
				<div class="menu" @click="openMenu">
					<div class="line"></div>
					<div class="line"></div>
					<div class="line"></div>
				</div>
			</div>
		</div>
		<div class="cover" @click="closeMenu" v-if="menuShow"></div>
		<div class="nav" :class="{'active':menuShow}">
			<div class="close">
				<img @click="closeMenu" src="../../assets/images/close.png" alt="">
			</div>
			<div class="nav-list" @click="navClick($event)">
				<div class="item" @click="toHome"><i class="el-icon-s-home"></i>首页</div>
			</div>
			<div class="bottom" @click="refresh">
				<i class="el-icon-refresh"></i>刷新
			</div>
		</div>
		<!-- <div class="bread" v-if="breadShow">
			<el-breadcrumb class="bread-item" separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item> -->
				<!-- 一级面包屑 通用-->
				<!-- <el-breadcrumb-item v-if="breadObj.one" :to="{'name': breadObj.one.param}">
					{{breadObj.one.name}}
				</el-breadcrumb-item> -->
				<!-- 流程处理面包屑 -->
				<!-- <el-breadcrumb-item v-if="breadObj.handle"
				:to="{'name': breadObj.handle.param,params:{'status':breadObj.handle.status}}">
					{{breadObj.handle.name}}
				</el-breadcrumb-item> -->
				<!-- 二级面包屑 自定义 -->
				<!-- <el-breadcrumb-item class="two-bread" v-if="breadObj.two.name">
					{{breadObj.two.name}}
				</el-breadcrumb-item>
			</el-breadcrumb> -->
		<!-- </div> -->
		<div class="content"><router-view/></div>
    <van-image-preview v-model="show" :images="images" :closeable="true" :show-index="false" @change="onChange">
      <template v-slot:cover>
        <a class="download-box" :download="imgObj.name" :href="imgObj.fullUrl"><van-icon name="down" /></a>
      </template>
    </van-image-preview>
	</div>
</template>
<script>
import { ImagePreview } from 'vant'
export default {
	data() {
		return {
      menuShow: false,
      show:false,
      images:[],
      index:1,
      imgObj:{
        fullUrl:'',
        name:'',
      },
		}
	},
	computed:{
		breadObj:function(){
			return this.$store.state.bread.breadObj;
		},
		breadShow:function(){
			return this.$store.state.bread.breadShow;
		},
		userName:function(){
			return this.$store.state.login.userName;
    },
    showBack:function(){
			return this.$store.state.page.showBack;
		}
	}, 
	mounted(){
		let userName = localStorage.getItem('userName');
		if(userName){
			this.$store.commit('setUser',{cName:userName});
    }
    this.preview();
	},
	methods:{
    onChange(index) {
      this.index = index;
    },
    preview(){
      //链接a标签点击事件
      document.querySelector('body').addEventListener('click',(event)=>{
        let tagName = event.target.tagName,
            search = event.target.search;
        if(tagName==='A' && /\.(jpg|png|jpeg|bmp|gif)/i.test(search)){
          event.preventDefault();
          let param = search.split('=')[1];
          this.previewImg(param);
          this.imgObj={
            fullUrl:event.target.href,
            name: event.target.innerHTML.substring(0,event.target.innerHTML.indexOf('.'))
          }
        }
      });
    },
    previewImg(param){
      geex.downLoadFile({
        url:api.appMediaShow,
        params:{
          img:param
        }
      }).then(res=>{
        this.show = true;
        this.images = [res];
      })
    },
		toHome(){
			this.$router.push({name:'home'});
    },
		openMenu(){
			this.menuShow = true;
		},
		closeMenu(){
			this.menuShow = false;
		},
		navClick(e){
			let target = e.target;
			if(target.className.includes('item')){
				this.menuShow = false;
			}
		},
		refresh(){
      this.$dialog.confirm({
        title:'提示',
        message:'是否清除缓存并刷新页面？'
      }).then(() => {
        localStorage.clear();
				window.location.reload();
      }).catch(() => {});
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) '~css/common.less';
.download-box{
  position: fixed;
  left: 16px;
  top: 16px;
  border-bottom: 2px solid #fff;
  padding-bottom: 2px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 20px;
  width: 20px;
  i{
    color: #fff;
    font-size: 24px;
  }
}
.bread{
	width: 100%;
	padding: 0 15px;
	height: 50px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background: #fff;
	border-bottom: 10px solid #F6F7F8;
	.back{
		color: #1970F5;
		cursor: pointer;
		display: inline-block;
		margin-right: 10px;
	}
	.bread-item{
		display: flex;
		width: 100%;
		/deep/ .el-breadcrumb__item{
			float: none;
			display: flex;
			.el-breadcrumb__inner{
				white-space: nowrap;
			}
		}
	}
	.two-bread{
		width: 0;
		flex: auto;
		/deep/ .el-breadcrumb__inner{
			width: 100%;
			.text-ellipsis;
		}
	}
}
.content-layout{
	padding-top: 45px;
}
.header{
	width: 100%;
	background: #fff;
	height: 45px;
	overflow: hidden; 
	border-bottom: 1px solid #eee;
	position: fixed;z-index: 11;
	top: 0;left: 0;
	.logo{
		width: 138px;height: 100%;float: left;
		margin-left: 15px;
		.flex-center;
		img{
			width: 100%;height: auto;
			cursor: pointer;
		}
  }
  .back{
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    float: left;
  }
	.user{
		float: right;height: 100%;
		.flex-center;
		justify-content: flex-end;
		span{
			display: inline-block;margin-left: 10px;
			font-size: 12px;color: #333;
		}
		.menu{
			height: 100%;
			width: 40px;
			.flex-center;
			flex-direction: column;
			.line{
				width: 15px;height: 2px;background: #C2C5CA;
				border-radius: 2px;
				margin-bottom: 3px;
				&:last-child{
					margin: 0;
				}
			}
		}
	}
}
.cover{
	position: fixed;z-index: 99;
	top: 0;left: 0;
	width: 100%;height: 100%;
	background: rgba(0, 0, 0, 0.5);
}
.nav{
	background: #fff;
	position: fixed;z-index: 100;
	top: 0;right: -200px;
	width: 200px;
	height: 100%;
	padding-bottom: 40px;
	.nav-list{
		border-top: 1px solid #eee;
		.item{
			padding: 0 20px;
			height: 40px;
			.flex-center;
			justify-content: flex-start;
			border-bottom: 1px solid #eee;
			color: #333;
			i{
				color: #666;
				margin-right: 10px;
				font-size: 18px;
			}
		}
	}
	.close{
		text-align: right;
		height: 40px;
		line-height: 40px;
		padding: 0 15px;
		.flex-center;
		justify-content: flex-end;
		img{
			width: 15px;height:15px;
		}
	}
	&.active{
		right: 0;
		transition: all 0.2s;
	}
	.bottom{
		position: absolute;
		left: 0;bottom: 0;
		width: 100%;
		height: 40px;
		.flex-center;
		justify-content: flex-start;
		padding-left: 20px;
		border-top: 1px solid #eee;
		i{
			margin-right: 10px;
			color: #666;
			font-size: 18px;
		}
	}
}
.content{
	width: 100%;
}
</style>
