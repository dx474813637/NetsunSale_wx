<template>
	<view class="w">
		<template v-if="product_list.pic">
			<view class="swiper-w">
				<view class="swiper-box" >
					<view class="swiper-bg" :style="{
						backgroundImage: `url(${swiperlist[swiper_index]})`
					}"></view>
					<u-swiper
						:list="swiperlist" 
						:current="swiper_index"
						indicator
						indicatorMode="dot"
						indicatorInactiveColor="#f8f8f8"
						indicatorActiveColor="#007aff"
						height="100%"
						imgMode="aspectFit"
						interval="4000"
						duration="600"
						@change="swiperChange"
						@click="swiperClick"
						circular
						bgColor="rgba(0,0,0,.2)"
					></u-swiper>
				</view>
				
			</view>
			
		</template> 
		<view 
			:class="{
				'u-error-bg': coupon_list.length > 0
			}"  
			
		>
			<view class="u-p-30 text-white u-flex u-flex-items-baseline u-flex-between"
				v-if="coupon_list.length > 0"
			>
				<view>
					<view class="item u-flex u-flex-items-baseline text-white" >
						<view>
							<text class="u-font-28">到手价</text>
							<text class="u-font-28 text-bold u-m-l-10">￥</text>
							<text class="text-bold" style="font-family: cursive; font-size: 24px;">{{product_list.price1}}</text>
							<text class="u-font-28 u-p-l-10">起</text>
						</view>
						<view 
							class="u-font-28 u-p-l-10 u-p-r-10 u-m-l-20" 
							style="background-color: #de334a; text-decoration: line-through;"
							v-if="product_list.price"
						> 
							<text>￥</text>
							<text style="font-family: cursive;">{{product_list.price}}</text>
						</view>
					</view>
				</view>
				<view class="item u-flex u-flex-items-center text-white" @click="couponListShow = true">
					<view class="u-m-r-15 u-font-28">优惠券</view>
					<u-icon name="arrow-right" size="14" color="#fff"></u-icon>
				</view>
			</view> 
			<view class="u-p-10 u-p-t-30 u-p-b-30 bg-white u-m-b-20"
				:class="{
					
				}"
				:style="{
					borderRadius: coupon_list.length > 0 ? '20px 20px 0 0' : ''
				}"
			>  
				<view class="u-flex u-flex-between u-flex-items-center u-p-10"
					v-if="coupon_list.length == 0"
					>
					<view class="item u-flex u-flex-items-center" :style="{ color: themeColor }">
						<view v-if="pf == 1 && product_list.wholesale">
							<text class="u-font-28">拼团价</text>
							<text class="u-font-28 text-bold u-m-l-10">￥</text>
							<text class="text-bold" style="font-family: cursive; font-size: 24px;" >{{product_list.wholesale.price}}</text>
							<text class="u-font-28 u-p-l-10">起</text>
						</view>
						<view v-else>
							<text class="u-font-28">到手价</text>
							<text class="u-font-28 text-bold u-m-l-10">￥</text>
							<text class="text-bold" style="font-family: cursive; font-size: 24px;">{{product_list.price1}}</text>
							<text class="u-font-28 u-p-l-10">起</text>
						</view>
						<view 
							v-if="pf == 1"
							class="u-font-28 u-p-l-10 u-p-r-10 u-m-l-20" 
							style="background-color: #f9dada; text-decoration: line-through;" 
						> 
							<text>特￥</text>
							<text style="font-family: cursive;">{{product_list.price1}}</text>
						</view>
						<view 
							class="u-font-28 u-p-l-10 u-p-r-10 u-m-l-20" 
							style="background-color: #f9dada; text-decoration: line-through;"
							v-if="product_list.price"
						> 
							<text>原￥</text>
							<text style="font-family: cursive;">{{product_list.price}}</text>
						</view>
					</view>
					<!-- <view class="item u-font-28 u-info">已售{{product_list.sales_volume}}件</view> -->
				</view>
				<view class="bg-white u-radius-8 u-p-10">
					<view class=" u-p-t-10 u-p-b-10 u-m-b-20" v-if="pf == 1">
						<text class="u-radius-30 u-error-bg text-white u-p-6 u-p-l-20 u-p-r-20 u-m-t-4 u-font-28 u-m-r-8">{{product_list.weight}}人团</text>
						<text class="item u-font-36 ">{{product_list.name}}</text> 
					</view>
					<view class="u-flex u-flex-between u-flex-items-start u-p-t-10 u-p-b-10 u-m-b-20" v-else>
						<!-- <view class="item u-p-r-20">
							<view class="u-radius-30 u-error-bg text-white u-p-6 u-p-l-20 u-p-r-20 u-m-t-4 u-font-28">{{product_list.weight}}人团</view>
						</view> -->
						<view class="item u-font-36 u-flex-1">
							{{product_list.name}}
						</view> 
						<view class="item u-p-l-20">
							<!-- <button type="primary"  openType="share"  class="share-btn">
								<view class="u-flex-column u-flex-items-center text-black"> 
									<u-icon name="share-square" color="#333" size="26"></u-icon>
									<text class="u-font-28 text-nowrap text-black text-thin">分享</text>
								</view>
							</button> -->
							<view class="share-btn" @click="showProductShare = true">
								<view class="u-flex-column u-flex-items-center text-black"> 
									<u-icon name="share-square" color="#333" size="26"></u-icon>
									<text class="u-font-28 text-nowrap text-black text-thin">分享</text>
								</view>
							</view>
						</view>
					</view>
					<view class="u-flex u-flex-between u-flex-items-start u-font-28">
						<view class="item u-info-dark">
							{{product_list.recommend_remark}}
						</view>
						<view class="item u-info u-p-l-30" style="white-space: nowrap;">
							<!-- {{$u.timeFrom(new Date(product_list.ctime).getTime(), false)}} -->
						</view>
					</view>
					<view class="u-flex u-flex-between u-flex-items-center u-font-28 u-m-t-20" v-if="pf == 1">
						<view class="item text-base u-info-light-bg u-p-10 u-p-l-20 u-p-r-20 u-radius-10"> 
							{{product_list.share_title1}}
						</view>
						<view class="u-m-l-10"> 
							<view class="u-p-10 u-p-l-16 u-p-r-16 u-font-28 u-radius-40 text-white u-success-bg" @click="showProductShare = true">{{product_list.share_title2}}</view>
						</view>
					</view>
					<view class="u-flex u-flex-between u-flex-items-center u-m-t-30 u-m-6" v-if="pf == 1 && tuan_user.length > 0">
						<view class="item">
							<up-avatar-group
								:urls="tuan_user"
								keyName="img"
								size="26"
								gap="0.3"
								maxCount="8"
							></up-avatar-group>
						</view>
						<view class="item " v-if="endtime > 0">
							<!-- <up-count-down :time="endtime" format="HH:mm:ss" autoStart @change="onEndtimeChange"></up-count-down> -->
							<up-count-down
								:time="endtime"
								format="DD:HH:mm:ss"
								autoStart
								millisecond
								@change="onEndtimeChange"
							>
								<view class="time u-flex u-flex-items-center">
									<view class="time__custom u-error-light-bg u-error u-radius-5 u-p-10 u-font-36 u-flex u-flex-items-center">
										<text class="time__custom__item text-bold u-p-l-4 u-p-r-4 u-text-center" style="font-family: fantasy;width: 26px">{{ endtimeData.days>=10?endtimeData.days:'0'+endtimeData.days}}</text>
										<text class="time__custom__item u-font-28">天</text>
										<text class="time__custom__item text-bold u-p-l-4 u-p-r-4 u-text-center" style="font-family: fantasy;width: 26px">{{ endtimeData.hours>=10?endtimeData.hours:'0'+endtimeData.hours}}</text>
										<text class="time__custom__item u-font-28">时</text>
										<text class="time__custom__item text-bold u-p-l-4 u-p-r-4 u-text-center" style="font-family: fantasy;width: 26px">{{ endtimeData.minutes>=10?endtimeData.minutes:'0'+endtimeData.minutes}}</text>
										<text class="time__custom__item u-font-28">分</text>
										<text class="time__custom__item text-bold u-p-l-4 u-p-r-4 u-text-center" style="font-family: fantasy;width: 26px">{{ endtimeData.seconds>=10?endtimeData.seconds:'0'+endtimeData.seconds}}</text>
										<text class="time__custom__item u-font-28">秒</text>
									</view>
									<!-- <view class="time__custom u-error-bg u-radius-5 u-p-5 u-p-l-10 u-p-r-10 text-white u-font-32">
										<text class="time__custom__item">{{ endtimeData.hours>=10?endtimeData.hours:'0'+endtimeData.hours}}</text>
									</view>
									<text class="time__doc u-p-l-6 u-p-r-6 u-error">:</text>
									<view class="time__custom u-error-bg u-radius-5 u-p-5 u-p-l-10 u-p-r-10 text-white u-font-32">
										<text class="time__custom__item">{{ endtimeData.minutes }}</text>
									</view>
									<text class="time__doc u-p-l-6 u-p-r-6 u-error">:</text>
									<view class="time__custom u-error-bg u-radius-5 u-p-5 u-p-l-10 u-p-r-10 text-white u-font-32">
										<text class="time__custom__item">{{ endtimeData.seconds }}</text>
									</view> -->
								</view>
							</up-count-down>
						</view> 
					</view>
				</view> 
			</view> 
		</view>
		<view class="u-p-10 bg-white u-m-b-20">  
			<view class="u-radius-8 bg-white u-p-20 u-font-30">   
				<view class="u-flex u-flex-items-center u-p-10 u-p-b-14 u-p-t-14">
					<view class="item text-base u-m-r-20">
						发货
					</view> 
					<view class="item u-p-l-40">
						预计 {{product_list.delivery_delay_day}} 天内发货
					</view>
				</view> 
				<view class="u-flex u-flex-items-center u-p-10 u-p-b-14 u-p-t-14">
					<view class="item text-base u-m-r-20">
						分类
					</view>  
					<view class="item u-p-l-40">
						{{cate_active_name}}
					</view>
				</view>  
				<u-line length="100%" margin="10px 0"></u-line>
				<view class="u-flex u-flex-items-center u-p-10 u-p-b-14 u-p-t-14" @click="gotoBottom()">
					<view class="item text-base u-m-r-30">
						选择
					</view>
					<u-line direction="col" length="15px"></u-line> 
					<view class="item u-p-l-30 u-flex-1 u-line-1 ">
						<text class="u-m-r-25" v-for="(item, index) in sku_arr" :key="index">
							<text class="u-info">{{item.children.length}}种</text>
							<text class="u-info"> · </text>
							<text>{{item.label}}</text>
						</text>
					</view>
					<u-icon name="arrow-right" color="#ccc"></u-icon>
				</view>  
				<view class="u-flex u-flex-items-center u-p-10 u-p-b-14 u-p-t-14" @click="showProductAttr = true">
					<view class="item text-base u-m-r-30">
						参数
					</view>
					<u-line direction="col" length="15px"></u-line>
					<template v-if="product_attr.length == 0">
						<view class="item u-p-l-30 u-flex-1  u-p-r-10 u-info">暂无参数</view>
					</template>
					<template v-else>
						<view class="item u-p-l-30 u-flex-1 u-line-1 ">
							<text class="u-m-r-12"
								v-for="(item, index) in product_attr"
								:key="index"
								>
								<text class="u-info">{{item.name}}：</text>
								<text>{{item.value}}</text>
								<text class="u-info">；</text>
							</text> 
							
						</view>
						<u-icon name="arrow-right" color="#ccc"></u-icon>
					</template>
					
				</view>  
				<view class="u-flex u-flex-items-center u-p-10 u-p-b-14 u-p-t-14" @click="showExpressPrice= true">
					<view class="item text-base u-m-r-30">
						保障
					</view>
					<u-line direction="col" length="15px"></u-line> 
					<view class="item u-p-l-30 u-flex-1 u-line-1 ">
						<text class="u-info">查看详情</text>
						
					</view>
					<u-icon name="arrow-right" color="#ccc"></u-icon> 
					
				</view>  
				<view class="u-flex u-flex-items-center u-p-10 u-p-b-14 u-p-t-14" v-if="company_list.service">  
					<view class="item u-flex-1">
						{{company_list.service}}
					</view>
				</view>   
			</view> 
		</view>
		<view class="u-p-10 bg-white">  
			<view class="u-radius-8 bg-white u-p-20 u-font-30">  
				<view class="u-flex u-flex-items-center u-flex-between u-p-l-10 u-p-r-10  " >
					<view class="item text-base u-m-r-30">
						最近销售
					</view> 
					<view class="item u-p-l-30 ">
						<text class="text-black">已售{{product_list.sales_volume}}件</text> 
					</view> 
				</view>  
				<!-- <u-line length="100%" margin="10px 0 0 0"></u-line> -->
			</view> 
		</view> 
		
		 
		
		<view class="pro-desc">
			<view class="item">
				<image  
					class="lazy-img" 
					v-for="(item, index) in product_desc_arr" 
					:key="index"
					:src="item" 
					mode="widthFix"
					></image>
			</view> 
			
		</view> 
		<view class="mubiao u-m-t-30 u-p-l-20 u-p-r-20" >   
			<QuickCreateCommunityOrder
				:product_base_data="product_list"
				:product_shop_data="company_list"
				:sku="product_sku"
				:spec_prices="spec_prices"
				:coupon_list="coupon_list"
				isOrder 
				:tid="tid"
				:pid="product_id"
				@couponListClick="hanldeCouponListClick"
			></QuickCreateCommunityOrder>  
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
	<!-- <view class="fixed-menus bg-white uni-shadow-base">
		<view 
			class="item-mine u-flex-column u-flex-center u-flex-items-center" 
			@click="base.handleGoto( kefu, 'serviceChat')"
		>
			<u-icon name="server-man" :color="themeColor" size="25"></u-icon>
			<view class="text-error u-font-24 text-bold">客服</view>
		</view>
	</view> -->
	<TabBar :customStyle="{boxShadow: 'none', border: '1rpx solid #eee' }" v-if="menusShow">
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-20 u-p-r-20 u-font-28" style="height: 100%;">
			<view class="item u-flex u-flex-items-center u-flex-1" > 
				<u-button type="error" @click="gotoBottom" shape="circle" >
					<view class="u-flex"> 
						<text >{{product_list.share_title3}}</text>
					</view>
				</u-button>
			</view> 
		</view>
	</TabBar> 
	<ProductAttrPopup
		:show="showProductAttr" 
		title="商品属性" 
		:list="product_attr"
		:onUpdateShow="handleChangeShow" 
	></ProductAttrPopup>
	<!-- <ProductSkuPopup
		:show="showProductSku" 
		title="商品规格" 
		:product_base_data="product_list"
		:product_shop_data="company_list"
		:sku="product_sku"
		:spec_prices="spec_prices"
		:onUpdateShow="handleChangeShow2" 
		:isOrder="isOrder"
		@onConfirm="sku2Cart"
	></ProductSkuPopup> -->
	<ProductExpressPopup
		:show="showExpressPrice" 
		title="保障规则" 
		:list="express_info"
		:onUpdateShow="handleChangeShow3" 
	></ProductExpressPopup>
	<sharePopup
		:show="showProductShare"
		bgColor="transparent"
		:origin="origin"
		:onUpdateShow="handleChangeShow4" 
	></sharePopup>
	<CouponListPopup
		:show="couponListShow" 
		title="点击领取优惠券"  
		:list="coupon_list" 
		submitBtnText=""
		:onUpdateShow="handleChangeShow5"  
		@confirmCoupon="confirmCoupon"
		@refresh="refreshCoupon" 
	></CouponListPopup>
	<UserPhonePopup
		:show="showUserPhone"
		@getPhone="getPhone"
		@onUpdateShow="handleChangeShow6" 
	></UserPhonePopup>
</template>

<script setup>
	// import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	// import { ref, reactive, computed, toRefs, inject, watch, onMounted } from 'vue'
	import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue'
	import { share } from '@/composition/share.js'
	import useProductSku from '@/composition/useProductSku';
	import {useCartStore} from '@/stores/cart.js'
	import {userStore} from '@/stores/user.js'
	import {useCateStore, baseStore} from '@/stores/base.js'
import { nextTick } from 'vue';
	// import useNormal from '@/composition/useNormal';
	const {
	    sku2treeData
	} = useProductSku() 
	useNormal()
	const { setOnlineControl } = share()
	const $api = inject('$api') 
	const user = userStore()
	const { user_info } = toRefs(user)
	const cart = useCartStore()
	const { cart_list_num, cart_list_abled_num } = toRefs(cart)
	const base = baseStore() 
	const { home, roomList, themeColor } = toRefs(base)
	const cate = useCateStore()
	const { cate_list, cate_loading } = toRefs(cate)
	const product_id = ref('')
	const tid = ref('')
	const origin = ref({})
	const product_list = ref({})
	const express_info = ref('')
	const company_list = ref({})
	const spec_prices = ref([])
	const coupon_list = ref([])
	const swiper_index = ref(0)
	const endtime = ref(0)
	const endtimeData = ref({});  
	const pf = ref(0)
	const menusShow = ref(true)
	const showUserPhone = ref(false)
	const couponListShow = ref(false)
	const showProductAttr = ref(false)
	const showExpressPrice = ref(false)
	const showProductSku = ref(false)
	const showProductShare = ref(false)
	const isOrder = ref(false)
	const eventMode = ref('')
	const kefu = ref({})
	const product_longs = ref({})
	const $http = inject('$http')
	const tuan_user = computed(() => {
		if(product_list.value.hasOwnProperty('tuan_user') && product_list.value.tuan_user.length > 0 ) {
			return product_list.value.tuan_user 
		}
		return []
	})
	
	const cate_active_name = computed(() => {
		if(!product_list.value.id || cate_list.value.length == 0) return '' 
		return cate_list.value.map(ele => ele.children).flat().filter(ele => ele.id == product_list.value.cate)[0]?.name
	})
	
	const swiperlist = computed(() => { 
		return product_list.value.pic.split('|')
	}) 
	const product_desc_arr = computed(() => {
		if(!product_list.value.description  ) return [] 
		return product_list.value.description.split('|')
	})
	const product_attr = computed(() => {
		if(!product_list.value.attribute  ) return [] 
		return product_list.value.attribute
	})
	const product_sku = computed(() => {
		if(!product_list.value.sku  ) return '' 
		return product_list.value.sku
	})
	const sku_arr = computed(() => {
		if(!product_sku.value  ) return [] 
		return sku2treeData(product_sku.value)
	})
	onShow(() => {
		
	})
	onPageScroll ((e) => { 
		if(e.scrollTop < 500) {
			menusShow.value = true
		} else {
			menusShow.value = false
		}
	})
	onLoad(async (options) => {
		// console.log(options, 2)
		if (options.hasOwnProperty('tid')) {
			tid.value = options.tid
			$http.setToken({
				tid2: options.tid
			}) 
			uni.setStorageSync('tid2', options.tid)
		} 
		if(options.hasOwnProperty('id')) {
			product_id.value = options.id
		}
		if(options.hasOwnProperty('pf')) {
			pf.value = +options.pf
		}
		console.log(product_id.value, tid.value)
		if (options.hasOwnProperty('poster')) {
			$http.setToken({
				poster2: options.poster
			}) 
			uni.setStorageSync('poster2', options.poster)
		} 
		if(cate_list.value.length == 0) {
			cate.getCateData()
		}
		uni.showLoading()
		await getData()
		 
		// console.log(cart_list_num.value)
	}) 
	function gotoBottom() {
		uni.pageScrollTo({
			selector: '.mubiao',
			duration: 300
		});
	} 
	function hanldeCouponListClick() {
		couponListShow.value = true
	}
	function handleChangeShow(data) {
		showProductAttr.value = data
	}
	function handleChangeShow2(data) {
		showProductSku.value = data
	}
	function handleChangeShow3(data) {
		showExpressPrice.value = data
	}
	function handleChangeShow4(data) {
		showProductShare.value = data
	}
	function handleChangeShow5(data) {
		couponListShow.value = data
	}
	function handleChangeShow6(v) {
		showUserPhone.value = v
	}
	async function getPhone(data) {
		// uni.showLoading()
		await user.refreshUserData()
		showUserPhone.value = false  
		if(eventMode.value == 'coupon') {
			handleChangeShow5(true)
			eventMode.value = ''
		}  
		// uni.showLoading()
		// await changeRole()
	}
	async function confirmCoupon({origin}) { 
		if(!user_info.value.phonenumber) {
			showUserPhone.value = true  
			eventMode.value = 'coupon'
			handleChangeShow5(false)
			return
		}
		uni.showLoading();
		const res = await $api.get_coupon({
			params: {
				hid: origin.id
			}
		})
		if(res.code == 1) {
			uni.showToast({
				title: res.msg,
				success() {
					handleChangeShow5(false)
					setTimeout(() => {
						refreshCoupon()
					}, 1000) 
				}
			})
		}
	}
	async function refreshCoupon() {
		uni.showLoading()
		await getData()
	}
	function sku2Cart(data) {
		// console.log(data)
		handleChangeShow2(false)
		base.handleGoto({
			url: '/pages_user/order/orderCreate',
			type: 'reLaunch'
		})
	}
	async function getData() {
		const res = await $api.web_product_detail1({params: {id: product_id.value, pf: pf.value}})
		if(res.code == 1) {
			origin.value = res
			product_list.value = res.list
			express_info.value = res.company.service1
			company_list.value = res.company
			endtime.value = res.endtime
			spec_prices.value = res.spec_prices
			kefu.value = res.kefu
			coupon_list.value = res.coupon_list || []
			product_longs.value = res.product_longs
			setOnlineControl(res)
		}
	}
	// 定义 onChange 方法  
	const onEndtimeChange = (e) => {   
		endtimeData.value = e;  
	};  
	function swiperChange({current, currentItemId, source}) { 
		swiper_index.value = current
	}
	// function findIndexby () {
	// 	return spec_prices_data.value.map(ele => ele.specs).findIndex(ele => isObjectEqual(ele, product_sku.form) );
	// }
	function addCartBtn(type = false) {
		isOrder.value = type
		showProductSku.value = true
	}
	
	function swiperClick(index) { 
		uni.previewImage({
			urls: swiperlist.value,
			current: index,
			longPressActions: {
				itemList: ['发送给朋友', '保存图片', '收藏'],
				success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			}
		});
	}
	
	
</script>

<style lang="scss" scoped>
	.fixed-menus {
		position: fixed;
		left: 0;
		bottom: 110px;
		padding: 5px;
		border-radius: 0 30px 30px 0;
		// padding-left: 10px;
		z-index: 20;
		.item-mine {
			width: 45px;
			height: 45px;
			border-radius: 30px;
			border: 2px solid $u-error;
			background-color: $u-error-light;
		}
	}
	.share-btn {
		background-color: transparent;
		color: #000;
		line-height: 20px;
		&:after {
			border: 0;
		}
	}
	.w {
		padding-bottom: 60px;
	}
	.swiper-w {
		position: relative;
		width: 100%;
		padding-top: 100%;
		overflow: hidden;
		.swiper-box {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			.swiper-bg {
				background-size: 100% 100%;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%; 
				filter: blur(5px);
				transform: scale(1.05);
			}
		}
	}
	.shop-card {
		background: linear-gradient(to bottom, #e7e9ff, #f3f9ff);
	}
	.biji-list {
		.item {
			flex: 0 0 50%
		}
	}
	.pro-desc image {
		display: block;
		width: 100%;
	}
</style>
