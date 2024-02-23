<template>
	<view class="tabbar-w u-p-t-20">
		<view class="tabbar bg-white" style="box-shadow: `0 0 10rpx rgba(90,90,90,.4)`" >  
			<view class="u-flex u-flex-around" style="height: 40px;">
				<view class="item u-flex-column u-flex-center u-flex-items-center u-font-34 text-base"
					style="height: 40px;"
					v-for="(item, index) in menusByMode"
					:key="item.name"
					@click="tabsClick(index)"
				> 
					<view class="u-p-5" v-if="item.icon">
						<image
							class="u-page__item__slot-icon"
							mode="heightFix"
							:src="item.icon"
						></image>
					</view>   
					<view class="u-p-5" 
						v-if="item.name" 
					>
						{{item.name}}
					</view>	
				</view>
			</view>
			<u-safe-bottom></u-safe-bottom>
		</view>
		
	</view>
	
	<!-- <u-tabbar
		:value="menusActive"
		inactiveColor="#666"
		:activeColor="base.themeColor" 
		:border="false"
	>
		
		<u-tabbar-item 
			:text="item.name"  
			v-for="item in menusByMode" 
			:key="item.name"
			@click="tabsClick"
		> 
			<template #active-icon>
				<image
					class="u-page__item__slot-icon" 
					:src="item.white_icon_2  || item.img"
				></image>
			</template>
			
			<template #inactive-icon>
				<image
					class="u-page__item__slot-icon" 
					:src="item.white_icon_1  || item.img"
				></image> 
			</template>
			
			
		</u-tabbar-item>
			
	</u-tabbar> -->
</template>
<script setup>
	import { onLoad, onReady } from "@dcloudio/uni-app";
	import { 
		ref,
		toRefs,
		inject,
		computed,
		onMounted
	} from 'vue'
	import {
		menusStore,
		baseStore
	} from '@/stores/base';
	import { storeToRefs } from 'pinia' 
	import useUploadMedia from '@/pages_note/composition/useUploadMedia.js'
	import {userStore} from '@/stores/user.js' 
	const user = userStore() 
	const { biji_files, biji_step, biji_info, biji_linshi, user_info } = toRefs(user)
	const base = baseStore()
	const menusstore = menusStore()
	const { menus_note: menus, menusNoteActive: menusActive  } = storeToRefs(menusstore);
	// const menusRef  = computed(() => menus.menus);
	// const menusActiveRef = computed(() => menus.menusActive); 
	const $api = inject('$api')  
	const $http = inject('$http')
	const props = defineProps({
		prodId: {
			type: String,
			default: ''
		},
		mode: {
			type: String,
			default: ''
		}
	})
	const options2 = computed(() => {
		return {
			count: 9,
			mediaType: ['mix'],
			sourceType: ['album', 'camera'],
			maxDuration: 60,  
		}
	}) 
	const { 
		files,
		getSignature,
		startUpload,
		chooseMedia
	} = useUploadMedia(options2)
	const menusByMode = computed(() => {  
		return menus.value
	}) 
	onMounted(() => { 
		menusstore.getNoteMenusData($http) 
		let routeObj = getCurrentPages()[getCurrentPages().length - 1] 
		menusstore.saveCurPage({
			route: uni.$u.page(),
			options: routeObj.options
		})  
	})
	
	async function chooseBtn() { 
		biji_step.value = false
		biji_files.value = []
		const res = await chooseMedia()
		if(res) {
			base.handleGoto({
				url: '/pages_note/note2/noteEdit',
				params: {
					id: props.prodId
				}
			})
		}
		
	}
	function tabsClick(index) {
		const item = menusByMode.value[index]
		// console.log(item)
		if(item.cate == 1) {
			chooseBtn()
			return
		}
		if(item.type == 2 ){
			uni.redirectTo({
				url: item.url
			})
		}
		else if(item.type == 3 ){
			uni.navigateTo({
				url: item.url
			})
		}
		else if (item.type == 4) {
			uni.navigateToMiniProgram({
				appId: item.url,
				success(res) {
					// 打开成功
				},
				complete(res1) {
					console.log(res1);
				}
			});
		}
		else {
			uni.reLaunch({
				url: item.url
			})
		}
	}
	
</script>

<style lang="scss">
	.tabbar {
		::v-deep {
			.u-tabbar-item__icon {
				width: auto!important;
			} 
		} 
	}
	.u-tabbar-item__text {
		font-size: 15px!important;
	}
</style>
<style scoped lang="scss">
	.tabbar-w {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100vw;
		z-index: 50; 
		color: #666;
	}
	.tabbar {
		// border-top: 1rpx solid #eee;
	}
	.u-page__item__slot-icon {
	    // width: 30px;
	    height: 30px;
		display: block;
	}
	.u-tabbar-item__text {
		font-size: 15px 
	}
</style>
