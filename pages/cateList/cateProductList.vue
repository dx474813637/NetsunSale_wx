<template>
	<view class="w card-row">
		<view class="header box-border ">
			<view class="search-w u-p-t-16 u-p-l-16 u-p-r-16 u-p-b-8">
				<u-search
					placeholder="请输入关键字" 
					v-model="keyword" 
					:showAction="false"
					shape="round"
					bgColor="#fff"
					@search="handleSearch"
				></u-search>
			</view>
			
			<view class="tabs-w u-p-t-8 u-p-b-20 u-p-r-70 box-border" 
				:class="{
					'more-mode': cateAllShow
				}"> 
				<template v-if="cateAllShow">
					<view class="tabs-mask" :class="{ active: cateAllShow }" @click="cateAllShow = false"></view>
					<view class="tabs-more-list box-border u-p-t-8"
						:class="{
							active: cateAllShow
						}"
					>
						<view class="u-flex u-flex-wrap u-flex-items-start">
							<view class="item-w u-flex-column u-flex-center u-flex-items-center"
								v-for="(item, index) in tabs_list"
								:key="index"
								:class="{
									active: index == tabs_current
								}"
								@click="tabsMoreListClick(index)"
								>
								<view class="item-img">
									<up-image
										:src="item.img"
										width="45px"
										height="45px"
										mode="scaleToFill"
									></up-image>
								</view> 
								<view class="u-line-1 u-font-24 item-info u-text-center u-p-2 u-p-l-10 u-p-r-10 u-m-t-10" >{{item.name}}</view>
							</view>
						</view>
						<view class="u-flex u-flex-center u-flex-items-center u-info u-font-28 u-p-16 u-border-top u-m-t-40" @click="cateAllShow=false">
							<text class="u-m-r-10">点击收起</text>
							<u-icon name="arrow-up" color="#999"></u-icon>
						</view>
					</view>
				</template>
				
				<view class="tabs-right u-font-26 text-bold u-flex u-flex-end" @click="cateAllShow = !cateAllShow">
					<view class="tabs-right-text u-flex-column u-flex-center u-flex-items-center">
						<text>展</text>
						<text class="u-m-b-8">开</text>
						<u-icon name="list-dot" size="17"></u-icon> 
					</view>
				</view>
				<u-tabs
					:list="tabs_list"
					lineWidth="0"
					:current="tabs_current"
					lineColor="#f56c6c"
					:activeStyle="{
						color: '#303133',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}"
					:inactiveStyle="{
						color: '#606266',
						transform: 'scale(1)'
					}" 
					itemStyle="height: auto"
					@change="handleTabsChange"
				>
					<template #item="{data, index}"> 
						<view class="item-w u-flex-column u-flex-center u-flex-items-center" 
							:class="{
								active: index == tabs_current
							}">
							<view class="item-img ">
								<up-image
									:src="data.img"
									width="45px"
									height="45px"
									mode="scaleToFill"
								></up-image>
							</view> 
							<view class="u-line-1 u-font-24 item-info u-text-center u-p-2 u-p-l-10 u-p-r-10 u-m-t-10" >{{data.name}}</view>
						</view>
					</template>
				</u-tabs>  
			</view>
		</view> 
		
		<view class="list-w box-border ">
			<view class="list u-flex ">
				<scroll-view 
					scroll-y
					class="item item-nav-w"
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
				<scroll-view
					scroll-y 
					class="item item-content-w u-flex-1 "
					@scrolltolower="scrolltolower"
					>
					<view class="u-p-20">
						<view class="u-m-b-10" v-if="cate_main_item.zt_img">
							<up-image
								:src="cate_main_item.zt_img"
								width="100%"
								height="auto"
								mode="widthFix"
								radius="10"
								@click="gotoZt(cate_main_item.zt_url)"
							></up-image> 
						</view>
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
					</view>
					
					<view class="data-list u-p-l-20">
						 <view 
							class="data-list-item u-m-b-20" 
							v-for="item in dataList" 
							:key="item.id"
							>
						 	<ProductRowCard
						 		:origin="item"
						 		mode="normal" 
						 		:customStyle="{ 
									'boxShadow': 'none', 
						 		}"
						 	></ProductRowCard>
						 		 
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
				</scroll-view>
			</view>
			<!-- <u-safe-bottom></u-safe-bottom> -->
		</view>
		
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
	const cate = useCateStore()
	const { cate_origin, cate_list, cate_loading } = toRefs(cate)
	const keyword = ref('')
	const nav_index = ref(0)
	const tabs_current = ref(0)
	const cateAllShow = ref(false)
	const cate_active_id = computed(() => {
		if(cate_list.value.length == 0) return ''
		return cate_list.value[tabs_current.value].children[nav_index.value].id
	})
	const cate_active_name = computed(() => {
		if(cate_list.value.length == 0) return ''
		return cate_list.value[tabs_current.value].name
	})
	const cate_main = computed(() => {
		if(cate_list.value.length == 0) return []
		return cate_list.value[tabs_current.value].children 
	})
	const cate_main_item = computed(() => {
		if(cate_list.value.length == 0) return {}
		return cate_list.value[tabs_current.value]
	})
	const tabs_list = computed(() => {
		return cate_list.value
	}) 
	const order = ref(3)
	const filter_index = ref(-1)
	const filterList = ref([ 
		{
			name: '最新',
			type: 1,
			order: 0, 
		},
		{
			name: '价格',
			type: 2,
			order: [4, 5]
		}, 
	]) 
	const options = computed(() => {
		return {
			params: {
				cate: cate_active_id.value,
				order: order.value,
				login: ''
			},
			api: 'web_product',
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
		getMoreDataList
	} = useDataList(options)
	onLoad(async (options) => {
		if(options.hasOwnProperty('order')) {
			order.value = options.order
			initOrderIndex(options.order)
		}
		await cate.getCateData()
		if(options.hasOwnProperty('cateId')) {
			initCateId(options.cateId)
		}
		initDataList() 
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
		cate_list.value.some((ele, index) => {
			if(!ele.children || ele.children.length == 0) return false 
			return ele.children.some((item, i) => { 
				if(item.id == id) {
					tabs_current.value = index
					nav_index.value = i
					console.log(tabs_current.value, nav_index.value)
					return true
				}
				return false
			}) 
		})
	}
	function navClick(index) {
		nav_index.value = +index
		initFilterData()
		initDataList()
	}
	function handleTabsChange(e) {
		console.log(e)
		tabs_current.value = e.index
		nav_index.value = 0
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
	@keyframes listAnimation {
	    from { transform: translateY(-100%); } 
	    to { transform: translateY(0); } 
	}
	@keyframes listMaskAnimation {
	    from { opacity: 0; } 
	    to { opacity: 1; } 
	}
	.tabs-w {
		// height: 50px;
		width: 100vw;
		background: linear-gradient(to bottom, #fae9e9, #fff);
		position: relative;
		overflow: hidden;
		&.more-mode {
			overflow: visible
		}
		.tabs-more-list {
			position: absolute;
			background: linear-gradient(to bottom, #fae9e9, #fff);
			left: 0;
			top: 0;
			width: 100%; 
			z-index: 50;
			overflow: hidden;
			border-radius: 0 0 20px 20px;
			.item-w {
				flex: 0 0 20%
			}
			&.active {
				animation: listAnimation .2s linear;
			}
		}
		.tabs-mask {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			z-index: 20;
			background-color: rgba(0,0,0,0.6);
			&.active {
				animation: listMaskAnimation .1s linear;
			}
		}
		.tabs-right {
			position: absolute;
			height: 90%;
			width: 45px;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			color: #333;
			z-index: 20;
			overflow: hidden;
			.tabs-right-text {
				height: 100%;
				width: 35px;
				box-shadow: -2px 0 10px rgba(0,0,0,.1);
				background: linear-gradient(to bottom, #fae9e9, #fff);
				
			}
		}
	}
	.search-w {
		background-color: #fae9e9;
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
		height: 100vh;
		.header {
			box-shadow: 0 2px 10px rgba(90,90,90,.1);
			position: relative;
			z-index: 5;
		}
		.list-w {
			position: relative;
			z-index: 1;
			height: calc(100% - 190px - 0);
			height: calc(100% - 190px - constant(safe-area-inset-bottom));
			height: calc(100% - 190px - env(safe-area-inset-bottom));
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
</style>
