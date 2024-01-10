<template>
	<view class="w">
		<view class="groupMsg ">
			<groupMsgCard
				:origin="info" 
				:manager="manager "
				detail="1"
				@comment="handleGotoComment"
				@like="handleLike"
				@delete="handleDelete"
			></groupMsgCard>
		</view>
		<view class="u-p-b-80">
			<view class="u-p-30">
				<u--text :text="`全部回复 (${info.allReply})`" bold size="16"></u--text>
			</view>
			<view class="list">
				<view class="u-p-30 u-border-bottom u-m-b-20"
					v-for="(item, index) in indexList"
					:key="index">
					<groupMsgCard
						:origin="item"
						reply="1"
						detail="1"
						@like="handleLike"
						@delete="handleDelete"
					></groupMsgCard>
				</view>
				
				<template name="dataStatus">
					<template v-if="indexList.length == 0">
						<u-empty
							mode="list"
							:icon="typeConfig.white.empty"
						>
						</u-empty>
					</template>
					<template v-else>
						<view class="u-p-t-60"> 
							<u-loadmore
								:status="loadstatus"
							/>
						</view>
					</template>
				</template>
			</view> 
		</view>
		<ReplyComment
			:show="replyShow"
			:loading="submitLoading"
			@reply="replyEvent"
			@blur="replyShow = false"
		></ReplyComment>
		<u-safe-bottom></u-safe-bottom>
		<tabBar theme="chemnet" :customStyle="{
				'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
			}">
			<view class="pan-tabbar u-flex u-flex-items-center u-flex-around " :style="{
					color: themeConfig.tabText,
					backgroundColor: themeConfig.tabBg,
				}"> 
				<view class="item-btn  u-flex u-flex-items-center u-flex-center u-flex-1 u-p-10 u-p-l-20 u-p-r-20">
					<u-button type="primary" @click="replyShow = true">我要回复</u-button>
		
				</view>
			</view>
		
		</tabBar>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				id: '',
				info: {},
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				manager: 0,
				replyShow: false,
				submitLoading: false,
			}
		},
		async onLoad(options) { 
			if (options.hasOwnProperty('id')) {
				this.id = options.id
			}   
			uni.showLoading()
			await this.getData()
		},  
		computed: {
			...mapState({ 
				typeConfig: state => state.theme.typeConfig,  
				wode: state => state.user.wode,
			}),
			themeConfig() {
				return this.typeConfig.chemnet
			},
		},  
		onReachBottom() {
			this.scrolltolower()
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params,
				})
			},
			async refreshList() {
				this.initParamas()
				await this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			},
			scrolltolower() {
				this.getMoreData()
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$api.dynamic_detail({params:{ 
					id: this.id,
					p: this.curP
				}})
				if(res.code == 1) { 
					res.info.isMe = this.wode.login == res.info.login || this.wode.mobile == res.info.login ?1:0
					this.info = res.info
					this.manager = res.manager
					this.indexList = [...this.indexList, ...res.list.map(ele => {
						return {
							...ele,
							isMe:( this.wode.login == ele.login || this.wode.mobile == ele.login)?1:0
						}
					})]
					
					uni.setNavigationBarTitle({
						title: res.dynamic_name
					})
					
					if( this.indexList.length == res.info.allReply || !res.list ||res.list.length == 0) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			async handleGotoComment({data}) {
				this.handleGoto({
					url: '/pages/index/dynamic/dynamic',
					params: {
						id: data.id,
						comment: 1
					}
				})
			},
			async handleLike({data, reply}) {
				let func = 'add_dynamiclist_like'
				if(reply == 1) func = 'add_dynamiclist_reply_like'
				const res = await this.$api[func]({
					params: {
						id: data.id
					}
				})
				if(res.code == 1) {
					this.showToast({
						message: res.msg,
						type: 'success'
					})
					if(reply == 1) {
						let index = this.indexList.findIndex(ele => ele.id == data.id);
						if(index != -1) this.indexList[index].likenumber = +this.indexList[index].likenumber + 1
					}else {
						this.info.likenumber = +this.info.likenumber + 1
					}
				}
			},
			async handleDelete({data, reply}) {
				let func = 'del_dynamiclist'
				if(reply == 1) func = 'del_dynamiclist_reply'
				const res = await this.$api[func]({
					params: {
						id: data.id
					}
				})
				if(res.code == 1) {
					this.showToast({
						message: res.msg,
						type: 'success'
					})
					
					if(reply == 1) {
						let index = this.indexList.findIndex(ele => ele.id == data.id);
						if(index != -1) this.indexList.splice(index, 1)
						this.info.allReply = +this.info.allReply - 1
					}else {
						const arr = uni.$u.pages()
						if(arr[arr.length - 2].$vm.deleteList)  arr[arr.length - 2].$vm.deleteList({id: data.id});
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					}
				}
			},
			async replyEvent({data}) {
				this.submitLoading = true
				const res = await this.$api.add_dynamiclist_reply({
					params: {
						id: this.id,
						info: data
					}
				})
				this.submitLoading = false
				if(res.code == 1) {
					this.showToast({
						message: res.msg,
						type: 'success'
					})
					this.replyShow = false
					uni.showLoading()
					this.refreshList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.w {
		padding-bottom: 60px;
	}
	.groupMsg {
		border-bottom: 20rpx solid #f5f5f5; 
		padding: 20px 10px;
	}
</style>
