<template>
	<view class="w u-p-20" >
		<view class="status-w u-text-center u-p-t-20 u-p-b-40 u-font-40 text-bold text-white" >
			{{ order_zt2str }}
		</view>
		<view class="u-m-b-20">
			<AddressCard
				:origin="list.address"
				:cardClickToEdit="false" 
			></AddressCard>
		</view>
		
		<view class="u-m-b-20">
			<view class="u-p-10 u-m-b-10 u-info-dark u-font-32">订单详情</view>
			<view v-if="list.id">
				<OrderCard
					:origin="list"
					:gotoDetail="false"
				></OrderCard>
			</view>
			
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
			
			<view class="u-flex u-flex-items-start u-m-b-20 u-flex-between u-font-28" v-if="list.status == 4">
				<view class="item text-nowrap u-p-r-20">订单评分（5分制）</view>
				<view class="item u-flex-1 u-text-right text-base">{{ list.score }} 分</view>
			</view>
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
			<view class="item u-p-20" v-if="btnList.button1">
				<!-- 订单支付 -->
				<up-button type="error" @click="orderBuyBtn">{{btnList.button1_title}}</up-button>
			</view>
			<view class="item u-p-20" v-if="btnList.button2"> 
				<!-- 收货确认 -->
				<up-button type="error" @click="confirmReceiveBtn">{{btnList.button2_title}}</up-button>
			</view>
			<view class="item u-p-20" v-if="btnList.button3"> 
				<!-- 我要评分 -->
				<up-button type="error" @click="orderScorePopupShow = true">{{btnList.button3_title}}</up-button>
			</view>
			<view class="item u-p-20" v-if="btnList.button4"> 
				<!-- 我要退款 -->
				<up-button type="error" @click="refundBtn">{{btnList.button4_title}}</up-button>
			</view>
			<view class="item u-p-20" v-if="btnList.button5"> 
				<!-- 申请售后 -->
				<up-button type="error" @click="applyServiceBtn">{{btnList.button5_title}}</up-button>
			</view>
			<view class="item u-p-20" v-if="btnList.button6"> 
				<!-- 查看物流 -->
				<up-button type="error" @click="orderExpressPopupShow = true">{{btnList.button6_title}}</up-button>
			</view>
			<view class="item u-p-20" v-if="btnList.button7">
				<!-- 取消订单 -->
				<up-button type="default" @click="cancalBtn">{{btnList.button7_title}}</up-button>
			</view>
			
			
		</view>
		
		
	</view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar></MenusBar>
	
	<OrderScorePopup
		:show="orderScorePopupShow" 
		title="订单评分"  
		:list="list"
		:onUpdateShow="handleChangeShow"  
		@submitScore="submitScore" 
	></OrderScorePopup>
	<OrderServicePopup
		:show="orderServiceShow" 
		title="售后服务"  
		:list="list"
		:onUpdateShow="handleChangeShow2"  
		@submitService="submitService" 
	></OrderServicePopup>
	<OrderExpressPopup
		:show="orderExpressPopupShow" 
		title="物流信息"  
		:list="list"
		:onUpdateShow="handleChangeShow3" 
	></OrderExpressPopup>
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
	const btnList = ref([])
	const orderServiceShow = ref(false)
	const orderExpressPopupShow = ref(false)
	const { 
		order_zt2str
	} = useFilter(zt)
	// const {
	// 	setOnlineControl,
	// 	onlineControl
	// } = share()
	const orderScorePopupShow = ref(false)
	// const buyBtnShow = computed(() => {  
	// 	return list.value.status == 0 || list.value.status == 6
	// })
	// const receiveBtnShow = computed(() => { 
	// 	return list.value.status == 2 
	// })
	// const scoreBtnShow = computed(() => { 
	// 	return list.value.status == 3 
	// })
	// const refundBtnShow = computed(() => { 
	// 	return list.value.status == 1 ||list.value.status == 3 ||list.value.status == 4 
	// })
	
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
			btnList.value = res.button
			// res.list.company = res.sell_info.company
			// res.list.clogin = res.sell_info.login
			list.value = res.list
		}
	}
	
	function cancalBtn() { 
		uni.showModal({
			title: '提示',
			content: '取消订单',
			success: async function (res) {
				if (res.confirm) {
					const r = await $api.change_order_status({
						params: {
							order_id: list.value.id
						}
					})
					if(r.code == 1) {
						uni.showToast({
							title: r.msg,
							icon: 'none'
						})  
						await getData()
					}
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
	function confirmReceiveBtn() { 
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
					if(r.code == 1) {
						uni.showToast({
							title: r.msg,
							icon: 'none'
						})  
						await getData()
					}
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
	function applyServiceBtn() { 
		orderServiceShow.value = true 
	}
	function refundBtn() {
		uni.showModal({
			title: '提示',
			content: '确认退款',
			success: async function (res) {
				if (res.confirm) {
					await refundEvent() 
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
	async function refundEvent(data = {}) {
		const r = await $api.order_refund({ 
			id: list.value.id,
			...data 
		})
		if(r.code == 1) {
			uni.showToast({
				title: r.msg,
				icon: 'none'
			})   
			await getData()
		}
	}
	function submitService(data={}) {
		uni.showModal({
			title: '提示',
			content: '确认提交申请',
			success: async function (res) {
				if (res.confirm) {
					await refundEvent(data.params)
					orderServiceShow.value = false
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
					if(r.code == 1) {
						handleChangeShow(false)
						uni.showToast({
							title: r.msg,
							icon: 'none'
						}) 
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
	function handleChangeShow2(data) {
		orderServiceShow.value = data
	}  
	function handleChangeShow3(data) {
		orderExpressPopupShow.value = data
	}  
	
</script>

<style lang="scss" scoped>
	.btns-w {
		.item {
			flex: 0 0 50%;
			box-sizing: border-box;
		}
	}
	.w {
		padding-bottom: 60px!important;
		background: linear-gradient(to bottom, #F12E24,  #F12E24 100px, #f8f8f8 180px);
	}
</style>
