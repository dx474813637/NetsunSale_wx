<template>
	<view class="w u-p-20">  
	    <template v-if="success == 1">
	    	<view  class="u-p-20 u-p-l-40 bg-white u-radius-10 u-flex-column u-flex-items-center u-flex-center">
	    		<view class="u-m-t-40 u-m-b-40">
	    			<u-icon name="checkmark-circle-fill" color="#F12E24" size="50"></u-icon>
	    		</view>
	    		<view class="u-font-34 u-m-b-40">发布成功</view>
	    	</view>  
	    </template>  
	    <template v-else>
			<view class="text-base u-font-28 u-p-20">
				关联商品
			</view>
			<view class="u-p-20 box-border bg-white u-radius-10 u-m-b-20">
				<view class="product-list u-p-10">
					<view class="product-item u-flex u-flex-between u-flex-items-center u-m-b-20"
						v-for="(item, index) in dataList"
						:key="item.id"
					>
						<view class="u-flex-1">
							<ProductRowCard
								:origin="item"
								mode="normal"
								:customStyle="{
									'box-shadow': 'none!important'
								}"
							></ProductRowCard>
						</view>
						<!-- <view class="u-flex u-flex-between u-flex-items-center u-m-l-10 u-radius-20 u-p-10" style="background-color: #f00;" @click="removeItem(item)">
							<u-icon name="trash" size="20" color="#fff"></u-icon>
						</view> -->
					</view>
				</view>
				<view class="u-m-t-10">
					<u-button type="primary" shape="circle" plain @click="showProductList = true" >选择商品</u-button>
				</view>
			</view> 
			<view class="u-p-20 bg-white u-p-l-40 u-radius-10">
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
						label="图片" 
						prop="pic"  
						ref="pic" 
						> 
						<u-upload
							:fileList="fileLists.pic"
							@afterRead="afterRead"
							@delete="deletePic"
							name="pic"
							multiple
							:maxCount="9"
							:maxSize="2048000"
							@oversize="handleoversize"
						></u-upload>
					</u-form-item>   
					<u-form-item
					 	:borderBottom="false"
					 	label="文案" 
					 	prop="info"  
					 	ref="info" 
					 	>
						<view class="editor-wrapper">
							<editor 
								id="editor" 
								class="ql-container" 
								placeholder="开始输入..." 
								show-img-size 
								show-img-toolbar
								show-img-resize 
								@statuschange="onStatusChange"  
								@ready="onEditorReady"
								@blur="blur"
							>
							</editor>
						</view>
					</u-form-item>
					
					<!-- <u-form-item
					 	:borderBottom="false"
					 	label="笔记" 
					 	prop="info"  
					 	ref="info"
					 	required 
					 	>  
						<u--textarea 
							v-model="model.info" 
							placeholder="请输入笔记（文案）"  
							:customStyle="{border: 'none'}"
							height="350"
							maxlength="500"
						></u--textarea>
					</u-form-item> --> 
				</u--form>
			</view>
	    </template>  
		 
		 
	</view>
	<u-safe-bottom></u-safe-bottom>
	<ProductListPopup
		:show="showProductList" 
		title="商品列表"  
		:xuanList="dataList"
		:asyncEvent="false"
		singleMode
		:xuan="xuan"
		func="search_shop_product"
		:onUpdateShow="handleChangeShow"  
		@xuanEvent="xuanEvent"
		@cardClick="cardClick"
	></ProductListPopup>
	<TabBar >
		<view class="pan-tabbar u-flex u-flex-items-center u-flex-around " style="height: 100%;"> 
			<view class="item-btn  u-flex u-flex-items-center u-flex-center u-flex-1 u-p-10 u-p-l-20 u-p-r-20">
				<u-button type="error" shape="circle" @click="submit" :disabled="success == 1">{{config.submitBtnText}}</u-button>
	
			</view>
		</view>
	
	</TabBar> 
</template>
  
<script setup>
	import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue'  
	import {useCateStore, baseStore} from '@/stores/base.js'  
	import {userStore} from '@/stores/user.js' 
	const user = userStore() 
	const { biji_files, biji_step, biji_info, biji_linshi, user_info  } = toRefs(user)
	const base = baseStore() 
	const {themeColor, empty} = toRefs(base) 
	const $api = inject('$api')
	const $http = inject('$http') 
	const id = ref('') 
	const model = ref({
		info: '',
		pic: []
	})  
	const fileLists = reactive({
		pic: []
	});
	const showProductList = ref(false)
	const xuan = ref(1)  
	const dataList = ref([])    
	const success = ref(0)
	const uForm = ref('')    
	const editorCtx = ref('')
	const formats = ref({}) 
	const config = computed(() => {
		let func = 'add_pic_text';
		let submitBtnText = '确认发布';
		let params = {...model.value, id: dataList.value.map(ele => ele.id).join(',') };  
		return {
			func,
			submitBtnText,
			params
		}
	})  
	const loading = ref(false) 
	onLoad(async (options) => { 
		if (options.hasOwnProperty('id') && user_info.value.role != 0) {
			id.value = options.id
			await initData()  
		}    
		// console.log(biji_files.value)
	}) 
	const blur = (e) => {
		console.log(e)
		if(containsChinese(e.detail.html)) {
			model.value.info = e.detail.html
		}
		else {
			model.value.info = ''
		}
		uForm.value.validateField('info')
	}
	function containsChinese(str) {
		var pattern = /[\u4e00-\u9fa5]/;
		return pattern.test(str);
	}
	function onEditorReady() {
		// #ifdef MP-BAIDU
		editorCtx.value = requireDynamicLib('editorLib').createEditorContext('editor');
		// #endif

		// #ifdef APP-PLUS || MP-WEIXIN || H5
		uni.createSelectorQuery().select('#editor').context((res) => {
			editorCtx.value = res.context
		}).exec()
		// #endif
	}
	function onStatusChange(e) {
		const formats = e.detail
		formats.value = formats
	}      
	function submit() { 
		let flag1 = false
		let flag2 = false
		if(model.value.pic.length == 0) flag1 = true
		if(!model.value.info) flag2 = true
		if(flag1 && flag2) {
			uni.showToast({
				title: '图片和文字不能同时为空',
				icon: 'none'
			})
			return
		}
		uni.showModal({
			title: '提示',
			content: `${flag1? '未上传图片。': ''}${flag2? '未填写文案。': ''}是否发布`, 
			success: async (r) => {
				if (r.confirm) {
					console.log('用户点击确定'); 
					// uForm.value.validate().then(async () => {
					loading.value = true;
					uni.showLoading()
					try{
						const res = await $api.add_pic_text({...config.value.params});
						if(res.code == 1) { 
							uni.$emit('list_refresh')
							uni.showToast({
								title: res.msg,
								icon: 'success'
							})    
							success.value = 1 
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages_user/pidPicText/pidPicTextMy'
								})
							}, 1500)
						}
					}catch(e){
						//TODO handle the exception
					}
					loading.value = false;
						
					// }).catch(errors => {
					// 	console.log(errors)
					// 	uni.$u.toast('请检查表单')
					// }) 
				} else if (r.cancel) {
					console.log('用户点击取消'); 
				}
			}
		}); 
		
	} 
	async function initData() {
		const res = await $api.web_product_detail({params: {id: id.value}})
		if(res.code == 1) {
			let data = res.list 
			dataList.value = [data]
		}
	} 
	function handleChangeShow(data) {
	 	showProductList.value = data
	}
	function removeItem(data) {
		let i = dataList.value.findIndex(ele => ele.id == data.id)
		if(i == -1) return;
		dataList.value.splice(i, 1)
	} 
	function cardClick({data}) {
		console.log(data)
		dataList.value = [data]
		showProductList.value = false
	}
	function xuanEvent({data, index, checked}) {
		console.log(data, data.checked)
		if(!xuan.value) {
			// initDataParams(); 
			xuan.value = 1
			// loadstatus.value = 'nomore'
			// initDataParams();
			// getData()
		}
		if(data.checked) {
			dataList.value.unshift(data)
			// dataList.value = dataList.value.sort((a,b) => b.id - a.id )
		}
		else {
			let i = dataList.value.findIndex(ele => ele.id == data.id)
			if(i == -1) return;
			dataList.value.splice(i, 1)
			// if(dataList.value.length == 0) {
			// 	initDataParams();
			// 	getData()
			// }
		}
		console.log(dataList.value)
	}
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
	.editor-wrapper {
		height: 400px;
		background: #fff;
	}
	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: 100%;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}
	.step-one {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 200;
		background-color: #222;
		.swiper-w {
			// height: 100%;
			position: relative;
			.error-w {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 20%; 
				width: 100%;
				z-index: 50;
			}
		}
	}
	.preview-pic-w {
		.item {
			border: 2px solid #eee;
			position: relative;
			&.active {
				border-color: #FF2442!important;
			} 
			&.success {
				border-color: #00aa7f;
				.success-w {
					display: flex;
					background-color: rgba(0, 168, 126, .15);
				}
			}
			&.error {
				border-color: #ffaa00;
				.error-w {
					display: flex;
					background-color: rgba(255, 170, 32, 0.1);
				}
			}
			.video-icon {
				position: absolute;
				right: 5%;
				bottom: 5%;
				// transform: translate(-50%, -50%);
			}
			.success-w,
			.error-w, {
				display: none;
				position: absolute;
				z-index: 50; 
				top: 0;
				left: 0;
				width: 100%; 
				height: 100%;
			}
		}
	}
	.w {
		padding-bottom: 60px;
	}
</style>
