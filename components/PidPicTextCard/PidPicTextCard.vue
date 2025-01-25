<template>
	<view class="bg-white u-radius-8 u-p-30">
		<view class="name-w u-flex u-flex-items-center ">
			<!-- <u-icon name="bag-fill" size="16" color="#c7d3f0"></u-icon> -->
			<view class="">{{origin.name}}</view>
		</view>
		<view class="info-w u-m-t-40" v-if="origin.info">
			<u-parse
				:content="origin.info" 
			></u-parse>
		</view>
		<view class="pic-w u-m-t-40" v-if="urls.length > 0">
			<up-album :urls="urls" multipleSize="100" maxCount="3" ></up-album>
		</view>
		<view class="time-w u-info u-m-t-40 u-font-28 u-flex u-flex-between u-flex-items-center">
			<view class="item">
				<u-button type="primary" size="mini" @click="copyText" >复制文字</u-button>
			</view>
			<view class="item">{{origin.uptime}}</view>
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
		cardClickDefault: {
			type: Boolean,
			default: true
		}
	})
	const emits = defineEmits(['cardClick'])
	
	const urls = computed(() => {
		if(!props.origin.pic) return [];
		return props.origin.pic.split('|')
	})
	
	
	function copyText() {
		if(!props.origin.info) return
		uni.setClipboardData({
			data: props.origin.info,
			success() {
				uni.showToast({
					title: '复制成功'
				}) 
			}
		})
	}
</script>

<style lang="scss" scoped>
// 
</style>