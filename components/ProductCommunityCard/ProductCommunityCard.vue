<template>
	<view class="card u-p-10 u-radius-8 uni-shadow-base bg-white u-flex"  @click.stop="gotoDetail(0)" :class="{small: size == 'small'}" :style="customStyle">
		<view class="img-w"> 
			<!-- <image 
				class="img" 
				mode="aspectFill"
				:src="previewImg"
			 /> -->
			<view class="img">
				<zeroLazyLoad
					:image="previewImg" 
					imgMode="scaleToFill"
					height="100%"
					:border-radius="16"
					></zeroLazyLoad>
			</view> 
			
		</view>
		<slot name="content">
			<view class="content-w u-p-l-15 u-p-r-15 u-flex-1 u-flex-column u-flex-between u-flex-items-start"
				:class="{
					'u-font-30': size == 'normal',
					'u-font-26': size == 'small',
				}"
			>
				<view class="u-line-2 u-font-32 " style="width: 100%;" >
					<text class="u-error-bg u-radius-5 text-white u-p-4 u-p-l-8 u-p-r-8 u-font-26 u-m-r-6" v-if="origin.tuan_role == 1">单团</text>
					<text class="text-bold">{{origin.name}}</text> 
				</view>
				<view class="" style="width: 100%;">
					<view class="u-flex u-flex-items-center u-m-b-8" >
						<view class="u-m-r-10" v-if="tuan_user.length > 0">
							<up-avatar-group 
								:urls="tuan_user"
								size="20"
								gap="0.4"
							></up-avatar-group>
						</view>
						
						<view class="u-info u-font-26">
							<template v-if="origin.tuan_zt == 1">
								拼团成功
							</template>
							<template v-else>
								<text>还差</text>
								<text class="u-error">{{origin.num1}}人</text>
								<text>成团</text>
							</template>
						</view>
					</view> 
					<view class="u-error-light-bg u-radius-6 u-flex u-flex-between u-flex-items-center" style="height: 48px; ">
						<view class="u-flex-1 u-error u-flex u-flex-items-center u-p-l-10" style="flex: 0 0 calc(100% - 60px)">
							<view class="u-font-24" style="width: 100%;">
								<view class="u-flex u-flex-items-center u-m-b-4">
									<text class="u-error-bg u-radius-5 text-white u-p-l-8 u-p-r-8">团</text>
									<text>￥</text>
									<text class="u-font-32 text-bold">{{origin.pprice}}</text>
								</view>
								<view class="u-flex u-flex-items-center u-line-1" style="opacity: .6; ">
									<text >
										<text class="u-error-bg u-radius-5 text-white u-p-l-8 u-p-r-8" style="background-color: #fd943a;">特</text>
										<text >￥{{origin.price}}</text>
									</text>
									<text class="u-m-l-14">
										<text class="u-error-bg u-radius-5 text-white u-p-l-8 u-p-r-8" style="background-color: #fd943a;">原</text> 
										<text >￥{{origin.zprice}}</text>
									</text>
								</view>
							</view>
						</view>
						<view class="text-white u-flex u-flex-center u-flex-items-center u-error-bg u-radius-6" style="flex: 0 0 60px; height: 100%;"  @click.stop="btnClick(origin.id)">
							<view class="u-font-30">拼 单</view>
						</view>
					</view>
				</view>
				 
			</view>
		</slot>
		
		
	</view>
</template>

<script setup> 
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'  
	import {useCateStore, baseStore} from '@/stores/base.js'
	import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue'
	const base = baseStore()
	const { themeColor } = toRefs(base) 
	const props = defineProps({
		origin: {
			type: Object,
			default: () => ({})
		},
		customStyle: {
			type: Object,
			default: () => ({})
		},
		mode: {
			type: String,
			default: 'switch'
		},
		divideShow: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: 'normal'
		},
	})
	const tuan_user = computed(() => {
		if(props.origin.tuan_user && props.origin.tuan_user.length > 0) return props.origin.tuan_user.map(ele => ele.img)
		return []
	})
	
	const emits = defineEmits(['btnClick'])
	const previewImg = ref('');
	watch(
		() => props.origin,
		(n) => {
			previewImg.value = n.pic.split('|')[0]
		},
		{
			immediate: true,
			deep: true
		}
	)
	function gotoDetail(bottom) {
		base.handleGoto({
			url: '/pages/productCommunity/productDetailQuick',
			params: {
				id: props.origin.id, 
				pf: '1',
				bottom: bottom 
			}
		})
	}
	function btnClick(id) { 
		
		emits('btnClick', {id})
	}
</script>

<style lang="scss" scoped>
	.card {
		overflow: hidden;
		&.small {
			.img-w {
				flex: 0 0 80px;
				.img {
					width: 80px;
					height: 80px; 
				}
			}
			.content-w {
				flex: 0 0 calc(100% - 80px); 
				
			}
		}
	}
	.img-w { 
		flex: 0 0 120px; 
		.img { 
			width: 120px;
			height: 120px;
			display: block;
		}
	}
	.content-w {
		flex: 0 0 calc(100% - 120px); 
		box-sizing: border-box;
	}
</style>