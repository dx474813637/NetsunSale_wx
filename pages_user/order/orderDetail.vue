<template>
	<view class="u-p-20" >
		<view class="u-m-b-20" v-if="list.id">
			<OrderCard
				:origin="list"
				:gotoDetail="false"
			></OrderCard>
		</view>
		
		<view class="bg-white u-radius-12 u-p-30 u-info-dark u-m-b-30">
			<!-- <view class="u-flex u-flex-items-start u-m-b-20 u-flex-between u-font-28">
				<view class="item text-nowrap u-p-r-20">买家</view>
				<view class="item u-flex-1 u-text-right text-base">{{ list.buy_info.company }} - {{ list.buy_info.contacts }}</view>
			</view>
			<view class="u-flex u-flex-items-start u-m-b-20 u-flex-between u-font-28">
				<view class="item text-nowrap u-p-r-20">卖家</view>
				<view class="item u-flex-1 u-text-right text-base">{{ list.sell_info.company }} - {{ list.sell_info.contacts }}</view>
			</view> -->
			<view class="u-flex u-flex-items-start u-m-b-20 u-flex-between u-font-28">
				<view class="item text-nowrap u-p-r-20">订单号</view>
				<view class="item u-flex-1 u-text-right text-base">{{ list.id }}</view>
			</view>
			<view class="u-flex u-flex-items-start u-m-b-20 u-flex-between u-font-28">
				<view class="item text-nowrap u-p-r-20">订单状态</view>
				<view class="item u-flex-1 u-text-right text-base">{{ order_zt2str }}</view>
			</view>
			<view class="u-flex u-flex-items-start u-m-b-20 u-flex-between u-font-28">
				<view class="item text-nowrap u-p-r-20">总金额</view>
				<view class="item u-flex-1 u-text-right text-base">{{ list.total_fee }} 元</view>
			</view>
			
			<!-- <view class="u-flex u-flex-items-start u-m-b-20 u-flex-between u-font-28">
				<view class="item text-nowrap u-p-r-20">订单评分</view>
				<view class="item u-flex-1 u-text-right text-base">{{ list.score }}</view>
			</view> -->
			<view class="u-flex u-flex-items-start u-m-b-20 u-flex-between u-font-28">
				<view class="item text-nowrap u-p-r-20">创建时间</view>
				<view class="item u-flex-1 u-text-right text-base">{{ list.ctime }}</view>
			</view>
			<view class="u-flex u-flex-items-start u-m-b-20 u-flex-between u-font-28">
				<view class="item text-nowrap u-p-r-20">更新时间</view>
				<view class="item u-flex-1 u-text-right text-base">{{ list.uptime }}</view>
			</view>
		</view>
		
		
		<view class="bg-white u-radius-12 u-flex u-flex-wrap btns-w">
			<view class="item u-p-20" v-if="buyBtnShow">
				<up-button type="primary" @click="orderBuyBtn">订单支付</up-button>
			</view>
			<!-- <view class="item u-p-20" v-if="receiveBtnShow"> -->
			<view class="item u-p-20" >
				<up-button type="primary" @click="confirmReceiveBtn">收货确认</up-button>
			</view>
			<!-- <view class="item u-p-20" v-if="scoreBtnShow"> -->
			<view class="item u-p-20" >
				<up-button type="primary" @click="orderScorePopupShow = true">我要评分</up-button>
			</view>
			
			
		</view>
		
		
	</view>
	
	<OrderScorePopup
		:show="orderScorePopupShow" 
		title="订单评分"  
		:list="list"
		:onUpdateShow="handleChangeShow"  
		@submitScore="submitScore" 
	></OrderScorePopup>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue'
	import useDataList from '@/composition/useDataList.js'
	// import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore()
	const { tmp_id_list, user:u  } = toRefs(user)
	const base = baseStore();
	const { home, roomList, themeColor } = toRefs(base)
	import useFilter from '@/composition/useFilter.js'
	const zt = computed(() => { 
		return {
			order_zt: !list.value ? '' : list.value.status
		}
	})
	const $api = inject('$api')   
	const id = ref('')
	const list = ref({})
	const { 
		order_zt2str
	} = useFilter(zt)
	// const {
	// 	setOnlineControl,
	// 	onlineControl
	// } = share()
	const orderScorePopupShow = ref(false)
	const buyBtnShow = computed(() => {  
		return list.value.status == 0 || list.value.status == 6
	})
	const receiveBtnShow = computed(() => { 
		return list.value.status == 2 
	})
	const scoreBtnShow = computed(() => { 
		return list.value.status == 3 
	})
	onLoad(async (options) => { 
		if(options.hasOwnProperty('id')) { 
			id.value = options.id
			uni.showLoading()
			await getData()
		} 
	})
	
	async function getData() {
		const res = await $api.order_detail({
			params: {
				order_id: id.value
			}
		})
		if(res.code == 1 ) {
			// res.list.company = res.sell_info.company
			// res.list.clogin = res.sell_info.login
			list.value = res.list
		}
	}
	function confirmReceiveBtn(type) { 
		uni.showModal({
			title: '提示',
			content: '是否确认收货',
			success: async function (res) {
				if (res.confirm) {
					const r = await $api.change_order_status({
						params: {
							order_id: list.value.id
						}
					})
					if(res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						}) 
						uni.showLoading()
						await getData()
					}
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
	async function orderBuyBtn () {
		uni.showLoading()
		wxPay()
	} 
	async function wxPay() {
		let res = await $api.xcx_pay({
			pay_price: list.value.total_fee * 100,
			order_id: id.value, 
		})
		if(res.list.return_code == 'SUCCESS' && res.list.result_code == 'SUCCESS') {
			uni.requestPayment({
			    provider: 'wxpay',
			    timeStamp: String(res.pay.timeStamp),
			    nonceStr: res.pay.nonceStr,
			    package: res.pay.package,
			    signType: res.pay.signType,
			    paySign: res.pay.paySign,
			    success: async data => {
			        console.log('success:' + JSON.stringify(data)); 
					uni.showToast({
						title: '支付成功',
						icon: 'none'
					})
					uni.showLoading()
					await getData()
			    },
			    fail: err =>{
			        console.log(err);
					if(err.errMsg == 'requestPayment:fail cancel') {
						uni.showToast({
							title: '用户取消支付',
							icon: 'none'
						})
					}else {
						uni.showToast({
							title: '支付失败',
							icon: 'none'
						})
					}
			    }
			});
		}else { 
			uni.showToast({
				title: res.list.return_msg,
				icon: 'none'
			})
		}
	} 
	function submitScore(data) {
		uni.showModal({
			title: '提示',
			content: '是否提交评分',
			success: async function (res) {
				if (res.confirm) {
					const r = await $api.order_score({
						params: {
							order_id: list.value.id,
							score: data
						}
					})
					if(res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						uni.showLoading()
						await getData()
					}
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
	function handleChangeShow(data) {
		orderScorePopupShow.value = data
	} 
	
</script>

<style lang="scss" scoped>
	.btns-w {
		.item {
			flex: 0 0 50%;
			box-sizing: border-box;
		}
	}

</style>
