<template>
	<view class="w"> 
		<view class="list u-p-10">  
			<view class="list-item u-p-10" v-for="item in dataList" :key="item.id">
				<PidPicTextCard
					:origin="item"
				></PidPicTextCard>
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
	import { onLoad, onReady, onReachBottom, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue'
	import useDataList from '@/composition/useDataList.js'
	import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore()
	const { tmp_id_list } = toRefs(user)
	const base = baseStore();
	const { home, roomList, themeColor } = toRefs(base)
	const {
		setOnlineControl,
		onlineControl
	} = share()
	const $api = inject('$api') 
	const pid = ref('') 
	const apiName = computed(() => { 
		if(pid.value) return 'pid_pic_text_list'
		return 'pic_text_list_all'
	})
	const options = computed(() => {
		return {
			params: { 
				pid: pid.value
			},
			api: apiName.value 
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
		if(options.hasOwnProperty('pid')) {
			pid.value = options.pid
		} 
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
.tabs-w {
	::v-deep {
		.u-tabs .u-tabs__wrapper__scroll-view-wrapper {
			-webkit-overflow-scrolling: touch
		} 
	}
}
</style>