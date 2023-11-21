<template>
	<view> 
		<button :disabled="loading" class="btn u-radius-15 u-error-light-bg u-p-l-20 u-p-r-20 u-font-28 u-error" @click="dingyuebtn">
			立即订阅
		</button>
	</view>
</template>

<script setup> 
	
	import {
		baseStore,
		menusStore
	} from '@/stores/base';
	import {
		userStore 
	} from '@/stores/user';
	// import {baseNotify} from '@/composition/notify.js'
	// const notify = ref()
	// baseNotify(notify) 
	const base = baseStore()
	const menus = menusStore()
	const { menus_wd, menus_wd1, menus_ad } = toRefs(menus)
	const user = userStore()
	const {user_info, balance, tmp_id_list} = toRefs(user) 
	const $api = inject('$api')
	const list = ref([])
	const loading = ref(false)
	onMounted(async () => {
		loading.value = true
		const res = await $api.tmp_id_list();
		console.log(res)
		loading.value = false
		if(res.code == 1) { 
			list.value = res.list
			
		}
		
	})
	// async function dingyuebtn() { 
	// 	// uni.showLoading()
	// 	const res = await $api.tmp_id_list();
	// 	console.log(res)
	// 	if(res.code == 1) { 
	// 		subApi(res.list)
			
	// 	}
	// } 
	function dingyuebtn() { 
		wx.requestSubscribeMessage({
			tmplIds: list.value,
			success: async (res)=>{
				console.log(res)
				if(res.YdJHbw1JTP25XL8ErufBuGPjOtve1AhcnhsvHCVqUYc == 'reject') return
				// uni.showLoading()
				const res2 = await $api.tmp_id_back({
					params: {
						str: JSON.stringify(res)
					}
				})
				if(res2.code == 1) {
					uni.showToast({
						title: res2.msg,
						icon: 'none'
					})
				}
			},
			fail(error) {
				console.log(error)
			}
		}) 
		
	}
</script>

<style lang="scss" scoped>
.btn {
	height: 30px;
	line-height: 30px;
	&:after {
		border: 0;
	}
}
</style>