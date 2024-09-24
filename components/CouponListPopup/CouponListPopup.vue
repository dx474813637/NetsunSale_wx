<template>
	<view>
		<PopupNormal v-bind="$attrs" >
			<template #header>
				<view class="u-flex u-flex-between u-flex-items-center">
					<view class="item u-font-28 u-primary" @click="emits('refresh')">刷新</view>
					<view class="u-text-center">
						{{$attrs.title}}
					</view> 
					<view class="item u-font-28 u-error-dark"></view>
					
				</view>
			</template>
			<view class="list-w ">   
				<scroll-view class="main-list" scroll-y >
					<view class="item u-p-10 u-p-l-20 u-p-r-20 u-font-30"
						v-for="(item, index) in list"
						:key="index"
					>
						<view :class="{
							active: activeId == item.id
						}">
							<view class="active-icon u-flex-items-center u-flex-center">
								<view class="icon">
									<u-icon name="checkbox-mark" size="26" color="#ff3001"></u-icon>
								</view>
								
							</view>
							<CouponRowCard
								:origin="item"
								:cate="item.cate"
								@cardClick="couponSelect"
							></CouponRowCard>
						</view>
						
					</view>
					<view class="u-p-b-20"> 
						<template v-if="list.length == 0">
							<view class="u-flex u-flex-center u-p-40">
								<u-empty mode="data" :icon="base.empty" />
							</view> 
						</template>
						<template v-else>
							<u-loadmore status="nomore" />
						</template>  
					</view>
					
					
				</scroll-view> 
			</view>  
			<template #footer>
				<view class="u-p-20" v-if="submitBtnText">
					<u-button type="error" shape="circle" @click="submit">{{submitBtnText}}</u-button>
				</view>
			</template>
		</PopupNormal>
	</view>
</template>

<script setup>
	import {
		ref,
		toRefs,
		inject,
		computed,
		onMounted,
		reactive, 
		watch,
		useAttrs
	} from 'vue' 
	const attrs = useAttrs()
	const $api = inject('$api')
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { themeColor } = toRefs(base)
	import { userStore } from '@/stores/user'
	const user = userStore();
	const { user_info } = toRefs(user)
	
	const props = defineProps({  
		list: {
			type: Array,
			default: () => {
				return []
			},
		},
		activeId: {
			type: String,
			default: ''
		},
		submitBtnText: {
			type: String,
			default: '立即支付'
		}
	})   
	const emits = defineEmits(['confirmCoupon', 'refresh', 'submit'])
	onMounted(async () => { 
		
	})  
	function couponSelect(data) {
		emits('confirmCoupon', data) 
	}
	function gotoManage() {  
		uni.navigateTo({
			url: '/pages_user/address/addressList'
		})
	}
	function submit() { 
		emits('submit') 
		
	}
</script>

<style lang="scss" scoped>
	.list-w {
		height: 60vh;
		// background-color: #f2f2f2;
		position: relative;
		.load-bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 20;
			background-color: rgba(255,255,255,.6);
		}
		.list-item {
			position: relative;
			z-index: 10;
			height: 100%;
			&.item-left {
				flex: 0 0 35%;
				background-color: #f8f8f8;
			}
		}
	}
	.nav-item {
		color: #666; 
		&.active-nav {
			background-color: #f2f2f2;
			color: $u-primary; 
		}
	}
	.main-list {
		height: 100%;
		box-sizing: border-box;
		.item {
			position: relative;
			.active-icon {
				display: none;
			}
			.active {
				overflow: hidden;
				position: relative; 
				border-top-right-radius: 8px;
				.active-icon {
					display: flex;
					position: absolute;
					top: -50px;
					right: -50px; 
					width: 100px;
					height: 100px;
					background-color: #efd6b7;
					z-index: 50;
					transform: rotate(-45deg);
					.icon { 
						transform: rotate(45deg) translate(-20px, 20px);
					}
				}
			}
		}
	}
	.item-card { 
		background-color: #e8e8e8;
		box-sizing: border-box;  
		margin-bottom: 10px; 
		padding: 10px;
		color: #666;
		border-radius: 5px;
		border: 1rpx solid #e8e8e8;
		&.active {
			background-color: $u-primary-light;
			color: $u-primary;
			border-color: $u-primary;
		}
	}
</style>