<template>
	<view class="u-p-30 bg box-border" style="padding-bottom: 60px!important;">
		
		<template v-if="success == 1">
			<view  class="u-p-20 u-p-l-40 bg-white u-radius-10 u-flex-column u-flex-items-center u-flex-center">
				<view class="u-m-t-40 u-m-b-40">
					<u-icon name="checkmark-circle-fill" color="#F12E24" size="50"></u-icon>
				</view>
				<view class="u-font-34 u-m-b-40">提交成功</view>
			</view>
			<view class="u-p-t-30 u-p-b-30">
				<view class="u-flex u-flex-items-center u-flex-center">
					<view class="item u-flex-1">
						<u-button type="error" @click="success = 0" >返回</u-button>
					</view> 
				</view>   
			</view>   
		</template>  
		<template v-else>
			<view class="u-flex u-flex-between u-flex-items-center text-base u-p-10 u-font-28 u-m-b-20" v-if="origin.id">
				<view class="item">最近更新：{{origin.uptime}}</view>
				<view class="item">
					<template v-if="origin.zt == 1">待认证</template>
					<template v-if="origin.zt == 2">成功认证</template>
				</view>
			</view>
			<view  class="u-p-20 u-p-l-40 bg-white u-radius-10">
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
						label="姓名" 
						prop="name"  
						ref="name"
						required 
						> 
						<up-input
							v-model="model.name" 
							placeholder="姓名"
							clearable 
							:readonly="disabled"
						></up-input>  
					</u-form-item> 
					<u-form-item
						:borderBottom="false"
						:label="onlineConfig.id_card" 
						prop="id_card"  
						ref="id_card" 
						required 
						v-if="sh != 1"
						> 
						<up-input
							v-model="model.id_card" 
							placeholder="身份证号码"
							clearable 
							:readonly="disabled"
						></up-input> 
					</u-form-item>  
					<u-form-item
						:borderBottom="false"
						label="手机" 
						prop="phone"  
						ref="phone" 
						required 
						> 
						<up-input
							v-model="model.phone" 
							placeholder="手机"
							clearable 
							:readonly="disabled"
						></up-input> 
					</u-form-item>  
					<template v-if="sh != 1">
						<u-form-item
							:borderBottom="false"
							:label="onlineConfig.bank_account" 
							prop="bank_account"  
							ref="bank_account" 
							required 
							> 
							<up-input
								v-model="model.bank_account" 
								placeholder="银行卡或支付宝账号"
								clearable 
								:readonly="disabled"
							></up-input> 
						</u-form-item> 
						<u-form-item
							:borderBottom="false"
							:label="onlineConfig.front_img" 
							prop="front_img"  
							ref="front_img" 
							required 
							> 
							<template v-if="disabled">
								<up-image
									:src="model.front_img"
									width="200px"
									height="auto"
									mode="widthFix"
									@click="previewImage([model.front_img])"
								></up-image>
							</template>
							<u-upload
								v-else
								:fileList="fileLists.front_img"
								@afterRead="afterRead"
								@delete="deletePic"
								name="front_img" 
								:maxCount="1" 
								:maxSize="2048000"
								@oversize="handleoversize"
							></u-upload>
						</u-form-item>
						<u-form-item
							:borderBottom="false"
							:label="onlineConfig.back_img" 
							prop="back_img"  
							ref="back_img" 
							required 
							> 
							<template v-if="disabled">
								<up-image
									:src="model.back_img"
									width="200px"
									height="auto"
									mode="widthFix"
									@click="previewImage([model.back_img])"
								></up-image>
							</template>
							<u-upload
								v-else
								:fileList="fileLists.back_img"
								@afterRead="afterRead"
								@delete="deletePic"
								name="back_img" 
								:maxCount="1" 
								:maxSize="2048000"
								@oversize="handleoversize"
							></u-upload>
						</u-form-item>   
						<u-form-item
							:borderBottom="false"
							:label="onlineConfig.avatar_img" 
							prop="avatar_img"  
							ref="avatar_img" 
							required 
							> 
							<template v-if="disabled">
								<up-image
									:src="model.avatar_img"
									width="200px"
									height="auto"
									mode="widthFix"
									@click="previewImage([model.avatar_img])"
								></up-image>
							</template>
							<u-upload
								v-else
								:fileList="fileLists.avatar_img"
								@afterRead="afterRead"
								@delete="deletePic"
								name="avatar_img" 
								:maxCount="1" 
								:maxSize="2048000"
								@oversize="handleoversize"
							></u-upload>
						</u-form-item>
					</template>
					   
				</u--form> 
				
			</view>
			<view class="u-p-t-30 u-p-b-30">
				<view class="u-flex u-flex-items-center u-flex-center" v-if="!disabled">
					<view class="item u-flex-1">
						<u-button type="error" @click="submit" :loading="loading" throttleTime="500">{{config.submitBtnText}}</u-button>
					</view> 
				</view> 
				<view class="u-flex u-flex-items-center u-flex-center u-m-t-40">
					<u-icon name="checkmark-circle" size="15" color="#aaa"></u-icon>
					<view class="text-light u-font-28 u-m-l-20">信息安全保障中</view>
				</view>
			</view>   
		</template>
		
	</view>
	
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar>
</template>
<script setup>
	import { onLoad, onReady, onShareTimeline, onShareAppMessage, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue' 
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user' 
	const user = userStore()
	const base = baseStore()  
	
	const $api = inject('$api')    
	const config = computed(() => {
		let func = 'save_linghuo';
		let submitBtnText = '提交';
		let params = {...model.value };  
		return {
			func,
			submitBtnText,
			params
		}
	}) 
	const loading = ref(false)
	const success = ref(0)
	const uForm = ref()  
	const origin = ref({})
	const model = ref({ 
		name: '',
		id_card: '',
		phone: '',
		bank_account: '',
		front_img: '', 
		back_img: '', 
		avatar_img: '', 
	}) 
	const sh = ref(0)
	const zt = ref('')
	const fileLists = reactive({
		front_img: [],
		back_img: [],
		avatar_img: []
	});
	const onlineConfig = ref({})
	const disabled = computed(() => {
		return origin.value.zt == 2
	})
	const rules = {
		name: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},   
		id_card: {
			validator: (rule, value, callback) => uni.$u.test.idCard(value) ,
			message: '号码不正确',
			trigger: ['blur', 'change']
		},   
		phone: {
			validator: (rule, value, callback) => uni.$u.test.mobile(value),
			message: '手机号码不正确',
			trigger: ['blur', 'change']
		},   
		bank_account: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},   
		front_img: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},   
		back_img: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},   
		avatar_img: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},   
	}
	onLoad(async(options) => { 
		uni.showLoading()
		await getData()
	})
	onReady(() => {
		uForm.value.setRules(rules)
	})    
	function previewImage(imgs, index=0,) {
   		uni.previewImage({
   			urls: imgs,
   			current: index, 
   			loop: true
   		})
   	} 
	async function getData() {
		const res = await $api.linghuo();
		if(res.code == 1) { 
			zt.value = res.list?.zt
			origin.value = res.list || {}
			sh.value = res.sh;
			onlineConfig.value = res.info
			initForm(res)
			if(res.sh != 1) {
				uni.setNavigationBarTitle({
					title: res.title
				})
			}
			
			// setOnlineControl(res)
		}
	}
	function initForm(res) {  
		let data = res.list || {}
		model.value.name = data.name
		model.value.id_card = data.id_card 
		model.value.phone = data.phone 
		model.value.bank_account = data.bank_account  
		if(data.front_img) {
			model.value.front_img = data.front_img
			fileLists.front_img = [{url: data.front_img}]
		}
		if(data.back_img) {
			model.value.back_img = data.back_img
			fileLists.back_img = [{url: data.back_img}]
		}
		if(data.avatar_img) {
			model.value.avatar_img = data.avatar_img
			fileLists.avatar_img = [{url: data.avatar_img}]
		}
	}
	// 新增图片
	async function afterRead(event) {
		// console.log(event)
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		let lists = [].concat(event.file)
		let obj = fileLists[event.name]
		let fileListLen = obj.length
		lists.map((item, index) => {
			obj.push({
				...item,
				status: 'uploading',
				message: '上传中'
			})
		})
		console.log(lists)
		for (let i = 0; i < obj.length; i++) {
			let item = obj[i]
			console.log(item) 
			const result = await base.uploadFilePromise(item.thumb, 'upimg1')  
			if(result.code == 1) {
				obj.splice(i, 1, Object.assign(item, {
					status: 'success',
					message: '',
					url: result.list[0],
					name: result.list[0]
				}))  
			}
			else {
				obj.splice(i, 1)  
				uni.showToast({
					title: result.msg,
					icon: 'none'
				})
			}
			
			
			
		}
		model.value[event.name]= fileLists[event.name].map(ele => ele.url).join('|')
	}  
	function deletePic(event) {
		fileLists[event.name].splice(event.index, 1) 
		model.value[event.name] = ''
	} 
	function handleoversize() {
		uni.showToast({
			title: '建议上传2M以内的图片',
			icon: 'none'
		})
	} 
	function submit() {
		uForm.value.validate().then(async () => {  
			loading.value = true;
			uni.showLoading()
			try{
				const res = await $api[config.value.func]({...config.value.params});
				if(res.code == 1) { 
					uni.showToast({
						title: res.msg,
						icon: 'success'
					})   
					getData()
					success.value = 1
				}
			}catch(e){
				//TODO handle the exception
			}
			loading.value = false;
			
		}).catch(errors => {
			console.log(errors)
			uni.$u.toast('请检查表单')
		}) 
	}   
	function reset() {
		uForm.value.resetFields()
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
		min-height: 60vh;
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