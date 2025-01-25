<template>
	<view>
		<PopupNormal v-bind="$attrs" @open="open"> 
			<template #header>
				<view class="u-flex u-flex-between u-flex-items-center u-m-b-20 u-p-l-8 u-p-r-8">
					<view class="item u-primary" @click="refreshBtn">刷新</view>
					<view class="u-text-center">
						{{$attrs.title}}
					</view> 
					<view class="item u-info" @click="$attrs.onUpdateShow(false)">取消</view> 
				</view>
				<view class="u-flex u-flex-items-center">
					<view class="u-flex-1 u-flex">
						<u-search
							placeholder="请输入商品关键词" 
							v-model="terms"
							bgColor="#f8f8f8" 
							:showAction="false"
							shape="square"
							@search="handleSearch"
							></u-search>
							<view class="u-m-l-20">
								<u-button 
									type="error"
									shape="circle"
									customStyle="height: 34px; border-radius: 6px"
									@click="handleSearch"
								>搜索</u-button>
							</view>
					</view> 
					<view class="u-m-l-30 u-p-l-30 u-border-left" v-if="ygConfig.zt == 1">
						<u-button 
							type="warning"
							shape="circle" 
							customStyle="height: 34px; border-radius: 6px"
							@click="handleYgEvent"
						>{{ygConfig.title}}</u-button>
					</view> 
					
				</view>
			</template>
			<view class="tabs-w u-p-t-10 u-p-b-30 box-border bg-white" v-if="!searchMode">   
				<u-tabs
					:list="tabs_list"
					lineWidth="0"
					:current="tabs_current"
					lineColor="#f56c6c"
					:activeStyle="{
						color: themeColor,
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}"
					:inactiveStyle="{
						color: '#606266',
						transform: 'scale(1)'
					}" 
					itemStyle="height: auto"
					@change="handleTabsChange"
				></u-tabs>
			</view> 
			<view class="list-content u-flex u-border-bottom  u-border-top">
				<scroll-view
					scroll-y
					class="item item-nav-w"
					v-if="!searchMode"
				>
					<view class="nav"> 
						<view 
							class="nav-item u-text-center"
							v-for="(item, index) in cate_main"
							:key="item.id"
							:class="{
								active: nav_index == index
							}"
							@click="navClick(index)"
							>
								<view class="u-line-2 label">
									{{ item.name }}
								</view> 
							</view>
					</view>
				</scroll-view>
				<view class="list-w item u-flex-1">
					<view class="load-bg u-flex u-flex-items-center u-flex-center" v-if="listLoading">
						<u-loading-icon color="#f00"></u-loading-icon>
					</view>
					<scroll-view 
						class="main-list" 
						scroll-y 
						@scrolltolower="scrolltolower"
						refresherEnabled
						:refresherTriggered="listLoading"
						@refresherrefresh="refreshBtn"
						>
						<view class="filter-box u-flex u-flex-items-center u-flex-between u-p-10 u-font-28">
							<view class="item"></view>
							<view class="item u-flex u-flex-items-center">
								<view class="filter-items u-flex u-flex-items-center text-black text-thin"
									:class="{
										'active': filter_index == index
									}"
									v-for="(item, index) in filterList"
									:key="index"
									@click="filterClick(item, index)"
								> 
									<view 
										class="filter-name" 
										:class="{ 
											'filter-up-down': item.type == 2, 
											'up': item.type == 2 && item.order.findIndex(ele => ele == order) == 0,
											'down': item.type == 2 && item.order.findIndex(ele => ele == order) == 1,
										}"
										>{{item.name}}</view> 
								</view>
							</view>
						</view>
						<view class="list u-p-20"> 
							 <view 
								class="list-item u-m-b-10" 
								v-for="item in dataList" 
								:key="item.id"
								>
								<ProductRowCard
									:origin="item" 
									size="small"
									:mode="singleMode? 'normal': 'switch'"
									:cardClickDefault="!singleMode"
									:divideShow="divideShow"
									:customStyle="{boxShadow: 'none!important', 'font-weight': '300' }"
									@checkedClick="checkedClick"
									@cardClick="cardClick"
								></ProductRowCard>
									 
							 </view>	
							
									
						</view>
						<template v-if="dataList.length == 0">
							<view class="u-flex u-flex-center u-p-40">
								<u-empty mode="data" :icon="base.empty" />
							</view>
							
						</template>
						<template v-else>
							<view class="u-p-b-20">
								<u-loadmore :status="loadstatus" />
							</view> 
						</template>  
					</scroll-view> 
				</view>  
			</view>
			
		</PopupNormal>
	</view>
</template>

<script setup> 
	const attrs = useAttrs()
	const $api = inject('$api')
	import {useCateStore, baseStore} from '@/stores/base.js'
	import useDataList from '@/composition/useDataList.js'
	const base = baseStore();
	const { themeColor } = toRefs(base)
	import { userStore } from '@/stores/user'
	const user = userStore();
	const { user_info } = toRefs(user)
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	const props = defineProps({
		xuan: {
			type: Number,
			default: 0
		},
		asyncEvent: {
			type: Boolean,
			default: true
		},
		divideShow: {
			type: Boolean,
			default: false
		},
		xuanList: {
			type: Array,
			default: () => {
				return []
			}
		},
		singleMode: {
			type: Boolean,
			default: false
		},
		func: {
			type: String,
			default: ''
		},
		ygConfig: {
			type: Object,
			default: () => ({})
		},
	})
	const emits = defineEmits(['xuanSuccess', 'xuanEvent', 'ygEvent', 'cardClick'])
	const order = ref(3)
	const filter_index = ref(-1)
	const filterList = ref([ 
		{
			name: '最新',
			type: 1,
			order: 0, 
		},
		{
			name: '佣金比',
			type: 1,
			order: 2
		}, 
	])  
	// const curP = ref(1)
	// const originList = ref([])
	const dataList = ref([])
	const terms = ref('')
	const tabs_current = ref(0)
	const nav_index = ref(0)
	// const loadstatus = ref('loadmore')
	const listLoading = ref(false)
	// const params = computed(() => {
	// 	return {
	// 		cate: cate_active_id.value,
	// 		p: curP.value, 
	// 		order: order.value,
	// 		terms: terms.value
	// 	}
	// })
	const searchMode = computed(() => {
		return terms.value ? true : false
	})
	const tabs_list = computed(() => {
		return cate_list.value
	}) 
	const cate_active_id = computed(() => {
		if(cate_list.value.length == 0) return ''
		return cate_list.value[tabs_current.value].children[nav_index.value].id
	})
	const cate_main = computed(() => {
		if(cate_list.value.length == 0) return []
		return cate_list.value[tabs_current.value].children 
	})
	const list = ref([])
	watch(
		() => props.xuanList,
		(n) => {
			// console.log(n)
			if(props.xuan == 1) {
				list.value = uni.$u.deepClone(n)
				initDataCheckState(originList.value, list.value) 
			}
		},
		{
			deep: true, 
		}
	)
	watch(
		() => dataList.value,
		(n) => {
			// console.log(n)
		}
	)
	const func = computed(() => {
		if(props.func) {
			return props.func
		}
		return terms.value ? 'web_search' : 'web_product'
	})
	const options = computed(() => {
		return {
			params: {
				cate: cate_active_id.value,
				order: order.value,
				login: '',
				terms: terms.value
			},
			noReach: true,
			api: terms.value ? 'web_search' : 'web_product',
			getDataCallBack: (res) => {
				if (res.code == 1) {
					// dataList.value = [...dataList.value, ...res.list] 
					originList.value = [...originList.value, ...res.list]
					initDataCheckState(originList.value, list.value)  
					if(originList.value.length >= +res.total || terms.value) {
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
		dataList: originList,
		curP,
		loadstatus,
		params,
		getDataList,
		initDataList, 
		getMoreDataList
	} = useDataList(options)
	onMounted(async () => { 
		listLoading.value = true
		if(cate_list.value?.length == 0) {
			await cate.getCateData()
		}
		await initDataList() 
		listLoading.value = false
	})   
	function initDataCheckState(origin, xuan) { 
		let data = uni.$u.deepMerge(origin, dataList.value) 
		let xuanKeys = xuan.map(ele => ele.id)
		dataList.value = data.map((ele, index) => { 
			let obj = {
				...ele, 
				checked: xuanKeys.includes(ele.id)? true: false,
				loading: false
			}  
			if(!obj.hasOwnProperty('loading')) {
				obj.loading = false
			} 
			return obj
		}) 
	}
	async function scrolltolower() { 
		console.log('xxx')
		// await getMoreData()
		await getMoreDataList()
	}
	// async function getMoreData() {
	// 	if(loadstatus.value != 'loadmore') return
	// 	curP.value ++
	// 	await getData()
	// }
	// async function getData() {
	// 	if(loadstatus.value == 'loading') return
	// 	loadstatus.value = 'loading'
	// 	const res = await $api[func.value]({params: params.value})
	// 	if (res.code == 1) { 
	// 		originList.value = [...originList.value, ...res.list] 
	// 		initDataCheckState(originList.value, list.value)
	// 		// console.log(dataList.value)
	// 		if(originList.value.length >= +res.total || terms.value) {
	// 			loadstatus.value = 'nomore'
	// 		}
	// 		else {
	// 			loadstatus.value = 'loadmore'
	// 		}
	// 	}
	// }
	function initDataParams() {
		curP.value = 1;
		originList.value = []
		dataList.value = []
	}
	// async function initData() {
	// 	listLoading.value = true
	// 	initDataParams();
	// 	await getData()
	// 	listLoading.value = false
	// } 
	
	function handleTabsChange(e) { 
		tabs_current.value = e.index
		nav_index.value = 0 
		refreshBtn()
	}
	function initFilterData() {
		filter_index.value = -1
		order.value = 3 
	}
	function navClick(index) {
		nav_index.value = +index 
		refreshBtn()
	}
	async function handleSearch() { 
		refreshBtn()
	}
	function handleYgEvent() {
		uni.showModal({
			title: '提示',
			content: props.ygConfig.desc,
			success:async (r) => {
				if (r.confirm) {
					emits('ygEvent')
				} else if (r.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
	async function refreshBtn() {
		listLoading.value = true
		initDataParams()
		initFilterData()
		await initDataList()
		listLoading.value = false
	}
	function cardClick({data}) {
		if(!props.singleMode) return
		emits('cardClick', {data: data})
	}
	async function checkedClick(data) { 
		let i = dataList.value.findIndex(ele => data.origin.id == ele.id) 
		// console.log(i, data, dataList.value)
		if(i == -1 || dataList.value[i].loading) return
		let item = dataList.value[i]
		item.checked = data.check 
		item.loading = true
		emits('xuanEvent', {data: item, index: i, checked: data.check})
		// let res 
		// if(props.asyncEvent) {
		// 	item.loading = true;
		// 	res = await updateShopProduct(item, data.check)
		// 	item.loading = false;
		// 	console.log(res) 
		// }
		// if(res || !props.asyncEvent) {
		// 	item.checked = data.check
		// 	emits('xuanSuccess', item)
		// }
	}
	
	function updateShopProduct(product, check) {
		return new Promise(async (res, rej) => {
			const result = await $api.shop_product({
				params: {
					id: product.id,
					cate: check? 1: 2
				}
			})
			if(result.code == 1) {
				res(true)
			}
			rej(false)
		})
	}
	function filterClick(data, index) {
		
		if(data.type == 2) { 
			let i = data.order.findIndex(ele => ele == order.value)
			console.log(i)
			if(filter_index.value == index) {
				if(i == (data.order.length - 1)) {
					initFilterData()
				}
				else {
					order.value = data.order[i+1] 
				}
			}
			else {
				filter_index.value = index
				order.value = data.order[0]
			} 
		}
		else if(data.type == 1) {
			if(filter_index.value == index) {
				initFilterData()
			}
			else {
				filter_index.value = index
				order.value = data.order
			} 
		} 
		initDataParams() 
		initDataList() 
	}
</script>

<style lang="scss" scoped> 
	.filter-box {
		.filter-items {
			margin-right: 20px;
			position: relative;
			&:last-child {
				margin-right: 0;
			}
			&.active {
				.filter-name {
					color: $u-error!important;
				}
			}
			.filter-name {
				position: relative;
				
				&:before,
				&:after {
					content: '';
					position: absolute; 
					display: none;
					right: 5px;
					width: 0;
					height: 0;
					top: 50%;
					border-left: 5px solid transparent;
					border-right: 5px solid transparent; 
				}
				&:before {
					transform: translateY(-7px);
					border-top: 0;
					border-bottom: 5px solid #999;
					&.up {
						border-bottom: 5px solid $u-error;
					}
				}
				&:after {
					transform: translateY(1px); 
					border-bottom: 0;
					border-top: 5px solid #999;
					&.down {
						border-top: 5px solid $u-error;
					} 
				}
				&.filter-up-down {
					padding-right: 20px; 
					&:before,
					&:after {
						display: block;
					}
					&.up {
						&:before {
							border-bottom: 5px solid $u-error;
						}
						
					}
					&.down {
						&:after {
							border-top: 5px solid $u-error;
						}
						
					} 
				} 
			}
		}
	}
	.list-w { 
		background-color: #fff;
		position: relative;
		.load-bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 20;
			background-color: rgba(255,255,255,.9);
		} 
	} 
	.main-list {
		height: 100%;
		box-sizing: border-box;
		position: relative;
		z-index: 19;
	}
	.nav {
		.nav-item {
			font-size: 14px;
			// border-bottom: 1rpx solid #f8f8f8;
			box-sizing: border-box;
			color: #333;
			background-color: #F5F6FA;
			position: relative;
			z-index: 10;
			.label { 
				position: relative;
				z-index: 10;
				background-color: #F5F6FA;
				padding: 20px 10px;
			}
			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: #fff;
				z-index: 5;
			}
			&.active {
				
				.label { 
					background-color: #fff;
					color: #FA392D; 
				}
				&+.nav-item { 
					.label {
						border-radius: 0 10px 0 0 ;
					}
					
				}
			}
			&:has(+.active) {
				.label {
					border-radius: 0 0 10px 0 ;
				} 
			}
		}
	}
	.list-content {
		>.item {
			height: 60vh;
		}
		.item-nav-w {
			flex: 0 0 80px;
			background-color: #f8f8f8; 
		}
	}
	.list {
		box-sizing: border-box;
		>.list-item { 
			box-sizing: border-box;
		}
	}
	.item-card { 
		background-color: #e8e8e8;
		box-sizing: border-box;  
		margin-bottom: 10px; 
		padding: 10px;
		color: #666;
		border-radius: 5px;
		border: 1rpx solid #e8e8e8;
		&.active {
			background-color: $u-primary-light;
			color: $u-primary;
			border-color: $u-primary;
		}
	}
</style>