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
	<TabBar :customStyle="{boxShadow: '0px -3px 10px rgba(0,0,0,0.1)' }" >
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28" style="height: 100%;">
			<!-- <view class="item u-flex-1 u-m-r-20" >
				<u-button type="primary" shape="circle" openType="share"  >
					<view class="u-flex"> 
						<text class="u-m-l-8 u-p-b-5 u-font-32">分享</text>
					</view>
				</u-button>
			</view> -->
			<view class="item u-flex-items-center  u-flex-1" @click="base.handleGoto({type: 'reLaunch', url: '/pages/home/home'})">
				<u-button type="error" shape="circle">首页</u-button> 
			</view> 
		</view>
	</TabBar>
</template>

<script setup> 
	import {baseStore} from '@/stores/base.js'
	const base = baseStore()
	import { share } from '@/composition/share.js'
	const {
		setOnlineControl,
		onlineControl
	} = share()
	const $api = inject('$api') 
	const list = ref({}) 
	const id = ref('') 
	onLoad(async (options) => {
		if(options.hasOwnProperty('id')) {
			id.value = options.id
		}
		uni.showLoading()
		getData()
		// if(roomList.value.length == 0) { 
		// 	uni.showLoading()
		// 	await base.getRoomList()
		// } 
	})
	function goto() {
		uni.navigateTo({
			url: list.value.url
		})
	}

	async function getData() {
		const res = await $api.web_danye({params: {id: id.value}})
		if(res.code == 1) {
			list.value = res.list
			setOnlineControl(res)
		}
	}

</script>
<style>
	page{
		/* background-color: #fff; */
	}
</style>
<style lang="scss" scoped>
	.w {
		min-height: 100vh;
		padding-bottom: 60px;
	}
	.html {
		line-height: 25px;
		word-break: break-all;
	}
</style>
