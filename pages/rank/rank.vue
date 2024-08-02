<template>
	<view class="w"> 
		<navBar
			bgColor="transparent" 
			title=""  
			activeColor="#fff"
		>
			<template #navLeft>
				<view class="u-flex u-flex-items-center left-w u-border u-radius-20 u-p-15 u-p-l-30 u-p-r-30" >
					<view class="btn u-m-r-30" @click="handleBack" v-if="backBtnShow">
						<i class="custom-icon custom-icon-back text-white" ></i>
					</view>  
					<view @click="base.handleGoto({url: '/pages/home/home', type: 'reLaunch'})" class="btn" > 
						<i class="custom-icon custom-icon-home text-white" ></i>
					</view>  
				</view>
			</template>
			<view class="u-flex u-flex-items-center" >
				<view class="text-bold u-m-r-20 u-font-32 text-white">
					{{ role_active_name}}
				</view>
				<!-- <view class="icon-change u-flex u-flex-items-center u-flex-center">
					<i class="custom-icon-qiehuan1 custom-icon u-font-24"></i>
				</view>  -->
			</view>
		</navBar>
		<!-- <view class="u-flex u-flex-items-center u-flex-center u-p-10">
			<view class="" >
				<u-subsection
					:list="cate_list" 
					mode="button" 
					keyName="name"
					:current="cate_current"
					@change="sectionChange"
					bgColor="rgba(0,0,0,.2)"
					activeColor="#fff"
					inactiveColor="#fff"
				></u-subsection>
			</view>
			
		</view> -->
		<view class="u-p-t-20 u-p-l-20 u-p-r-20 u-p-b-40 text-white" v-if="info"> 
			<u-parse :content="info"></u-parse> 
			<!-- <view class="rank_top u-flex u-flex-items-end u-flex-between" v-if="rank_top.length > 0">
				<view class="item u-flex-1 u-flex-column u-flex-items-center u-flex-start"
					v-for="(item, index) in rank_top"
					:key="item.info.id"
					:class="{
						top_2: index == 0,
						top_1: index == 1,
						top_3: index == 2
					}"
					@click="gotoHome(item)"
				>
					<i class="custom-icon-jiangbei1 custom-icon icon-bg"></i>
					<view class="item-img u-radius-30 u-m-b-20 u-m-t-20"> 
						<i class="custom-icon-huangguan custom-icon icon-hg"></i>
						<up-image
							v-if="item.info.img"
							:src="item.info.img"
							width="50px"
							height="50px"
							shape="circle"
						></up-image>
						<template v-else>
							<view class="icon-w u-flex u-flex-center u-flex-items-center">
								<i class="custom-icon-myfill custom-icon"></i>
							</view>
							
						</template>
					</view>
					<view class="item-info text-black u-line-1 text-bold u-m-b-5">
						{{item.info.name}}
					</view>
					<view class="item-info u-info u-font-28 u-line-1 text-error">
						{{item.total_fee}} 元
					</view>
				</view>
			</view> -->
		</view> 
		<view class="list u-p-10 bg-white u-radius-10 u-p-l-20 u-p-r-8 u-p-b-80 u-m-l-30 u-m-r-30">
			<view class="list-item u-p-14" >
				<view class="item-card u-flex u-flex-items-center " >
					<view class="card-rank  u-flex u-flex-center" style="flex: 0 0 40px">
						<view class="item-info text-black u-font-28 u-line-1">排行</view> 
					</view> 
					<view class="card-content u-flex-1 u-flex u-flex-center">
						<view class="item-info text-black u-font-28 u-line-1">昵称</view> 
					</view>
					<view class="u-flex u-flex-end" style="flex: 0 0 70px"> 
						<view class="item-info text-black u-font-26">金额</view>
					</view>
					<view class="u-flex u-flex-end" style="flex: 0 0 70px"> 
						<view class="item-info text-black u-font-26" >奖金</view>
					</view>
					<view class="card-img u-flex u-flex-center u-m-l-10" style="flex: 0 0 30px"></view>
				</view>
								 
			</view> 
			 <view 
				class="list-item u-p-14" 
				v-for="(item, index) in dataList" 
				:key="item.id"
				>
				<view 
					class="item-card u-flex u-flex-items-center" 
					@click="gotoHome(item)" 
					v-if="item.info"
					:class="{
						top_1: index == 0,
						top_2: index == 1,
						top_3: index == 2,
					}"
					>
					<view class="card-rank u-flex u-flex-center" style="flex: 0 0 40px">
						{{index+1}}
					</view>
					<!-- <view class="card-img u-flex u-flex-center" style="flex: 0 0 50px">
						<up-image
							v-if="item.info.img"
							:src="item.info.img"
							width="40px"
							height="40px"
							shape="circle"
						></up-image>
						<template v-else>
							<view class="icon-w u-flex u-flex-center u-flex-items-center">
								<i class="custom-icon-myfill custom-icon"></i>
							</view> 
						</template>
					</view> -->
					<view class="card-content u-flex-1 u-flex u-flex-center">
						<view class="item-info text-bold text-black u-font-28 u-line-1">{{item.info.name}}</view> 
					</view>
					<view class="u-flex u-flex-end" style="flex: 0 0 70px"> 
						<view class="item-info u-info u-font-26 text-error">{{item.total_fee}}元</view>
					</view>
					<view class="u-flex u-flex-end" style="flex: 0 0 70px"> 
						<view class="item-info u-info u-font-26 text-error" v-if="item.jiangjin">{{item.jiangjin}}元</view>
					</view>
					<view class="card-img u-flex u-flex-center u-m-l-10" style="flex: 0 0 30px">
						<up-image
							v-if="item.img"
							:src="item.img"
							width="20px"
							height="25px" 
						></up-image> 
					</view>
				</view>
					 
			 </view> 
			 <view class="u-flex u-flex-center u-p-10 u-font-26 u-info u-p-b-30" 
			 style="position: absolute; bottom: 0 ; left: 0; width: 100%;"
			 v-if="monday || sunday"
			 >
				 统计区间：{{monday}} - {{sunday}}
			 </view>
		</view> 
		
		<u-safe-bottom></u-safe-bottom> 
		
	</view>
	 
	<!-- <TabBar :customStyle="customStyle"  >
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28 button-w" > 
			<u-button type="error" shape="circle" >
				管理商品配置 
			</u-button>
		</view>
	</TabBar>   -->
	<!-- <view class="u-flex-column u-flex-items-center u-p-l-20 u-p-r-20 u-font-28 fixed-menus-w" > 
		<button type="primary"  openType="share"  class="share-btn">
			<view class="u-flex-column u-flex-center u-flex-items-center text-black u-p-5"> 
				<u-icon name="share-square" color="#f00" size="20"></u-icon>
				<text class="u-font-26 text-nowrap text-error text-thin">分享</text>
			</view>
		</button>
		<view class="btns-w u-radius-30 u-flex u-flex-center u-flex-items-center" @click="base.handleGoto('/pages_user/cart/cart')" style="background-color: rgba(0,0,0,.9);">
			<view class="u-flex-column u-flex-center u-flex-items-center text-black u-p-5"> 
				<u-icon name="shopping-cart" color="#fff" size="36"></u-icon> 
			</view>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view> -->
	
	<u-action-sheet 
		closeOnClickOverlay
		round="20"
		safeAreaInsetBottom
		:actions="role_list" 
		title="排行榜" 
		:show="showRankList"
		@select="ActionSelect"
		@close="showRankList = false"
	></u-action-sheet>
</template>

<script setup>  
	const $api = inject('$api')
	
	useNormal()
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore()
	const { themeColor } = toRefs(base)
	// const cate = useCateStore()
	// const { cate_list, cate_loading } = toRefs(cate)
	import {
		userStore 
	} from '@/stores/user';
	const user = userStore()
	const {user_info, balance} = toRefs(user)  
	const dataList = ref([]) 
	const loadstatus = ref('loadmore')  
	const info = ref('')
	const monday = ref('')
	const sunday = ref('')
	const customStyle = ref({
		// paddingBottom: '50px',
		// background: 'transparent' 
	})  
	const customStyle2 = ref({
		paddingBottom: '80px',
		background: 'transparent' 
	})  
	const cate_current = ref(0)
	const role_current = ref(0)
	const showRankList = ref(false)
	const cate_list = ref([
		{
			name: '本周',
			value: '',
			disabled: false
		},
		{
			name: '上周',
			value: '1',
			disabled: false
		},
	])  
	const role_list = ref([
		{
			name: '特卖店排行榜',
			value: '1',
			api_name: 'daren_ranking',
			disabled: false
		},
		{
			name: '特卖店排行榜',
			value: '2',
			api_name: 'tuan_ranking',
			disabled: false
		},
	])  
	const backBtnShow = computed(() => {
		return getCurrentPages().length > 1
	})
	const role_active_name = computed(() => {
		return role_list.value[role_current.value].name
	})
	const role_active = computed(() => {
		return role_list.value[role_current.value]
	})
	const rank_top = computed(() => {
		if(dataList.value.length == 0) return []
		let list = dataList.value.slice(0, 3)
		return [list[1], list[0], list[2]]
	})
	const rank_list = computed(() => {
		return dataList.value.slice(3)
	})
	const func = computed(() => {
		return role_list.value[role_current.value].api_name
	})
	const cate = computed(() => {
		return cate_list.value[cate_current.value].value
	})
	const loading = ref(false)
	onLoad(async (options) => {  
		if(options.hasOwnProperty('cate')) {
			cate_current.value = options.cate || 0
		} 
		if(options.hasOwnProperty('role')) {
			role_current.value = options.role || 0
		} 
		await initData()  
	})
	 
	async function getData() {
		if(loadstatus.value == 'loading') return
		loadstatus.value = 'loading'
		const res = await $api[func.value]({params: {
			// login: userid.value,
			cate: cate.value
		}})
		if (res.code == 1) { 
			dataList.value = res.list 
			info.value = res.info  
			monday.value = res.monday  
			sunday.value = res.sunday  
			// setOnlineControl(res) 
			loadstatus.value = 'nomore'
			// if(dataList.value.length >= +res.total || res.xuan == 1) {
			// 	loadstatus.value = 'nomore'
			// }
			// else {
			// 	loadstatus.value = 'loadmore'
			// }
		}
	}
	function initDataParams() { 
		loadstatus.value = 'loadmore'
		dataList.value = []
	}
	async function initData() {
		uni.showLoading()
		initDataParams();
		await getData()
	}  
	async function submit(data) {
		uni.showLoading()
		const res = await $api.save_shop({...data})
		if(res.code == 1) {
			uni.showToast({
				title: res.msg
			})
			showHomeInfo.value = false
		}
		getData()
	}
	function handleBack() {
		// $emits('backEvent')
		uni.navigateBack()
	}
	async function followEvent() { 
		const res = await $api.follow({params: {follow: userid.value}})
		if(res.code == 1) {
			uni.showToast({
				title: res.msg
			}) 
		} 
	} 
	function handleTabsChange(data) {
		role_current.value = +data.index
		initData() 
	}  
	function sectionChange(index) {
		cate_current.value = index;
		initData()
	}
	function ActionSelect(data) {
		let index = role_list.value.findIndex(ele => ele.value == data.value)
		role_current.value = index
		initData() 
	}
	function gotoHome(data) {
		if(role_active.value.value == 1) {
			base.handleGoto({
				url: '/pages_user/shareHome/shareHome',
				params: {
					userid: data.fx_login 
				}
			})
			
		}
		else if(role_active.value.value == 2) {
			base.handleGoto({
				url: '/pages_user/shareHome/shareHome',
				params: {
					userid: data.info.login
				}
			})
		}
	}
</script>

<style > 
</style>
<style lang="scss" scoped> 
	.rank_top {
		.item {
			margin: 5px;
			padding: 10px;
			border-radius: 20px;
			border: 2px solid #fff;
			position: relative;
			overflow: hidden;
			.icon-bg {
				position: absolute;
				font-size: 150px;
				color: rgba(0,0,0,.05);
				top: 45%;
				// transform: translateY(-50%);
				left: 15%;
				opacity: .5;
			}
			.item-img { 
				position: relative;
				border: 2px solid rgba(0,0,0,.1);
				z-index: 20;
				.icon-hg {
					position: absolute;
					bottom: calc(100% - 5px);
					font-size: 20px; 
					left: 50%;
					transform: translateX(-50%);
				}
				.icon-w {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					background-color: rgba(0,0,0,.06);
					.custom-icon {
						font-size: 24px;
						color: rgba(0,0,0,.4);
					} 
				}
			}
			&.top_2 {
				padding-bottom: 40px;
				background-color: #E3E8F2;
				// background: linear-gradient(to bottom, #E3E8F2, #fff );
				border-color: #AEBBCF;
				.item-img .icon-hg {
					color: #9DADD3;
				}
			}
			&.top_1 {
				padding-bottom: 55px;
				background-color: #F5E9C9;
				// background: linear-gradient(to bottom, #F5E9C9, #fff );
				border-color: #E5D49C;
				.item-img .icon-hg {
					color: #FAC93A;
				}
			}
			&.top_3 {
				padding-bottom: 25px;
				background-color: #FCE4D3;
				// background: linear-gradient(to bottom, #FCE4D3, #fff );
				border-color: #E2C0B0;
				.item-img .icon-hg {
					color: #FA9C86;
				}
				
			}
		}
		
	}  
	.share-btn {
		background-color: #ffe9ec;
		color: #000;
		border: 2px solid #ff97d2;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		line-height: 20px;
		&:after {
			border: 0;
		}
	} 
	.fixed-menus-w {
		position: fixed;
		right: 0;
		bottom: 100px;
		.btns-w {
			width: 50px;
			height: 50px;
		}
	}
	.button-w {
		height: 100%; 
		background-color: #fff;
	}
	.w {
		height: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 60px!important;
		// background: linear-gradient(45deg, #fff, #f8d5eb 700px, #f89ddb );
		background-color: #E81B40;
		::v-deep {
			.u-subsection--button {
				border-radius: 20px!important;
			}
			.u-subsection__bar {
				border-radius: 20px!important;
				background-color: #ff6a00;
			}
			.u-subsection__item {
				padding-left: 20px!important;
				padding-right: 20px!important;
			}
		}
		.list {
			position: relative;
			box-sizing: border-box;
			min-height: 50vh;
			box-shadow: 0 -5px 10px rgba(0,0,0,.1);
			>.list-item { 
				box-sizing: border-box;
				.icon-w {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					background-color: rgba(0,0,0,.06);
					.custom-icon {
						font-size: 20px;
						color: rgba(0,0,0,.4);
					} 
				}
				.item-card { 
					&.top_1 .card-rank,
					&.top_2 .card-rank,
					&.top_3 .card-rank{
						font-weight: bold;
					}
					&.top_1 {
						.card-rank {
							color: #ffc930;
						} 
					}
					&.top_2 {
						.card-rank {
							color: #AEBBCF;
						}  
					}
					&.top_3 {
						.card-rank {
							color: #f3ab89;
						} 
					}
				}
			}
		}
	}
	.left-w {
		background-color: rgba(0,0,0,.5);
		
	}
	.icon-change {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background-color: rgba(0,0,0,0.2);
	}
</style>
