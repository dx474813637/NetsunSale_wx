<template>
	<view>
		<PopupNormal v-bind="$attrs" > 
			<view class="list-w bg-white">   
				<scroll-view class="main-list  u-p-30" scroll-y >
					<template v-if="serviceFormShow">
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
							 
							<u-form-item
							 	:borderBottom="false"
							 	label="售后服务" 
							 	prop="cate"  
							 	ref="cate"
							 	required 
							 	> 
								<u-radio-group
								    v-model="model.cate" 
									@change="groupChange"
									>
								    <u-radio
								      :customStyle="{marginRight: '8px'}"
								      v-for="(item, index) in serviceRadiolist"
								      :key="index"
								      :label="item.name"
								      :name="item.name" 
								    >
								    </u-radio>
								  </u-radio-group>
							 	
							</u-form-item>   
							<u-form-item
							 	:borderBottom="false"
							 	label="具体说明" 
							 	prop="info"  
							 	ref="info"
							 	required 
							 	> 
								<u--textarea
									v-model="model.info" 
									placeholder="具体说明" 
								></u--textarea>  
							</u-form-item> 
							<u-form-item
							 	:borderBottom="false"
							 	label="凭证(至多4张,每张大小不超过2MB)" 
							 	prop="img"  
							 	ref="img"
							 	required 
							 	> 
							 	<u-upload
							 		:fileList="fileLists.img"
							 		@afterRead="afterRead"
							 		@delete="deletePic"
							 		name="img"
									multiple
							 		:maxCount="4"
							 		:maxSize="2048000"
							 		@oversize="handleoversize"
							 	></u-upload>
							</u-form-item>   
						</u--form>
					</template>
					<template v-else>
						<view class="u-flex u-flex-items-start u-m-b-20 u-font-30"
							v-for="(item, index) in list.service"
							:key="item.id"
						>
							<view class="service-card u-border u-radius-10 " style="overflow: hidden;">
								<view class="u-flex u-flex-between u-flex-items-center u-p-20 u-border-bottom" style="background-color: #f8f8f8;">
									<view class="item text-bold u-font-32">
										{{item.cate}}
									</view>
									<view class="item text-base">
										{{item.ctime}}
									</view>
								</view>
								<view class="u-flex u-flex-between u-flex-items-center u-p-20"> 
									<view class="item text-base ">
										具体原因：{{item.info}}
									</view>
								</view>
								<view class="u-flex u-flex-items-start u-flex-wrap u-p-20" v-if="item.img">
									<view class="item u-m-10"
										v-for="(img, index) in item.img.split('|')"
										:key="index"
										@click="previewImage(index, item.img.split('|'))"
									>
										<up-image
											width="60px"
											height="60px"
											radius="5px"
											:src="img"
											:customStyle="{border: '1px solid #eee'}"
										></up-image>
									</view>
									
								</view>
							</view> 
						</view>
					</template>
					
				</scroll-view> 
			</view>  
			<template #footer>
				<view class="u-p-20">
					<u-button type="error" shape="circle" @click="serviceBtn">我要售后</u-button>
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
			type: Array,
			default: () => {
				return []
			},
		}
	})    
	const emits = defineEmits(['submitService'])
	const serviceFormShow = ref(false)  
	const serviceRadiolist = reactive([
		  {
			name: '退货',
			disabled: false,
		  },
		  {
			name: '换货',
			disabled: false,
		  }, 
	]);
	const model = ref({ 
		cate: '', 
		info: '',
		img: [], 
	})
	const uForm = ref(null)
	const fileLists = reactive({
		img: []
	});
	const rules = {
		cate: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},   
	}
	onMounted(async () => {  
	})  
	watch(
		() => serviceFormShow.value,
		(n) => {
			if(n) {
				setTimeout(() => {
					uForm.value.setRules(rules)
				}, 100)
				// nextTick(() => {
				// 	uForm.value.setRules(rules)
				// })
				
			}
		}
	)
	watch(
		() => attrs.show,
		(n) => { 
			if(n) {
				if(props.list.service.length == 0) {
					serviceFormShow.value = true
				}
			}
		}
	)
	onReady(() => {
		
	})    
	function previewImage(index, imgs) {
   		uni.previewImage({
   			urls: imgs,
   			current: index, 
   			loop: true
   		})
   	}
	function serviceBtn() {
		if(!serviceFormShow.value) {
			serviceFormShow.value = true
			return
		}
		else {
			uForm.value.validate().then(async () => { 
				emits('submitService', {params: {...model.value}})
			}).catch(errors => {
				console.log(errors)
				uni.$u.toast('请检查表单')
			}) 
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
	function groupChange(e) {
		uForm.value.validateField('cate')
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
	.service-card {
		box-sizing: border-box;
		width: 100%;
	}
</style>