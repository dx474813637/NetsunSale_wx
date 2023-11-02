<template>
	<view class="u-p-30 bg " style="padding-bottom: 60px!important;">
		
		<view  class="u-p-20 u-p-l-40 bg-white u-radius-5">
			  
			<u--form 
				labelPosition="top" 
				:model="model" 
				:rules="rules" 
				ref="uForm"
				labelWidth="100%"
				:borderBottom="false"
				:labelStyle="{color: '#7c88a0', fontSize: '30rpx', lineHeight: '18px'}"
				>
				 
				<u-form-item
				 	:borderBottom="false"
				 	label="姓名（每家限3人）" 
				 	prop="name"  
				 	ref="name"
				 	required 
				 	> 
				 	<up-input 
				 		v-model="model.name"
				 		placeholder="姓名（每家限3人）"
				 		></up-input> 
				</u-form-item>   
				<u-form-item
				 	:borderBottom="false"
				 	label="公司（全称/独立带货主播）" 
				 	prop="company"  
				 	ref="company"
				 	required 
				 	> 
				 	<up-input 
				 		v-model="model.company"
				 		placeholder="公司（全称/独立带货主播）"
				 		></up-input> 
				</u-form-item>    
				<u-form-item
				 	:borderBottom="false"
				 	label="职位" 
				 	prop="duties"  
				 	ref="duties" 
				 	> 
				 	<up-input 
				 		v-model="model.duties"
				 		placeholder="职位"
				 		></up-input> 
				</u-form-item>  
				
				<u-form-item
				 	:borderBottom="false"
				 	label="旗下主播数量" 
				 	prop="info"  
				 	ref="info" 
				 	> 
				 	<up-input 
				 		v-model="model.info"
				 		placeholder="旗下主播数量"
				 		></up-input> 
				</u-form-item>  
				<u-form-item
				 	:borderBottom="false"
				 	label="联系号码" 
				 	prop="phone"  
				 	ref="phone"
				 	required 
				 	> 
				 	<up-input 
				 		v-model="model.phone"
				 		placeholder="联系号码"
				 		></up-input> 
				</u-form-item> 
				<u-form-item
				 	:borderBottom="false"
				 	label="验证码" 
				 	prop="msgcode"  
				 	ref="msgcode"
				 	required 
				 	> 
				 	<up-input
				 		v-model="model.msgcode" 
				 		placeholder="验证码" 
				 		clearable > 
				 		<template #suffix>
				 			<up-code
				 				ref="uCode"
				 				@change="codeChange"
				 				seconds="20"
				 				changeText="X秒重新获取"
				 			></up-code>
				 			<up-button
				 				@tap="getCode"
				 				:text="tips"
				 				type="warning"
				 				size="small"
				 			></up-button>
				 		</template> 
				 	</up-input>
				</u-form-item> 
				<u-form-item
				 	:borderBottom="false"
				 	label="推荐人" 
				 	prop="recommend1"  
				 	ref="recommend1" 
				 	required 
				 	> 
					<view @click="show = true">
						<up-input
							v-model="model.recommend1"
							placeholder="推荐人"
							suffixIcon="arrow-down"
							suffixIconStyle="color: #909399"
							readonly 
							></up-input> 
					</view> 
				</u-form-item> 
				<u-picker 
					:show="show" 
					:columns="columns" 
					@confirm="confirm"
					@cancle="show = false"
					closeOnClickOverlay
					@close="show = false"
				></u-picker>
				<u-form-item
				 	:borderBottom="false"
				 	label="协办推荐" 
				 	prop="recommend2"  
				 	ref="recommend2" 
				 	required 
				 	> 
					<view @click="show2 = true">
						<up-input
							v-model="model.recommend2"
							placeholder="协办推荐"
							suffixIcon="arrow-down"
							suffixIconStyle="color: #909399"
							readonly 
							></up-input> 
					</view>  
				</u-form-item>
				<u-picker 
					:show="show2" 
					:columns="columns2" 
					@confirm="confirm2"
					@cancle="show2 = false"
					closeOnClickOverlay
					@close="show2 = false"
				></u-picker>
				<u-form-item
				 	:borderBottom="false"
				 	label="开播平台（可多选）" 
				 	prop="platform"  
				 	ref="platform" 
				 	required 
				 	> 
				 	<u-checkbox-group
						v-model="checkboxValue1"
						placement="row"
						@change="checkboxChange"
					>
						<u-checkbox
							:customStyle="{marginBottom: '8px', marginRight: '15px'}"
							v-for="(item, index) in checkboxList1"
							:key="item"
							:label="item"
							:name="item"
						>
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item
				 	:borderBottom="false"
				 	label="备注(其他推荐人或多个联系人以及手机号可填此处)" 
				 	prop="remark"  
				 	ref="remark" 
				 	> 
				 	<up-input 
				 		v-model="model.remark"
				 		placeholder="备注"
				 		></up-input> 
				</u-form-item> 
			</u--form> 
			
		</view>
		<view class="u-p-t-30 u-p-b-30">
			<view class="u-flex u-flex-items-center u-flex-center">
				<view class="item u-flex-1">
					<u-button type="primary" @click="submit" :loading="loading" :disabled="loading">{{config.submitBtnText}}</u-button>
				</view> 
			</view>
			<view class="u-flex u-flex-items-center u-flex-center u-m-t-40">
				<u-icon name="checkmark-circle" size="15" color="#aaa"></u-icon>
				<view class="text-light u-font-28 u-m-l-20">信息安全保障中</view>
			</view>
		</view>   
	</view>
	
	<u-safe-bottom></u-safe-bottom>
	<MenusBar mode="2"></MenusBar>
</template>
<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue' 
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	import {useFinanceStore} from '@/stores/finance'
	import usePacc from '@/composition/usePacc.js'
	import { share } from '@/composition/share.js' 
	const { setOnlineControl } = share()
	const user = userStore()
	const { tmp_id_list, user:u  } = toRefs(user)
	const finance = useFinanceStore()
	import useFilter from '@/composition/useFilter.js' 
	
	const $api = inject('$api')   
	const id = ref('') 
	const cate = ref(2)  
	const config = computed(() => {
		// console.log(this.account)
		let func = 'add_sign';
		let submitBtnText = '提交';
		let params = {...model.value, cate: cate.value }; 
		return {
			func,
			submitBtnText,
			params
		}
	})
	const show = ref(false)
	const show2 = ref(false)
	const uForm = ref()
	const uCode = ref() 
	const tips = ref('')
	const list = ref({})
	const model = ref({
		name: '',
		company: '', 
		phone: '',
		duties: '',
		info: '',
		recommend1: '',
		msgcode: '',
		recommend2: '',
		remark: '',
		platform: '', 
	})
	const rules = {
		name: {
			required: true,
			message: '姓名不能为空',
			trigger: ['blur', 'change']
		},  
		company: {
			required: true,
			message: '公司不能为空',
			trigger: ['blur', 'change']
		},  
		recommend1: {
			required: true,
			message: '推荐人不能为空',
			trigger: ['blur', 'change']
		},  
		recommend2: {
			required: true,
			message: '协办推荐不能为空',
			trigger: ['blur', 'change']
		},  
		platform: {
			required: true,
			message: '平台不能为空',
			trigger: [ 'change']
		},  
		phone: {
			validator: (rule, value, callback) => {
				return uni.$u.test.mobile(value);
			},
			message: '输入正确的手机号',
			trigger: ['blur', 'change']
		}, 
		msgcode: {
			required: true,
			message: '验证码不能为空',
			trigger: ['blur', 'change']
		},  
	}

	const columns = ref([]);
	const columns2 = ref([]);
	const checkboxValue1 =ref([]) 
	const checkboxList1 = ref([])
	onLoad(async(options) => {
		uni.showLoading({
			title: '数据初始化'
		})
		await initData()
		if(options.hasOwnProperty('id')) {
			id.value= options.id
			uni.showLoading({
				title: '获取详情'
			})
			await getSignDetail()
		}   
	})
	onReady(() => {
		uForm.value.setRules(rules)
	})   
	function codeChange(text) {
        tips.value = text;
    }
	async function getCode() {
		if(!uni.$u.test.mobile(model.value.phone)) {
			uForm.value.validateField('phone')
			return
		} 
	    if (uCode.value.canGetCode) {
			  // 模拟向后端请求验证码
			uni.showLoading({
				title: '正在获取验证码'
			}) 
			const res = await $api.msgcode({params: {login: model.value.phone}}) 
			if(res.code == 1) {
				uCode.value.start();
			}
			uni.$u.toast(res.msg);
			
			
	    } else {
			uni.$u.toast('倒计时结束后再发送');
	    }
	} 
	async function getData() {
		const res = await $api.add_detail({params: {cate: cate.value}})
		if(res.code == 1) {
			list.value = res.list
			columns.value[0] = list.value.recommend1
			columns2.value[0] = list.value.recommend2
			checkboxList1.value = list.value.platform
			setOnlineControl(res)
			// model.value.company = res.list.company
			// model.value.platform_reg = res.list.platform_reg
			// model.value.platform_person = res.list.platform_person
			// model.value.platform_is_card = res.list.platform_is_card 
			// model.value.imtoken = res.list.imtoken 
		}
		
	}
	async function getSignDetail() {
		const res = await $api.sign_detail()
		if(res.code == 1) { 
			model.value.company = res.list.company 
			model.value.duties = res.list.duties 
			model.value.info = res.list.info 
			model.value.name = res.list.name 
			model.value.phone = res.list.phone 
			model.value.platform = res.list.platform 
			model.value.recommend1 = res.list.recommend1 
			model.value.recommend2 = res.list.recommend2 
			model.value.remark = res.list.remark  
			checkboxValue1.value = model.value.platform.split(',')
		}
		
	}
	function initData() {
		uni.showLoading()
		getData()
	}
	function submit() {
		uForm.value.validate().then(async () => { 
			// loading.value = true
			uni.showLoading()
			const res = await $api[config.value.func]({...config.value.params}); 
			// loading.value = false
			if(res.code == 1) { 
				uni.reLaunch({
					url: `/pages_user/sign_detail/sign_detail`,
					success() {
						uni.showToast({
							title: res.msg,
							icon: 'success'
						})
					}
				}) 
			}
			
		}).catch(errors => {
			console.log(errors)
			uni.$u.toast('请检查表单')
		}) 
	}
	const confirm = (e) => {
	  console.log('confirm', e);
	  model.value.recommend1 = e.value[0];
	  show.value = false
	};
	const confirm2 = (e) => {
	  console.log('confirm', e);
	  model.value.recommend2 = e.value[0];
	  show2.value = false
	};
	function checkboxChange(n) {
		console.log('change', n);
		model.value.platform = n.join(',')
		uForm.value.validateField('platform')
	}
</script>


<style lang="scss" scoped>
	.bg {
		min-height: 100vh;
		background-image: linear-gradient(to bottom, #e6f2fe, #f6f6f6);
	}
	.select-w {
		position: relative;
	}
	.load-w {
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255,255,255,.2);
		
	}
</style>