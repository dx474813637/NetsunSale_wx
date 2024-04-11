<template>
	<view class="card u-flex u-flex-items-start u-flex-between ">
		<view class="item u-flex u-flex-items-center u-flex-1" @click="gotoUrl(origin.url)">
			<view class="">
				<up-image
					:src="origin.company.logo"
					width="50px"
					height="50px"
					radius="8"
				></up-image>
			</view>
			<view class="u-flex-column u-flex-between u-m-l-20">
				<view class="u-line-1 text-bold u-m-b-10">{{origin.company.company}}</view>
				<view class="u-line-1 text-base u-font-28">{{origin.company.info}}</view>
			</view>
		</view> 
		<view class="item">
			<u-button type="error" size="small" :customStyle="{borderRadius: '5px'}"  @click="gotoUrl(origin.url)">去旺铺</u-button>
		</view> 
	</view> 
	<view class="u-radius-12 bg-white" >
		<u-scroll-list
			:indicator="false"  
		>
			<view class="u-flex box-border u-p-r-20 u-p-t-20 " >
				<view 
					class=" u-radius-8 u-m-r-20" 
					v-for="ele in origin.product"
					:key="ele.id" 
				>
					<view style="width: 120px;" class="u-radius-8">
						<ProductColCard
							:origin="ele"
							:customStyle="{
								'box-shadow': 'none!important'
							}"
						>
							<template #content>
								<view class="content-w u-p-10 u-p-b-20 u-font-26">
									<view class="u-line-1 u-m-b-10">
										{{ele.name}}
									</view>
									<view class="u-text-center">
										<up-text
											type="error" 
											mode="price" 
											bold
											:text="ele.price1" 
											size="14" 
										></up-text>
									</view>
								</view>
							</template>
						</ProductColCard>
					</view>  
				</view>
				<view 
					style="width: 120px; height: 160px; background: linear-gradient(to bottom, #E4E3EF, #F9DFF1);" 
					class="u-radius-8 u-flex u-flex-items-center u-flex-center"
					@click="gotoUrl(origin.url)"
				>
					<view class="u-flex-column u-flex-items-center u-flex-center">
						<u-icon name="bag" color="#333" size="25"></u-icon>
						<view class="u-m-t-10 text-black">全部商品</view>
					</view>
				</view> 
			</view>
		</u-scroll-list>
	</view>
</template>

<script setup > 
	import { onLoad, onReady, onReachBottom } from "@dcloudio/uni-app";
	import { ref, reactive, computed, toRefs, inject, watch } from 'vue'
	// import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user' 
	const user = userStore()
	const { tmp_id_list } = toRefs(user)
	const base = baseStore();
	const { home, roomList, themeColor } = toRefs(base)
	const props = defineProps({
		origin: {
			type: Object,
			default: () => {
				return {}
			}
		}, 
	})
	function gotoUrl(url) {
		if(!url) return
		uni.navigateTo({
			url
		})
	}
</script>

<style lang="scss">

</style>