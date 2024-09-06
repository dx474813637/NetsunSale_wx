<template>
	<view>
		<PopupNormal v-bind="$attrs" @open="open" @close="close" >  
			<view class="list-w ">     
				<view class="load-bg u-flex u-flex-items-center u-flex-center" v-if="productLoading">
					<u-loading-icon color="#f00"></u-loading-icon>
				</view>
				<scroll-view class="main-list u-p-l-20 u-p-r-20" scroll-y >
					<QuickCreatePfOrder
						:product_base_data="product_list"
						:product_shop_data="company_list"
						:loading="productLoading"
						:sku="product_sku"
						:spec_prices="spec_prices"
						:coupon_list="coupon_list"
						isOrder 
						:pf="1" 
					></QuickCreatePfOrder>
				</scroll-view> 
			</view>  
			<!-- <template #footer>
				<view class="u-p-20" v-if="submitBtnText">
					<u-button type="error" shape="circle" @click="submit">{{submitBtnText}}</u-button>
				</view>
			</template> -->
		</PopupNormal>
	</view>
</template>

<script setup> 
	const attrs = useAttrs()
	const $api = inject('$api')
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { themeColor } = toRefs(base)
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
		id: {
			type: String,
			default: '',
		}
	})   
	const productLoading = ref(false)
	const product_list = ref({})
	const company_list = ref({})
	const coupon_list = ref({})
	const origin = ref({})
	const countRef = ref()
	const sku_form = ref({})
	const sku_arr = ref([]) 
	const countRefs = ref([])
	const product_num_max = ref(Number.MAX_SAFE_INTEGER)
	const product_num = ref(1)
	const active_sku_preview_img = ref('') 
	const spec_prices = ref([])
	const remark = ref('')
	const addressPopupShow = ref(false)
	const morenAddress = ref({})
	const addressList = ref([])
	const uForm = ref()  
	const product_sku = computed(() => {
		if(!product_list.value.sku  ) return '' 
		return product_list.value.sku
	}) 
	onMounted(async () => { 
	})  
	function close() { 
		origin.value = {}
		product_list.value = {}
		company_list.value = {}
		spec_prices.value = []
		coupon_list.value = [] 
	}
	async function open() {
		productLoading.value = true
		try{
			await getData() 
			
		}catch(e){
			console.log(e)
			//TODO handle the exception
		}
		productLoading.value = false
	}
	async function getData() {
		const res = await $api.web_product_detail({params: {id: props.id, pf: 1}})
		if(res.code == 1) {
			origin.value = res
			product_list.value = res.list 
			company_list.value = res.company
			spec_prices.value = res.spec_prices 
			coupon_list.value = res.coupon_list || [] 
			// setOnlineControl(res)
		}
	}
</script>

<style lang="scss" scoped>
	.list-w {
		height: 80vh;
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
	.nav-item {
		color: #666; 
		&.active-nav {
			background-color: #f2f2f2;
			color: $u-primary; 
		}
	}
	.main-list {
		height: 100%;
		box-sizing: border-box;
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