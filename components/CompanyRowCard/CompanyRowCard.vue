<template>
	<view class="card u-flex u-flex-items-start u-flex-between ">
		<view class="item u-flex u-flex-items-center u-flex-1" @click="gotoUrl(origin.url)">
			<view class="">
				<up-image
					:src="origin.company.logo"
					:width="mode == 'small'? '40px' : '50px'"
					:height="mode == 'small'? '40px' : '50px'"
					radius="8"
				></up-image>
			</view>
			<view class="u-flex-column u-flex-between u-m-l-20">
				<view class="u-line-1 " :class="{
					'text-bold': mode == 'normal',
					'u-m-b-10': mode == 'normal'
				}">{{origin.company.company}}</view>
				<view class="u-line-1 text-base u-font-24">{{origin.company.info}}</view>
			</view>
		</view> 
		<view class="item">
			<u-button size="small" :customStyle="{borderRadius: '5px', background: '#FFF7EC', color: '#4E361E', border: 'none'}"  @click="gotoUrl(origin.url)">去旺铺</u-button>
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
					<view style="width: 100px;" class="u-radius-8" >
						<view class="product-w u-radius-8"  @click="base.handleGoto({
								url: '/pages/product/productDetail',
								params: {
									id: ele.id, 
								}
							})"> 
							<view class="img" > 
								<zeroLazyLoad   
									:image="ele.pic.split('|')[0]" 
									imgMode="scaleToFill"
									height="100%"
									></zeroLazyLoad>
							</view> 
							<view class="product-price u-p-l-10 u-p-5 u-p-b-10 u-p-r-10 u-font-26">
								￥{{ele.price1}} 
							</view>
						</view>
						<!-- <ProductColCard
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
						</ProductColCard> -->
					</view>  
				</view>
				<view 
					style=" background: linear-gradient(to bottom, #E4E3EF, #F9DFF1);" 
					:style="{
						width: mode== 'small'? '80px' : '120px',
						height: mode== 'small'? '100px' : '160px',
					}"
					class="u-radius-8 u-flex u-flex-items-center u-flex-center"
					@click="gotoUrl(origin.url)"
				>
					<view class="u-flex-column u-flex-items-center u-flex-center">
						<u-icon name="bag" color="#333" size="25"></u-icon>
						<view class="u-m-t-10 u-info u-font-28">全部商品</view>
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
	import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue'
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
		mode: {
			type: String,
			default: 'normal'
		}
	})
	function gotoUrl(url) {
		if(!url) return
		uni.navigateTo({
			url
		})
	}
</script>

<style lang="scss" scoped>

	.product-w {
		width: 100%;
		padding-top: 100%;
		position: relative;
		overflow: hidden;
		.img {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
		.product-price {
			position: absolute;
			bottom: -1px;
			right: -1px;
			background: linear-gradient(to left, #F5D1AF, #FFF7EC);
			color: #453E2E;
			border-radius: 10px 0 0 0;
		}
	}
</style>