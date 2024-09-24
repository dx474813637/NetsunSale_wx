<template>
	<view class="w ">
		  
		<view class="list u-p-10"> 
			 <view 
				class="list-item box-border u-p-20 u-radius-10" 
				style="flex: 0 0 100%"
				v-for="item in dataList" 
				:key="item.id"
				> 
					<view class="u-p-10 u-flex u-flex-items-center">
						<u-icon name="star-fill" color="#B09762"></u-icon>
						<view class="u-m-l-10 u-error-bg text-white u-radius-30 u-font-26 u-p-6 u-p-b-8 u-p-l-16 u-p-r-16" v-if="item.cate == '商家券'">店铺专属</view>
						<view class="u-m-l-10">{{item.title1}}</view>
					</view>
					<CouponRowCard
						:origin="item"
						@cardClick="cardClick"
					> 
						<template #btn>
							<view class=" u-radius-4 u-p-10 u-p-l-25 u-p-r-25 u-font-26 u-m-t-20" style="background-color: #fff5dc;">
								查看详情
							</view>
						</template>
					</CouponRowCard>
			 </view>	 
			<template v-if="dataList.length == 0">
				<u-empty
					mode="data"
					:icon="empty"
				>
				</u-empty>
			</template>
			<!-- <template v-else>
				<u-loadmore
					:status="loadstatus"
				/>
			</template> -->
		</view> 
		
		<u-safe-bottom></u-safe-bottom>
		<MenusBar ></MenusBar>
	</view>
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app"; 
	import useDataList from '@/composition/useDataList.js'
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore() 
	const {themeColor, empty} = toRefs(base) 
	const $api = inject('$api')
	
	const homelist = ref({})
	const current = ref(0)
	const kw = ref('')
	const mode = ref('')  
	const zt = ref('')
	const info = ref({})
	// onReady(() => {
	// 	uni.setNavigationBarColor({
	// 		backgroundColor: themeColor.value,
	// 		frontColor: '#ffffff'
	// 	})
	// })
	const options = computed(() => {
		return {
			params: {
				// id: id.value, 
			},
			api: 'coupon_list',
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
	onLoad(async (options) => { 
		if(options.hasOwnProperty('mode')) {
			mode.value = options.mode
		} 
		await initDataList() 
	}) 
	const backBtnShow = computed(() => {
		return getCurrentPages().length > 1
	})
	function handleBack() {
		// $emits('backEvent')
		uni.navigateBack()
	}
	async function getData() {
		const res = await $api.my_coupon_list()
		if(res.code == 1) { 
			dataList.value = res.list
			setOnlineControl(res)
		}
	}
	async function cardClick({origin}) {
		base.handleGoto({
			url: '/pages/activity/activityDetail',
			params: {
				id: origin.id
			}
		})
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
