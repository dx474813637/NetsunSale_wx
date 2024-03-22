<template>
	<view class="w bg-white">   
		<view class="navbar-w">
			<navBar
				bgColor="#fff" 
				title=""  
				activeColor="#000"
			>
				<template #navLeft>
					<view class="u-flex u-flex-items-center left-w u-border u-radius-20 u-p-15 u-p-l-30 u-p-r-30" >
						<view class="btn u-m-r-30" @click="handleBack" v-if="backBtnShow">
							<i class="custom-icon custom-icon-back text-white" ></i>
						</view>  
						<view @click="base.handleGoto({url: '/pages/home/home', type: 'reLaunch'})" class="btn" > 
							<i class="custom-icon custom-icon-home text-white" ></i>
						</view>  
					</view>
				</template>
				<view class="search-w u-flex u-flex-items-center u-p-r-30" style="width: 50vw;">
					<u-search
						placeholder="请输入商品关键词" 
						v-model="terms"
						bgColor="#f8f8f8" 
						:showAction="false"
						shape="round"
						@search="handleSearch"
						></u-search>
					<!-- <view class="u-m-l-20">
						<u-button 
							type="error"
							shape="circle"
							customStyle="height: 34px; border-radius: 6px"
							@click="handleSearch"
						>搜索</u-button>
					</view> -->
				</view>
			</navBar>
		</view>
		<view class="header u-p-t-20" :class="{
				'u-p-b-20': terms
			}"> 
			<view class="home-info-w u-p-20 u-m-l-30 u-m-r-30 bg-white "> 
				<view class="u-flex u-flex-items-center u-flex-between"> 
					<view class="item u-flex u-flex-items-center" style="position: relative;height: 45px;">
						<view class="avatar-w u-m-r-20 " v-if="homeInfo.logo">
							<up-image
								:src="homeInfo.logo"
								width="45px"
								height="45px"
								shape="circle"
							></up-image> 
						</view>
						<view class="u-p-8">
							<view class="home-nick u-line-1 u-m-b-5 text-bold u-font-34" >
								<template v-if="homeInfo.company">
									{{homeInfo.company}}
								</template>
								<template v-else>
									暂无旺铺名
								</template> 
							</view>
							<view class="home-nick u-line-2 u-font-26" >
								<text class="text-base u-m-r-20" v-if="sale > 0">已售{{sale}}</text>
								<!-- <text class="u-p-4 u-p-l-15 u-p-r-15 u-warning u-warning-light-bg u-radius-4" v-if="">{{homeInfo.title}}</text> -->
							</view>
							
						</view>
					</view>
					<view class="item u-flex u-flex-items-center u-p-r-10 u-m-l-10">
						<!-- <u-button type="error" shape="circle" size="small" v-if="isMe" @click="showHomeInfo = true">编辑</u-button> 
						<u-button type="error" shape="circle" size="small" v-else @click="followEvent">关注</u-button> 
 -->
					</view> 
				</view> 
			</view>
			
			<view class="tabs-w bg-white u-m-t-20" style="border-radius: 15px 15px 0 0;overflow: hidden;" v-if="!terms">
				<u-tabs
					:list="tabs_list"  
					lineWidth="0" 
					:current="tabs_current" 
					:activeStyle="{
						color: themeColor
					}"
					@change="handleTabsChange"
				></u-tabs>	
			</view> 
		</view>  
	 
		<view class="bg-white" style="overflow: hidden;">
			<view v-if="notice && notice.length > 0">
				<u-notice-bar 
					direction="column" 
					:text="notice"
					bgColor="#ffe4e4"
					color="#f00"
					duration="3000"
				></u-notice-bar>
			</view>
			<!-- <view class="u-p-5 u-p-l-20 u-p-r-20 u-font-26" v-if="others && others.length > 0 ">
				<view class="u-flex u-flex-items-center u-p-10"
					v-for="(item, index) in others"
					:key="index"
					@click="ohterClick(item)"
					>
					<view class="item text-base u-m-r-30"> 
						{{item.name}}
					</view>
					<u-line direction="col" length="15px"></u-line> 
					<view class="item u-p-l-30 u-flex-1 u-line-1 ">
						<text class="u-info">{{item.info}}</text>
						
					</view>
					<u-icon name="arrow-right" color="#ccc"></u-icon>  
				</view>  
			</view> -->
		</view> 
		<view class="list u-flex u-flex-wrap u-flex-items-start u-p-10"> 
			 <view 
				class="list-item u-p-14" 
				v-for="item in dataList" 
				:key="item.id"
				>
				<ProductColCard
					:origin="item"
					:customStyle="{boxShadow: 'none!important', border: '1rpx solid #f9f9f9'}"
				></ProductColCard>
					 
			 </view> 
		</view>
		<template v-if="dataList.length == 0">
			<view class="u-flex u-flex-center u-p-40">
				<u-empty mode="data" :icon="base.empty" />
			</view>
			
		</template>
		<template v-else>
			<u-loadmore :status="loadstatus" />
		</template>  
		 
			
		
		<u-safe-bottom></u-safe-bottom>
	</view>
	 
	
	<!-- <BaseInfoPopup
		:show="showBaseInfo" 
		:title="baseInfo.name1" 
		:info="baseInfo.info"
		:onUpdateShow="handleChangeShow3" 
	></BaseInfoPopup> -->
	<!-- <HomeInfoPopup
		:show="showHomeInfo" 
		title="特卖店信息编辑"
		:homeInfo="homeInfo"
		:onUpdateShow="handleChangeShow2" 
		@submit="submit"
	></HomeInfoPopup> -->
	<sharePopup
		:show="showShare"
		bgColor="transparent"
		:origin="{haibao: haibao}"
		:onUpdateShow="handleChangeShow4" 
	></sharePopup>
	<!-- <ProductListPopup
		:show="showProductList" 
		title="商品列表"  
		:divideShow="true"
		:xuanList="dataList"
		:xuan="xuan"
		:onUpdateShow="handleChangeShow"  
		@xuanEvent="xuanEvent"
	></ProductListPopup> -->
	<!-- <TabBar :customStyle="customStyle" v-if="isMe">
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28 button-w" > 
			<u-button type="error" shape="circle" @click="showProductList = true">
				管理商品配置
				<template v-if="!xuan">
					- 未配置
				</template>
			</u-button>
		</view>
	</TabBar>    -->
	<view class="u-flex-column u-flex-items-center u-p-l-20 u-p-r-20 u-font-28 fixed-menus-w" > 
		<view class="u-m-b-30 share-btn btns-w u-radius-30 u-flex u-flex-center u-flex-items-center u-border" @click="showShare = true" style="background-color: #ffeeee;border-color: #ffc7c7;">
			<view class="u-flex-column u-flex-center u-flex-items-center text-black u-p-5"> 
				<u-icon name="share-square" color="#f00" size="24"></u-icon>
				<text class="u-font-26 text-nowrap text-error text-thin">分享</text>
			</view>
		</view>
		<view class="btns-w u-radius-30 u-flex u-flex-center u-flex-items-center" @click="base.handleGoto('/pages_user/cart/cart')" style="background-color: rgba(0,0,0,.9);">
			<view class="u-flex-column u-flex-center u-flex-items-center text-black u-p-5"> 
				<u-icon name="shopping-cart" color="#fff" size="36"></u-icon> 
			</view>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script setup>
	// import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	// import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	import { share } from '@/composition/share.js'
import { nextTick } from 'vue';
	const { setOnlineControl, customShareParams } = share()
	const $api = inject('$api')
	
	useNormal()
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore()
	const { themeColor } = toRefs(base)
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	import {
		userStore 
	} from '@/stores/user';
	const user = userStore()
	const {user_info, balance} = toRefs(user) 
	const login = ref('') 
	const curP = ref(1) 
	const dataList = ref([]) 
	const loadstatus = ref('loadmore') 
	const terms = ref('')
	const homeInfo = ref({})
	const customStyle = ref({
		// paddingBottom: '50px',
		// background: 'transparent' 
	})  
	const customStyle2 = ref({
		paddingBottom: '80px',
		background: 'transparent' 
	})  
	const tabs_current = ref(0)
	const tabs_list = ref([
		{
			name: '全部',
			value: '',
			disabled: false
		}
	])  
	const showBaseInfo = ref(false)
	const showHomeInfo = ref(false)
	const showShare = ref(false)
	const baseInfo = ref({})
	const xuan = ref(0)  
	const bg = ref('')
	const haibao = ref('') 
	const others = ref([])
	const notice = ref([])
	
	const list_col = ref({
		list1: [],
		list2: [],
	}) 
	const leftGap = ref(8) 
	const rightGap = ref(8) 
	const columnGap = ref(8)
	const uToast = ref('') 
	const waterfall = ref('')
	const sale = ref(0)
	const func = computed(() => {
		return terms.value ? 'web_search' : 'web_product'
	}) 
	const mode_current = ref(0)
	// const mode_list = ref([
	// 	{
	// 		name: '商品',
	// 		value: '1',
	// 		disabled: false
	// 	},
	// 	{
	// 		name: '笔记',
	// 		value: '2',
	// 		disabled: false
	// 	},
	// ])  
	// const mode_list2 = computed(() => [mode_list.value])
	// const list = ref([])
	const loading = ref(false)
	onLoad(async (options) => {  
		if(options.hasOwnProperty('login')) {
			login.value = options.login
		} 
		// if(options.hasOwnProperty('mode')) {
		// 	mode_current.value = +options.mode
		// }
		await initData()  
	})
	// const activeMode = computed(() => mode_list.value[mode_current.value])
	// const activeModeValue = computed(() => mode_list.value[mode_current.value].value)
	 
	 
	// watch(
	// 	() => activeModeValue.value,
	// 	(n) => {
	// 		initData() 
	// 	}
		
	// )
	const backBtnShow = computed(() => {
		return getCurrentPages().length > 1
	})
	onReachBottom( () => {  
		getMoreData() 
	})    
	async function getMoreData() {
		if(loadstatus.value != 'loadmore') return
		curP.value ++
		await getData()
	}
	async function getData() {
		if(loadstatus.value == 'loading') return
		loadstatus.value = 'loading'
		const res = await $api[func.value]({params: {
			p: curP.value,
			login: login.value,
			cate: tabs_list.value[tabs_current.value].value,
			terms: terms.value
		}})
		if (res.code == 1) { 
			dataList.value = [...dataList.value, ...res.list ] 
			if(res.catelist?.length > 0) {
				tabs_list.value = [
					{
						name: '全部',
						value: '',
						disabled: false
					}, 
					...res.catelist.map(ele => {
						return {
							...ele,
							disabled: false,
							value: ele.id,
							name: ele.name
						}
					})
				]
			}
			
			if(dataList.value.length >= +res.total || res.xuan == 1) {
				loadstatus.value = 'nomore'
			}
			else {
				loadstatus.value = 'loadmore'
			}
		}
	}
	async function getShopData() { 
		const res = await $api.web_company({params: {
			login: login.value,
			// cate: tabs_list.value[tabs_current.value].value
		}})
		if (res.code == 1) {  
			homeInfo.value = res.list || {} 
			bg.value = res.bj
			haibao.value = res.haibao
			sale.value = res.sale || 0
			others.value = res.other || []
			notice.value = res.notice || []
			setOnlineControl(res) 
		}
	}
	function initDataParams() {
		curP.value = 1;
		dataList.value = []
		loadstatus.value = 'loadmore'
	}
	async function initData() {
		uni.showLoading()
		initDataParams();
		await getShopData()
		await getData() 
	} 
	 
	 function handleChangeShow(data) {
	 	showProductList.value = data
	 }
	function handleChangeShow4(data) {
		showShare.value = data
	}
	function handleChangeShow3(data) {
		showBaseInfo.value = data
	}
	function handleChangeShow2(data) {
		showHomeInfo.value = data
	}
	function previewImage(index, imgs) {
   		uni.previewImage({
   			urls: imgs,
   			current: index, 
   			loop: true
   		})
   	}
	function updateShopProduct(product, check) {
		return new Promise(async (res, rej) => {
			const result = await $api.shop_product({
				params: {
					id: product.id,
					cate: check? 1: 2
				}
			})
			if(result.code == 1) {
				res(true)
			}
			rej(false)
		})
	} 
	function ohterClick(data) {
		baseInfo.value = {...data}
		showBaseInfo.value = true
	}  
	function handleBack() {
		// $emits('backEvent')
		uni.navigateBack()
	}
	async function initListData() {
		uni.showLoading()
		initDataParams(); 
		await getData()
	}
	async function handleTabsChange(data) {
		tabs_current.value = +data.index
		await initListData()
	}  
	
	async function handleSearch() {
		await initListData()
	}
	
</script>

<style > 
</style>
<style lang="scss" scoped> 
	.share-btn {
		background-color: transparent;
		color: #000;
		line-height: 20px;
		&:after {
			border: 0;
		}
	}
	.header {
		position: relative;
		background: linear-gradient(45deg, #f4dbf2, #F7E6F6, #DBF6FD, #cdf3fd);
	}
	.home-bg {
		position: relative;
		width: 100vw;
		height: 240px;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			position: absolute; 
			filter: blur(2px);
			transform: scale(1.05);
		}
		&:before {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 5;
			background-color: rgba(0,0,0,.2);
		}
		&:after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 8;
			height: 10%;
			background-image: linear-gradient(to top, #fff, transparent); 
		}
	}
	// .navbar-w {
	// 	position: absolute;
	// 	top: 0;
	// 	left: 0;
	// 	width: 100%; 
	// 	box-sizing: border-box; 
	// 	z-index: 20;
	// }
	.home-info-w {
		// position: absolute;
		// bottom: 0;
		// left: 50%;
		// width: 95%;
		// height: 50%;
		box-sizing: border-box;
		// transform: translateX(-50%);
		border-radius: 10px ;
		// background-color: #555;
		// z-index: 10;
		// .mode-w {
		// 	position: absolute;
		// 	bottom: calc(100% + 10px);
		// 	color: #d8d3d3;
		// 	right: 0;
		// 	background-color: rgba(0,0,0,.7);
		// }
		.avatar-w {
			border: 2px solid $u-error;
			border-radius: 50%;
			// position: absolute;
			// left: 0;
			// bottom: -15px;
			
		}
	}
	.fixed-menus-w {
		position: fixed;
		right: 0;
		bottom: 100px;
		.btns-w {
			width: 50px;
			height: 50px;
		}
	}
	.button-w {
		height: 100%; 
		background-color: #fff;
	}
	.w {
		height: 100%;
		padding-bottom: 110px;
		box-sizing: border-box;
		// background: linear-gradient(to bottom, #fff, $page-bg2 300px);
		.list {
			box-sizing: border-box;
			>.list-item {
				flex: 0 0 50%;
				box-sizing: border-box;
			}
		}
	}
	.left-w {
		background-color: rgba(0,0,0,.5);
		
	}
	// .mode-w {
	// 	.item { 
	// 		color: #666;
	// 		padding: 3px 8px;
	// 		margin: 0 5px;
	// 		&.active {
	// 			font-weight: bold;
	// 			font-size: 18px;
	// 			color: #000;
	// 		}
	// 	}
	// }
</style>
