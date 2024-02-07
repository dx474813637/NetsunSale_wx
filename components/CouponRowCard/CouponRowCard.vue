<template>
	<view class="card" @click="click">
		<view class="card-header u-p-20 u-radius-8" :style="{
			backgroundImage: 'linear-gradient(to right, #FCEABE, #BBA16D)'
		}">
			<view class="u-flex u-flex-between coupon u-p-10">
				<view class="item u-flex-1 u-p-l-20 box-border" >
					<view class="coupon-cate">{{origin.cate}}</view>
					<view class="coupon-money u-flex u-flex-items-baseline u-font-bold u-p-l-10">
						<view class="num">{{origin.minus}}</view>
						<view class="num-dw u-p-l-10">元</view>
					</view>
				</view>
				<view class="item u-border-left u-flex-column u-flex-items-start u-flex-center box-border u-p-l-40" style="flex: 0 0 40%;border-color: #a28c61!important;">
					<view class="u-font-34">{{origin.title}}</view> 
					<slot name="btn"></slot>
				</view>
				<view class="icon-w">
					<u-icon name="rmb-circle" size="140" color="#B09762"></u-icon>
				</view>
			</view>
		</view>
		<view class="card-footer u-flex u-radius-8 bg-white u-flex-between u-flex-items-center u-font-24 u-p-20">
			<view class="item">
				使用时间：
				<template v-if="origin.begin == '长期'">
					{{origin.begin}}
				</template>
				<template v-else >
					{{origin.begin}} 至 {{origin.end}}
				</template>
			</view>
		</view>
		
	</view>
</template>

<script setup> 
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'  
	import {useCateStore, baseStore} from '@/stores/base.js'
	// import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue'
	const base = baseStore()
	const props = defineProps({
		origin: {
			type: Object,
			default: () => ({})
		}, 
	})
	
	const emits = defineEmits(['cardClick'])
	const previewImg = ref(''); 
	function gotoDetail() {
		base.handleGoto({
			url: '/pages/product/productDetail',
			params: {
				id: props.origin.id, 
			}
		})
	}
	function click(e) { 
		
		emits('cardClick', {origin: props.origin})
	}
</script>

<style lang="scss" scoped>
	.card-header {
		overflow: hidden;
	}
	.card-footer {
		color: #795107;
	}
	.coupon {
		color: #654B18;
		position: relative;
		.icon-w {
			position: absolute;
			right: -50px;
			top: -30px;
		}
		.item {
			height: 90px;
			position: relative;
			z-index: 10;
		}
		.coupon-cate {
			position: relative;
			padding-left: 30px;
			&:before {
				content: '';
				position: absolute;
				left: 10px;
				top: 50%;
				transform: translateY(-50%);
				width: 10px;
				height: 10px;
				border-radius: 10px; 
				background: #654B18;
			}
		}
		.coupon-money {
			.num {
				font-size: 60px;
				font-family: cursive;
			}
		}
	}
	.card {
		overflow: hidden;
	}
	.img-w { 
		flex: 0 0 100px;
		.img { 
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.content-w {
		flex: 0 0 calc(100% - 100px); 
		box-sizing: border-box;
	}
</style>