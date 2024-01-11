<template>
	<view class="w u-p-20"> 
		<template v-if="step == 1">
			<view class="step-one box-border u-flex-column u-flex-between">
				<view class="swiper-w box-border u-flex-1">
					<u-swiper
						:list="swiperlist"
						height="100%"
						keyName="tempFilePath"
						:current="swiperCurrent"
						:autoplay="false"
						imgMode="aspectFit"
						bgColor="#222"
						indicator
						:indicatorActiveColor="themeColor"
						indicatorMode="dot"
						@change="swiperChange"
					></u-swiper>
				</view>
				<view class="u-p-20 box-border">
					<u-scroll-list :indicator="false">
						<view v-for="(item, index) in swiperlist" class="preview-pic-w" :key="index">
							<view class="item u-m-r-20 u-radius-5" 
								:class="{
									active: index == swiperCurrent
								}" 
							>
								<view class="u-radius-5" @click="previewClick(index)">
									<up-image
										width="50px"
										height="50px"
										mode="aspectFit"
										:src="item.fileType == 'video' ? item.thumbTempFilePath : item.tempFilePath "
										radius="5"
									>
									</up-image>
									<view class="video-icon" v-if="item.fileType == 'video'">
										<u-icon name="play-right-fill" color="#fff" size="18"></u-icon>
									</view>
								</view> 
							</view>
							
						</view>
					</u-scroll-list>
				</view>
				<view class="u-flex u-flex-items-center u-flex-between u-p-15">
					<view class="item">
						<u-button 
							:customStyle="{background: '#FF2442'}" 
							shape="circle" 
							type="error"  
							@click="deleteBtn"
						>
							<view class="u-flex u-flex-items-baseline">
								<view class="u-m-r-10">移除当前文件</view>
								<u-icon name="trash" color="#fff" size="14"></u-icon>
							</view>
						</u-button>
					</view>
					<view class="item">
						<u-button 
							:customStyle="{background: '#FF2442'}" 
							shape="circle" 
							type="error"
							:loading="uploadLoading"
							loadingText="提交媒体文件中"
							@click="submitFilesBtn"
						>
							<view class="u-flex u-flex-items-baseline">
								<view class="u-m-r-10">上传文件并编辑文案</view>
								<u-icon name="arrow-rightward" color="#fff" size="14"></u-icon>
							</view>
						</u-button>
					</view>
				</view>
				<u-safe-bottom></u-safe-bottom>
			</view>
			
			
		</template>
		
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
			<view class="u-p-20 bg-white u-p-l-40">
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
					 	label="笔记" 
					 	prop="info"  
					 	ref="info"
					 	required 
					 	>  
						<u--textarea 
							v-model="model.info" 
							placeholder="请输入笔记（文案）"  
							:customStyle="{border: 'none'}"
							height="500"
							maxlength="500"
						></u--textarea>
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
  
<script setup>
	import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue'
	import { share } from '@/composition/share.js'
	import useDataList from '@/composition/useDataList.js' 
	import useUploadMedia from '@/composition/useUploadMedia.js'
	import {useCateStore, baseStore} from '@/stores/base.js'  
	import {userStore} from '@/stores/user.js' 
	const user = userStore() 
	const { biji_files, biji_step } = toRefs(user)
	const base = baseStore() 
	const {themeColor, empty} = toRefs(base)
	const { setOnlineControl } = share()
	const $api = inject('$api')
	const $http = inject('$http') 
	const id = ref('') 
	const model = ref({
		info: '',
		pic: ''
	})  
	const fileLists = reactive({
		pic: [] 
	});
	const swiperCurrent = ref(0)
	const swiperlist = ref([])
	const step = ref(1)
	const fileName = ref('')
	const coverFile = ref({tempFilePaths:[]})
	const success = ref(0)
	const uForm = ref('') 
	const uToast = ref('') 
	const mode = ref(1)
	const videoLoading = ref(false)
	const videoFile = ref({})
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
	const {
		files, 
		uploadLoading,
		startUpload 
	} = useUploadMedia()
	const loading = ref(false)
	const rules = {
		info: {
			required: true,
			message: '不能为空',
			trigger: ['blur', 'change']
		},
	}
	watch(
		() => biji_files.value,
		(n) => {
			// console.log(n)
			swiperlist.value = n
		},
		{
			deep: true,
			immediate: true
		}
	)
	watch(
		() => biji_step.value,
		(n) => {
			if(n) {
				console.log(n)
				step.value = 2
				model.value.pic = biji_files.value.map(ele => ele.url).join('|')
			}
		},
		{
			immediate: true
		}
	)
	onLoad(async (options) => { 
		if (options.hasOwnProperty('id')) {
			id.value = options.id
		}    
		// console.log(biji_files.value)
		// await initDataList() 
	})
	function groupChange(e) {
		
	}
	function submitFilesBtn() {
		startUpload()
	}
	function swiperChange(item) { 
		swiperCurrent.value = item.current
	}
	function previewClick(index) {
		swiperCurrent.value = index
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
	function deleteBtn() {
		biji_files.value.splice(swiperCurrent.value, 1)
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
		}
	}
	.preview-pic-w {
		.item {
			border: 3px solid #eee;
			position: relative;
			&.active {
				border-color: #FF2442;
			} 
			.video-icon {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
</style>
