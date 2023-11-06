<template>
	<view class="u-p-20 w">
		<!-- <view class="u-p-20 u-border-bottom u-m-b-30">
			<view class="title u-font-40 u-m-b-15">
				{{list.title}}
			</view>
			<view class="time u-font-28 u-info">
				{{list.dtime}}
			</view>
		</view> -->
		<view class="html u-p-10" v-if="list.info">
			<u-parse :content="list.info"></u-parse>
		</view>
	</view>
	<u-safe-bottom></u-safe-bottom>
	<TabBar :customStyle="{boxShadow: '0px -3px 10px rgba(0,0,0,0.1)' }">
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28" style="height: 100%;">
			<view class="item u-flex-1 "  v-if="tlogin">
				<u-button type="error" shape="circle" @click="accpetEvent">接受团长邀请成为达人</u-button>
			</view> 
			<view class="item u-flex-1" v-else>
				<u-button type="primary" shape="circle" openType="share"  >
					<view class="u-flex"> 
						<text class="u-m-l-8 u-p-b-5 u-font-32">分享邀请页面</text>
					</view>
				</u-button>
			</view>
		</view>
		
	</TabBar>
</template>

<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue' 
	import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore() 
	const base = baseStore(); 
	const {
		setOnlineControl,
		onlineControl,
		customShareParams
	} = share()
	const $api = inject('$api')    
	const id = ref('2')
	const tlogin = ref('')
	const list = ref({})
	onLoad(async (options) => {
		if(options.hasOwnProperty('id')) {
			id.value = options.id
		} 
		if(options.hasOwnProperty('tlogin')) {
			tlogin.value = options.tlogin
		} 
		uni.showLoading()
		await getData()
	})  
	async function getData() {
		const res = await $api.web_danye({params: {id: id.value, tlogin: tlogin.value}})
		if(res.code == 1) {
			list.value = res.list
			setOnlineControl(res)
			if(res.login) customShareParams.tlogin = res.login  
		}
	}
	
	async function accpetEvent() {
		uni.showLoading()
		const res = await $api.save_invite({params: {id: tlogin.value}})
		if(res.code == 1) { 
			uni.showToast({
				title: res.msg
			})
		}
	}
</script>

<style scoped lang="scss">
.w {
	min-height: 100vh;
	padding-bottom: 60px;
} 
.card {
	
}
</style>