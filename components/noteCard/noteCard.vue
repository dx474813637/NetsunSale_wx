<template>
	<view class="card u-radius-5  bg-white" :style="customStyle" @click.stop="gotoDetail">
		<view class="preview-w" :style="{
			background: imgHeight? '#222' :''
		}">  
			<template v-if="previewType == 'image'">
				<!-- <image
					:src="previewFileSrc" 
					mode="widthFix"
					style="width: 100%; height: auto;" 
					></image> -->
				<zeroLazyLoad
					:image="previewFileSrc" 
					:imgMode="imgHeight? 'aspectFit' :'widthFix'"
					:height="imgHeight? imgHeight :'auto'"
					></zeroLazyLoad>
			</template> 
			<template v-if="previewType == 'video'">
				<video  
					style="width: 100%; height: 240px;display: block;"
					:style="{
						height: imgHeight? imgHeight: '240px'
					}"
					:src="previewFileSrc" 
					:controls="false"
					:show-center-play-btn="false"
					object-fit="cover"
				></video>
				<view class="video-mask">
					<view class="video-icon u-flex u-flex-items-center u-flex-center">
						<u-icon name="play-right-fill" color="#fff" size="12"></u-icon>
					</view>
				</view>
			</template> 
		</view> 
		<view class="content-w u-p-10 u-p-t-20 u-p-b-20 u-font-28">
			<!-- <view class="u-line-2 u-m-b-10">
				{{origin.info}}
			</view> -->
			<rich-text class="u-line-2 u-m-b-10" :nodes="origin.info"></rich-text> 
			<view class="u-flex u-flex-items-center u-flex-between ">
				<view class="item u-flex u-flex-items-center">
					<up-image
						v-if="origin.user.img"
						shape="circle"
						width="20px"
						height="20px"
						:src="origin.user.img"
					></up-image>
					<view class="icon-w u-flex u-flex-center u-flex-items-center" v-else>
						<i class="custom-icon-myfill custom-icon"></i>
					</view> 
					<view class="u-m-l-10 u-font-24 u-line-1">{{origin.user.name}}</view>
				</view>
				<view class="item u-flex u-flex-items-center u-m-l-20">
					<i class="custom-icon-aixin custom-icon" style="color: #666;"></i>
					<view class="u-m-l-8 u-font-28">{{origin.dz}}</view>
				</view>
			</view>
		</view>  
		
	</view>
</template>

<script setup> 
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'  
	import {useCateStore, baseStore} from '@/stores/base.js'
	import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue'
	const base = baseStore()
	const props = defineProps({
		origin: {
			type: Object,
			default: () => ({})
		},
		customStyle: {
			type: Object,
			default: () => ({})
		},
		imgHeight: {
			type: String,
			default: ''
		},
		urlObj: {
			type: Object,
			default: () => ({})
		}
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
	const previewFileSrc = ref(''); 
	const previewType = computed(() => { 
		return regList.filter(ele => ele.reg.test(previewFileSrc.value))[0]?.name || '' 
	}) 
	watch(
		() => props.origin,
		(n) => {
			previewFileSrc.value = n.pic.split('|')[0]
		},
		{
			immediate: true,
			deep: true
		}
	)
	function gotoDetail() {
		base.handleGoto(props.urlObj.url? props.urlObj :{
			url: '/pages_note/note/note',
			params: {
				id: props.origin.id, 
			}
		})
	}
</script>

<style lang="scss" scoped>
	.icon-w {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: rgba(0,0,0,.06);
		.custom-icon {
			font-size: 12px;
			color: rgba(0,0,0,.4);
		} 
	}
	.card {
		overflow: hidden;
		width: 100%;
	}
	.preview-w {
		width: 100%; 
		position: relative;
		overflow: hidden; 
		border-radius: 4px;
		max-height: 240px;
		.video-mask {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.2);
			z-index: 8;
			.video-icon {
				position: absolute;
				right: 15px;
				top: 15px;
				background-color: rgba(0,0,0,0.3);
				width: 22px;
				height: 22px;
				border-radius: 30px;
				
			}
		}
	}
	.content-w { 
	}
</style>