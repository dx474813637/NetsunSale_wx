<template>
	<view class="main-list">  
		<view class="list-w bg-white u-m-b-30">   
			<template v-if="!loading">
				<view class="u-flex u-flex-items-start u-p-20">
					<view class="item">
						<u--image
							showLoading
							width="60px"
							height="60px"
							radius="8px"
							:customStyle="{
								border: '1px solid #f8f8f8'
							}"
							:src="product_img_preview" 
						></u--image>
					</view>
					<view class="u-m-l-20">
						<view class="text-bold u-line-1 u-m-b-20">{{product_base_data.name}}</view>
						<view class="text-error" v-if="active_sku_price_show">
							<text class="u-font-28 text-bold">￥</text>
							<text class=" text-bold u-font-38" style="font-family: cursive; ">{{active_sku_price}}</text> 
						</view>
					</view>
					
				</view> 
				<view class="u-p-30">
					<view class="item u-m-b-40" v-for="(item, i) in spec_prices_arr" :key="item.id">
						<view class="u-m-b-10">
							<text 
								class="u-font-26 u-p-8 u-p-l-12 u-p-r-12 u-radius-5 u-info-light-bg u-m-r-14" 
								v-for="(specs, index) in item.specs_arr" 
								:key="index"
							>{{specs.label}}：{{specs.value}}</text>
						</view>
						<view class="u-flex u-flex-items-center u-flex-between u-font-26 text-base">
							<view class="u-flex u-flex-items-center">
								<view class="u-m-r-20">价格：<text class="u-error">{{item.price}}元</text></view>
								<view>库存：{{item.stock}}</view>
							</view>
							<view > 
								<u-number-box  
									:ref="el => setRef(el, item.id)"
									v-model="item.num"  
									:name="item.id"
									:max="+item.stock" 
									:min="0"
									asyncChange
									inputWidth="60" 
									@change="(e) => {numChange(e, item.id, i)}"
									@blur="inputBlur"
									@overlimit="numOverlimit"
								></u-number-box>
							</view>
						</view>
					</view>
				</view>
			</template>
			
			<!-- <view class="u-p-30">
				<view class="item u-m-b-20"
					v-for="(item) in sku_arr"
					:key="item.label"
				>
					<view class="label u-m-b-30 ">
						{{item.label}} ({{item.children.length}})
					</view>
					<view class="sku-items u-flex u-flex-wrap u-flex-items-start">
						<view class="sku-items-tag u-font-28"
							:class="{
								active: sku_form[item.label] == ele.label,
								disabled: ele.disabled,
							}"
							v-for="ele in item.children"
							:key="ele.label"
							@click="onSelectSku(item.label, ele.label)"
						>
							{{ele.label}}
						</view>
					</view>
				</view>
				<view class="item u-m-b-20 u-flex u-flex-items-center u-flex-between u-p-t-30" >
					<view class="label ">
						<text>数量</text>
						<text 
							class="u-font-28 u-error-dark u-m-l-20" 
							v-if="product_num_disabled"
							style="font-weight: normal;"
						>请选择规格</text>
						<text 
							class="u-font-28 u-error-dark u-m-l-20" 
							v-if="product_num_max == 0"
							style="font-weight: normal;"
						>库存缺货</text>
					</view>
					<view class=" ">
						<u-number-box 
							ref="countRef" 
							v-model="product_num" 
							:disabled="product_num_disabled"
							:max="product_num_max"
							:min="0"
							asyncChange
							inputWidth="80" 
							@change="numChange"
							@blur="inputBlur"
							@overlimit="numOverlimit"
							></u-number-box>
					</view>
				</view>
			</view> -->
			
		</view> 
		<view>  
			<view class="u-m-b-30 bg-white"> 
				<u--form
					labelPosition="left"
					:model="addressData"
					ref="uForm"
					labelWidth="80"
				> 
				<template v-if="addressFormShow">
					<view class="u-flex u-flex-items-center u-flex-between u-p-20 u-p-l-30 u-p-r-30">
						<view class="item">
							收货地址
						</view>
						<view class="item u-flex u-flex-items-center" @click="handleChooseaddress"> 
							<u-icon name="weixin-circle-fill" color="#07C160"></u-icon>
							<view class="u-m-l-10 u-m-r-30" style="color: #07C160;">从微信导入</view>
							<u-icon name="arrow-right"></u-icon> 
						</view>
					</view>
					<view class="u-p-20 u-p-l-40 u-p-r-40">
						<u-form-item
							label="联系人"
							prop="name"
							ref="addressData_name"
							borderBottom
							required
						>
							<u--input
								v-model="addressData.name"
								clearable
								placeholder="联系人"
								border="none"
							></u--input>
						</u-form-item>
						<u-form-item
							label="手机号"
							prop="tel"
							ref="addressData_tel"
							borderBottom
							required
						>
							<u--input
								v-model="addressData.tel"
								clearable
								border="none"
								placeholder="手机号"
								type="number"
							></u--input>
						</u-form-item>
						<u-form-item
							label="地区"
							prop="area"
							ref="addressData_area"
							borderBottom
							required
						> 
							<view style="width: 100%;">
								<uni-data-picker
									placeholder="所在地" 
									popup-title="请选择所在地区" 
									:localdata="regional_list" 
									v-model="addressData.area" 
									:border="false"
									:clearIcon="false"
									@change="handleValArea"
									:map="{
										text: 'label',
										value: 'value',
									}"
								></uni-data-picker>
							</view>
							
						</u-form-item>
						<u-form-item
							label="详细地址"
							prop="address"
							ref="addressData_address" 
							required
						>
							<u--textarea
								v-model="addressData.address" 
								placeholder="详细地址" 
								autoHeight 
								clearable
								border="none"
							></u--textarea>
						</u-form-item>  
					</view>
					
				</template>
				<template v-else>
					<AddressSelectCard
						:origin="addressData"
						@cardClick="handleChangeShow(true)"
					></AddressSelectCard>
				</template>
				
				</u--form>
			</view>
			<view class="bg-white u-m-b-30 u-p-40 u-flex u-flex-between u-flex-items-center u-font-30">
				<view class="">备注</view>
				<view class="u-flex-1 u-p-l-30">
					<u-input v-model="remark" border="none" clearable placeholder="请输入您需要备注的内容" fontSize="16px"></u-input>
				</view>
			</view>  
			<view class="bg-white u-p-20 u-p-t-30 u-p-t-30 u-flex u-flex-between u-flex-items-center" v-if="coupon_list.length > 0">
				<view class="text-base">优惠券</view>
				<view class="u-flex u-flex-items-center text-base" @click="emits('couponListClick')">
					<view class="u-m-r-10">去领取</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>  
			<view class="bg-white u-p-20 u-p-t-30 u-p-t-30 u-flex u-flex-between u-flex-items-center">
				<view class="text-base">如遇缺货无法发出直接退款？</view>
				<view class="u-flex-1 u-p-l-30 u-flex u-flex-end  ">
					<view class="u-flex u-info u-flex-items-center">
						<view class="u-p-10" :class="{
							'text-error': tuikuan == true
						}" 
						>是</view>
						<u-switch
							v-model="tuikuan"
							:activeColor="themeColor" 
						></u-switch>
						<view class="u-p-10" :class="{
							'text-error': tuikuan == false
						}" 
						>否</view>
					</view>
					
				</view>
			</view>	
			<view class="bg-white u-m-b-30 u-p-20 u-p-t-30 u-p-t-30 u-flex u-flex-between u-flex-items-center u-font-30">
				<view class="text-base">无忧退货（运费险最高10元）</view>
				<view class="u-flex-1 u-p-l-30 u-flex u-flex-end">商家赠送</view>
			</view>
		</view>
		<view class="u-p-20">
			<u-button  
			shape="circle" 
			@click="addCartBtn" 
			:disabled="create_btn_disabled"
			type="error"
			>{{btnText}}</u-button>
		</view> 
	</view>
	<AddressListPopup
		:show="addressPopupShow" 
		title="地址列表"  
		:list="addressList"
		:onUpdateShow="handleChangeShow"  
		@confirmAddress="confirmAddress"
		@refresh="refreshAddress"
	></AddressListPopup>
</template>

<script setup>
	import {
		ref,
		toRefs,
		inject,
		computed,
		onMounted,
		reactive, 
		watch,
		useAttrs,
		nextTick
	} from 'vue' 
	import useProductSku from '@/composition/useProductSku'
	const {
	    sku2treeData
	} = useProductSku()
	import {isObjectEqual} from '@/utils/base.js'
	const attrs = useAttrs()
	const $api = inject('$api')
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { themeColor, regional_list, regional_list_loading } = toRefs(base)
	import { userStore } from '@/stores/user'
	const user = userStore();
	const { user_info } = toRefs(user)
	import { useCartStore } from '@/stores/cart'
	const cart = useCartStore();
	const { 
		cart_list, 
		cart_list_num, 
		cart_list_checked, 
		cart_list_checked_num, 
		cart_list_checked_price, 
		is_order_data, 
		is_order_data_price,
		is_order_data_num,
		is_pf_data
	} = toRefs(cart)
	 
	const props = defineProps({  
		product_base_data: {
			type: Object,
			default: () => {
				return {}
			},
		},
		product_shop_data: {
			type: Object,
			default: () => {
				return {}
			},
		},
		sku: {
			type: String,
			default: '',
		},
		pf: {
			type: Number,
			default: 0,
		},
		spec_prices: {
			type: Array,
			default: () => {
				return []
			},
		},
		coupon_list: {
			type: Array,
			default: () => {
				return []
			},
		},
		isOrder: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		}
	})   
	const emits = defineEmits(['onConfirm', 'couponListClick'])
	const countRef = ref()
	const sku_form = ref({})
	const sku_arr = ref([]) 
	const countRefs = reactive({});
	const product_num_max = ref(Number.MAX_SAFE_INTEGER)
	const product_num = ref(1)
	const active_sku_preview_img = ref('') 
	const remark = ref('')
	const addressPopupShow = ref(false)
	const morenAddress = ref({})
	const addressList = ref([])
	const uForm = ref()
	const spec_prices_arr = ref([]) 
	const addressData = ref({
		id: '',
		name: '',
		tel: '',
		area: '',
		area_name: '',
		address: '',
		remark: '',
		default: 0,  
	})
	const rules = {
		name: [
			{
				required: true,
				message: '联系人不得为空',
				trigger: ['change', 'blur'],
			}
		],
		tel: [
			{
				validator: (rule, value, callback) => { 
					return uni.$u.test.mobile(value);
				},
				message: '输入正确的手机号',
				trigger: ['change', 'blur'],
			}
		],
		area: [
			{
				required: true,
				message: '地区不得为空',
				trigger: ['change', 'blur'],
			}
		],
		address: [
			{
				required: true,
				message: '详细地址不得为空',
				trigger: ['change', 'blur'],
			}
		],
	}
	const product_num_disabled = computed(() => {
		return Object.values(sku_form.value).some(ele => !ele)
	})
	const add_cart_disabled = computed(() => {
		return product_num_disabled.value || product_num.value == 0 
	})
	const product_img_preview = computed(() => {
		let img = '';
		if(props.product_base_data.id) {
			img = props.product_base_data.pic.split('|')[0]
		}
		if(active_sku_preview_img.value){
			img = active_sku_preview_img.value;
		}
		return img 
	}) 
	const addressFormShow = computed(() => addressList.value.length == 0)
	const active_sku_price_show = computed(() => Object.values(sku_form.value).every(ele => ele))
	const active_sku_price = computed(() => {
		let price = '';
		let i = findIndexby()
		if(i == -1) {
			price = props.product_base_data.price
		}
		else {
			price = props.spec_prices[i].price
		} 
		return price 
	})
	
	const tuikuan = ref(true) 
	const createBtnDisabled = computed(() => {
		return !tuikuan.value || !address_checked.value 
	})
	const dataList = computed(() => { 
		if(props.pf == '1') return is_pf_data.value
		if(is_order_data.value.length > 0) return is_order_data.value
		return cart_list_checked.value
	})
	const address_checked = computed(() => {
		return addressData.value.id || (addressData.value.name && addressData.value.tel && addressData.value.area && addressData.value.address)
	})
	const product_wholesale = computed(() => { 
		return props.product_base_data?.wholesale || {}
	})
	const create_btn_disabled = computed(() => {
		// return createBtnDisabled.value || add_cart_disabled.value 
		return checked_product_num.value < product_wholesale.value.num || createBtnDisabled.value
	})
	const checked_product_num = computed(() => {
		return spec_prices_arr.value.reduce((prev, items) => prev + items.num, 0)
	})
	const btnText = computed(() => {
		let text = '创建订单'
		if(product_wholesale.value.num > checked_product_num.value) text = `确认商品选购数量(${checked_product_num.value}/${product_wholesale.value.num})` 
		// else if(add_cart_disabled.value) text = '请选择数量' 
		else if(!address_checked.value) text = '请检查收货地址'
		else if(createBtnDisabled.value) text = '请同意注意事项'
		return text
	})
	
	watch(
		() => props.sku,
		(n) => {
			sku_arr.value = sku2treeData(n)  
			// console.log(sku_arr.value)
			sku_arr.value.forEach(ele => {
				sku_form.value[ele.label] = ''
			})
			// console.log(sku_form.value)
		}
	)
	// watch(
	// 	() => product_num_max.value,
	// 	(val, old) => {
	// 		// console.log(val);
	// 		if(val <= product_num.value) {
	// 			product_num.value = product_num_max.value
	// 			nextTick(() => {
	// 				countRef.value.init()
	// 			})
				
	// 		} else product_num.value = 1
	// 	} 
	// )
	// watch(
	// 	() => product_num.value,
	// 	(val, old) => {
	// 		// console.log(val); 
	// 		if(val > product_num_max.value) {
	// 			product_num.value = product_num_max.value
	// 			nextTick(() => {
	// 				countRef.value.init()
	// 			})
	// 		}
	// 	} 
	// )
	watch(
		() => props.spec_prices,
		(n) => {
			let arr = uni.$u.deepClone(n)
			spec_prices_arr.value = arr.map(ele => {
				ele.label = Object.keys(ele.specs)
				ele.values = Object.values(ele.specs)
				ele.num = 0
				ele.specs_arr = cart.specs2Obj(ele.specs)
				ele.stock = +ele.stock
				return {...ele}
			}).filter(item => item.stock != 0)   
			console.log(spec_prices_arr.value)
		} 
	)
	 
	onMounted(async () => {   
		await getInitData()
		morenAddress.value.area = morenAddress.value.area+''
		addressData.value = morenAddress.value 
		uni.$on('create_order_address_update', function() {
			refreshAddress()
		})
		uForm.value.setRules(rules)
	})  
	onUnmounted(async () => {  
		uni.$off('create_order_address_update')
		// is_order_data.value = []
	})  
	 
	 function setRef(el, i) {  
	 	if(el) {
	 		countRefs[i] = el
	 	}
	 }
	function onSelectSku(key, value) { 
		if(sku_form.value[key] == value) {
			value = ''
			active_sku_preview_img.value = ''
		}  
		sku_form.value[key] = value 
		// checkSkuDisabled()
		if(Object.values(sku_form.value).filter(ele => !ele).length == 0) {
			setMaxCount()
		} 
	}
	function setMaxCount() {
		// console.log(product_sku.form)
		let i = props.spec_prices.map(ele => ele.specs).findIndex(ele => {
			// console.log(ele, product_sku.form)
			return isObjectEqual(ele, sku_form.value)
		})
		// console.log(i)
		if(i != -1) {
			let count = props.spec_prices[i].stock;
			if(count == 0) {
				product_num.value = 0
			}
			product_num_max.value = +count
			active_sku_preview_img.value = props.spec_prices[i].img
		}
	} 
	
	function numChange(e, id, index) {
		let i = spec_prices_arr.value.findIndex(ele => ele.id == id) 
		if(i == -1) return;
		spec_prices_arr.value[i].num = e.value 
		nextTick(() => {
			countRefs[e.name].init()
		})
		// product_num.value = e.value
		// nextTick(() => {
		// 	countRef.value.init()
		// })
		
		// console.log(product_num.value)
	}
	
	function numOverlimit(e) {
		// console.log(e)
	}
	
	function inputBlur(e) {
		
	} 
	function findIndexby () {
		return props.spec_prices.map(ele => ele.specs).findIndex(ele => isObjectEqual(ele, sku_form.value) );
	}
	async function addCartBtn() {
		if(props.pf == 1) {
			let shop = props.product_shop_data || {}
			let product = {
				base: props.product_base_data,
				checked: true,
				znum: +props.product_base_data.wholesale.num, 
				list: spec_prices_arr.value.filter(ele => ele.num > 0) 
			}
			let flag = cart.addOrderProductPf(shop, product) 
		}
		else {
			// let skuItem 
			// let i = findIndexby()  
			// if(i == -1) return
			// let img = props.spec_prices[i].img ? props.spec_prices[i].img : props.product_base_data.pic?.split('|')[0]
			// skuItem = {
			// 	...props.spec_prices[i],
			// 	img,
			// 	shop: props.product_shop_data || {},
			// 	name: props.product_base_data.name,
			// 	freight_id: props.product_base_data.freight_id,
			// 	num: +product_num.value,
			// 	checked: props.isOrder? true :false,
			// }  
			// cart.addOrderProduct( skuItem )
			
		}
		
		
		emits('onConfirm')
		uni.showLoading()
		try{
			await createOrder()
		}catch(e){
			// console.log(e)
			uni.hideLoading()
			//TODO handle the exception
		}
		 
	}
	
	async function createOrder() {
		let arr = dataList.value.map(ele => ele.products.map(item => item.list.map(s => ({id: s.id, num: s.num})) ).reduce((a, b) => a.concat(b))).reduce((a, b) => a.concat(b))
		console.log(arr) 
		let address = {
			address_id: addressData.value.id
		}
		if(!addressData.value.id) {
			address = {
				...addressData.value, 
			}
		} 
		
		let res
		try{
			res = await $api.create_order_post({
				...address,
				pid_array: JSON.stringify(arr),
				info: remark.value, 
				pf: props.pf
			})
		}catch(e){
			//TODO handle the exception
		}
		
		is_pf_data.value = []
		if(res.code == 1) {
			uni.showToast({
				title: res.msg
			})
			
			// if(is_order_data.value.length == 0) {
			// 	cart.removeProductsById(arr.map(ele => ele.id))
			// 	cart.saveCartData2LocalStorage()
			// } 
			if(res.order.length == 1) {
				base.handleGoto({
					url: '/pages_user/order/orderDetail',
					type: 'reLaunch',
					params: {
						id: res.order[0]
					}
				})
			}
			else {
				base.handleGoto({
					url: '/pages_user/order/orderList',
					type: 'reLaunch' 
				})
			}
		}
	} 
	function handleChangeShow(data) {
		addressPopupShow.value = data
	} 
	function confirmAddress(data) {
		addressData.value = data
		handleChangeShow(false)
	}
	async function refreshAddress() {
		uni.showLoading()
		await getInitData()
	} 
	async function getInitData() {
		const res = await $api.orderConfirm()
		if(res.code == 1) {
			morenAddress.value = res.moren
			addressList.value = res.list
		}
		// const res = await $api.address()
		// if(res.code == 1) {
		// 	morenAddress.value = res.list[0]
		// 	addressList.value = res.list
		// }
	}
	function handleValArea(e) { 
		addressData.value.area_name = e.detail.value.map(ele => ele.text).join('')
	}
	function handleChooseaddress() {
		uni.chooseAddress({
			success(res) {
				// console.log(res)
				let {
					userName,
					postalCode,
					provinceName,
					cityName,
					countyName,
					detailInfo,
					nationalCode,
					telNumber
				} = res; 
				addressData.value.name = userName
				addressData.value.tel = telNumber
				addressData.value.area = nationalCode
				addressData.value.area_name = `${provinceName}${cityName}${countyName}`
				addressData.value.address = detailInfo 
			},
			fail(err) {
				console.log(err)
			}
		})
	}
</script>

<style lang="scss" scoped>
	.list-w { 
		// background-color: #f2f2f2;
		position: relative;
		.load-bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 20;
			background-color: rgba(255,255,255,.6);
		}
		.list-item {
			position: relative;
			z-index: 10;
			height: 100%;
			&.item-left {
				flex: 0 0 35%;
				background-color: #f8f8f8;
			}
		}
	} 
	.main-list { 
		box-sizing: border-box;
		.item {
			.label {
				// font-weight: bold;
				color: #000;
			}
			.sku-items {
				.sku-items-tag {
					height: 34px;
					line-height: 34px;
					padding: 0 15px;
					margin-bottom: 10px;
					margin-right: 10px;
					border-radius: 6px;
					background-color: #f2f2f2; 
					color: #333; 
					box-sizing: border-box;
					border: 1rpx solid #f2f2f2;
					&.active {
						background-color: $u-error-light;
						color: $u-error; 
						border-color: $u-error; 
					}
					&.disabled {
						background-color: #f8f8f8;
						color: #aaa; 
						border-color: #f8f8f8;
					}
				}
			}
		}
	} 
</style>