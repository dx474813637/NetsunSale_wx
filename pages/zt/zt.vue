<template>
	<view 
		class="wrapper bg-white u-font-28"
		ref="page" 
	>
	
		<view class="top-box" :style="{
			'height': '483rpx',
			'border-radius': `0 0 43% 43%`,
			'background': `url('http://market.netsun.testwebsite.cn/Public/Upload/diy/61e6b37d4c6d5.png')`,
			'background': `#1b35ae`,
			'background': `linear-gradient( 0deg, #1b35ae, #061976)`, 
		}"></view>
		
		<view class="ww" >
			<view class="item-wrapper" >
				<view class="search-wrapper u-flex">
					<view class="search-left-pic" :style="{
						flex: `0 0 34%`,
						width: `34%`,
					}">
						<u-image
							height="64rpx"
							mode="heightFix"
							src="http://zc.toocle.com/Public/Upload/diy/61e52fa0dd92a.png"
						></u-image>
					</view>
					<view class="search-content">
						<u-search
							v-model="kw"
							shape="square"
							bgColor="#FFFFFF" 
							color="#A2722F" 
							clearabled 
							:showAction="false"
							ctionText="搜索"
							borderColor="#FFFFFF"
							@search="handleSearch"
							@custom="handleSearch"
							:action-style="{
								color: '#FFFFFF'
							}"
						></u-search>
					</view>
				</view>
			</view>
			<view class="item-wrapper" >
				<scroll-view scroll-x >
					<view class="menu-wrapper u-flex nowrap">
						<view class="item u-flex u-flex-center text-white" 
							v-for="(ele, index) in tabs" 
							:key="index" 
							>
							<view class="menu-title" 
								@click="handleGoto(ele.link)"
							>{{ele.title}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="item-wrapper" >
				<view class="swiper-wrapper" :style="{
					'padding-left': '15rpx',
					'padding-right': '15rpx'
				}"> 
					<u-swiper 
						:list="swiper" 
						:height="150" 
						:border-radius="13"
						indicator
						bgColor="transparent"
						@click="handleSwiperClick"
					></u-swiper>
				</view>
			</view>
			<view class="item-wrapper" >
				<view class="menu-wrapper u-flex u-flex-wrap " >
					<view class="item u-flex-column u-flex-items-center col-5" 
						v-for="(ele, index) in nav1" 
						:key="index"
						>
						<view class="menu-img">
							<u-image 
								width="50px" 
								height="50px" 
								mode="a"
								:src="ele.url" 
							></u-image>
						</view>
						<view class="menu-title u-line-1 text-base" >{{ele.title}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="u-flex u-flex-items-end u-flex-between u-p-20">
			<up-image src="https://wstm.y.netsun.com//Public/attached/2023/11/09/654c9201b0def.png" height="30px" width="200px" mode="heightFix" ></up-image>
			<view class="item u-flex u-flex-items-center u-font-28 u-info text-nowrap u-p-20" @click="base.handleGoto('/pages/product/productList')" style="position: relative;z-index: 20;">
				<view class="u-m-r-10">全部商品</view>
				<u-icon name="arrow-right" color="#999" size="14"></u-icon>
			</view>
		</view>
		<view class="list u-flex u-flex-wrap u-flex-items-start u-p-10">
			 <view 
				class="list-item u-p-14" 
				v-for="item in dataList" 
				:key="item.id"
				>
			 	<ProductColCard
					:origin="item"
				></ProductColCard>
			 		 
			 </view>	
			
			 		
		</view>
		<u-safe-bottom></u-safe-bottom>
		<MenusBar ></MenusBar>
	</view>
</template>

<script setup>
	import { share } from '@/composition/share.js'
	import useDataList from '@/composition/useDataList.js'
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore() 
	const { setOnlineControl } = share()
	const $api = inject('$api')
	
	const homelist = ref({})
	const current = ref(0)
	const kw = ref('')
	const tabs = ref([
		{
			id: 0,
			link: "/pages/prodList/prodList?term=轴承",
			title: "深沟球轴承",
			url: "http://dingxiang.netsun.testwebsite.cn/mShop/img/p1.jpg",
		},
		{
			id: 1,
			link: "/pages/prodList/prodList",
			title: "欧凯okai",
			url: "http://dingxiang.netsun.testwebsite.cn/mShop/img/p2.jpg",
		},
		{
			id: 2,
			link: "/pages/prodList/prodList",
			title: "6000系列",
			url: "http://dingxiang.netsun.testwebsite.cn/mShop/img/p3.jpg",
		},
		{
			id: 3,
			link: "/pages/prodList/prodList",
			title: "6200系列",
			url: "http://dingxiang.netsun.testwebsite.cn/mShop/img/p4.jpg",
		},
		{
			id: 4,
			link: "/pages/prodList/prodList",
			title: "螺纹钢",
			url: "http://dingxiang.netsun.testwebsite.cn/mShop/img/p5.jpg",
		}
	])
	const swiper =ref([
		{
			id: 0,
			url: "http://zc.toocle.com/Public/Upload/diy/61e61a4a30012.jpg",
			link: "/pages/prodList/prodList",
		},
		{
			id: 2,
			url: "http://zc.toocle.com/Public/Upload/diy/61e61a5182395.jpg",
			link: "/pages/prodList/prodList",
		}
	])
	const ad = ref({
		id: 0,
		image: "http://market.netsun.testwebsite.cn/Public/Upload/diy/61e7a6dc7367d.jpg",
		link: "",
	})
	const nav1 = ref([
		{
			id: 0,
			link: "/pages/zt_one/zt_one?id=1",
			title: "轴承市场",
			url: "http://zc.toocle.com/Public/Upload/diy/61e606fd5e99a.png",
		},
		{
			id: 1,
			link: "/pages/prodList/prodList",
			title: "推荐商家",
			url: "http://zc.toocle.com/Public/Upload/diy/61e60705a3623.png",
		},
		{
			id: 2,
			link: "/pages/prodList/prodList",
			title: "自营品牌",
			url: "http://zc.toocle.com/Public/Upload/diy/61e6070ede1da.png",
		},
		{
			id: 3,
			link: "/pages/prodList/prodList",
			title: "浙江智造",
			url: "http://zc.toocle.com/Public/Upload/diy/61e607171cc4a.png",
		},
		{
			id: 4,
			link: "/pages/prodList/prodList",
			title: "测试专用",
			url: "http://zc.toocle.com/Public/Upload/diy/61e6071e18b43.png",
		},
		{
			id: 41,
			link: "/pages/zt_one/zt_one?id=2",
			title: "专题活动",
			url: "http://market.netsun.testwebsite.cn/Public/Upload/diy/61e617b07bb70.jpg",
		},
		{
			id: 5,
			link: "/pages/prodList/prodList",
			title: "轴承品牌",
			url: "http://market.netsun.testwebsite.cn/Public/Upload/diy/61e617bb02a2b.jpg",
		},
		{
			id: 6,
			link: "",
			title: "轴承型号",
			url: "http://market.netsun.testwebsite.cn/Public/Upload/diy/61e617c351056.jpg",
		},
		{
			id: 7,
			link: "",
			title: "钢材配件",
			url: "http://market.netsun.testwebsite.cn/Public/Upload/diy/61e617d278314.jpg",
		},
		{
			link: "",
			title: "仪器仪表",
			url: "http://market.netsun.testwebsite.cn/Public/Upload/diy/61e617de2e5a9.jpg",
		}
	])
	 
	const options = computed(() => {
		return {
			params: {},
			api: 'web_product',
			getDataCallBack: (res) => {  
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list]
					if(dataList.value.length >= res.total) {
						loadstatus.value = 'nomore'
					}
					else {
						loadstatus.value = 'loadmore'
					}
				}
			}
		}
	})
	
	const { 
		dataList,
		curP,
		loadstatus,
		params,
		getDataList,
		initDataList, 
	} = useDataList(options)
	onReady(() => {
		uni.setNavigationBarColor({
			backgroundColor: '#061976',
			frontColor: '#ffffff'
		})
	})
	onLoad(async () => {
		initDataList() 
		
	}) 
</script>

<style lang="scss"> 
</style>
<style lang="scss" scoped>
	
	.list {
		box-sizing: border-box;
		>.list-item {
			flex: 0 0 50%;
			box-sizing: border-box;
		}
	}
	// .wrapper {
	// 	/deep/ .u-mode-center-box {
	// 		background-color: transparent;
	// 	}
	// }
	
	.wrapper {
		position: relative;
		overflow-x: hidden;
		background-color: #fff;
		padding-bottom: 100px;
		.top-box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 1;
			transform: scaleX(1.5);
			background-size: 100% 100%!important;
			background-position: center!important;
			background-repeat: no-repeat!important;
		}
	}
	.isFullScreen {
		.ww { 
		}
		.tabbar {
			padding-bottom: 20px;
		}
		
	}
	.is-ios {
		.tabbar {
			min-height: 65px;
		}
	}
	.navbar {
		color: #000;
		height: 100rpx;
		font-size: 16px;
		// border-bottom: 1rpx solid #f8f8f8;
		position: relative;
		z-index: 50;
		.item {
			
		}
	}
	.btns {
		position: fixed;
		right: 30rpx;
		bottom: 200rpx;
		z-index: 200;
		width: 100rpx;
		.btns-style {
			width: 100rpx;
			height: 100rpx;
			padding: 10rpx;
			border-radius: 50%;
			box-shadow: 0 0 10px rgba(0,0,0,0.2);
			background-color: #fff;
			image {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				
			}
		}
		.btns-main {
			transition: all .3s;
			color: #585772;
			&.active {
				transform: rotate(45deg);
				color: #fff;
				background-color: #585772;
			}
		}
		.btns-list {
			position: absolute;
			bottom: 100%;
			left: 0;
			display: none;
			&.active {
				display: block;
				.item {
					animation: zhuan .5s;
				}
			}
			.item {
				margin-bottom: 10px;
			}
		}
	}
	
	@keyframes zhuan {
		0% {
			opacity: 0;
			transform: translateY(-10px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.alertAd-wrapper {
		padding: 40px 15px 25px;
		height: 100%;
		image {
			width: 100%;
			height: 100%;
			border-radius: 3px;
		}
	}
	.ww { 
		position: relative; 
		z-index: 20;
		.item-wrapper {
			position: relative;
			
			.search-wrapper {
				padding: 15rpx;
				position: relative;
				.search-left-pic {
					padding-right: 10px;
				}
				.search-content {
					flex: 1;
				}
				
			} 
			.swiper-wrapper {
				position: relative;
				.swiper-header-row {
					padding: 0 12px;
					height: 50px;
					position: absolute;
					left: 0;
					top: 10px;
					width: 100%;
					z-index: 200;
					.shop-name {
						font-weight: bold;
						color: #fff;
						font-size: 32rpx;
					}
					.item-search-icon {
						width: 30px;
						height: 30px;
						border-radius: 50%;
						background-color: rgba(255,255,255,.2);
						border: 1rpx solid #fff;
						color: #fff;
						.custom-icon {
							font-size: 16px;
						}
					}
				}
			}
			.menu-wrapper {
				padding: 0 5px 10px;
				&.nowrap {
					padding: 10px 10px;
					.item {
						min-height: 25px;
						flex-direction: row;
						margin: 0 10px;
						flex: 0 0 auto;
						padding: 0;
						&:first-child {
							margin-left: 0;
						}
						&:last-child {
							margin-right: 0;
						}
					}
				}
				.item {
					min-height: 80px;
					flex-direction: column;
					flex: 1;
					padding-top: 10px;
					&.col-4 {
						flex: 0 0 25%;
						width: 25%;
					}
					&.col-5 {
						flex: 0 0 20%;
						width: 20%;
					}
					&.col-6 {
						flex: 0 0 16.6%;
						width: 16.6%;
						.menu-img {
							width: 40px;
							height: 40px;
							margin-bottom: 8px;
						}
					}
					.menu-img {
						width: 50px;
						height: 50px;
						margin-bottom: 10px;
					}
					.menu-title {
						width: 100%;
						text-align: center;
					}
				}
			} 
		}
	}
	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		border-top: 1rpx solid #e7e7e7;
		z-index: 200;
		min-height: 60px;
		.item {
			flex-direction: column;
			flex: 1;
			color: #000;
			height: 100%;
			padding-top: 8px;
			
			span {
				line-height: 25px;
				font-size: 14px;
			}
		}
	}
</style>
