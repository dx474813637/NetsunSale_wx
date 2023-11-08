<template>
	<view class="w"> 
		<view class="u-p-30">
			<view class="tuan-card u-radius-12 bg-white u-p-20">
				<view class="tuan-header u-flex u-flex-between u-flex-items-center u-m-b-25">
					<view class="item text-black">{{tuan.title}}</view>
					<view class="item u-info u-font-28">{{tuan.ctime}}</view>
				</view>
				<view class="tuan-main">
					<u-parse :content="tuan.info"></u-parse>
				</view>
			</view> 
		</view>
		
		<view class="list u-p-10">  
			<view class="list-item u-p-10" v-for="item in dataList" :key="item.id">
				<DarenCard
					:origin="item"
				></DarenCard>
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
	// const {
	// 	setOnlineControl,
	// 	onlineControl
	// } = share()
	const $api = inject('$api')   
	const tuan = ref({})
	const options = computed(() => {
		return {
			params: {
				// role: role.value,
				// type: tabs_list.value[tabs_current.value].value
			},
			api: 'daren_list',
			getDataCallBack: (res) => {
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list]
					tuan.value = res.tuan
					if(curP.value >= res.total) {
						loadstatus.value = 'nomore'
					}
					else {
						loadstatus.value = 'loadmore'
					}
				}
			}
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
		initDataList() 
	})  
	
	
	
	
	
	
</script>

<style scoped lang="scss">
.w {
	min-height: 100vh;
	padding-bottom: 60px;
} 
.card {
	
}
</style>