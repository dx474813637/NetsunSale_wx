<template>
	<view>
		<PopupNormal v-bind="$attrs" > 
			<view class="list-w bg-white">   
				<scroll-view class="main-list  u-p-30" scroll-y >
					<!-- <u-parse :content="props.list" v-if="props.list"></u-parse> -->
					<view class="u-flex u-flex-items-center u-flex-between">
						<view class="item">企业身份</view>
						<view class="item">
							<u-switch 
								activeColor="#ff0e7a"
								v-model="qy" 
								@change="change"
								:loading="loading"
							></u-switch>
						</view>
					</view>
				</scroll-view> 
			</view>  
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
			type: String,
			default: '',
		}
	})    
	const qy = ref(false)
	watch(
		() => user_info.value.qy,
		(n) => {
			console.log(n)
			qy.value = n?true:false
		},
		{
			immediate: true
		}
	)
	onMounted(async () => { 
	})  
	const loading = ref(false)
	async function change(e) { 
		if(loading.value) return;
		loading.value = true;
		const res = await $api.save_qy_role({
			params: {
				qy: e? 1: 0
			}
		})
		loading.value = false
		if(res.code == 1 ) {
			uni.showToast({
				title: res.msg,
				icon: 'none'
			})
			user_info.value.qy = e? 1: 0
			await user.refreshUserData()
		}
	}
</script>

<style lang="scss" scoped>
	.list-w {
		height: 40vh;
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