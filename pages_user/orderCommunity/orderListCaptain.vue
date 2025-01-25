<template>
	<view class="w">
		<u-sticky bgColor="#f8f8f8">
			<view class="">
				<view class="search-w u-p-l-20 u-p-r-20">
					<u-search
						placeholder="请输入手机号/尾号" 
						v-model="tel" 
						:showAction="false"
						shape="square"
						@search="handleSearch"
					></u-search>
				</view>
				<view class="tabs-w">
					<u-tabs
						:list="tabs_list"  
						lineWidth="0"
						:current="tabs_current" 
						:activeStyle="{
							color: themeColor
						}"
						@change="handleTabsChange"
					></u-tabs>	
				</view> 
			</view>
			
		</u-sticky>
		
		
		
		<view class="list u-p-10">  
			<view class="list-item u-p-10" v-for="item in dataList" :key="item.id">
				<OrderCommunityCard
					:gotoDetail="false"
					@cardClick="cardClick"
					:origin="item"
				></OrderCommunityCard>
			</view>
			<template v-if="dataList.length == 0">
				<u-empty mode="data" :icon="base.empty" />
			</template>
			<template v-else>
				<u-loadmore :status="loadstatus" />
			</template>  
				
				
			<u-safe-bottom></u-safe-bottom>
		</view>	 
	</view>
	<MenusBar></MenusBar>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue'
	import useDataList from '@/composition/useDataList.js'
	// import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore()
	const { tmp_id_list } = toRefs(user)
	const base = baseStore();
	const { home, roomList, themeColor } = toRefs(base)
	// const {
	// 	setOnlineControl,
	// 	onlineControl
	// } = share()
	const $api = inject('$api')   
	const role = ref('1') 
	const tel = ref('')
	const tabs_current = ref(0)
	const tabs_list = ref([
		{
			name: '全部',
			disabled: false,
			value: '0'
		},
		{
			name: '待付款',
			disabled: false,
			value: '1'
		},
		{
			name: '待收货',
			disabled: false,
			value: '2'
		},
		{
			name: '已完成',
			disabled: false,
			value: '3'
		}
	]) 
	
	const options = computed(() => {
		return {
			params: {
				role: role.value,
				type: tabs_list.value[tabs_current.value].value,
				tel: tel.value
			},
			api: 'order_list2'
		}
	})
	
	const { 
		dataList,
		curP,
		loadstatus,
		params,
		getDataList,
		initDataList, 
	} = useDataList(options)
	
	onLoad(async (options) => {
		if(options.hasOwnProperty('role')) {
			role.value = options.role
		}
		await initOrderTabsData()
		if(options.hasOwnProperty('zt')) {
			tabs_current.value = +tabs_list.value.findIndex(ele => ele.value == options.zt) 
		}
		initDataList() 
	}) 
	async function handleSearch() {
		await initDataList()
	}
	function handleTabsChange(data) {
		tabs_current.value = +data.index
		initDataList()
	} 
	async function initOrderTabsData() {
		const res = await $api.order_type({params: {type: 1}})
		if(res.code == 1 ) { 
			tabs_list.value = res.list.map(ele => {
				return {
					...ele,
					disabled: false,
					value: ele.type,
					name: ele.name
				}
			})
		}
	}
	function cardClick({data}) {
			base.handleGoto({
				url: '/pages_user/orderCommunity/orderDetailCaptain',
				params: {
					id: data.oid
				}
			})
			return
	}
</script>

<style scoped lang="scss">
.w {
	min-height: 100vh;
	padding-bottom: 60px;
} 
.card {
	
}
.tabs-w {
	::v-deep {
		.u-tabs .u-tabs__wrapper__scroll-view-wrapper {
			-webkit-overflow-scrolling: touch
		} 
	}
}
</style>