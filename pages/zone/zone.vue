<template>
	<navBar
		:bgColor="bgColor" 
		title=""  
		fixed
		activeColor="#fff"
	> 
		<view class="nav-w u-flex u-flex-center box-border u-flex-items-center u-p-l-15 box-border" style="width: 100%; height: 100%;max-width: 100%;"> 
			<view class="u-flex u-flex-items-center item" > 
				<!-- <view class="logo-w" @click="base.handleGoto({url: '/pages/home/home', type: 'reLaunch'})" > 
					<image
						:src="originData.logo"
						mode="heightFix"
					></image>
				</view>  -->
			</view>
			<view class="u-flex u-flex-items-center item nav-center u-flex-1 u-m-r-20 u-m-l-20">
				<!-- <view class="search-w ">
					<u-search
						placeholder="请输入关键字" 
						v-model="keyword" 
						:showAction="false"
						shape="round"
						:clearabled="false"
						bgColor="#f8f8f8"
						@search="handleSearch"
					></u-search>
				</view> -->
				<view class="logo-w" @click="base.handleGoto({url: '/pages/home/home', type: 'reLaunch'})" >
					<image
						:src="originData.logo"
						mode="heightFix"
					></image>
				</view>  
			</view> 
			<!-- <view class="right-w item" :style="{
				width: `${menuButtonInfo.width}px`,
				height:'100%'
			}"></view> -->
		</view>
	</navBar> 
	<view class="w box-border">
		<view class="header box-border "> 
			<u-status-bar></u-status-bar>
			<view class="home-bg" >
				<image
					showLoading 
					mode="widthFix"
					:src="originData.bg2" 
				></image>
			</view>  
			<view class="u-m-b-10 u-p-20" v-if="originData.bg1">
				<up-image
					:src="originData.bg1"
					width="100%"
					height="auto"
					mode="widthFix"
					radius="10"
					@click="gotoZt(originData.bg1_url)"
				></up-image> 
			</view>
			
		</view>  
		
		<u-sticky :customNavHeight="44 + $u.sys().statusBarHeight" :offsetTop="0" zIndex="10">
			<view class="bg">
				<view class="filter-box u-flex u-flex-items-center u-flex-between u-font-28 box-border "> 
					<view class="filter-items u-flex-1 u-flex u-flex-items-center u-flex-center text-black "
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
				<view class="tabs-w box-border" v-if="tabs_list.length > 0">
					<u-tabs
						:list="tabs_list"
						lineWidth="0"
						:current="tabs_current"
						lineColor="#f56c6c"
						:activeStyle="{
							color: '#fff',  
							backgroundColor: themeColor,
							padding: '5px 15px',
							borderRadius: '20px',
							fontSize: '14px',
						}"
						:inactiveStyle="{
							color: '#606266', 
							backgroundColor: '#fff',
							borderRadius: '20px',
							padding: '5px 15px',
							fontSize: '14px',
						}"
						:itemStyle="{
							height: '44px',
							padding: '0 10px'
						}"
						@change="handleTabsChange"
					></u-tabs>  
				</view>
			</view> 
		</u-sticky>
		<view class="list-w box-border u-m-t-15">
			<view class="list u-p-l-10 u-p-r-10">    
				<view class="data-list u-flex u-flex-wrap u-flex-items-start">
					 <view 
						class="data-list-item u-p-10 box-border" 
						v-for="item in dataList" 
						:key="item.id"
						>
						<ProductColCard
							:origin="item" 
							:customStyle="{ 
								'boxShadow': 'none', 
							}"
						>
							<template #content>
								<view class="card-content u-p-20 u-font-30">
									<view class="u-line-2 u-m-b-10 card-content-name">
										<text class="card-content-tag u-m-r-8">福利</text>
										<text>{{item.name}}</text>
									</view>
									<view class="u-flex u-flex-items-center u-flex-between">
										<view class="u-flex u-flex-items-center">
											<text class="u-error">￥</text>
											<up-text
												type="error"
												bold
												:text="item.price1" 
												size="18" 
											></up-text>
										</view>
										<view>
											<u-icon name="plus-circle-fill" size="18" :color="themeColor"></u-icon>
										</view>
									</view>
								</view>
							</template>
						</ProductColCard>
							 
					 </view>	 
					
							
				</view>
				<template v-if="dataList.length == 0">
					<view class="u-flex u-flex-center u-p-40">
						<u-empty mode="data" :icon="base.empty" />
					</view>
					
				</template>
				<template v-else>
					<view class="u-p-20">
						<u-loadmore :status="loadstatus" />
					</view>
					
				</template>  
			</view>
		</view>
		<u-safe-bottom></u-safe-bottom>
		
	</view>
	
	
	<MenusBar></MenusBar>
</template>

<script setup>
	// import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	// import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	import { share } from '@/composition/share.js'
	const { setOnlineControl } = share()
	const $api = inject('$api')
	import useDataList from '@/composition/useDataList.js'
	
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore()
	const { themeColor } = toRefs(base)
	// const cate = useCateStore()
	// const { cate_origin, cate_loading } = toRefs(cate)
	 
	const originData = ref({})
	const keyword = ref('') 
	const tabs_current = ref(0)
	const nav_index = ref(0) 
	const tabs_list = ref([])
	// const cate_active_id = computed(() => {
	// 	if(tabs_list.value.length == 0) return ''
	// 	return tabs_list.value[tabs_current.value].id
	// })  
	const cate = ref('')
	const bgColor = ref('rgba(255,255,255,0)')
	const scrollPx = ref(0)
	const maxHeight = ref(50)
	const navBarScrollShow = ref(false)
	const order = ref(3) 
	const filter_index = ref(-1)
	const filterList = ref([ 
		{
			name: '最新',
			type: 1,
			order: 0, 
		},
		{
			name: '销量',
			type: 1,
			order: 3, 
		},
		{
			name: '价格',
			type: 2,
			order: [4, 5]
		}, 
	]) 
	let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
	let windowInfo = uni.getWindowInfo() 
	const options = computed(() => {
		return {
			params: {
				cate: cate.value,
				order: order.value,
				login: '', 
			},
			api: 'web_zone',
			getDataCallBack: (res) => {
				if (res.code == 1) {
					originData.value = res
					tabs_list.value = [{name: '全部', id: ''}, ...res.catelist]
					initCateId(cate.value)
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
		getMoreDataList
	} = useDataList(options)
	onLoad(async (options) => {
		if(options.hasOwnProperty('order')) {
			order.value = options.order 
		}
		initOrderIndex(order.value)
		// await cate.getCateData()
		if(options.hasOwnProperty('cateId')) { 
			cate.value = options.cateId
		} 
		initDataList() 
	})
	watch(
		() => navBarScrollShow.value,
		(n) => {
			if(n) {
				bgColor.value = 'rgba(255,255,255,1)'  
			}
			else {
				bgColor.value = 'rgba(255,255,255,0)' 
			}
		}
	)
	onPageScroll((e) => {
		// console.log(e)
		if(e.scrollTop <= maxHeight.value) {
			navBarScrollShow.value = false  
		}
		else {
			navBarScrollShow.value = true  
		}
		
	})
	async function handleSearch() {
		base.handleGoto({
			url: '/pages/product/productList',
			params: {
				terms: keyword.value
			}
		})
	}
	function gotoZt(url) {
		uni.navigateTo({
			url
		})
	}
	function initOrderIndex(data) {
		filterList.value.forEach((ele, index) => {
			if(ele.type == 1) {
				if(ele.order == data) {
					filter_index.value = index
				}
			}
			if(ele.type == 2) { 
				if(ele.order.findIndex(item => item == data) != -1) {
					filter_index.value = index
				}
			}
		}) 
	}
	function initCateId(id) { 
		if(!id) return
		tabs_list.value.some((ele, index) => { 
			if(ele.id == id) {
				tabs_current.value = index 
				return true
			}
			return false
		})
	}
	function navClick(index) {
		nav_index.value = +index
		initFilterData()
		initDataList()
	}
	function handleTabsChange(e) { 
		tabs_current.value = e.index
		nav_index.value = 0
		cate.value = e.id
		initFilterData()
		initDataList()
	}
	function tabsMoreListClick(index) {
		handleTabsChange({index})
		cateAllShow.value = false 
		initFilterData()
		initDataList()
	}
	async function scrolltolower() { 
		await getMoreDataList()
	}
	function initFilterData() {
		filter_index.value = -1
		order.value = 3
		initOrderIndex(order.value)
	}
	function filterClick(data, index) { 
		if(data.type == 2) { 
			let i = data.order.findIndex(ele => ele == order.value) 
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
		initDataList()
	}
</script>

<style >
page {
	height: 100vh;
	padding-bottom: 50px;
	box-sizing: border-box;
}
</style>
<style lang="scss" scoped> 
	.data-list-item {
		flex: 0 0 50%;
		width: 50%;
	}
	.logo-w {
		image {
			height: 24px;
			width: auto;
			display: block;
		}
	}
	.bg {
		// background: linear-gradient(to bottom, #fff, #f8f8f8);
		background-color: #f8f8f8;
	}
	.home-bg {
		position: absolute;
		width: 100vw;
		height: 100%;
		overflow: hidden;
		top: 0;
		left: 0;
		image {
			width: 100%;
			height: auto;
			left: 0;
			top: 0;
			position: absolute; 
			// filter: blur(2px);
			transform: scale(1.05);
			transition: all .3s;
		} 
	}
	.filter-box {
		height: 40px; 
		overflow: hidden;
		.filter-items { 
			position: relative; 
			height: 100%;
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
	@keyframes listAnimation {
	    from { transform: translateY(-100%); } 
	    to { transform: translateY(0); } 
	}
	@keyframes listMaskAnimation {
	    from { opacity: 0; } 
	    to { opacity: 1; } 
	}
	.tabs-w { 
		width: 100vw; 
		position: relative;
		overflow: hidden; 
	}
	.search-w { 
		// background-color: #fae9e9;
		position: relative;
		z-index: 51;
	}
	.item-w {
		height: 80px;
		&.active { 
			.item-img {
				border-color: $u-error;
			}
			.item-info {
				color: #fff;
				background-color: $u-error;
			}
		}
		.item-img {
			border-radius: 25px;
			border: 2px solid transparent;
			overflow: hidden;
			transition: all .3s;
			width: 45px;
			height: 45px;
		}
		.item-info {
			color: #333;
			border-radius: 10px;
			min-width: 3em;
			
		}
	}
	.w {
		min-height: 100vh;
		padding-bottom: 60px;
		.header {
			padding-top: 44px; 
			position: relative;
			z-index: 5;
		}
		.list-w {
			position: relative; 
			z-index: 1; 
		}
		.list {
			height: 100%;
			>.item {
				height: 100%;
				&.item-nav-w {
					flex: 0 0 80px;
					background-color: #f8f8f8;
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
				}
				&.item-content-w {
					background-color: #fff;
					box-sizing: border-box;
					.item-card {
						flex: 0 0 32%;
						box-sizing: border-box;
						margin-bottom: 2%;
						&:nth-of-type(3n+2) {
							margin-left: 2%;
							margin-right: 2%;
						}
					}
				}
			}
		}
	}
	.card-content {
		.card-content-name {
			height: 40px;
			line-height: 20px;
			.card-content-tag {
				background-color: $u-error;
				color: #fff;
				border-radius: 5px;
				padding: 2px 7px;
				font-size: 12px;
			}
		}
	}
</style>
