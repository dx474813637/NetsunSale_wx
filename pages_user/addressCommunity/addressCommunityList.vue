<template>
	<view class="w">
		<view class="list u-p-10">
			<up-swipe-action>
				<view class="item u-p-10 " v-for="item in indexList" :key="item.id">
					<up-swipe-action-item
						:options="options1" 
						:name="item.id" 
						@click="handleDel"
						>  
							<AddressCommunityCard
								:origin="item"
							></AddressCommunityCard>  
					</up-swipe-action-item>
					<view class="u-radius-5 u-p-12 u-p-l-20 u-font-28" :class="{
						'u-success-light-bg': item.zt == '1',
						'u-success-dark': item.zt == '1',
						'u-error-light-bg': item.zt == '3',
						'u-error-dark': item.zt == '3',
						'u-warning-light-bg': item.zt == '0',
						'u-warning-dark': item.zt == '0'
					}">
						<template v-if="item.zt == '0'">待审核</template>
						<template v-else-if="item.zt == '1'">审核通过</template>
						<template v-else-if="item.zt == '2'">删除</template>
						<template v-else-if="item.zt == '3'">审核拒绝</template> 
					</view>
				</view>
				
			</up-swipe-action>
			
		</view>
		<template v-if="indexList.length == 0">
			<view class="u-flex u-flex-center u-p-40">
				<u-empty mode="data" :icon="base.empty" />
			</view>
			
		</template>
		<template v-else>
			<u-loadmore :status="loadstatus" />
		</template>  
		<u-safe-bottom></u-safe-bottom>
	</view>
	<TabBar >
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28" style="height: 100%;">
			 
			<view class="item u-flex-1">
				<u-button type="error" shape="circle" @click="addAddrBtn"  >
					<view class="u-flex"> 
						<text class="u-m-l-8 u-p-b-5 u-font-32">新增地址</text>
					</view>
				</u-button>
			</view>
		</view>
	</TabBar> 
</template>

<script setup>
	import { onLoad, onUnload, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'  
	const $api = inject('$api') 
	import { baseStore } from '@/stores/base.js'
	const base = baseStore() 
	const { themeColor, regional_list, regional_list_loading } = toRefs(base) 
	
	const curP = ref(1)
	const indexList = ref([])
	const loading = ref(false)
	const loadstatus = ref('loadmore')
	const params = computed(() => {
		return {
			p: curP.value,
		}
	})
	const options1 = reactive([{  
	    text: '删除',
		style: {  
			backgroundColor: themeColor.value,  
			color: '#fff',  
		} 
	}]);  
	onLoad(async () => {
		if(regional_list.value.length == 0 && !regional_list_loading.value ) {
			base.get_regional_list()
		}
		refreshList() 
		uni.$on('address_update',function({data, type}){ 
			console.log(type)
			uni.$emit('create_order_address_update', data )
			if(type == 'edit') {
				let i = indexList.value.findIndex(ele => ele.id == data.id) 
				if(i != -1) {
					if(data.default == '1') {
						indexList.value.forEach(ele => {
							ele.default = 0
						})
					}
				    indexList.value[i] = {
						...data,
						id: data.id
				    }
				}
			} 
			else if(type == 'add') {
				refreshList()
			}
			
		})
	})
	onUnload(() => {
		uni.$off('address_update')
	})
	onReachBottom(async() => {
		getNextPageData()
	})
	async function refreshList() {
		uni.showLoading()
		initParams()
		await getData()
	}
	async function getNextPageData() {
		if(loadstatus.value != 'loadmore') return;
		curP.value ++
		await getData()
	}
	
	function initParams() {
		indexList.value = []
		loadstatus.value = 'loadmore'
		curP.value = 1
	}
	async function getData() {
		if(loadstatus.value != 'loadmore') return;
		loadstatus.value = 'loading'
		const res = await $api.community_address({params: params.value});
		if(res.code == 1) {
			indexList.value = [...indexList.value, ...res.list];
			if(indexList.value.length >= res.total) {
				loadstatus.value = 'nomore'
			}
			else {
				loadstatus.value = 'loadmore'
			}
		}
	}
	function addAddrBtn() {
		base.handleGoto('/pages_user/addressCommunity/addressCommunityDetail')
	}
	async function handleDel(e) {
		console.log(e)
		uni.showLoading()
		const res = await $api.community_address_del({params: {
			id: e.name
		}})
		if(res.code == 1) { 
			uni.showToast({
				title: res.msg
			}) 
			refreshList()
		}
	}
</script>

<style lang="scss" scoped>
	.w {
		padding-bottom: 60px;
	}
	.list {
		::v-deep {
			.u-swipe-action-item {
				border-radius: 8px;
			}
		}
		.item {
			
		}
	}
</style>
