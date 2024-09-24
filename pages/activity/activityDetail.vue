<template>
	<view 
		class="wrapper " 
		:style="{
			backgroundImage: detail.cate == '商品券' ? `url(${detail.img})` : 'none',
			backgroundSize: '100% auto',
			backgroundRepeat: 'no-repeat',
		}"
	> 
		<view class=" u-m-b-20" v-if="detail.cate == '商品券'">
			<view >
				<u-parse :content="detail.info"></u-parse> 
			</view> 
			<view class="u-m-t-30 u-p-20"> 
				<CouponRowCard
					:origin="detail"
					@cardClick="cardClick"
				>
					<template #btn>
						<view class=" u-radius-4 u-p-10 u-p-l-25 u-p-r-25 u-font-26 u-m-t-20" style="background-color: #fff5dc;">
							立即领取
						</view>
					</template>
				</CouponRowCard>
			</view>
			
		</view>
		<view v-else> 
			<view class="u-p-20">
				<CouponRowCard
					:origin="detail"
					:cate="detail.cate"
					@cardClick="cardClick"
				>
					<template #btn>
						<view class=" u-radius-4 u-p-10 u-p-l-25 u-p-r-25 u-font-26 u-m-t-20" style="background-color: #FFEDB2; color: #D70602;">
							立即领取
						</view>
					</template>
				</CouponRowCard>
				<view class="u-flex u-radius-8 bg-white u-flex-between u-flex-items-center u-font-28 u-p-20" v-if="detail.company">
					<view class="item u-flex-1">商家:{{detail.company.company}}</view>
					<view class="item u-error">
						<view @click="base.handleGoto({url: '/pages_user/shop/shop', params: {login: detail.company.login}})">
							进店使用>>
						</view> 
					</view>
				</view>
			</view>
			<view class="u-p-20">
				<view class="bg-white u-radius-10 u-p-20 u-font-28">
					<view class="u-text-center u-error u-m-b-10">活动内容说明</view>
					<view class="u-p-20 u-radius-10 " style="background-color: #f8f8f8; color: #666;">
						<u-parse :content="detail.info"></u-parse>
					</view>
				</view>
			</view>
		</view> 
		  
		<view class="list u-flex u-flex-wrap u-flex-items-start u-p-10 u-m-t-20">
			 <view 
				class="list-item box-border u-p-14" 
				:style="{
					flex: listMode == 'row' ? '0 0 100%' : '0 0 50%'
				}"
				v-for="item in dataList" 
				:key="item.id"
				>
				<template v-if="listMode == 'row'">
					<ProductRowCard
						:origin="item"
						mode="normal" 
						:customStyle="{
							'padding': '7px'
						}"
					></ProductRowCard>
				</template>
				<template v-else>
					<ProductColCard
						:origin="item"
					> </ProductColCard>  
				</template>
			 </view>	  
		</view> 
		<template v-if="id > 0">
			<template v-if="dataList.length == 0">
				<view class="u-flex u-flex-center u-p-40">
					<u-empty mode="data" :icon="base.empty" />
				</view>
				
			</template>
			<template v-else>
				<u-loadmore :status="loadstatus" />
			</template>  
		</template>
		
		
		<u-safe-bottom></u-safe-bottom>
		<TabBar :customStyle="{boxShadow: '0px -3px 10px rgba(0,0,0,0.1)' }">
			<view class="u-flex u-flex-items-center u-p-l-20 u-p-r-20 u-font-28" style="height: 100%;">
				<view class="item u-flex-column u-flex-items-center u-p-l-10 u-p-r-10" @click="base.handleGoto({type: 'reLaunch', url: '/pages/home/home'})">
					<u-icon name="home" color="#000" size="28"></u-icon>
					<view class="u-info">首页</view>
				</view>
				<view class="item u-flex-1">
					<u-button type="error" shape="circle" openType="share"  >
						<view class="u-flex"> 
							<text class="u-m-l-8 u-p-b-5 u-font-32">分享</text>
						</view>
					</u-button>
				</view>
			</view>
			
		</TabBar>
	</view>
	<UserPhonePopup
		:show="showUserPhone"
		@getPhone="getPhone"
		@onUpdateShow="handleChangeShow2" 
	></UserPhonePopup>
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { share } from '@/composition/share.js'
	import useDataList from '@/composition/useDataList.js'
	import {useCateStore, baseStore} from '@/stores/base.js'
	import {userStore} from '@/stores/user'
	const base = baseStore() 
	const user = userStore() 
	const {user_info, balance} = toRefs(user) 
	const {themeColor} = toRefs(base)
	const { setOnlineControl } = share()
	const $api = inject('$api')
	
	const detail = ref({})  
	const id = ref('') 
	const listMode = ref('') 
	const url = ref('') 
	const showUserPhone = ref(false)
	const options = computed(() => {
		return {
			params: {
				id: id.value, 
			},
			api: 'coupon_detail',
			getDataCallBack: (res) => {
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list]  
					detail.value = res.detail
					url.value = res.url
					setOnlineControl(res)
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
	onLoad(async (options) => { 
		if(options.hasOwnProperty('id')) {
			id.value = options.id
		} 
		if(options.hasOwnProperty('listMode')) {
			listMode.value = options.listMode
		} 
		await initDataList()
	})  
	async function cardClick({origin}) { 
		if(!user_info.value.phonenumber) {
			showUserPhone.value = true  
			return
		}
		uni.showLoading();
		const res = await $api.get_coupon({
			params: {
				hid: origin.id
			}
		})
		if(res.code == 1) {
			uni.showToast({
				title: res.msg,
				success() {
					// setTimeout(() => {
					// 	uni.reLaunch({
					// 		url: url.value
					// 	})
					// }, 1000)
					
				}
			})
		}
	}
	async function getPhone(data) {
		// uni.showLoading()
		await user.refreshUserData()
		showUserPhone.value = false  
		// uni.showLoading()
		// await changeRole()
	}
	function handleChangeShow2(v) {
		showUserPhone.value = v
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
			top: 30px;
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
