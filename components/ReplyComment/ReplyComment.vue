<template>
	<view class="card u-flex u-flex-column u-flex-end" v-if="show">
		<view class="mask"  @click="blur" ></view>
		<view class="main">
			
			 <u-transition :show="show" mode="fade-up" @afterEnter="focus = true" @beforeLeave="focus = false">
				 <view class=" u-p-30 bg-white u-border-top">
					 <view class=" u-flex u-flex-items-end">
						 <view class="u-flex-1">
						 	<u--textarea 
						 	v-model="content"  
						 	:focus="focus" 
						 	placeholder="请输入想说的话" 
						 	autoHeight 
							:disabled="loading"
						 	@confirm="reply"
						 	confirmType="提交"
						 	:cursorSpacing="100"
						 	></u--textarea>
						 </view>
						 <view class="u-m-l-20">
						 	<u-button type="primary"  @click="reply" :disabled="content.length == 0" :loading="loading">提 交</u-button>
						 </view>
					 </view>
				 	
					<u-safe-bottom></u-safe-bottom>
				 </view>
			 </u-transition>
		</view>
	</view>
	
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name: "groupMsgCard",
		props: { 
			show: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				content: '',
				focus: false,
			};
		}, 
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}), 
			reply() {
				uni.showModal({
					title: '提示',
					content: '是否提交',
					success:  (res) => {
						if (res.confirm) {
							this.$emit('reply', {data: this.content})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			blur() {
				this.$emit('blur')
			}
		}
	}
</script> 
<style lang="scss" scoped> 
.card {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 100vh; 
	z-index: 100;
	.mask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 10;
		background-color: rgba(0,0,0,.05);
	}
	.main {
		position: relative;
		z-index: 10;
	}
}
</style>
