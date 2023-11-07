<template>
	<view class="w u-p-10">  
		<view class="u-p-10">
			<view class="bg-white u-p-30 u-radius-8">
				<text class="u-info">您的当前身份为</text>
				<text class="u-m-l-10 text-bold">{{ role2Str }}</text> 
			</view>
		</view>
		<view class="u-p-10" v-if="list.info">
			<view class="bg-white u-p-30 u-radius-8">
				<u-parse :content="list.info"></u-parse>
			</view>
		</view>
		<view class="u-m-10 card" 
			v-for="item in tabs_list_filter" 
			:key="item.value"
			@click="roleClick(item)"
			:class="{
				disabled: item.disabled
			}"
		>
			<UserRoleCard
				:origin="item.cardData" 
			></UserRoleCard>
		</view> 
		
	</view> 
	<MenusBar></MenusBar>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue' 
	// import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	import useFilter from '@/composition/useFilter.js'
	const user = userStore() 
	const {user_info} = toRefs(user)
	const base = baseStore();
	const { home, roomList, themeColor } = toRefs(base)
	// const {
	// 	setOnlineControl,
	// 	onlineControl
	// } = share()
	const $api = inject('$api')
	const tabs_list = ref([
		{
			name: '达人',
			disabled: false,
			value: '1',
			cardData: {
				bgColor: '#007aff',
				title: '成为达人',
				sub: '',
			}
			
		},
		{
			name: '团长',
			disabled: false,
			value: '2',
			cardData: {
				bgColor: '#e1093c',
				title: '成为团长',
				sub: '',
			}
		},
	])      
	
	const role = computed(() => { 
		return {
			role: user_info.value.role
		}
	})
	const id = ref('3')
	const list = ref({})
	const { 
		role2Str
	} = useFilter(role)
	const tabs_list_filter = computed(() => {
		return tabs_list.value.filter(ele => +ele.value > +user_info.value.role)
	})
	  
	onLoad(async (options) => { 
		if(options.hasOwnProperty('id')) {
			id.value = options.id
		}
		uni.showLoading()
		await getData()
	})  
	
	async function getData() {
		const res = await $api.web_danye({
			params: {
				id: id.value
			}
		})
		if(res.code == 1 ) { 
			list.value = res.list
			tabs_list.value[0].cardData.title = res.button[0].name
			tabs_list.value[0].cardData.sub = res.button[0].info
			tabs_list.value[1].cardData.title = res.button[1].name
			tabs_list.value[1].cardData.sub = res.button[1].info
			uni.setNavigationBarTitle({
				title: res.list.title
			})
		}
	} 
	async function roleClick(data) {
		if(data.disabled) {
			uni.showToast({
				title: `当前身份已为${data.name}`,
				icon: 'none'
			})
			return
		}
		uni.showModal({
			title: '提示',
			content: `是否成为${data.name}`,
			success: async function (res) {
				if (res.confirm) {
					uni.showLoading()
					const res = await $api.change_role({
						params: {
							role: data.value
						}
					})
					if(res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						}) 
						await user.refreshUserData()
					}
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
		
	}
</script>

<style scoped lang="scss">
.w {
	min-height: 100vh; 
	padding-bottom: 60px;
	box-sizing: border-box;
} 
.card {
	position: relative;
	z-index: 20;
	&.disabled::after {
		display: block;
	}
	&::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(243, 243, 243, 0.5);
		display: none;
		z-index: 20;
	}
}
</style>