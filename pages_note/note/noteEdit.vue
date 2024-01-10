<template>
	<view class="w u-p-20">
		
		<template v-if="success == 1">
			<view  class="u-p-20 u-p-l-40 bg-white u-radius-10 u-flex-column u-flex-items-center u-flex-center">
				<view class="u-m-t-40 u-m-b-40">
					<u-icon name="checkmark-circle-fill" color="#F12E24" size="50"></u-icon>
				</view>
				<view class="u-font-34 u-m-b-40">发布成功</view>
			</view>
			<!-- <view class="u-p-t-30 u-p-b-30">
				<view class="u-flex u-flex-items-center u-flex-center">
					<view class="item u-flex-1">
						<u-button type="error" @click="success = 0" >返回</u-button>
					</view> 
				</view>   
			</view> -->  
		</template>  
		<template v-else>
			<view class="u-p-20 bg-white">
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
					 	prop="info"  
					 	ref="info"
					 	required 
					 	>  
						<u--textarea 
							v-model="model.info" 
							placeholder="请输入笔记（文案）"  
							:customStyle="{border: 'none'}"
							autoHeight
						></u--textarea>
					</u-form-item> 
					<u-form-item
						:borderBottom="false"
						label="上传类型" 
						> 
						<u-radio-group
							v-model="mode" 
							@change="groupChange"
							:activeColor="themeColor"
							>
							<u-radio
							  :customStyle="{marginRight: '8px'}"
							  v-for="(item, index) in modeTabs"
							  :key="item.value"
							  :label="item.name"
							  :name="item.value" 
							>
							</u-radio>
						  </u-radio-group>
						
					</u-form-item>   
					<u-form-item > 
						<view v-if="mode == '1'">
							<u-upload 
								:fileList="fileLists.pic"
								@afterRead="afterRead"
								@delete="deletePic"
								name="pic"
								multiple
								:maxCount="4"
								:maxSize="2048000"
								@oversize="handleoversize(2)"
							></u-upload>
							<view class="u-info u-font-28">建议上传2M以内的图片</view>
						</view>
						<view v-if="mode == '2'">
							<!-- <u-upload 
								accept='video'
								:fileList="fileLists.pic"
								@afterRead="afterRead"
								@delete="deletePic"
								name="pic" 
								:maxCount="1"
								:maxSize="40960000"
								@oversize="handleoversize(40)"
							></u-upload> --> 
							<view class="u-info u-font-28">视频</view>
						</view>
					</u-form-item>
				</u--form>
			</view>
		</template>
		
		 
	</view>
	<u-safe-bottom></u-safe-bottom>
	<TabBar >
		<view class="pan-tabbar u-flex u-flex-items-center u-flex-around " style="height: 100%;"> 
			<view class="item-btn  u-flex u-flex-items-center u-flex-center u-flex-1 u-p-10 u-p-l-20 u-p-r-20">
				<u-button type="error" shape="circle" @click="submit">{{config.submitBtnText}}</u-button>
	
			</view>
		</view>
	
	</TabBar> 
</template>
 
<script> 
const VodUploader = require('../../utils/vod-wx-sdk-v2.js');
// import '../../utils/vod-wx-sdk-v2.js'
console.log(VodUploader)
</script>
<script setup>
	import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue'
	import { share } from '@/composition/share.js'
	import useDataList from '@/composition/useDataList.js'
	import {useCateStore, baseStore} from '@/stores/base.js'  
	// import * as all from  '@/pages_note/note/vod-wx-sdk-v2.js'
	// const VodUploader = require('@/pages_note/note/vod-wx-sdk-v2.js');
	// console.log(all)
	const base = baseStore() 
	const {themeColor, empty} = toRefs(base)
	const { setOnlineControl } = share()
	const $api = inject('$api')
	const id = ref('') 
	const model = ref({
		info: '',
		pic: ''
	})  
	const fileLists = reactive({
		pic: [] 
	});
	const success = ref(0)
	const uForm = ref('') 
	const uToast = ref('') 
	const mode = ref(1)
	const modeTabs = ref([
		{
			name: '图片',
			disabled: false,
			value: 1,
		},
		{
			name: '视频',
			disabled: false,
			value: 2,
		}
	])
	const config = computed(() => {
		let func = 'add_product_longs';
		let submitBtnText = '确认发布';
		let params = {...model.value, id: id.value };  
		return {
			func,
			submitBtnText,
			params
		}
	}) 
	const loading = ref(false)
	const rules = {
		info: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
	}
	onLoad(async (options) => { 
		if (options.hasOwnProperty('id')) {
			id.value = options.id
		}    
		// await initDataList() 
	})
	function groupChange(e) {
		
	}
	// 新增图片
	async function afterRead(event) {
		console.log(event)
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
			const result = await base.uploadFilePromise(item.thumb)  
			obj.splice(i, 1, Object.assign(item, {
				status: 'success',
				message: '',
				url: result.list[0],
				name: result.list[0]
			}))  
			
			
		}
		model.value[event.name]= fileLists[event.name].map(ele => ele.url).join('|')
	}  
	function deletePic(event) {
		fileLists[event.name].splice(event.index, 1) 
	} 
	function handleoversize(mb) {
		uni.showToast({
			title: `建议上传${mb}M以内的图片`,
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
					success.value = 1 
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
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

</style>
