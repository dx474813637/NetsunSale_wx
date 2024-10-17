<template>
	<view class="shop-card u-radius-16 bg-white u-p-b-50 u-p-10" @click="gotoDetail">
		<view class="shop-card-header u-flex u-flex-items-center u-flex-between u-p-15">
			<view class="u-flex u-flex-items-center"> 
				<view class="u-m-r-10">
					<u-icon name="account" color="#999" size="20"></u-icon> 
				</view>
				<view class="u-font-26 u-line-1">{{origin.name}}-{{origin.tel}}</view>
				<!-- <view class="u-m-l-20">
					<u-icon name="arrow-right" color="#999" size="14"></u-icon>
				</view> -->
			</view>
			<view class="u-m-l-20 u-error text-nowrap u-font-30">
				{{ order_zt2str }}
			</view>
		</view>
		<view class="shop-card-main"> 
			<view class="item" v-for="item in dataList.pid" :key="item.id">
				<OrderProductRowCard
					:product="item"
					:gotoDetail="gotoProduct"
				></OrderProductRowCard>
			</view> 
			<view class="u-flex u-flex-between u-flex-items-center u-p-10">
				<view class="item u-info u-font-26 u-flex u-flex-items-center">
					<u-icon name="calendar-fill" size="18" color="#999"></u-icon>
					<view class="u-m-l-10">{{dataList.ctime}}</view>
				</view>
				<view class="item u-flex u-flex-items-center u-font-28">
					<view class="u-m-r-10">合计</view>
					<view class="u-flex u-flex-items-center">
						<view style="color: #fd2e2e;">￥</view>
						<u-count-to  
						:endVal="dataList.total_fee" 
						separator="," 
						:decimals="2"
						fontSize="16"
						bold
						duration="100"
						color="#fd2e2e"
						></u-count-to>
					</view>
				</view>
			</view>
			 
		</view>
	</view>

</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue'
	// import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	import useFilter from '@/composition/useFilter.js'
	const user = userStore()
	const { tmp_id_list } = toRefs(user)
	const base = baseStore();
	const { home, roomList, themeColor } = toRefs(base)
	const props = defineProps({
		origin: {
			type: Object,
			default: () => {
				return {}
			}
		},
		gotoDetail: {
			type: Boolean,
			default: true
		},
		gotoProduct: {
			type: Boolean,
			default: false
		},
	})
	const zt = computed(() => {
		return {
			order_zt: props.origin.status
		}
	})
	const { 
		order_zt2str
	} = useFilter(zt)
	
	const emits = defineEmits(['cardClick'])
	const dataList = computed(() => {
		return {
			...props.origin,
			pid: props.origin.pid.map(ele => { 
				let specs = JSON.parse(ele.specs)
				ele.specs_arr = Object.keys(specs).map(ele => {
					return {
						label: ele,
						value: specs[ele]
					}
				}) 
				return {
					...ele
				}
			})
		}
	})
	
	function gotoDetail() {
		if(props.gotoDetail) {
			base.handleGoto({
				url: '/pages_user/order/orderDetail',
				params: {
					id: props.origin.id
				}
			})
			return
		}
		emits('cardClick', {data: props.origin})
	}
	
	
</script>

<style lang="scss" scoped>
	.shop-card-header {
		border-bottom: 1rpx solid #f8f8f8;
	}
	.shop-card-main {
		.product-item {
			.item {
				&.checkbox {
					height: 70px;
				}
				&.info {
					min-height: 70px;
				}
			}
		}
	}
</style>