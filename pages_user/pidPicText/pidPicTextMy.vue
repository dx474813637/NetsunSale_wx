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
	<view class="fix-btn">
		<view
		 @click="base.handleGoto('/pages_user/pidPicText/pidPicTextAdd')"
		 class="bg-primary btn box-border u-flex u-flex-center u-flex-items-center uni-shadow-base">
			<u-icon name="plus" color="#fff" size="20"></u-icon>
		</view>
	</view>
	<MenusBar></MenusBar>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue'
	import useDataList from '@/composition/useDataList.js' 
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore()
	const { tmp_id_list } = toRefs(user)
	const base = baseStore();
	const { home, roomList, themeColor } = toRefs(base) 
	const $api = inject('$api')  
	const options = computed(() => {
		return { 
			api: 'pic_text_list'
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
	async function initOrderTabsData() {
		const res = await $api.order_type()
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
.fix-btn {
	position: fixed;
	bottom: 120px;
	right: 20px;
	.btn {
		width: 50px;
		height: 50px;
		border-radius: 50px;
	}
}
</style>