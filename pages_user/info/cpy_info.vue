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
				 	label="公司名称" 
				 	prop="company"  
				 	ref="company"
				 	required 
				 	> 
				 	<up-input 
				 		v-model="model.company"
				 		placeholder="公司名称"
				 		></up-input> 
				</u-form-item>  
				<u-form-item
				 	:borderBottom="false"
				 	label="头像" 
				 	prop="img"  
				 	ref="img"
				 	required 
				 	> 
				 	<u-upload
				 		:fileList="fileLists.img"
				 		@afterRead="afterRead"
				 		@delete="deletePic"
				 		name="img"
				 		:maxCount="1"
				 		:maxSize="2048000"
				 		@oversize="handleoversize"
				 	></u-upload>
				</u-form-item>    
				<u-form-item
				 	:borderBottom="false"
				 	label="简介" 
				 	prop="info"  
				 	ref="info"
				 	required 
				 	> 
				 	<up-input 
				 		v-model="model.info"
				 		placeholder="简介"
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
				 	label="地址" 
				 	prop="address"  
				 	ref="address"
				 	required 
				 	> 
				 	<up-input 
				 		v-model="model.address"
				 		placeholder="地址"
				 		></up-input> 
				</u-form-item>     
				<u-form-item
				 	:borderBottom="false"
				 	label="联系人" 
				 	prop="contacts"  
				 	ref="contacts"
				 	required 
				 	> 
				 	<up-input 
				 		v-model="model.contacts"
				 		placeholder="联系人"
				 		></up-input> 
				</u-form-item>     
				<!-- <u-form-item
				 	:borderBottom="false"
				 	label="二维码" 
				 	prop="ewm"  
				 	ref="ewm"
				 	required 
				 	> 
				 	<up-input 
				 		v-model="model.ewm"
				 		placeholder="二维码"
				 		></up-input> 
				</u-form-item>     --> 
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
	const base = baseStore()
	const {configBaseURL, configHeader} = toRefs(base)
	const { tmp_id_list, user:u, cpy_info  } = toRefs(user)
	const finance = useFinanceStore()
	import useFilter from '@/composition/useFilter.js' 
	
	const $api = inject('$api')   
	const id = ref('') 
	const cate = ref(1) 
	const loading = ref(false) 
	const areaShow = ref(false)
	const areaLoading = ref(false) 
	const config = computed(() => {
		// console.log(this.account)
		let func = 'save_company';
		let submitBtnText = '提交';
		let params = {...model.value, cate: cate.value }; 
		return {
			func,
			submitBtnText,
			params
		}
	})
	const show = ref(false)
	const uForm = ref()
	const uCode = ref() 
	const tips = ref('')
	const list = ref({})
	const model = ref({ 
		company: '', 
		img: '',
		info: '',
		phone: '',
		address: '',
		contacts: '',
		ewm: '', 
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
	const fileLists = reactive({
		img: []
	});
	onLoad(async(options) => {
		if(options.hasOwnProperty('id')) {
			id.value= options.id
		}   
		initData()
	})
	onReady(() => {
		uForm.value.setRules(rules)
	})   
	// function codeChange(text) {
 //        tips.value = text;
 //    }
	// async function getCode() {
	// 	if(!uni.$u.test.mobile(model.value.phone)) {
	// 		uForm.value.validateField('phone')
	// 		return
	// 	} 
	//     if (uCode.value.canGetCode) {
	// 		  // 模拟向后端请求验证码
	// 		uni.showLoading({
	// 			title: '正在获取验证码'
	// 		}) 
	// 		const res = await $api.msgcode({params: {login: model.value.phone}}) 
	// 		if(res.code == 1) {
	// 			uCode.value.start();
	// 		}
	// 		uni.$u.toast(res.msg);
			
			
	//     } else {
	// 		uni.$u.toast('倒计时结束后再发送');
	//     }
	// } 
	async function getData() {
		const res = await $api.my_company()
		if(res.code == 1) {
			list.value = res.list
			columns.value[0] = list.value.recommend1
			setOnlineControl(res)
			model.value.company = res.list.company
			model.value.img = res.list.img
			model.value.info = res.list.info
			model.value.phone = res.list.phone 
			model.value.address = res.list.address 
			model.value.contacts = res.list.contacts 
			model.value.ewm = res.list.ewm 
			model.value.id = res.list.id 
		}
		
	}
	async function initData() {
		uni.showLoading()
		await user.getCpyInfo() 
		model.value.company = cpy_info.value.company
		model.value.img = cpy_info.value.img
		fileLists.img = [{url: cpy_info.value.img}]
		model.value.info = cpy_info.value.info
		model.value.phone = cpy_info.value.phone 
		model.value.address = cpy_info.value.address 
		model.value.contacts = cpy_info.value.contacts 
		model.value.ewm = cpy_info.value.ewm 
		model.value.id = cpy_info.value.id 
	}
	function submit() {
		uForm.value.validate().then(async () => { 
			loading.value = true
			uni.showLoading()
			const res = await $api[config.value.func]({...config.value.params}); 
			loading.value = false
			if(res.code == 1) { 
				uni.showToast({
					title: res.msg,
					icon: 'success'
				}) 
				user.getCpyInfo() 
				
			}
			
		}).catch(errors => {
			console.log(errors)
			uni.$u.toast('请检查表单')
		}) 
	} 
	function deletePic(event) {
		fileLists[event.name].splice(event.index, 1)
		
		// this.model.pic1 = ''
		// this.model.pic1_base64 = ''
		// this.model.pic1_name = ''
	} 
	// 新增图片
	async function afterRead(event) {
		console.log(event)
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		let lists = [].concat(event.file)
		let fileListLen = fileLists[event.name].length
		lists.map((item, index) => {
			fileLists[event.name].push({
				...item,
				status: 'uploading',
				message: '上传中'
			})
		})
		console.log(lists)
		for (let i = 0; i < lists.length; i++) {
			const result = await uploadFilePromise(lists[i].url) //base.getImageBase64_readFile(lists[i].url)
			let item = fileLists[event.name][i]
			fileLists[event.name].splice(i, 1, Object.assign(item, {
				status: 'success',
				message: '',
				url: result.list,
				name: lists[i].url
			})) 
			
		}
		model.value[event.name]= fileLists[event.name][0].url
	}
	function uploadFilePromise(url) {
		return new Promise((resolve, reject) => {
			
			uni.uploadFile({
				url: `${configBaseURL.value}upimg`, 
				filePath: url,
				name: 'file',
				header: {
					...configHeader.value,
					'content-type': 'multipart/form-data',
					userid: uni.getStorageSync('userid'),
				},
				success: (res) => {
					console.log(res)
					resolve(JSON.parse(res.data))
				},
				fail(error) { 
					console.log(error)
					reject(error)
				}
			});
		})
	}
	function handleoversize() {
		uni.showToast({
			title: '建议上传2M以内的图片',
			icon: 'none'
		})
	}
	
</script>

<style lang="scss">
	page {
		::v-deep {
			.u-upload__deletable {
				width: 30px!important;
				height: 30px!important;
				background-color: #f00!important;
				.u-upload__deletable__icon { 
					transform: scale(1)!important;
					top: 6px!important; 
					right: 4px!important;
					.uicon-close {
						font-size: 16px!important;
					}
				}
			}
		}
	}
</style>

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