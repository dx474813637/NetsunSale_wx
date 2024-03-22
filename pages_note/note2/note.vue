<template>
	<view class="w " v-if="user_info.shenhe == 0">  
		<u-status-bar></u-status-bar>
		<navBar
			bgColor="#fff" 
			title=""  
			fixed
			activeColor="#000"
		>
			<template #navLeft>
				<view class="u-flex u-flex-items-center">
					<view class="u-flex u-flex-items-center left-w u-border u-radius-20 u-p-15 u-p-l-30 u-p-r-30" >
						<view class="btn u-m-r-30" @click="handleBack" v-if="backBtnShow">
							<i class="custom-icon custom-icon-back text-white" ></i>
						</view>  
						<view @click="base.handleGoto({url: '/pages_note/note2/noteList', type: 'reLaunch'})" class="btn" > 
							<i class="custom-icon custom-icon-home text-white" ></i>
						</view>  
					</view>
					<view 
						class="user-w u-m-l-25 u-flex u-flex-items-center" 
						v-if="list.user">
						<view class="u-flex u-flex-items-center "
							@click="base.handleGoto({url: '/pages_user/shareHome/shareHome', type: 'redirectTo', params: {userid: list.login}})"
						>
							<up-image
								v-if="list.user.img"
								shape="circle"
								width="30px"
								height="30px"
								:src="list.user.img"
							></up-image>
							<view class="icon-w u-flex u-flex-center u-flex-items-center" v-else>
								<i class="custom-icon-myfill custom-icon"></i>
							</view> 
							<view class="u-m-l-10 u-font-28 u-line-1">{{list.user.name}}</view>
						</view> 
					</view>
				</view>
				
			</template>
		</navBar>
		<view class="u-flex u-flex-between u-p-20" v-if="isMe && user_info.role != 0">
			<view class="item"></view>
			<view class="item">
				<u-button type="error" size="small" @click="showProductList = true">管理关联商品</u-button>
			</view>
		</view>
		<view class="swiper-w">
			<u-swiper
				v-if="swiperlist.length > 0"
				:list="swiperlist"
				height="100%"
				keyName="url"
				:current="swiperCurrent"
				:autoplay="false"
				imgMode="aspectFit"
				bgColor="#222"
				indicator
				:indicatorActiveColor="themeColor"
				indicatorMode="dot" 
				@change="swiperChange"
				radius="0"
			></u-swiper>
		</view>
		<view class="page-bg2 box-border u-p-10" v-if="products.length > 0">
			<u-scroll-list 
				indicatorColor="#ffacb7" 
				indicatorActiveColor="#ff007f"
				:indicator="products.length > 1"
			>
			    <view class="shop-card u-flex u-flex-items-center u-p-20   box-border bg-white u-radius-10 u-m-r-10" 
					:style="{
						width: products.length > 1? '90vw': '100%', 
						flex: products.length > 1? '0 0 90vw': '0 0 100%'
					}"
					v-for="product in products"
					:key="product.id"
					@click.stop="goto(product.url)"
				>
			    	
			    	<view class="shop-img">
			    		<up-image
			    			width="75px"
			    			height="75px"
			    			radius="10"
			    			v-if="product.pic"
			    			:src="product.pic.split('|')[0]"
			    		></up-image>
			    	</view>
			    	<view class="shop-content u-flex-1 u-m-l-20 " style="height: 75px;">
			    		<view class="u-line-2 u-m-b-15 u-font-28" style="height: 44px;" >
			    			{{product.name}}
			    		</view> 
			    		<view class="u-flex u-flex-items-center u-flex-between"> 
			    			<view class="u-flex u-flex-items-center">
								<view class="u-flex-1 u-flex u-flex-items-center  u-error" >
									<text class="" style="font-family: cursive;">{{product.price1}}</text>
									<text class="u-font-28">起</text>
								</view>
			    			</view>
			    			<view class="u-flex u-flex-items-center">
			    				<view class="" @click.stop="goto(product.url)" >
			    					<view class="u-flex u-flex-items-center">
			    						<!-- <u-icon name="heart" color="#ff4f0b" size="20"></u-icon> -->
										<i class="custom-icon-quanbushangpin custom-icon" style="color: #ff4f0b;"></i>
			    						<view class="u-m-l-5 u-font-28 u-p-b-5" style="color: #ff4f0b;">想要</view>
			    					</view>
			    				</view>
			    				<!-- <view class="u-m-l-20" @click.stop="chooseBtn(product.id)"  v-if="user_info.role != 0">
			    					<view class="u-flex u-flex-items-center">
			    						<u-icon name="plus-circle" color="#FF2442" size="20"></u-icon>
			    						<view class="u-m-l-5 u-font-28 u-p-b-5" style="color: #FF2442;">笔记</view>
			    					</view> 
			    				</view> -->
			    			</view>
			    			
			    		</view>
			    	</view> 
			    </view> 
			</u-scroll-list>
		</view>
		<view class="content-w u-p-30 box-border u-font-34" v-if="list.info">
			<u-parse 
				:content="list.info" 
				selectable
			></u-parse>
		</view>
	</view>
	<u-toast ref="uToast"></u-toast>
	<u-safe-bottom></u-safe-bottom>
	<TabBar :customStyle="customStyle" :mainStyle="{height: 'auto'}"> 
		<view class="u-flex u-flex-items-center u-flex-between u-p-20 u-p-l-30 u-p-r-30">
			<view class="u-flex u-flex-items-center">
				<view  @click.stop="() => {}">
					<button openType="share"  class="share-btn u-p-10 u-font-24 u-flex u-flex-center u-flex-items-center">
						<!-- <view >分享</view> -->
						<u-icon name="share-square" size="22" color="#333"></u-icon>
						<view class="u-m-l-5 u-font-34 u-p-b-5">分享</view>
					</button>
				</view>
				<view class="u-m-l-10 u-p-10" @click="base.handleGoto({url: '/pages_note/note2/noteList' , type: 'reLaunch' })">
					<view class="u-flex u-flex-items-center">
						<u-icon name="home" color="#333" size="22"></u-icon>
						<view class="u-m-l-5 u-font-34 u-p-b-5">首页</view>
					</view> 
					
					<!-- <u-button type="warning" shape="circle" throttleTime="800" size="small"> 
						<view class="">首页</view>
					</u-button> -->
				</view>
			</view>
			<view class="u-flex u-flex-items-center"> 
				<view class="u-m-l-30" @click.stop="likeBtn">
					<view class="u-flex u-flex-items-center" style="color: #FF2442;">
						<i class="custom-icon-aixin custom-icon u-font-40 "></i> 
						<view class="u-m-l-5 u-font-34" >{{list.like || '点赞'}}</view>
					</view> 
				</view>
				<!-- <view class="u-m-l-20" v-if="!isMe">
					<u-button type="error" shape="circle" size="small" @click="followEvent" throttleTime="800">关注</u-button> 
				</view> -->
				<!-- <view class="u-m-l-30" @click.stop="chooseBtn"  v-if="user_info.role != 0">
					<view class="u-flex u-flex-items-center" style="color: #FF2442;">
						<i class="custom-icon-roundadd custom-icon u-font-40"></i> 
						<view class="u-m-l-5 u-font-34 ">新笔记</view>
					</view> 
				</view> -->
			</view>
			
		</view>
	</TabBar> 
	<ProductListPopup
		:show="showProductList" 
		title="橱窗商品列表"  
		:xuanList="products"
		:asyncEvent="false"
		:xuan="xuan"
		func="search_shop_product"
		:onUpdateShow="handleChangeShow" 
		@xuanSuccess="xuanSuccess"
		@xuanEvent="xuanEvent"
	></ProductListPopup>
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue'
	import { share } from '@/composition/share.js'
	// import useDataList from '@/composition/useDataList.js' 
	import useUploadMedia from '@/pages_note/composition/useUploadMedia.js'
	import {useCateStore, baseStore} from '@/stores/base.js'  
	import {userStore} from '@/stores/user.js'  
	const user = userStore() 
	const { biji_files, biji_step, biji_info, biji_linshi, user_info } = toRefs(user)
	const base = baseStore() 
	const {themeColor, empty} = toRefs(base)
	const { setOnlineControl } = share()
	const $api = inject('$api')
	const $http = inject('$http') 
	const id = ref('') 
	const list = ref({})
	const swiperlist = ref([])
	const products = ref([])
	const swiperCurrent = ref(0)
	const upload_config = ref({}) 
	const options2 = computed(() => {
		return {
			count: 9,
			mediaType: ['mix'],
			sourceType: ['album', 'camera'],
			maxDuration: 60, 
			...upload_config.value
		}
	})
	
	const backBtnShow = computed(() => {
		return getCurrentPages().length > 1
	})
	const showProductList = ref(false)
	const xuan = ref(1)   
	const isMe = computed(() => {
		return list.value.login == user_info.value.id
	})
	const { 
		files,
		getSignature,
		startUpload,
		chooseMedia
	} = useUploadMedia(options2)
	onLoad(async (options) => { 
		if (options.hasOwnProperty('id')) {
			id.value = options.id
		}    
		uni.showLoading
		await getData()
	}) 
	const customStyle = ref({ 
		background: '#fff',
		borderTop: '1rpx solid #eee'
	}) 
	let regList = [
		{
			name: 'image',
			reg: /\.(png|jpg|gif|jpeg|webp|svg)$/i,
		},
		{
			name: 'video',
			reg: /\.(mp4|webm|ogg|flv|m3u8|avi|3gp|mov)$/i,
		},
	]
	watch(
		() => list.value.pic,
		(n) => {
			swiperlist.value = n.split('|').map(ele => {
				let type = regList.filter(item => item.reg.test(ele))[0]?.name || '' 
				return {
					url: ele,
					type
				}
			})
			console.log(swiperlist.value)
		}
	)
	async function getData() {
		const res = await $api.longs_detail_new({params: {id: id.value}})
		if(res.code == 1) {
			setOnlineControl(res)
			if(res.hasOwnProperty('upload_config')) {
				upload_config.value = res.upload_config
			} 
			list.value = res.list
			products.value = res.list.product.map(ele => {
				return {
					...ele,
					loading: false
				}
			}) 
		}
	}
	
	function swiperChange(item) { 
		swiperCurrent.value = item.current
	}
	async function likeBtn() {
		uni.showLoading()
		const res = await $api.longs_like({params: {id: id.value}})
		if(res.code == 1) {  
			uni.showToast({
				title: res.msg,
				icon: 'none'
			})
			getData()
		}
	}
	async function chooseBtn(pid) { 
		biji_step.value = false
		biji_files.value = []
		const res = await chooseMedia()
		if(res) {
			base.handleGoto({
				url: '/pages_note/note2/noteEdit',
				params: {
					id: pid
				}
			})
		}
		
	}
	function goto(url) {
		if(!url) return
		uni.reLaunch({
			url
		})
	}
	function handleChangeShow(data) {
	 	showProductList.value = data
	}
	function removeItem(data) {
		let i = products.value.findIndex(ele => ele.id == data.id)
		if(i == -1) return;
		products.value.splice(i, 1)
	}
	function updateNoteProduct(product, check) {
		return new Promise(async (res, rej) => {
			const result = await $api.edit_longs_product({
				params: {
					pid: product.id,
					id: id.value,
					cate: check? 0: 1
				}
			})
			if(result.code == 1) {
				res(true)
			}
			rej(false)
		})
	}
	async function xuanEvent({data, index, checked}) {
		// products.value[index].loading = true;
		const res = await updateNoteProduct(data, checked)
		// products.value[index].loading = false;
		if(res) {
			uni.showLoading
			await getData()
		}
	}
	function handleBack() {
		// $emits('backEvent')
		uni.navigateBack()
	}
	async function followEvent() { 
		const res = await $api.follow({params: {follow: list.value.login}})
		if(res.code == 1) {
			uni.showToast({
				title: res.msg
			}) 
		} 
	}
	 
</script>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.left-w {
		background-color: rgba(0,0,0,.5);
		
	}
	.share-btn {
		background-color: transparent;
		// color: #fff;
		height: 30px;
		line-height: 30px;
		border-radius: 20px;
		&:after {
			border: 0;
		}
	}
	.w {
		padding-top: 44px;
		padding-bottom: 150px; 
	}
	.groupMsg {
		border-bottom: 20rpx solid #f5f5f5; 
		padding: 20px 10px;
	}
	.swiper-w {
		height: 70vh;
	}
	.content-w {
		color: #333;
		word-break: break-all;
		line-height: 28px;
	}
	.icon-w {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: rgba(0,0,0,.06);
		.custom-icon {
			font-size: 14px;
			color: rgba(0,0,0,.4);
		} 
	}
</style>
