<template>
	<view class="u-p-20 box-border w u-flex-column">
		<view class="u-p-30 u-radius-10 bg-white box-border w2 u-flex-1">
			<view class="u-m-t-60 ">
				<up-input
					v-model="cardId"
					shape="circle"
					placeholder="输入卡号" 
					inputAlign="center"
					clearable 
					:customStyle="{borderColor: `#54a6ff!important`, backgroundColor: '#f9fcff'}"
				></up-input>
			</view>
			<view class="u-m-t-30 u-m-b-60">
				<up-input
					v-model="guid"
					shape="circle"
					placeholder="输入密码" 
					inputAlign="center"
					clearable 
					fontSize="14"
					:customStyle="{borderColor: `#54a6ff!important`, backgroundColor: '#f9fcff'}"
				></up-input>
			</view>
			<up-button 
				shape="circle"
				type="error"
				throttleTime="800"
				@click="bindEvent"
			>提 交</up-button>
		</view>
	</view>
</template>

<script setup> 
	import {useCateStore, baseStore} from '@/stores/base.js'
	const base = baseStore()  
	const {themeColor, empty} = toRefs(base) 
	const $api = inject('$api')
	const cardId = ref('')
	const guid = ref('')
	async function bindEvent() {
		uni.showLoading()
		const res = await $api.vouchers_bind({params: {guid: guid.value, id: cardId.value}})
		if(res.code == 1) {
			uni.showToast({
				title: res.msg,
				icon: 'success'
			})
		}
	}
	
</script> 
<style lang="scss" scoped>
	.w {
		height: 100%;
		min-height: 100vh;
	}
	.w2 {
		height: 100%; 
	}
</style>
