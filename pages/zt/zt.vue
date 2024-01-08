<template>
	<view 
		class="wrapper   u-font-28"
		style="padding-top: 44px;"
		ref="page" 
	>
		<u-status-bar></u-status-bar>
		<navBar
			:bgColor="info.colour" 
			title=""   
			fixed
			activeColor="#fff"
			titleStyle="color: #fff"
		>
			<template #navLeft>
				<view class="u-flex u-flex-items-center left-w u-border u-radius-20 u-p-15 u-p-l-30 u-p-r-30" style="background-color: rgba(0,0,0,.5);">
					<view class="btn u-m-r-30" @click="handleBack" v-if="backBtnShow">
						<i class="custom-icon custom-icon-back text-white" ></i>
					</view>  
					<view @click="base.handleGoto({url: '/pages/home/home', type: 'reLaunch'})" class="btn" > 
						<i class="custom-icon custom-icon-home text-white" ></i>
					</view>  
				</view>
			</template>
		</navBar> 
		<view class="img-w">
			<up-image
				width="100vw"
				mode="widthFix"
				height="auto"
				:src="info.pic"
			></up-image>
			<view class="title">
				{{info.name}}
			</view>
		</view>
		
		<!-- <view class="top-box" :style="{
			'height': '400rpx',
			'border-radius': `0 0 43% 43%`,
			'background': `url('http://market.netsun.testwebsite.cn/Public/Upload/diy/61e6b37d4c6d5.png')`,
			'background': `${themeColor}`,
			'background': `linear-gradient( 0deg, ${themeColor}, ${themeColor})`, 
		}"></view> -->
		 
		 <template v-if="info.cate == '1'">
		 	<view class="list u-flex u-flex-wrap u-flex-items-start u-p-10 u-m-t-20">
		 		 <view 
		 			class="list-item box-border u-p-14" 
		 			style="flex: 0 0 50%"
		 			v-for="item in dataList" 
		 			:key="item.id"
		 			>
		 		 	<ProductColCard
		 				:origin="item"
		 			>
						<template #content>
							<view class="content-w u-p-15 u-font-28 u-p-b-25">
								<view class="u-line-2 u-m-b-10 text-bold u-p-l-10 u-p-r-10">
									{{item.name}}
								</view>
								<view class="u-radius-30 u-flex " style="background-color: #EA5743; overflow: hidden; height: 38px;">
									<view class="item u-flex-1 u-p-t-5 box-border u-p-l-20 u-radius-20" style="background-color: #FDF3F1;">
										<view class="text-error u-font-20 u-m-l-10">到手价：</view>
										<view>
											<up-text 
												type="error" 
												mode="price" 
												:text="item.price1" 
												size="16"
												iconStyle="12" 
											></up-text>
										</view>
									</view>
									<view class="item text-white u-flex u-flex-items-center u-p-l-10 u-p-r-10 qiang-btn" style="height: 100%;background-color: #EA5743;">
										<text class="u-m-r-5 text-bold">抢</text>
										<u-icon name="arrow-right" color="#fff" size="10"></u-icon>
									</view>
								</view>
							</view>
						</template>
					</ProductColCard>  
		 		 </view>	  
		 	</view>
		 </template>
		<template v-if="info.cate == '2'">
			<view class="list u-flex u-flex-wrap u-flex-items-start u-p-10 u-m-t-20"> 
				 <view 
					class="list-item box-border u-p-20 uni-shadow-base bg-white u-radius-10 u-m-b-20" 
					style="flex: 0 0 100%"
					v-for="item in dataList" 
					:key="item.id"
					> 
				 	<ProductRowCard
						:origin="item"
						mode="normal"
						:customStyle="{
							'box-shadow': 'none!important'
						}"
					>
						<template #content>
							<view class="content-w u-p-5 u-p-l-20 u-font-32 u-flex-1 u-flex-column u-flex-between u-flex-items-start" style="width: 100%;">
								<view class="u-line-2 u-m-b-10 text-bold" style="width: 100%;" @click.stop="base.handleGoto({
									url: '/pages/product/productDetail',
									params: {
										id: item.id, 
									}
								})">
									{{item.name}}
								</view>
								<view class="u-radius-30 u-flex " style="background-color: #EA5743; overflow: hidden; height: 38px; width: 100%;">
									<view class="item u-flex-1 u-p-t-5 box-border u-p-l-20 u-radius-20 u-flex u-flex-items-start" style="background-color: #FDF3F1;">
										<view class="">
											<view class="text-error u-font-20 u-m-l-10">到手价：</view>
											<view>
												<up-text 
													type="error" 
													mode="price" 
													:text="item.price1" 
													size="16"
													iconStyle="12" 
												></up-text>
											</view>
										</view>
										<view class=" u-m-l-30" style="opacity: .6;">
											<view class="text-error u-font-20 u-m-l-10">吊牌价：</view>
											<view class="text-error" style="text-decoration: line-through; ">
												<up-text 
													type="error" 
													mode="price" 
													:text="item.price" 
													size="12"
													iconStyle="12" 
												></up-text>
											</view>
										</view>
										
									</view>
									<view class="item text-white u-flex u-flex-items-center u-p-l-10 u-p-r-10 qiang-btn" style="height: 100%;background-color: #EA5743;">
										<text class="u-m-r-5 text-bold">抢</text>
										<u-icon name="arrow-right" color="#fff" size="10"></u-icon>
									</view>
								</view>
							</view>
						</template>
					</ProductRowCard> 
				 </view>	 
			</view>
		</template>
		
		<u-safe-bottom></u-safe-bottom>
		<MenusBar ></MenusBar>
	</view>
</template>

<script setup>
	import { share } from '@/composition/share.js'
	import useDataList from '@/composition/useDataList.js'
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore() 
	const {themeColor} = toRefs(base)
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
	const dataList = ref([])  
	const zt = ref('')
	const info = ref({})
	onReady(() => {
		uni.setNavigationBarColor({
			backgroundColor: themeColor.value,
			frontColor: '#ffffff'
		})
	})
	onLoad(async (options) => { 
		if(options.hasOwnProperty('id')) {
			zt.value = options.id
		}
		else {
			uni.reLaunch({
				url: '/pages/home/home'
			})
			return
		}
		await getData()
	}) 
	const backBtnShow = computed(() => {
		return getCurrentPages().length > 1
	})
	function handleBack() {
		// $emits('backEvent')
		uni.navigateBack()
	}
	async function getData() {
		const res = await $api.zt_detail({
			params: {id: zt.value}
		})
		if(res.code == 1) {
			info.value = res.info
			dataList.value = res.list
		}
	}
</script>

<style lang="scss"> 
</style>
<style lang="scss" scoped>
	.qiang-btn {
		position: relative; 
	}
	.img-w {
		width: 100%;
		position: relative;
		.title {
			position: absolute; 
			top: 78px;
			font-size: 24px;
			left: 50%;
			transform: translateX(-50%);
			color: #fff;
			white-space: nowrap;
			font-weight: bold;
		}
	}
	.list {
		box-sizing: border-box;
		>.list-item { 
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
		background-color: #f8f8f8;
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
