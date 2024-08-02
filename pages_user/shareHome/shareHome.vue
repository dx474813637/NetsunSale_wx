<template> 
	<navBar
		:bgColor="bgColor" 
		title=""  
		fixed
		activeColor="#fff"
	>
		<template #navLeft>
			<view class="u-flex u-flex-items-center left-w u-radius-20 u-p-15 u-p-l-30 u-p-r-30" >
				<view class=" u-m-r-30" @click="handleBack" v-if="backBtnShow">
					<i class="custom-icon custom-icon-back text-white" ></i>
				</view>  
				<view @click="base.handleGoto({url: '/pages/home/home', type: 'reLaunch'})" class="" > 
					<i class="custom-icon custom-icon-home text-white" ></i>
				</view>  
			</view>
		</template>
		<view class="nav-center" :class="{
			show: navBarScrollShow
		}" @click="navBarCenterClick">
			<view class="u-flex u-flex-items-center home-info">
				<up-image
					:src="homeInfo.img"
					width="25px"
					height="25px"
					shape="circle"
				></up-image>
				<view class="u-m-l-15 u-line-1 u-font-28 text-white">
					{{homeInfo.name}}
				</view>
			</view>
		</view>
	</navBar> 
	<view class="w bg-white"> 
		
		<view class="header">
			<u-status-bar></u-status-bar>
			<view class="home-bg" @click="previewImage(0, [homeInfo.bg || bg])">
				<image
					showLoading 
					mode="aspectFill"
					:src="homeInfo.bg || bg" 
				></image>
			</view> 
			<view class="home-info-w u-p-10 u-p-l-30 u-p-r-20 text-white u-m-t-20">
				<view class="u-flex u-flex-items-start u-flex-between">
					<view class="item">
						<view class="avatar-w u-radius-30 u-flex u-flex-items-center u-flex-center u-info-bg">
							<view @click.stop="previewImage(0, [homeInfo.img])" v-if="homeInfo.img"> 
								<up-image 
									:src="homeInfo.img"
									width="60px"
									height="60px"
									shape="circle" 
								></up-image>
							</view>
							<i class="custom-icon-wodeguanzhu custom-icon text-white" style="font-size: 25px;" v-else></i> 
						</view>
					</view>
					<view class="item u-flex-column u-flex-items-start u-flex-start u-p-10 u-p-l-25 u-p-r-10 box-border">
						<view class="text-bold u-m-b-10 u-line-1">
							<template v-if="homeInfo.name">
								{{homeInfo.name}}
							</template>
							<template v-else>
								暂无主页名称
							</template> 
						</view>
						<view class="u-flex u-flex-between u-flex-items-start" style="width: 100%;">
							<view class="item info-text">
								<view class="u-font-24" >SunMaxx号：{{homeUserInfo.id}}</view>
							</view> 
							<view class="item">
								<!-- <view class="mode-w u-font-28 u-flex u-flex-items-center u-p-8 u-p-l-25 u-p-r-25 u-radius-4" 
								@click.stop="showHomeMode = true">
									<view class="u-m-r-10 u-font-24">{{activeMode.name}}主页</view>
									<i class="custom-icon-jiaohuan custom-icon"></i>
								</view> -->
							</view>
						</view>
						
					</view> 
					<view class="item u-flex-1" style="height: 60px;" @click="previewImage(0, [homeInfo.bg || bg])"></view>
				</view>
				
				<view class="home-info u-font-24 u-m-t-20 u-m-b-20 u-p-l-10 u-p-r-15" >
					<u-read-more 
						showHeight="50" 
						ref="uReadMoreRef" 
						toggle 
						:shadowStyle="shadowStyle"
						textIndent="0"
						color="#909090"
						closeText="展开"
						> 
						<view class="info-text u-font-26">
							<template v-if="homeInfo.info">
								{{homeInfo.info}}
							</template>
							<text v-else @click="eidtEventBtn">点击这里，填写简介</text>
						</view>
						<!-- <rich-text :nodes="`<p>${homeInfo.info || '点击这里，填写简介'}</p>`"></rich-text> -->
					</u-read-more> 
					
				</view>
				<view class="home-num-w u-flex u-flex-items-center u-flex-between text-white u-p-b-20" >
					<view class="u-flex u-flex-items-center u-font-24 u-p-8">
						<view class="u-flex-column u-flex-items-center u-m-r-40">
							<view class="u-font-28">{{hudong.guanzhu || 0}}</view>
							<view class="u-m-t-5 info-text">关注</view>
						</view>
						<view class="u-flex-column u-flex-items-center u-m-r-40">
							<view class="u-font-28">{{hudong.fensi || 0}}</view>
							<view class="u-m-t-5 info-text">粉丝</view>
						</view>
						<view class="u-flex-column u-flex-items-center u-m-r-40">
							<view class="u-font-28">{{hudong.dianzan || 0}}</view>
							<view class="u-m-t-5 info-text">获赞</view>
						</view>
					</view>
					<view class="u-flex u-flex-items-center">
						<view>
							<view class="btn u-radius-20 u-p-10 u-p-l-30 u-p-r-30 u-border u-font-24" v-if="isMe" @click="showHomeInfo = true">编辑资料</view>
							<!-- <view class="btn u-radius-20 u-p-6 u-p-l-30 u-p-r-30 u-border u-font-24" v-else @click="followEvent">关注</view> -->
							<u-button type="error" size="small" shape="circle" v-else @click="followEvent">关注</u-button>
						</view>
					</view>
				</view> 
			</view>
			
		</view>  
		<u-sticky :customNavHeight="44 + $u.sys().statusBarHeight" :offsetTop="0" zIndex="10">
			<view style="background-color: rgb(70,70,70);">
				<view class="u-flex u-flex-items-center u-flex-center u-p-5 box-border mode-w bg-white">
					<view class="item u-font-30"
						v-for="(item, index) in mode_list_filter"
						:key="index"
						:class="{
							'active': index == mode_current
						}"
						@click="HomeModeTabsClick({data: item, index})"
					>
						<view class="u-flex u-flex-items-center">
							<i :class="['custom-icon', item.icon]" ></i>
							<view class="u-m-l-10">{{item.name}}</view>
						</view> 
					</view>
				</view>
			</view>
		</u-sticky>
		
		
		<view class="page-bg2 u-p-b-14" v-if="others && others.length > 0 && mode_current == 0">
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
				<view class="u-p-5 u-p-l-20 u-p-r-20 u-font-26">
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
				</view>
			</view>
		</view>
		
		<template v-if="mode_current == 0">
			<u-sticky :customNavHeight="84 + $u.sys().statusBarHeight" :offsetTop="0" zIndex="9">
				<view class="tabs-w bg-white u-border-top" style="border-color: #f9f9f9!important;">
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
			</u-sticky>
			 
			<view class="list u-flex u-flex-wrap u-flex-items-start u-p-10"> 
				 <view 
					class="list-item u-p-14" 
					v-for="item in dataList1" 
					:key="item.id"
					>
				 	<ProductColCard
						:origin="item"
						:customStyle="{boxShadow: 'none!important', border: '1rpx solid #f9f9f9'}"
					></ProductColCard>
				 		 
				 </view> 
			</view>
			<template v-if="dataList1.length == 0">
				<view class="u-flex u-flex-center u-p-40">
					<u-empty mode="data" :icon="base.empty" text="橱窗为空" />
				</view>
				
			</template>
			<template v-else>
				<u-loadmore :status="loadstatus" />
			</template>  
		</template>
		
		
		<view class="list" :class="{
			'u-m-t-20': mode_current == 1
		}">
			<uv-waterfall ref="waterfall"
				v-model="dataList2"
				:add-time="10"
				:left-gap="leftGap"
				:right-gap="rightGap"
				:column-gap="columnGap"
				@changeList="changeList">
				<!-- 第一列数据 -->
				<template v-slot:list1>
					<!-- 为了磨平部分平台的BUG，必须套一层view -->
					<view>
						<view v-for="(item, index) in list_col.list1"
							:key="item.id"
							class="waterfall-item">
							<noteCard
								:origin="item"
								:urlObj="{
									url: '/pages_note/note2/note',
									params: {
										id: item.id, 
									}
								}"
							></noteCard> 
						</view>
					</view>
				</template>
				<!-- 第二列数据 -->
				<template v-slot:list2>
					<!-- 为了磨平部分平台的BUG，必须套一层view -->
					<view>
						<view v-for="(item, index) in list_col.list2"
							:key="item.id"
							class="waterfall-item">
							<noteCard
								:origin="item"
								:urlObj="{
									url: '/pages_note/note2/note',
									params: {
										id: item.id, 
									}
								}"
							></noteCard> 
						</view>
					</view>
				</template>
			</uv-waterfall>
		</view>
		<template v-if="mode_current == 1">
			<template v-if="dataList2.length == 0">
				<view class="u-flex u-flex-center u-p-40">
					<u-empty mode="data" :icon="base.empty" text="笔记为空" />
				</view>
				
			</template>
			<template v-else>
				<u-loadmore :status="loadstatus2" />
			</template> 
		</template>
			
		
		<u-safe-bottom></u-safe-bottom>
	</view>
	
	<!-- <up-picker 
		:show="showHomeMode" 
		:columns="mode_list2"
		keyName="name"
		@confirm="homeModeConfirm"
		closeOnClickOverlay
		@close="showHomeMode = false"
	></up-picker> -->
	
	
	<BaseInfoPopup
		:show="showBaseInfo" 
		:title="baseInfo.name1" 
		:info="baseInfo.info"
		:onUpdateShow="handleChangeShow3" 
	></BaseInfoPopup> 
	<HomeInfoPopup
		:show="showHomeInfo" 
		title="特卖店信息编辑"
		:homeInfo="homeInfo"
		:onUpdateShow="handleChangeShow2" 
		@submit="submit"
	></HomeInfoPopup>
	<sharePopup
		:show="showShare"
		bgColor="transparent"
		:origin="{haibao: haibao}"
		:onUpdateShow="handleChangeShow4" 
	></sharePopup>
	<ProductListPopup
		:show="showProductList" 
		title="商品列表"  
		:divideShow="true"
		:xuanList="dataList"
		:xuan="xuan"
		:ygConfig="yg"
		:onUpdateShow="handleChangeShow"  
		@xuanEvent="xuanEvent" 
		@ygEvent="ygEvent"
	></ProductListPopup>
	<TabBar :customStyle="customStyle" v-if="shopProductTabBarShow">
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28 button-w" > 
			<u-button type="error" shape="circle" @click="showProductList = true">
				橱窗管理
				<template v-if="!xuan">
					- 未配置
				</template>
			</u-button>
		</view>
	</TabBar>   
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
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom, onPageScroll } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted, nextTick } from 'vue'
	import { share } from '@/composition/share.js' 
	import uReadMore from '@/node_modules/uview-plus/components/u-read-more/u-read-more.vue'
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
	const userid = ref('') 
	const curP = ref(1) 
	const pageSize = ref(20) 
	const dataListSum = ref(0)
	const dataList = ref([]) 
	const dataList1 = ref([]) 
	const loadstatus = ref('loadmore')
	const curP2 = ref(1) 
	const dataList2 = ref([]) 
	const loadstatus2 = ref('loadmore')
	// const showHomeMode = ref(false)
	const showProductList = ref(false)
	const homeInfo = ref({})
	const homeUserInfo = ref({})
	const customStyle = ref({
		// paddingBottom: '50px',
		// background: 'transparent' 
	})  
	
	const customStyle2 = ref({
		paddingBottom: '80px',
		background: 'transparent' 
	})  
	const yg = ref({})
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
	const hudong = ref({})
	const uReadMoreRef = ref('')
	const shadowStyle = {
		backgroundImage: "linear-gradient(-180deg, rgba(70, 70, 70, 0) 0%, rgba(70,70,70,1) 80%)", 
		paddingTop: "50px",
		marginTop: "-50px", 
	}
	const list_col = ref({
		list1: [],
		list2: [],
	}) 
	const leftGap = ref(8) 
	const rightGap = ref(8) 
	const columnGap = ref(8)
	const uToast = ref('') 
	const waterfall = ref('')
	 
	const isMe = computed(() => {
	 	return userid.value == user_info.value.id
	})
	const noLimit = computed(() => {
		return homeUserInfo.value.scene == 0
	})
	const scrollPx = ref(0)
	const maxHeight = ref(50)
	const navBarScrollShow = ref(false)
	const bgColor = ref('rgba(70,70,70,0)')
	// const bgColor = computed(() => {
	// 	let op = scrollPx.value > maxHeight.value? 1 : (scrollPx.value / maxHeight.value)
	// 	return `rgba(70,70,70, ${op})`
	// })
	watch(
		() => navBarScrollShow.value,
		(n) => {
			if(n) {
				bgColor.value = 'rgba(70,70,70,1)'  
			}
			else {
				bgColor.value = 'rgba(70,70,70,0)' 
			}
		}
	)
	onPageScroll((e) => {
		// console.log(e)
		if(e.scrollTop <= maxHeight.value) {
			navBarScrollShow.value = false  
		}
		else {
			navBarScrollShow.value = true  
		}
		
	})
	const mode_current = ref(0)
	const mode_list = ref([
		{
			name: '商品',
			value: '1',
			icon: 'custom-icon-quanbushangpin',
			disabled: false
		},
		{
			name: '笔记',
			value: '2',
			icon: 'custom-icon-xinwen',
			disabled: false
		},
	])  
	const mode_list_filter = computed(() => mode_list.value.map(ele => {
		if(!isMe.value) return ele
		if(noLimit.value && ele.value == 1) {
			ele.disabled = true
			ele.msg = '成为店长才能开通商品橱窗功能'
		}
		return ele
	}))
	// const mode_list2 = computed(() => [mode_list.value])
	const list = ref([])
	const loading = ref(false)
	onLoad(async (options) => {  
		if(options.hasOwnProperty('userid')) {
			userid.value = options.userid
		}
		else {
			userid.value = user_info.value.id
		}
		// if(options.hasOwnProperty('mode')) {
		// 	mode_current.value = +options.mode
		// }
		if(user_info.value.role == 0) {
			mode_current.value = 1
		}
		await initData(true)  
	})
	const activeMode = computed(() => mode_list.value[mode_current.value])
	const activeModeValue = computed(() => mode_list.value[mode_current.value].value)
	
	const shopProductTabBarShow = computed(() => {
		return isMe.value && !noLimit.value && activeModeValue.value == '1'
	}) 
	
	watch(
		() => noLimit.value,
		(n) => { 
			if(n) {
				mode_current.value = 1
			}
		},
		{
			immediate: true
		}
	) 
	watch(
		() => activeModeValue.value,
		(n) => {
			initData() 
		} 
	)
	watch(
		() => dataList.value,
		(n) => {
			dataList1.value = dataList.value.slice(0, curP.value*pageSize.value)
			dataListSum.value = dataList.value.length
		},
		{
			deep: true
		}
	)
	const backBtnShow = computed(() => {
		return getCurrentPages().length > 1
	})
	onReachBottom( () => {   
		if(activeModeValue.value == '1') {
			if(xuan.value != 1) return
			getMoreData()
		}
		else if(activeModeValue.value == '2') {
			getMoreNoteData()
		}
		
	})   
	function changeList(e){
		// console.log(e, 'change')
		list_col.value[e.name].push(e.value);
	} 
	async function getMoreNoteData() {
		if(loadstatus2.value != 'loadmore') return
		curP2.value ++
		await getNoteData()
	}
	async function getNoteData() {
		if(loadstatus2.value == 'loading') return
		loadstatus2.value = 'loading'
		const res = await $api.longs_new({params: {
			login: userid.value, 
			p: curP2.value
		}})
		if (res.code == 1) { 
			dataList2.value = [...dataList2.value, ...res.list]   
			if(dataList2.value.length >= dataListSum.value) {
				loadstatus2.value = 'nomore'
			}
			else {
				loadstatus2.value = 'loadmore'
			}
		}
	}
	async function getMoreData() {
		console.log(loadstatus.value)
		if(loadstatus.value != 'loadmore') return
		curP.value ++ 
		await getDataSelf() //自行处理加载更多分页效果
	}
	async function getDataSelf() { 
		if(loadstatus.value == 'loading') return
		loadstatus.value = 'loading' 
		await uni.$u.sleep(300)
		dataList1.value = dataList.value.slice(0, curP.value*pageSize.value)
		if(dataList1.value.length >= dataListSum.value) {
			loadstatus.value = 'nomore'
		}
		else {
			loadstatus.value = 'loadmore'
		}
	}
	async function getData() {
		if(loadstatus.value == 'loading') return
		loadstatus.value = 'loading' 
		const res = await $api.shop_product_list({params: {
			login: userid.value,
			cate: tabs_list.value[tabs_current.value].value,
			// p: curP.value
		}})
		if (res.code == 1) { 
			dataList.value = res.list.sort((a,b) => b.sid - a.sid )  
			// dataList.value = [...dataList.value, ...res.list] 
			homeInfo.value = res.shop || {}
			xuan.value = res.xuan
			homeUserInfo.value = res.info
			bg.value = res.bj
			haibao.value = res.haibao
			hudong.value = res.hudong || {}
			others.value = res.other || []
			notice.value = res.notice || []
			dataListSum.value = +res.total
			yg.value = res.yg
			setOnlineControl(res)
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
			if(dataList1.value.length >= dataListSum.value) {
				loadstatus.value = 'nomore'
			}
			else {
				loadstatus.value = 'loadmore'
			}
		}
	}
	function initDataParams() {
		if(activeModeValue.value == '1') {
			curP.value = 1;
			dataList.value = []
		} 
		curP2.value = 1; 
		waterfall.value && waterfall.value.clear()
		dataList2.value = []
		list_col.value.list1 = []
		list_col.value.list2 = []  
		
	}
	async function initData(isFirst=false) {
		uni.showLoading()
		initDataParams();
		if(isFirst || activeModeValue.value == '1') {
			await getData()  
			// nextTick(() => {
			// 	console.log(uReadMoreRef.value)
			// 	uReadMoreRef.value.init();
			// })
		} 
		
		if(activeModeValue.value == '2') {
			await getNoteData()
		} 
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
		if(!imgs[index]) return
   		uni.previewImage({
   			urls: imgs,
   			current: index, 
   			loop: true
   		})
   	}
	function navBarCenterClick() {
		if(!navBarScrollShow.value) {
			previewImage(0, [homeInfo.value.bg || bg.value])
		}
		else {
			uni.pageScrollTo({
				scrollTop: 0
			})
		}
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
	async function ygEvent () {
		const res = await $api.add_company_product();
		if(res.code == 1) {
			uni.showToast({
				title: res.msg
			})
			setTimeout(async () => {
				await initData()
			}, 800)
			
		}
	}
	async function xuanEvent({data, index, checked}) {
		// console.log(data, data.checked)
		// dataList.value[index].loading = true;
		const res = await updateShopProduct(data, checked)
		// dataList.value[index].loading = false;
		if(res) {
			dataList.value[index].checked = checked
			
			if(!xuan.value) {
				initDataParams(); 
				xuan.value = 1
				loadstatus.value = 'nomore'
				// initDataParams();
				getData()
			}
			else if(data.checked) {
				dataList.value.unshift(data) 
				// dataList.value = dataList.value.sort((a,b) => b.id - a.id )
			}
			else {
				let i = dataList.value.findIndex(ele => ele.id == data.id)
				if(i == -1) return;
				dataList.value.splice(i, 1) 
				if(dataList.value.length == 0) {
					initDataParams();
					getData()
				}
			}
		}
		
	}
	async function submit(data) {
		uni.showLoading()
		const res = await $api.save_shop({...data})
		if(res.code == 1) {
			uni.showToast({
				title: res.msg
			})
			showHomeInfo.value = false
		}
		await getData()
		nextTick(() => { 
			uReadMoreRef.value.init();
		})
	}
	function handleBack() {
		// $emits('backEvent')
		uni.navigateBack()
	}
	async function followEvent() { 
		const res = await $api.follow({params: {follow: userid.value}})
		if(res.code == 1) {
			uni.showToast({
				title: res.msg
			}) 
		} 
	}
	function ohterClick(data) {
		baseInfo.value = {...data}
		showBaseInfo.value = true
	}
	function handleTabsChange(data) {
		tabs_current.value = +data.index
		initData() 
	}  
	
	// function homeModeConfirm(e) {
	// 	console.log(e)
	// 	mode_current.value = e.indexs[0]
	// 	showHomeMode.value = false
	// }
	function eidtEventBtn() {
		if(!isMe.value) return 
		showHomeInfo.value = true
	}
	function HomeModeTabsClick({data, index}) {
		console.log(data)
		if(data.disabled) {
			uni.showToast({
				title: data.msg,
				icon: 'none'
			})
			return
		}
		mode_current.value = index
	}
	
</script>

<style > 
page {
	background-color: #fff;
}
</style>
<style lang="scss" scoped> 
	.info-text {
		color: #d8d8d8;
	}
	.share-btn {
		background-color: transparent;
		color: #000;
		line-height: 20px;
		&:after {
			border: 0;
		}
	}
	.header {
		padding-top: 44px;
		position: relative;
		overflow: hidden;
	}
	.home-bg {
		position: absolute;
		width: 100vw;
		height: 100%;
		overflow: hidden;
		top: 0;
		left: 0;
		image {
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			position: absolute; 
			// filter: blur(2px);
			transform: scale(1.05);
			transition: all .3s;
		}
		&:before {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 5;
			// background-color: rgba(0,0,0,.2);
			background: linear-gradient(to bottom, rgba(70,70,70, .4) 170px , rgba(70,70,70,1) 210px, rgba(70,70,70,1));
		}
		// &:after {
		// 	content: '';
		// 	position: absolute;
		// 	bottom: 0;
		// 	left: 0;
		// 	width: 100%;
		// 	z-index: 8;
		// 	height: 10%;
		// 	background-image: linear-gradient(to top, #fff, transparent); 
		// }
	}
	.navbar-w {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%; 
		box-sizing: border-box; 
		z-index: 20;
	}
	.home-info-w {  
		box-sizing: border-box;  
		z-index: 10;
		position: relative;
		.mode-w { 
			// color: #d8d3d3; 
			// background-color: rgba(0,0,0,.7);
		}
		.avatar-w { 
			border: 1rpx solid #fff;
			width: 60px;
			height: 60px;
			position: relative;
			.edit-btn {
				position: absolute;
				right: 0;
				bottom: 0;
				background-color: #ffff00;
				width: 20px;
				height: 20px;
				border-radius: 50%;
			}
		}
	}
	.btn {
		border-color: #fff;
		background-color: rgba(90,90,90,1);
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
	.mode-w {
		height: 40px;
		border-radius: 20px 20px 0 0;
		.item { 
			color: #666;
			padding: 3px 8px;
			margin: 0 5px;
			&.active {
				font-weight: bold;
				// font-size: 16px;
				color: $u-error;
				// color: #000;
			}
		}
	}
	.nav-center {
		overflow: hidden;
		position: relative; 
		transition: all .3s;
		.home-info {
			position: relative;
			top: 40px; 
			transition: all .3s;
			max-width: 50vw;
		}
		&.show {
			.home-info {
				top: 0;
			}
			
		}
	}
</style>
