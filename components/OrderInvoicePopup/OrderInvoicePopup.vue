<template>
	<view>
		<PopupNormal v-bind="$attrs"  @open="open" @close="close"> 
			<template #header>
				<view class="u-flex u-flex-between u-flex-items-center u-p-l-8 u-p-r-8">
					<view class="item u-primary">
						<view @click="changeInvoiceMode" v-if="!formItemDisabled">{{ modeBtn }}</view>
					</view>
					<view class="u-text-center">
						{{$attrs.title}}
					</view> 
					<view class="item u-info" @click="$attrs.onUpdateShow(false)">取消</view> 
				</view>
			</template>
			<view class="list-w bg-white">   
				<view class="load-bg u-flex u-flex-items-center u-flex-center" v-if="invoiceLoading">
					<u-loading-icon color="#f00"></u-loading-icon>
				</view>
				<scroll-view class="main-list u-p-l-30 u-p-r-30" scroll-y >
					<u--form
						labelPosition="top" 
						:model="model"  
						ref="uForm"
						labelWidth="100%"
						:borderBottom="false"
						:labelStyle="{
							color: '#7c88a0', 
							fontSize: '36rpx',  
							fontWeight: 'bold'
						}"
						>
						<template v-if="invoiceFormShow">
								
							<u-form-item
								:borderBottom="false"
								label="公司名称" 
								prop="name"  
								ref="name"
								required 
								>  
								<up-input
									v-model="model.name"
									placeholder="公司名称" 
									:disabled="formItemDisabled"
									clearable 
									></up-input>
							</u-form-item>  
							<u-form-item
								:borderBottom="false"
								label="纳税人识别号" 
								prop="no"  
								ref="no"
								required 
								>  
								<up-input
									v-model="model.no"
									placeholder="纳税人识别号"  
									:disabled="formItemDisabled"
									clearable 
									></up-input>
							</u-form-item>    
							
							<u-form-item
								:borderBottom="false"
								label="电话" 
								prop="tel"  
								ref="tel"
								required 
								>  
								<up-input
									type="number"
									v-model="model.tel"
									placeholder="电话"  
									:disabled="formItemDisabled"
									clearable 
									></up-input>
							</u-form-item>     
							
							<u-form-item
								:borderBottom="false"
								label="开户行" 
								prop="bank"  
								ref="bank"
								required 
								>  
								<up-input
									v-model="model.bank"
									placeholder="开户行"  
									:disabled="formItemDisabled"
									clearable 
									></up-input>
							</u-form-item>    
							<u-form-item
								:borderBottom="false"
								label="银行账号" 
								prop="account"  
								ref="account"
								required 
								>  
								<up-input
									v-model="model.account"
									placeholder="银行账号"  
									:disabled="formItemDisabled"
									clearable 
									></up-input>
							</u-form-item>    
							<u-form-item
								:borderBottom="false"
								label="地址" 
								prop="address"  
								ref="address"
								required 
								> 
								<u--textarea
									v-model="model.address" 
									placeholder="地址"  
									:disabled="formItemDisabled"
									clearable 
								></u--textarea>  
							</u-form-item>    
							<u-form-item
								:borderBottom="false"
								label="邮箱" 
								prop="email"  
								ref="email"
								required 
								>  
								<up-input
									v-model="model.email"
									placeholder="邮箱"  
									:disabled="formItemDisabled"
									clearable 
									></up-input>
							</u-form-item> 
						</template>
						<template v-else>
							<up-alert description="点击发票信息可快速填入发票信息" type="warning"></up-alert>
							<template v-if="detail.name">
								<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-20 u-m-t-20">
									<view class="item text-base">当前订单发票信息</view>
									<view class="item u-info u-font-24">{{detail.uptime}}</view>
								</view>
								<view class="u-flex u-flex-items-start u-m-b-40 u-font-30" @click="invoiceCardClcik(detail)">
									<view class="invoice-card u-border u-radius-10 " style="overflow: hidden;">
										<view class="u-flex u-flex-items-center u-flex-between u-p-20 u-border-bottom" style="background-color: #f8f8f8;">
											<view class="item text-bold u-font-32">
												{{detail.name}}
											</view>
											<view class="item text-base">
												{{detail.tel}}
											</view>
										</view>
										<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10 u-p-l-20 u-p-r-20" >
											<view class="item u-info">纳税人识别号</view>
											<view class="item">{{detail.no}}</view>
										</view>
										<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10 u-p-l-20 u-p-r-20" >
											<view class="item u-info">开户行</view>
											<view class="item">{{detail.bank}}</view>
										</view>
										<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10 u-p-l-20 u-p-r-20" >
											<view class="item u-info">银行账号</view>
											<view class="item">{{detail.account}}</view>
										</view>
										<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10 u-p-l-20 u-p-r-20" >
											<view class="item u-info">邮箱</view>
											<view class="item">{{detail.email}}</view>
										</view>
										<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10 u-p-l-20 u-p-r-20" >
											<view class="item u-info">地址</view>
											<view class="item">{{detail.address}}</view>
										</view>
									</view>  
								</view>
							</template>
							<view class="u-flex u-flex-between u-flex-items-center u-p-5  u-m-b-20 u-m-t-20">
								<view class="item text-base">发票推送历史记录</view> 
							</view>
							<view class="u-flex u-flex-items-start u-m-b-20 u-font-30"
								v-for="(item, index) in invoiceList"
								:key="item.id"
								@click="invoiceCardClcik(item)"
							>
								<view class="invoice-card u-border u-radius-10 " style="overflow: hidden;">
									<view class="u-flex u-flex-items-center u-flex-between u-p-20 u-border-bottom" style="background-color: #f8f8f8;">
										<view class="item text-bold u-font-32">
											{{item.name}}
										</view>
										<view class="item text-base">
											{{item.tel}}
										</view>
									</view>
									<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10 u-p-l-20 u-p-r-20" >
										<view class="item u-info">纳税人识别号</view>
										<view class="item">{{item.no}}</view>
									</view>
									<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10 u-p-l-20 u-p-r-20" >
										<view class="item u-info">开户行</view>
										<view class="item">{{item.bank}}</view>
									</view>
									<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10 u-p-l-20 u-p-r-20" >
										<view class="item u-info">银行账号</view>
										<view class="item">{{item.account}}</view>
									</view>
									<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10 u-p-l-20 u-p-r-20" >
										<view class="item u-info">邮箱</view>
										<view class="item">{{item.email}}</view>
									</view>
									<view class="u-flex u-flex-between u-flex-items-center u-p-5 u-m-b-10 u-p-l-20 u-p-r-20" >
										<view class="item u-info">地址</view>
										<view class="item">{{item.address}}</view>
									</view>
								</view> 
							</view>
							<up-loadmore loadmoreText="已经到底了" status="nomore" />
						</template>
					</u--form>
					
				</scroll-view> 
			</view>  
			<template #footer> 
				<view class="u-flex u-flex-items-center u-flex-between" v-if="btnShow">
					<view class="u-p-20 u-flex-1">
						<u-button type="error" shape="circle" plain @click="saveInvoiceBtn">保存</u-button>
					</view>
					<view class="u-p-20 u-flex-1" v-if="!formChange && model.name">
						<u-button type="error" shape="circle" @click="checkInvoiceBtn">确认信息并推送</u-button>
					</view>
				</view>
				
			</template>
		</PopupNormal>
	</view>  
</template>

<script setup>
	import { onLoad, onReady } from "@dcloudio/uni-app";
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
	const attrs = useAttrs()
	const $api = inject('$api')
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { themeColor, configBaseURL, configHeader } = toRefs(base)
	import { userStore } from '@/stores/user'
	const user = userStore();
	const { user_info } = toRefs(user)
	const props = defineProps({  
		list: {
			type: Object,
			default: () => {
				return {}
			},
		}
	})    
	const emits = defineEmits(['submit']) 
	const invoiceFormShow = ref(true)   
	const model = ref({  
		name: '', 
		no: '', 
		address: '', 
		tel: '', 
		bank: '', 
		account: '', 
		email: '', 
	})
	const detail = ref({})
	const invoiceList =ref([])
	const isFirst = ref(false)
	const invoiceLoading = ref(false)
	const modeBtn = computed(() => {
		if(invoiceFormShow.value) return '历史记录'
		return '返回表单'
	})
	const formChange = computed(() => {
		let flag = false;
		if(
			model.value.name != detail.value.name || 
			model.value.no != detail.value.no ||
			model.value.address != detail.value.address ||
			model.value.tel != detail.value.tel ||
			model.value.bank != detail.value.bank ||
			model.value.account != detail.value.account ||
			model.value.email != detail.value.email 
		) {
			flag = true
		}
		return flag
	})
	const btnShow = computed(() => {
		return invoiceFormShow.value && detail.value?.zt == 0
	})
	const formItemDisabled = computed(() => {
		return detail.value?.zt != 0
	})
	const uForm = ref(null) 
	const rules = {
		name: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
		no: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
		address: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
		tel: [
			{
				required: true, 
				message: '请输入手机号',
				trigger: ['change','blur'],
			},
			{ 
				validator: (rule, value, callback) => { 
					return uni.$u.test.mobile(value);
				},
				message: '手机号码不正确', 
				trigger: ['change','blur'],
			}
		],
		bank: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
		account: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},   
		email: [
			{
				required: true, 
				message: '不能为空',
				trigger: ['blur', 'change']
			},
			{ 
				type: 'email',
				message: '填写正确的邮箱',
				trigger: ['blur', 'change']
			}
		],   
		
	}
 
	onMounted(async () => {  
	})  
	onReady(() => {
		uForm.value.setRules(rules)
	})      
	function changeInvoiceMode() {
		invoiceFormShow.value = !invoiceFormShow.value
	}
	function saveInvoiceBtn() {
		uForm.value.validate().then(async () => { 
			await saveInvoiceData()
		}).catch(errors => {
			console.log(errors)
			uni.$u.toast('请检查表单')
		})  
	}  
	async function saveInvoiceData() {
		let params = {
			...model.value
		} 
		const res = await $api.add_invoice({order: props.list.id, ...params})
		if(res.code == 1) {
			await open()
			checkInvoiceBtn()
		}
	}
	function checkInvoiceBtn() { 
		if(!detail.value.id) return
		emits('submit')
	}
	function close() { 
		invoiceFormShow.value = true
		invoiceLoading.value = false
	}
	async function open() { 
		invoiceLoading.value = true
		try{
			await getInvoiceData()
		}catch(e){
			//TODO handle the exception
		}
		invoiceLoading.value = false
		
	}
	async function getInvoiceData() {
		const res = await $api.order_invoice({params: {order: props.list.id}})
		if(res.code == 1) {
			invoiceList.value = res.list
			detail.value = res.detail
			setInvoiceFormData(res.detail) 
		}
	}
	function setInvoiceFormData(data) {
		model.value.name = data.name
		model.value.no = data.no
		model.value.address = data.address
		model.value.tel = data.tel+''
		model.value.bank = data.bank
		model.value.account = data.account
		model.value.email = data.email
	}
	function invoiceCardClcik(data) {
		uni.showModal({
			title: '提示',
			content: '确认覆盖当前表单发票内容',
			success: async function (res) {
				if (res.confirm) { 
					setInvoiceFormData(data)
					invoiceFormShow.value = true
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
		
	}
</script>

<style lang="scss" scoped>
	.list-w {
		height: 70vh;
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
	.invoice-card {
		box-sizing: border-box;
		width: 100%;
	}
	.shop-card-main {
		.product-item {
			position: relative;
			z-index: 10;
			.disabled-bg { 
				position: absolute;
				z-index: 20;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(255,255,255,.5);
				display: none;
				&.disabled {
					display: block;
				}
			}
			.item {
				&.checkbox {
					height: 80px;
				}
				&.info {
					min-height: 80px;
				}
			}
		}
	}
</style>