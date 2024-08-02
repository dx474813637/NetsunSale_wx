<template>
	<view>
		<zmm-watermark watermark="商家信息公示专用" color="#ff0000"></zmm-watermark>
		<image v-if="pic" :src="pic" style="width: 100vw; height: auto;" mode="widthFix" ></image>
	</view>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue' 
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore()
	const pic = ref('')
	onLoad(async (options) => { 
		if(options.hasOwnProperty('pic')) { 
			pic.value = options.pic 
		}
		else {
			uni.reLaunch({
				url: '/pages/home/home'
			})
		}
	})
	function clickEvent() {
		uni.previewImage({
			urls: [pic.value],
			current: 0
		})
	}
</script>

<style lang="scss">

</style>
