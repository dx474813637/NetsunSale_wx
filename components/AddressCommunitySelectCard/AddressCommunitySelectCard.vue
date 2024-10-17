<template>
	<view class="card bg-white u-radius-12 u-p-20" @click="cardClick"> 
		<view class="card-row u-flex u-flex-items-center u-flex-between ">  
			<view class="item u-flex-1 u-font-32" >
				<template v-if="origin.id">
					<view class="row u-p-l-20 u-p-r-20 u-p-10"> 
						<view class="u-flex u-flex-items-center text-black u-m-b-10">
							<view class="u-m-r-15 u-m-t-4"><i class="custom-icon-shop custom-icon text-bold text-black"></i></view>
							<text class="u-m-r-6">{{origin.address_name}}</text>
							<view class="u-m-t-4"><u-icon name="arrow-right" color="#000" size="14"></u-icon></view> 
						</view>
						<view class="text-base u-font-28 u-m-b-10">
							{{origin.area_name}} {{origin.address}}
						</view> 
						<view class="u-flex u-flex-items-start " style="color: #943D1B;">
							<text class="u-warning-light-bg u-radius-4 u-p-l-14 u-p-r-14 u-font-26 u-m-r-10" >{{origin.name}}</text>
							<text class="u-warning-light-bg u-radius-4 u-p-l-14 u-p-r-14 u-font-26" >{{origin.tel}}</text>
						</view> 
					</view>
					<!-- <view class="u-error u-m-b-10 text-black ">
						<text class="u-m-r-14 u-error">自提点</text>
						<text class=" u-info-light-bg u-radius-4 u-p-l-14 u-p-r-14 u-font-28" >{{origin.address_name}}</text>
					</view> 
					<view class=" u-m-b-10">
						{{origin.area_name}} {{origin.address}}
					</view> 
					<view class="u-flex u-flex-items-center u-font-28 u-info">
						<view>
							{{origin.name}}
						</view> 
						<view class="u-m-l-20">
							{{origin.tel}}
						</view> 
					</view> -->
				</template>
				<template v-else>
					<view class="text-base">
						请先选择地址
					</view> 
				</template>
			</view> 
			<!-- <view class="item u-p-l-20 u-p-10 u-p-r-20" >
				<u-icon name="arrow-right" size="16" color="#999"></u-icon>
			</view> -->
		</view>
	</view>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'  
	const $api = inject('$api') 
	import { baseStore } from '@/stores/base.js'
	const base = baseStore() 
	const { themeColor, regional_list, regional_list_loading } = toRefs(base) 
	
	const props = defineProps({
		origin: {
			type: Object,
			default: () => {
				return {}
			}
		} ,
		noIcon: {
			type: Boolean,
			default: false
		}
	})
	 
	const emits = defineEmits(['cardClick'])
	function cardClick() { 
		emits('cardClick')
	}
	
</script>

<style lang="scss" scoped>
	.name {
		font-weight: bold;
	}
</style>