<template>
	<view class="w ">
		<u-sticky>
			<view class="header bg-white u-p-10 u-p-l-20 u-p-r-20 u-flex u-flex-items-center">
				<view class="item u-p-r-20" v-if="!terms">
					<view class="nav-w u-p-16 u-flex u-radius-6" style="background-color: #F2F2F2;">
						<view class="item item-cate u-flex u-flex-items-center u-font-28"  
						@click="showCateList = true">
							<view class="u-info">分类：</view>
							<view class="u-error u-p-r-10">{{cate_label}}</view>
							<u-icon name="arrow-down-fill" color="#ccc" size="12"></u-icon>
						</view> 
					</view>
				</view>
				<view class="item u-flex-1 " >
					<u-search
						placeholder="请输入关键字" 
						v-model="terms" 
						:showAction="false"
						shape="square"
						@search="handleSearch"
					></u-search>
				</view>
				
			</view>
			<!-- <view class="nav-w bg-white u-p-20 u-flex" v-if="!terms">
				<view class="item item-cate u-flex u-flex-items-center u-font-28" @click="showCateList = true">
					<view class="u-info">筛选类别：</view>
					<view class="u-error u-p-r-10">{{cate_label}}</view>
					<u-icon name="arrow-down-fill" color="#ccc" size="12"></u-icon>
				</view> 
			</view> -->
			<view class="bg-white " v-if="pf == 1" >
				<view class="nav-w u-p-t-14 u-flex u-flex-items-center u-flex-center u-font-28 " 
					style="color: #B86C1B; border-radius: 10px 10px 0 0; background-image: linear-gradient(to bottom, #FFF7EF, #fff);"
					v-if="notice_obj"
					>
					<view class="u-m-r-10">
						<u-icon name="bell-fill" color="#B86C1B"></u-icon>
					</view> 
					<view class="item u-flex u-flex-items-center">
						<view>{{notice_obj.num1_title}}</view>
						<view>{{notice_obj.num1}}</view> 
					</view>
					<view class="u-m-l-20 u-m-r-20">
						<up-line color="#D5A68F" direction="col" length="14px"></up-line>
					</view> 
					<view class="item u-flex u-flex-items-center">
						<view>{{notice_obj.num2_title}}</view>
						<view>{{notice_obj.num2}}</view> 
					</view>
				</view>
				<view class="notice-w bg-white u-p-10 u-p-l-20 u-p-r-20" v-if="notice_list.length != 0">
					<view class="u-radius-4" style="border: 1rpx solid #f1d6b0;overflow: hidden; background-image: linear-gradient(to bottom, #FFF7EF, #fff);">
						<up-notice-bar :text="notice_list" direction="column" bgColor="transparent" color="#934505" ></up-notice-bar>
					</view>
					
				</view>
			</view>
			
			
		</u-sticky>
		
		<view class="list u-flex u-flex-wrap u-flex-items-start u-p-10" v-if="pf == 1"> 
			 <view 
				class="list-item list-item-row u-m-b-20" 
				v-for="item in dataList" 
				:key="item.id"
				>
			 	<ProductPfCard
					:origin="item" 
					@btnClick="btnClick"
					:customStyle="{boxShadow: 'none!important' }"
				></ProductPfCard>
			 		 
			 </view>	 
		</view>
		<view class="list u-flex u-flex-wrap u-flex-items-start u-p-10" v-else> 
			 <view 
				class="list-item u-p-14" 
				v-for="item in dataList" 
				:key="item.id"
				>
			 	<ProductColCard
					:origin="item"
					:cardClickDefault="pic != 1"
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
	<template v-if="pf == 1">
		<CatePfProductPopup
			:show="showCateList" 
			title="商品分类" 
			:onUpdateShow="handleChangeShow"
			@onConfirm="handleChangeCate"
		></CatePfProductPopup>
	</template>
	<template v-else>
		<CateProductPopup
			:show="showCateList" 
			title="商品分类" 
			:onUpdateShow="handleChangeShow"
			@onConfirm="handleChangeCate"
		></CateProductPopup>
	</template>
	
	
	<QuickCreatePfOrderPopup
		:show="showPfOrder" 
		title="拼团下单" 
		:id="prodId"
		:onUpdateShow="handleChangeShow2"
	></QuickCreatePfOrderPopup>
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
	const { cate_list, cate_list2, cate_loading } = toRefs(cate)
	const terms = ref('')
	const nav_index = ref(0)
	
	const showCateList = ref(false)
	const showPfOrder = ref(false)
	const curP = ref(1)
	const cateId = ref('')
	const order = ref('')
	const pf = ref(0)
	const pic = ref(0)
	const prodId = ref('')
	const cate_label = ref('全部')
	const dataList = ref([]) 
	const notice_list = ref([])
	const notice_obj = ref({})
	const loadstatus = ref('loadmore')
	const params = computed(() => {
		if(terms.value) {
			return {
				p: curP.value, 
				terms: terms.value,
				pf: pf.value ,
			}
		}
		else {
			return {
				p: curP.value,
				cate: cateId.value ,
				order: order.value ,
				pf: pf.value ,
				pic: pic.value ,
			}
		}
		
	}) 
	const func = computed(() => {
		return terms.value ? 'web_search' : 'web_product'
	})
	onLoad(async (options) => {
		if(options.hasOwnProperty('terms')) {
			terms.value = options.terms
		}
		if(options.hasOwnProperty('order')) {
			order.value = options.order
		}
		if(options.hasOwnProperty('pf')) {
			pf.value = +options.pf
		}
		if(options.hasOwnProperty('pic')) {
			pic.value = +options.pic
		}
		if(cate_list.value.length == 0 && pf.value != 1) {
			await cate.getCateData() 
		}
		if(cate_list2.value.length == 0 && pf.value == 1) {
			await cate.getCate2Data() 
		}
		if(options.hasOwnProperty('cate') && pf.value != 1) {
			cateId.value = options.cate
			initCateLabel()
		}
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
		const res = await $api[func.value]({params: params.value})
		if (res.code == 1) { 
			dataList.value = [...dataList.value, ...res.list] 
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
	function btnClick({id}) {
		prodId.value = id;
		showPfOrder.value = true
	}
	async function handleSearch() {
		await initData()
	}
	function handleChangeShow(data) {
		showCateList.value = data
	}
	function handleChangeShow2(data) {
		showPfOrder.value = data
	}
	function handleChangeCate(obj) {
		cateId.value = obj.data.id 
		cate_label.value = obj.cate_label
		// customShareParams.cate = obj.data.id 
		handleChangeShow(false)
		initData()
	}
	
	function initCateLabel() {
		cate_list.value.some(ele => {
			if(ele.id == cateId.value) {
				cate_label.value = `${ele.name} - 全部`
			}
			else {
				ele.children.some(item => {
					if(item.id == cateId.value) {
						cate_label.value = `${ele.name} - ${item.name}`
					}
					return item.id == cateId.value
				})
			}
			return ele.id == cateId.value
		})
	}
	function cardClick({data}) {
		base.handleGoto({
			url: '/pages_user/pidPicText/pidPicTextList',
			params: {
				pid: data.id, 
			}
		})
	}
	 
	
</script>

<style > 
</style>
<style lang="scss" scoped>
	.w {
		height: 100%;
		padding-bottom: 50px; 
		background: linear-gradient(to bottom, #fff, $page-bg2 300px);
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
