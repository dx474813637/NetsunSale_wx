<template>
	<view>
		<u-popup :show="show" mode="center" @close="emits('onUpdateShow', false)" round="10" :safeAreaInsetBottom="false">
			<view class="u-p-20 wrap u-radius-8">
				<view class="main">
					<view class="header text-white u-flex u-flex-center u-flex-items-center u-p-20 text-bold">
						{{user_info.title}}
					</view>
					<view class="avatar-w u-flex u-flex-center u-p-20 u-m-b-20" > 
						<button class="avatar-wrapper u-flex u-flex-center u-flex-items-center" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							<image class="avatar u-radius-4" :src="avatarUrl" v-if="avatarUrl"></image>
							<u-icon name="account-fill" size="32" color="#aaa" v-else></u-icon>
							<view class="cream-icon u-flex u-flex-items-center u-flex-center">
								<u-icon name="camera-fill" color="#fff"></u-icon>
							</view> 
						</button>
						
					</view>
					<view class="nick-w u-m-b-20">
						<u-input 
							v-model="nick" 
							:customStyle="{background: '#f8f8f8', padding: '10px'}" 
							placeholder="输入昵称"
							fontSize="14px" 
							border="none"
						>
							<template #prefix>
								<view class="u-font-28 text-base">
									昵称
								</view>
							</template>
						</u-input>
					</view>
					<view class="tishi-w u-m-b-30 u-p-20 u-info u-font-26">
						{{user_info.info}}
					</view>
					<u-button type="primary" @click="submit">立即登录</u-button>
				</view>
				<!-- <view class="img-w">
					<u--image
						showLoading
						:src="`https://wx3.y.netsun.com/Public/2023xuanpinhui/a08.png?time=${new Date().getTime()})`"
						width="80vw"
						height="auto"
						mode="widthFix"
					></u--image>
				</view> -->
				
			</view>
		</u-popup>
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
	const { configBaseURL, configHeader, themeColor } = toRefs(base)
	import { userStore } from '@/stores/user'
	const user = userStore();
	const { user_info } = toRefs(user)
	 
	const props = defineProps({  
		show: {
			type: Boolean,
			default: false,
		}
	}) 
	const avatarUrl = ref('')
	const nick = ref('')
	watch(
		() => user_info.value,
		(n) => {
			avatarUrl.value = n.img;
			nick.value = n.name;
		},
		{
			deep: true
		}
	)
	const emits = defineEmits(['onUpdateShow'])
	onMounted(async () => { 
	})  
	
	async function onChooseAvatar(e) {
		console.log(e)
		const { avatarUrl: avatarUrl2 } = e.detail 
		uni.showLoading()
		const result = await uploadFilePromise(avatarUrl2)
		
		avatarUrl.value = result.list[0]
	}
	function uploadFilePromise(url) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: `${configBaseURL.value}upimg`, 
				filePath: url,
				name: 'file',
				header: {
					...configHeader.value,
					'content-type': 'multipart/form-data',
					userid: uni.getStorageSync('userid'),
				},
				success: (res) => {
					console.log(res)
					uni.hideLoading()
					resolve(JSON.parse(res.data))
					
				},
				fail(error) { 
					console.log(error)
					uni.hideLoading()
					reject(error)
				}
			});
		})
	}
	async function submit() {
		const res = await $api.save_info({
			params: {
				name: nick.value,
				img: avatarUrl.value
			}
		})
	}
	
	
</script>

<style lang="scss" scoped>
	.wrap {
		position: relative;
		overflow: hidden;
		width: 80vw;
		&::after {
			position: absolute;
			content: '';
			left: 50%;
			transform: translateX(-50%) scaleX(1.3);
			top: 0;
			width: 100%;
			height: 100px;
			border-radius: 0 0 100% 100%;
			background-color: #007aff;
		}
		.main {
			position: relative;
			z-index: 10;
		} 
		.avatar-wrapper {
			position: relative;
			width: 80px;
			height: 80px;
			border: 2px solid #fff;
			outline: none;
			padding: 0;
			overflow: unset;
			.avatar { 
				width: 100%;
				height: 100%;
			}
			.cream-icon {
				position: absolute;
				right: -5px;
				bottom: -5px;
				width: 20px;
				height: 20px;
				border-radius: 20px;
				background-color: #007aff; 
			}
		}
		
	}
</style>