<template>
	<view class="u-p-20">
		<view class="u-p-20 bg-white u-radius-8 u-font-34">
			<view class="u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item text-nowrap u-m-r-10 u-info">身份</view>
				<view class="item ">
					{{typeStr}}
				</view>
			</view>
			<view class="u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item text-nowrap u-m-r-10 u-info">姓名</view>
				<view class="item ">
					{{list.name}}
				</view>
			</view>
			<view class="u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item text-nowrap u-m-r-10 u-info">公司</view>
				<view class="item ">
					{{list.company}}
				</view>
			</view>
			<view class="u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item text-nowrap u-m-r-10 u-info">职务</view>
				<view class="item ">
					{{list.duties}}
				</view>
			</view>
			<view class="u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item text-nowrap u-m-r-10 u-info">{{type == 'mcn'? '旗下主播数量' : '参展产品数量'}}</view>
				<view class="item ">
					{{list.info}}
				</view>
			</view>
			<view class="u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item text-nowrap u-m-r-10 u-info">联系号码</view>
				<view class="item ">
					{{list.phone}}
				</view>
			</view>
			<view class="u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item text-nowrap u-m-r-10 u-info">推荐人</view>
				<view class="item ">
					{{list.recommend1}}
				</view>
			</view>
			<template v-if="type == 'mcn'">
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20" >
					<view class="item text-nowrap u-m-r-10 u-info">协办推荐</view>
					<view class="item ">
						{{list.recommend2}}
					</view>
				</view>
				<view class="u-flex u-flex-items-start u-flex-between u-m-b-20" >
					<view class="item text-nowrap u-m-r-10 u-info">平台</view>
					<view class="item ">
						{{list.platform}}
					</view>
				</view>
			</template>
			
			<view class="u-flex u-flex-items-start u-flex-between u-m-b-20" >
				<view class="item text-nowrap u-m-r-10 u-info">备注</view>
				<view class="item ">
					{{list.remark}}
				</view>
			</view>
			
			<!-- <view class="u-p-t-40 u-p-b-40">
				<u-button @click="gotoEdit">编辑信息</u-button>
			</view> -->
		</view>
	</view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar mode="2"></MenusBar>
</template>

<script setup>
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
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
	
	const list = ref({})
	const type = computed(() => {
		if(list.platform) return 'mcn'
		return 'gys'
	})
	const typeStr = computed(() => {
		if(type.value == 'mcn') return '机构/主播'
		if(type.value == 'gys') return '参展供应商'
		return ''
	})
	onLoad(async () => {
		uni.showLoading()
		await getData()
	})
	
	async function getData() {
		const res = await $api.sign_detail()
		if(res.code == 1) {
			list.value = res.list
		}
	}
	
	function gotoEdit() {
		let url = type.value == 'mcn'? '/pages/forms/51xp_mcn' : '/pages/forms/51xp_gys';
		base.handleGoto({
			url,
			params: {id: list.value.id}
		}) 
	}
	
</script>

<style lang="scss">
page {
	padding-bottom: 60px;
}
</style>
