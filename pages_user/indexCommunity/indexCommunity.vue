<template>
	<view class="wrapper ">
		<navBar bgColor="#F2F2F2" title="" >
			<template #navLeft>
				<view class="u-flex u-flex-items-center home-info" @click="base.handleGoto({url: '/pages_user/index/index', type:'reLaunch'})">
					<view class="u-m-r-16 u-p-t-4">
						<u-icon name="arrow-left" color="#000"></u-icon>
					</view> 
					<up-image
						:src="user_info.img"
						width="25px"
						height="25px"
						shape="circle"
					></up-image>
					<view class="u-m-l-15 u-line-1 u-font-28 text-black">
						{{user_info.name}}
					</view>
				</view>
			</template>
		</navBar> 
		 
		<view class="u-p-20">
			<template v-if="menus_community && menus_community.length > 0">
				<view class="user-item-box u-radius-10 u-p-t-30 u-p-b-20 bg-white u-m-b-26" v-for="(ele, i) in menus_community" :key="i">
					<view class="box-header u-flex u-flex-between u-p-b-20 u-p-l-30 u-p-r-30">
						<view class=" u-flex u-flex-items-end u-flex-items-center">
							<view class="u-font-34 u-flex u-flex-items-center">
								<image v-if="ele.icon" class="u-m-r-5" style="width: 15px;height:15px;" :src="ele.icon" mode=""></image>
								<text class="text-black text-bold">{{ele.name}}</text>
							</view>
							<view class="text-light u-font-26 u-p-l-10" v-if="ele.title">{{ele.title}}</view>
						</view>
						<view class=" u-flex u-flex-items-center u-flex-items-center" >
							<template v-if="ele.right_icon">
								<image style="height:22px;" mode="heightFix" :src="ele.right_icon" @click="base.handleGoto(ele.right_url)"></image>
							</template>
							<template v-else-if="ele.right_text">
								<view class="text-base u-font-28" @click="base.handleGoto(ele.right_url)">
									{{ele.right_text}}
								</view> 
							</template> 
						</view>
					</view>
					<view class="box-row other-menus u-flex u-flex-wrap u-flex-items-center u-p-b-20 ">
						<view 
							class="item u-text-center u-m-t-15 u-flex-column u-flex-items-center" 
							v-for="(item, index) in ele.list" 
							:key="index"
							@click="handleMenusClick(item)"
							>
							<!-- <image class="icon-img u-m-b-10" :src="item.icon" mode=""></image> -->
							<view class="u-m-b-10" style="position: relative;">
								<up-badge 
									type="error" 
									max="99" 
									:value="item.num"
									:offset="[-2, -10]"
									absolute
								></up-badge>
								<up-image
									:src="item.icon"
									mode="heightFix"
									height="30px"
									width="100%"
								></up-image>
							</view>
							
							<text class="u-font-28 u-p-b-10 u-line-1 text-black">{{item.name}}</text>
						</view>
					</view>
				</view>
			</template> 
		</view>  
		
		<u-safe-bottom></u-safe-bottom>
		<MenusBar mode='2'></MenusBar>
	</view>
	<UserInfoPopup
		:show="showUserInfo"
		@onUpdateShow="handleChangeShow" 
	></UserInfoPopup>
	<UserPhonePopup
		:show="showUserPhone"
		@getPhone="getPhone"
		@onUpdateShow="handleChangeShow2" 
	></UserPhonePopup> 
</template>


<script setup>
	// import {
	// 	onLoad,
	// 	onShow, 
	// 	onReachBottom,
	// } from "@dcloudio/uni-app";
	// import {
	// 	ref,
	// 	reactive,
	// 	computed,
	// 	toRefs,
	// 	watch,
	// 	inject,
	// 	onMounted
	// } from 'vue'  
	// import menusBar from '@/components/menusBar/menusBa	r.vue'
	import {
		baseStore,
		menusStore
	} from '@/stores/base';
	import {
		userStore 
	} from '@/stores/user';
	// import {baseNotify} from '@/composition/notify.js'
	// const notify = ref()
	// baseNotify(notify) 
	const base = baseStore()
	const menus = menusStore()
	const { menus_wd, menus_wd1, menus_ad, menus_xr, menus_xr_loading, menus_community } = toRefs(menus)
	const user = userStore()
	const {user_info, balance} = toRefs(user)
	const showUserInfo = ref(false)
	const showUserPhone = ref(false)
	const showQyChange = ref(false)
	const linkData = ref({}) 
	const $api = inject('$api')   
	onLoad(async () => {
		// await user.getMallUserInfo()
		// await user.getCpyInfo() 
		menus.getCommunityMenusData()
		await user.refreshUserData();
		if(user_info.value.gx === 0 || user_info.value.gx === '0') {
			showUserInfo.value = true
		}
		
	})   
	function menusClick2(item) {
		if(item.auth == 1) {
			showUserPhone.value = true
			linkData.value = item
		}
		else {
			handleMenusClick(item)
		}
		
	}
	async function handleXrClick() {
		handleMenusClick(menus_xr.value)
		// if(menus_xr_loading.value) return
		// menus_xr_loading.value = true
		// uni.showLoading();
		// try{
		// 	const res = await $api.get_coupon({params: {hid: 0}})
		// 	if(res.code == 1){
		// 		uni.showToast({
		// 			title: res.msg
		// 		})
		// 	}
		// }catch(e){
		// 	//TODO handle the exception
		// }
		// menus_xr_loading.value = false
		
	}
	function handleMenusClick(item) {
		console.log(item)
		if(!item.url) return
		if(item.type == 1 ){
			uni.reLaunch({
				url: item.url
			})
		}
		else if(item.type == 2 ){
			uni.redirectTo({
				url: item.url
			})
		}
		else{
			uni.navigateTo({
				url: item.url
			})
		}
		
		
	}
	function getPhone(data) {
		menus.getCommunityMenusData()
		showUserPhone.value = false
		handleMenusClick(linkData.value)
		linkData.value = {}
	}
	function handleChangeShow(v) {
		showUserInfo.value = v
	}
	function handleChangeShow2(v) {
		showUserPhone.value = v
	} 
	function handleChangeShow3(v) {
		showQyChange.value = v
	}
	function changeAccountQy() {
		handleChangeShow3(true)
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
		background-color: #F2F2F2;
	}
</style>
<style lang="scss" scoped>
	.num-label {
		flex: 0 0 33.3%;
		box-sizing: border-box;
		.bg {
			background-color: #f9f9f9;
		}
		
	}
	.box-row .custom-icon {
		color: #333;
	}
	.t-label {
		font-size: 22px!important;
	}
	.item-broker {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.icon-w {
		width: 40px;
		height: 40px;
		border-radius: 20px;
		background-color: #e4eef9;
		.custom-icon {
			color: #0d266b;
		}
	}
	.other-menus {
		.item {
			flex: 0 0 25%; 
			.icon-img {
				width: 28px;
				height: 28px;
			}
		}
	}
	.rows-menus {
		.item {
			border-bottom: 1rpx solid #f8f8f8;
			.icon-img {
				width: 22px;
				height: 22px;
			}
		}
	}
	
	.wrapper {
		padding-bottom: 50px;
		// padding-top: 44px;
		min-height: 100vh;
		box-sizing: border-box;
		// background-image: linear-gradient(15deg, #f8f8f8 40%, #d6eafe 75%, #e4f5fe 95%);
	}
	.menus-name {
		color: #666;
	}
	.ts-bg {
		// background-image: linear-gradient(to bottom, #fef9f3, #fef7e3);
	}
	.user-item-box {
		// border-radius: 18rpx;
		// box-shadow: 0 5rpx 10rpx rgba(90,90,90,.1);
		.set-sub {
			background-color: #eaf7ff;
			height: 28px;
			border-radius: 6rpx;
			overflow: hidden;
			.sub-title {
				height: 100%;
				border-radius: 0 4rpx 4rpx 0;
			}
			.sub-main {
				height: 100%;
				color: #5a86eb;
			}
		}
		.set-main {
			.mm-img {
				width: 36px;
				height: 36px;
				display: block;
			}
		}
	}
	.user {
		.user-img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 10px;
			background-color: #00b8ff;
			.custom-icon {
				font-size: 22px;
				color: #fff;
			}
		}
		.user-info {
			.name {
				
			}
			.sub {
				background-color: #7da5e2;
				// background-image: linear-gradient(to right, #a1c3f7, #86b0f8);
				border-radius: 6rpx;
				white-space: nowrap;
			}
			.sub2 {
				
			}
		}
	}
	.user-data {
	}
	.service-btn {
		border: 0;
		padding: 0;
		width: 100%;
		.service-btn-main {
			width: 100%;
			line-height: 20px;
		}
	}
</style>
