<template>
	<view class="w">
		<view class="navbar-w">
			<navBar
				bgColor="transparent" 
				title="网盛特卖"  
				activeColor="#fff"
				titleStyle="color: #fff"
			>
				<template #navLeft>
					<!-- <view class="u-flex u-flex-items-center left-w u-border u-radius-20 u-p-15 u-p-l-30 u-p-r-30" >
						<view class="btn u-m-r-30" @click="handleBack" v-if="backBtnShow">
							<i class="custom-icon custom-icon-back text-white" ></i>
						</view>  
						<view @click="base.handleGoto({url: '/pages/home/home', type: 'reLaunch'})" class="btn" > 
							<i class="custom-icon custom-icon-home text-white" ></i>
						</view>  
					</view> -->
				</template>
			</navBar>
		</view>
		<view class="header u-p-10 box-border"> 
			<view class="u-p-l-10 u-p-r-10 u-flex u-flex-items-center">
				<view class="bg-white u-p-5 u-radius-30 u-flex-1">
					<SearchBase></SearchBase>
				</view>
				<view class="u-m-l-10 u-p-10">
					<up-image
						width="25px"
						height="25px"
						src="https://wstm.y.netsun.com/Public/tb/m004.png"
						:customStyle="{ 
							filter: 'grayscale(100%) brightness(500%)'
						}"
					></up-image>
				</view>
			</view> 
			<view class="u-flex u-flex-items-center u-p-10 ">
				<!-- <view class="text-nowrap u-m-r-20 u-p-10">热点商品</view> -->
				<view class="u-flex-1 text-white" style="overflow: hidden;">
					<u-tabs
						:list="catelist"  
						lineWidth="0"  
						@click="handleTabsClick"
						:itemStyle="{height: '35px', color: '#fff' }"
						:activeStyle="{ color: '#fff' }"
						:inactiveStyle="{ color: '#fff' }"
					>
						<template #right>
							<view 
								class="u-p-l-8 u-flex u-flex-items-center u-font-28" 
								style="height: 35px;box-shadow: -5px 0px 10px rgba(0, 0, 0, 0.2)"
								@click="base.handleGoto('/pages/cateList/cateList')"
								>
								<u-icon
									name="list"
									size="21"
									bold
									color="#fff"
								></u-icon>
								<view class="u-m-l-6">分类</view>
							</view>
						</template>
					</u-tabs>	
				</view> 
			</view> 
			<view class="u-p-10">
				<u-swiper
					:list="swiper" 
					:height="80" 
					:border-radius="13"
					indicator 
					bgColor="transparent"
					@click="handleSwiperClick"
				></u-swiper>
			</view>
			
			<view class="u-p-l-10 u-p-r-10 u-m-b-20"> 
				<view 
					class="u-radius-8 box-border" 
					style="background-color: rgba(255,255,255,.5); overflow: hidden;"
				>
					<u-scroll-list 
						indicator 
						indicatorColor="#f3dedf" 
						:indicatorActiveColor="themeColor"
					>
						<view class="u-flex-column box-border" style="min-width: 100%;">
							<view
								v-for="(ele, i) in catelist3"
								:key="i"
								class="u-flex u-flex-items-center nav box-border u-m-t-5"
								style="width: 100%;"
							>
								<view 
									v-for="(item, index) in ele" 
									:key="index"
									class="nav-item u-flex-column u-flex-items-center box-border" 
									>
									<view style="width: 50px; height: 50px;">
										<zeroLazyLoad
											:image="item.img" 
											imgMode="scaleToFill" 
											height="100%"
											></zeroLazyLoad>
									</view>
									<view class="text-base u-line-1 u-m-t-5 u-font-28">{{item.name}}</view>
								</view>
							</view>
						</view>
						
						
					</u-scroll-list>
				</view>
			</view>
			
			<view class="u-flex u-flex-between swiper-w u-p-t-10">
				<view class="item u-p-10">
					<view class="swiper " v-if="swiperList.length > 0">
						<u-swiper
							:list="swiperList" 
							keyName="img"
							radius="10"
							height="100%"
							@click="swiperclick"
							indicator
							bgColor="transparent"
						></u-swiper>
					</view>
				</view>
				<view class="item u-flex-column u-flex-between ">
					<view class="u-flex-1 u-p-10" v-for="(item,index) in list" :key="index">
						<view style="width: 100%; height: 100%;" class="u-radius-8">
							<zeroLazyLoad
								:image="item.img" 
								imgMode="scaleToFill" 
								height="100%"
								></zeroLazyLoad>
						</view>
						<!-- <img 
							@click="goto(item)"
							class="u-radius-8"
							:src="item.img"
							style="width: 100%;height: 100%;display: block;"
							alt="" /> -->
					</view>
				</view>
			</view>
			<view class="ad-w u-flex u-flex-between u-p-t-10 u-p-b-10" v-if="list2 && list2.length == 2">
				<view class="item u-p-10" v-for="(item,index) in list2" :key="index">
					<img
						@click="goto(item)"
						class="u-radius-8"
						:src="item.img"
						style="width: 100%;height: 100%;display: block;"
						alt="" 
						mode="widthFix"
						/> 
				</view>
			</view>
			
			 
			
			<view class="u-p-10 u-p-t-20">
				<view class="bg-white u-radius-8 u-p-20">
					<view class="u-flex u-flex-items-end u-flex-between u-p-10 u-m-b-10">
						<up-image :src="originData.ad" height="30px" width="200px" mode="heightFix" ></up-image>
						<view class="item u-flex u-flex-items-center u-font-28 u-info text-nowrap u-p-10" @click="base.handleGoto('/pages/product/productList')" style="position: relative;z-index: 20;">
							<view class="u-m-r-10">全部商品</view>
							<u-icon name="arrow-right" color="#999" size="14"></u-icon>
						</view>
					</view> 
					<view class="u-p-t-20">
						<u-scroll-list
							indicator 
							indicatorColor="#f3dedf" 
							:indicatorActiveColor="themeColor"
						>
							<view class="u-flex u-flex-items-center box-border" style="width: 100%;" >
								<view 
									class=" u-radius-10 u-m-r-20" 
									v-for="item in 6"
									:key="item"
								>
									<view style="width: 120px; height: 150px;" class="u-radius-8">
										<zeroLazyLoad
											image="https://wstm.y.netsun.com//Public/attached/2023/11/30/656880003d300.jpg"
											imgMode="aspectFill" 
											height="100%"
											></zeroLazyLoad>
									</view>
									<!-- <up-image
										width="120px"
										height="150px"
										mode="aspectFill"
										src="https://wstm.y.netsun.com//Public/attached/2023/11/30/656880003d300.jpg"
									></up-image> -->
								</view>
							</view>
						</u-scroll-list>
					</view>
				</view>
			</view>
				
			
			
		</view>
		
	</view>
	<!-- <view class="u-flex u-flex-items-end u-flex-between u-p-20">
		<up-image :src="originData.ad" height="30px" width="200px" mode="heightFix" ></up-image>
		<view class="item u-flex u-flex-items-center u-font-28 u-info text-nowrap u-p-20" @click="base.handleGoto('/pages/product/productList')" style="position: relative;z-index: 20;">
			<view class="u-m-r-10">全部商品</view>
			<u-icon name="arrow-right" color="#999" size="14"></u-icon>
		</view>
	</view> -->
	<view class="list u-flex u-flex-wrap u-flex-items-start u-p-10">
		 <view 
			class="list-item u-p-14" 
			v-for="item in dataList" 
			:key="item.id"
			>
		 	<ProductColCard
				:origin="item"
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
	
	
	<view class="u-p-b-50 u-p-t-50"></view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar>
</template>

<script setup>
	// import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	// import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue'
	import { share } from '@/composition/share.js'
	import useDataList from '@/composition/useDataList.js'
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const base = baseStore() 
	const {themeColor} = toRefs(base)
	const { setOnlineControl } = share()
	const $api = inject('$api')
	const keyword = ref('')
	const originData = ref({})
	const shopCurrent = ref(0)
	const swiperList = ref([])
	const shopTabs = ref([])
	const navList = ref([])
	const catelist = ref([
		{
			cate: "7",
			id: "16",
			img: "",
			name: "羽绒服1",
			rank: "0",
			url: "/pages/product/productList?terms=羽绒服",
		},
		{
			cate: "7",
			id: "16",
			img: "",
			name: "羽绒服2",
			rank: "0",
			url: "/pages/product/productList?terms=羽绒服",
		},
		{
			cate: "7",
			id: "16",
			img: "",
			name: "羽绒服3",
			rank: "0",
			url: "/pages/product/productList?terms=羽绒服",
		},
		{
			cate: "7",
			id: "16",
			img: "",
			name: "羽绒服4",
			rank: "0",
			url: "/pages/product/productList?terms=羽绒服",
		},
		{
			cate: "7",
			id: "16",
			img: "",
			name: "羽绒服5",
			rank: "0",
			url: "/pages/product/productList?terms=羽绒服",
		},
		{
			cate: "7",
			id: "16",
			img: "",
			name: "羽绒服6",
			rank: "0",
			url: "/pages/product/productList?terms=羽绒服",
		},
	])
	const swiper =ref([
		{
			id: 0,
			url: "http://zc.toocle.com/Public/Upload/diy/61e61a4a30012.jpg",
			link: "/pages/prodList/prodList",
		},
		{
			id: 2,
			url: "http://zc.toocle.com/Public/Upload/diy/61e61a5182395.jpg",
			link: "/pages/prodList/prodList",
		}
	])
	const swiper2 =ref([
		{
			id: 0,
			url: "http://zc.toocle.com/Public/Upload/diy/61e61a4a30012.jpg",
			link: "/pages/prodList/prodList",
		},
		{
			id: 2,
			url: "http://zc.toocle.com/Public/Upload/diy/61e61a5182395.jpg",
			link: "/pages/prodList/prodList",
		},
		{
			id: 0,
			url: "http://zc.toocle.com/Public/Upload/diy/61e61a4a30012.jpg",
			link: "/pages/prodList/prodList",
		},
		{
			id: 2,
			url: "http://zc.toocle.com/Public/Upload/diy/61e61a5182395.jpg",
			link: "/pages/prodList/prodList",
		},
		{
			id: 0,
			url: "http://zc.toocle.com/Public/Upload/diy/61e61a4a30012.jpg",
			link: "/pages/prodList/prodList",
		},
		{
			id: 2,
			url: "http://zc.toocle.com/Public/Upload/diy/61e61a5182395.jpg",
			link: "/pages/prodList/prodList",
		},
	])
	// const catelist = computed(() => originData.value.catelist)
	const catelist2 = computed(() => [...originData.value.catelist2, ...originData.value.catelist2])
	const catelist3 = computed(() => {
		let data = [...originData.value.catelist2, ...originData.value.catelist2, ...originData.value.catelist2 ];
		let len = data.length
		if(len < 10) return [data] 
		let arr = [
			data.slice(0, Math.ceil(len/2)),
			data.slice(Math.ceil(len/2)),
		]
		console.log(arr)
		return arr
	})
	const list = computed(() => originData.value.list)
	const list2 = computed(() => originData.value.list2)
	const shopCurrentLogin = computed(() => {
		return shopTabs.value[shopCurrent.value]?.login || ''
	})
	const shopCurrentData = ref({})
	const options = computed(() => {
		return {
			params: {},
			api: 'web_product',
			getDataCallBack: (res) => {  
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list]
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
	onLoad(async () => {
		initDataList()
		initHomeData()
		
	}) 
	async function initHomeData() {
		await getHomeData()
		// await getTuijianData()
	}
	async function getHomeData() {
		const res = await $api.web_home();
		if(res.code == 1) {
			originData.value = res
			swiperList.value = res.swiper
			setOnlineControl(res)
		}
	}
	async function getTuijianData() {
		const res = await $api.web_tuijian2({
			params: {
				login: shopCurrentLogin.value
			}
		});
		if(res.code == 1) {
			shopTabs.value = res.list.map(ele => {
				ele.disabled = false;
				return ele
			})
			shopCurrentData.value = {
				company: res.company,
				product: res.product,
			}
		}
	}
	function swiperclick(e) {
		if(swiperList.value[e].url) {
			uni.navigateTo({
				url: swiperList.value[e].url
			})
		}
	}
	function shopTabsClick(e) {
		shopCurrent.value = +e.index
	}
	function goto(data) {
		if(!data.url) return;
		uni.navigateTo({
			url: data.url
		})
	}
	function handleTabsClick(e) { 
		goto(e)
		// base.handleGoto({
		// 	url: '/pages/product/productList',
		// 	type: 'reLaunch',
		// 	params: {
		// 		cate: e.id
		// 	}
		// })
	}
</script>

<style lang="scss" scoped> 
.card-item {
	flex: 0 0 60%;
	// height: 100px;
	margin-right: 10px;
	&:last-child {
		margin-right: 0;
	}
}
.ad-w { 
	box-sizing: border-box;
	.item {
		flex: 0 0 50%;
		padding-top: 100%;
		position: relative;
		box-sizing: border-box;
		.img-w {
			position: absolute;
			width: 100%;
			height: 100%;
		}
	}
}
.swiper-w, .card-w {
	height: 300px;
	box-sizing: border-box;
	.item {
		height: 100%;
		flex: 0 0 50%;
		box-sizing: border-box;
		.swiper {
			width: 100%;
			height: 100%;
		}
	}
}
.w {
	box-sizing: border-box;
	background: linear-gradient(to bottom, $u-error, $u-error, $page-bg2 350px);
	
}
.header {
	// background-color: #fff;
	// background-image: linear-gradient(to bottom, #EBEDFC , #f9f9f9 150px);
	// height: 100%;
	// min-height: 100vh;
	// padding-bottom: 60px;
}
.navbar-w {
	// position: absolute;
	// top: 0;
	// left: 0;
	width: 100%; 
	box-sizing: border-box; 
	// z-index: 20;
}
.nav {
	.nav-item {
		flex: 0 0 20%
	}
}
.u-info-bg {
	background-color: #f2f2f2;
}
.list {
			box-sizing: border-box;
			>.list-item {
				flex: 0 0 50%;
				box-sizing: border-box;
			}
		}
.shop-center { 
	width: 100%;
	white-space: nowrap;
	background-color: #f2f2f2;
	padding: 10px;
	box-sizing: border-box;
	.p {
		display: inline-block;
		margin-right: 10px;
		width: 35vw;
		&:last-child {
			margin-right: 0;
		}
	}
}
</style>
