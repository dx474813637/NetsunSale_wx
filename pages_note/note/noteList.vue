<template>
	<view class="w" > 
		<view class="list u-p-l-10 u-p-r-10"> 
			<view
				v-for="(item, index) in dataList"
				:key="item.id"
			>
				<view class="groupMsg ">
					<groupMsgCard
						:origin="item"   
					></groupMsgCard>
				</view>
				
			</view>
			 
			<template v-if="dataList.length == 0">
				<u-empty
					mode="data"
					:icon="empty"
				>
				</u-empty>
			</template>
			<template v-else>
				<u-loadmore
					:status="loadstatus"
				/>
			</template> 
		</view> 
	</view>
	<u-toast ref="uToast"></u-toast>
	<u-safe-bottom></u-safe-bottom>
	<TabBar :customStyle="customStyle">
		<view class="pan-tabbar u-flex u-flex-items-center u-flex-around " style="height: 100%;"> 
			<view class="item-btn  u-flex u-flex-items-center u-flex-center u-flex-1 u-p-10 u-p-l-20 u-p-r-20">
				<u-button type="error" shape="circle" @click="base.handleGoto({url: '/pages_note/note/noteEdit', params: {id: id}})">我要发布</u-button>
	
			</view>
		</view>
	
	</TabBar> 
	<MenusBar></MenusBar>
</template>

<script setup>
	import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue'
	import { share } from '@/composition/share.js'
	import useDataList from '@/composition/useDataList.js'
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const base = baseStore() 
	const {themeColor, empty} = toRefs(base)
	const { setOnlineControl } = share()
	const $api = inject('$api')
	const id = ref('') 
	const uToast = ref('')
	const options = computed(() => {
		return {
			params: {
				id: id.value, 
			},
			api: 'product_longs',
			getDataCallBack: (res) => {
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list] 
					setOnlineControl(res)
					if(dataList.value.length >= res.total) {
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
		if (options.hasOwnProperty('id')) {
			id.value = options.id
		}    
		await initDataList() 
	})
	
	const customStyle = ref({
		paddingBottom: '50px', 
	}) 
	function showToast(params) {
		uToast.value.show({
			position: 'bottom',
			...params,
		})
	} 
</script>

<style lang="scss"> 
</style>
<style lang="scss" scoped>
	.w {
		padding-bottom: 50px; 
	} 
</style>
