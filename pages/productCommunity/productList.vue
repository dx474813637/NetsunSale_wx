<template>
	<view class="w " >
		<view class="navbar-w bg-white">
			<navBar
				bgColor="transparent" 
				title=""   
				activeColor="#00"
				titleStyle="color: #00"
			>
				<template #navLeft>
					<up-image
						height="40px"
						width="auto"
						mode="heightFix"
						:src="originData.logo"
					></up-image> 
				</template>
			</navBar>
		</view>
		<view class="header u-p-10 box-border bg-white"> 
			<view class="u-p-l-10 u-p-r-10 u-flex u-flex-items-center">
				<view class="bg-white u-p-5 u-radius-30 u-flex-1" style="border: 1rpx solid #f00;">
					<!-- <u-search
						placeholder="请输入关键字" 
						v-model="terms" 
						:showAction="false"
						shape="square"
						@search="handleSearch"
					></u-search> -->
					<view class="search-w u-flex u-flex-items-center">
						<u-search
							placeholder="请输入商品关键词" 
							v-model="terms"
							bgColor="#fff" 
							:showAction="false" 
							@search="handleSearch"
						></u-search>
						<view class="u-m-l-20">
							<u-button 
								type="error"   
								color="#f03337"
								customStyle="height: 34px "
								shape="circle"
								@click="handleSearch"
							>搜索</u-button>
						</view>
					</view>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="shopping-cart" size="35" color="#000" @click="base.handleGoto('/pages_user/cart/cart')"></u-icon>
				</view>
			</view> 
			<view class="u-flex u-flex-items-center u-p-10 " v-if="catelist.length > 0"> 
				<view class="u-flex-1 text-white tabs-w" style="overflow: hidden;">
					<u-tabs
						:current="tabs_current"
						:list="catelist"  
						lineWidth="0"  
						@click="handleTabsClick"
						:itemStyle="{height: '35px', color: '#666', fontSize: '16px' }"
						:activeStyle="{ color: '#000', fontWeight: 'bold', fontSize: '18px' }"
						:inactiveStyle="{ color: '#666', fontSize: '16px' }"
					></u-tabs>	
				</view> 
			</view> 
		</view>
		 
		<view class="list u-flex u-flex-wrap u-flex-items-start u-p-10" > 
			 <view 
				class="list-item u-p-14" 
				v-for="item in dataList" 
				:key="item.id"
				>
			 	<ProductColCard
					:origin="item"
					:cardClickDefault="false"
					@cardClick="cardClick"
					:customStyle="{boxShadow: 'none!important', border: '1rpx solid #f9f9f9'}"
				></ProductColCard>
			 		 
			 </view>	 
		</view>
		<template v-if="dataList.length == 0">
			<view class="u-flex u-flex-center u-p-40">
				<u-empty mode="data" :icon="base.empty" />
			</view>
			
		</template>
		<template v-else>
			<u-loadmore :status="loadstatus" />
		</template>  
		<u-safe-bottom></u-safe-bottom>
	</view>
	
	<!-- <CateProductPopup
		:show="showCateList" 
		title="商品分类" 
		:onUpdateShow="handleChangeShow"
		@onConfirm="handleChangeCate"
	></CateProductPopup> -->
	<MenusBar></MenusBar>
</template>

<script setup> 
	// import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	// import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	import { share } from '@/composition/share.js'
	const { setOnlineControl, customShareParams } = share()
	const $api = inject('$api')
	
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore()
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	const terms = ref('')
	const nav_index = ref(0)
	
	const showCateList = ref(false)
	const showPfOrder = ref(false)
	const curP = ref(1)
	const cateId = ref('')
	const order = ref('')
	const pf = ref(0)
	const prodId = ref('')
	const tabs_current = ref(-1)
	const cate_label = ref('全部')
	const dataList = ref([]) 
	const cate_init = ref(false)
	const notice_list = ref([])
	const originData = ref({})
	const notice_obj = ref({})
	const catelist = ref([])
	const loadstatus = ref('loadmore')
	const params = computed(() => {
		return {
			p: curP.value,
			cate: cateId.value ,
			terms: terms.value,
			order: order.value , 
		} 
	}) 
	// const func = computed(() => {
	// 	return terms.value ? 'web_product1' : 'web_product1'
	// })
	onLoad(async (options) => {
		if(options.hasOwnProperty('terms')) {
			terms.value = options.terms
		}
		if(options.hasOwnProperty('order')) {
			order.value = options.order
		}
		if(options.hasOwnProperty('cate')) {
			cateId.value = options.cate
			cate_init.value = true
		}
		if(options.hasOwnProperty('pf')) {
			pf.value = +options.pf
		}
		// if(cate_list.value.length == 0 && pf.value != 1) {
		// 	await cate.getCateData() 
		// }
		// if(options.hasOwnProperty('cate') && pf.value != 1) {
		// 	cateId.value = options.cate
		// 	initCateLabel()
		// }
		await initData() 
	}) 
	onReachBottom( () => { 
		getMoreData()
	}) 
	async function getMoreData() {
		if(loadstatus.value != 'loadmore') return
		curP.value ++
		await getData()
	}
	async function getData() {
		if(loadstatus.value == 'loading') return
		loadstatus.value = 'loading'
		const res = await $api.web_product1({params: params.value})
		if (res.code == 1) { 
			dataList.value = [...dataList.value, ...res.list] 
			if(catelist.value.length == 0) {
				catelist.value = res.catelist
				if(cate_init.value) {
					tabs_current.value = catelist.value.findIndex(ele => ele.id == cateId.value)
					cate_init.value = false
				}
			} 
			originData.value = res
			notice_list.value = res.notice || []
			notice_obj.value = res.noticebar || false
			setOnlineControl(res)
			if(dataList.value.length >= +res.total) {
				loadstatus.value = 'nomore'
			}
			else {
				loadstatus.value = 'loadmore'
			} 
		}
	}
	function initDataParams() {
		curP.value = 1;
		dataList.value = []
	}
	async function initData() {
		uni.showLoading()
		initDataParams();
		await getData()
	}  
	async function handleSearch() {
		await initData()
	}
	function handleChangeShow(data) {
		showCateList.value = data
	} 
	function cardClick({data}) {
		base.handleGoto({
			url: '/pages/productCommunity/productDetailQuick',
			params: {
				id: data.id, 
			}
		})
	} 
	
	async function handleTabsClick(e) { 
		cateId.value = e.id
		await initData()
	} 
	
</script>

<style > 
</style>
<style lang="scss" scoped>
	.w {
		height: 100%;
		padding-bottom: 50px; 
		background: #F5F5F6;
		.list {
			box-sizing: border-box;
			>.list-item {
				flex: 0 0 50%;
				box-sizing: border-box;
				&.list-item-row {
					flex: 0 0 100%;
				}
			}
		}
	}
</style>
