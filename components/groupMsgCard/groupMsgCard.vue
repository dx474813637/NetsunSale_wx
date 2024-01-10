<template>
	<view>
		<view class="album u-flex u-flex-items-start">
			<view class="album__avatar u-flex u-flex-center u-flex-items-start" style="flex: 0 0 60px" @click="gotodetail" v-if="front != 1">
				<u--image :src="origin.avatar" bgColor="#eee" mode="aspectFill" width="45px" height="45px" shape="circle"></u--image>
			</view>
			<view class="album__content u-flex-1 u-m-l-10">
				<view class="u-m-b-20 u-flex u-flex-items-center u-flex-between u-p-r-14" @click="gotodetail" v-if="front != 1">
					<view class="u-flex-1">
						<u--text :text="origin.name"  bold size="17"></u--text>
					</view>
					<u-tag text="名片" plain type="primary" size="mini" @click.stop="handleGoto({url: '/pages/index/frontCard/frontCard' , params: {login: origin.login, autoGoto: '0'}})"> </u-tag> 
				</view>
				<view class=" u-p-b-30 u-font-32 text-base" v-if="origin.content" style="word-break: break-all;" @click="gotodetail">
					<!-- <u--text margin="0 0 8px 0" :text="origin.content" size="14"></u--text> -->
					<rich-text :nodes="`${origin.content}`"></rich-text>
					<!-- <u--textarea
						:value="origin.content"    
						autoHeight  
						readonly 
						:customStyle="{border: 'none', padding:'0', fontSize: '16px', lineHeight: '24px'}"
					></u--textarea> -->
				</view>
				<view class="u-m-b-30" v-if="origin.imgList && origin.imgList.length > 0 && reply!= 1" >
					<u-album :urls="origin.imgList" multipleSize="80"></u-album>
				</view> 
				<view class="album__content__footer u-flex u-flex-between u-flex-items-center u-p-r-5 " @click="gotodetail">
					<view class="item text-base u-font-26">{{$u.timeFrom(origin.publishtime*1000)}}</view>
					<view class="item" >
						<view class="u-flex u-flex-items-center u-font-28 text-base">
							<view class="more-btn u-flex u-flex-items-center text-error" v-if="manager == 1 || origin.isMe == 1"  @click.stop="deleteBtn">
								<u-icon :name="'trash'" :color="'#dd524d'" size="19"></u-icon>
								<text class="u-p-l-5">删除</text> 
							</view>
							<view class="more-btn u-flex u-flex-items-center u-m-l-30" @click.stop="likeBtn">
								<u-icon :name="'thumb-up'" :color="'#999'" size="19"></u-icon>
								<text class="u-p-l-5" v-if="origin.likenumber == 0">点赞</text>
								<text class="u-p-l-5" v-if="origin.likenumber > 0">{{origin.likenumber}}</text>
							</view>
							<view class="more-btn u-flex u-flex-items-center u-m-l-30" @click.stop="commentBtn" v-if="detail != 1">
								<u-icon :name="'chat'" :color="'#999'" size="19"></u-icon>
								<text class="u-p-l-5" v-if="origin.chatnumber == 0">评论</text>
								<text class="u-p-l-5" v-if="origin.chatnumber > 0">{{origin.chatnumber}}</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="u-p-14 u-p-l-20 u-p-r-20 u-radius-5 position-group u-font-26 u-m-t-20" v-if="origin.qun_name" @click.stop="handleGoto({
					url: '/pages/index/group/group',
					params: {
						id: origin.qid
					},
					type: 'reLaunch'
				})">
					发布于群：{{origin.qun_name}}
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name: "groupMsgCard",
		props: {
			origin: {
				type: Object,
				default: () => {
					return {}
				}
			},
			manager: {
				type: String | Number,
				default: 0
			},
			detail: {
				type: String | Number,
				default: 0
			},
			reply: {
				type: String | Number,
				default: 0
			},
			front: {
				type: String | Number,
				default: 0
			}
		},
		data() {
			return {
				show: false
			};
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			commentBtn() {
				if(this.front == 1) return
				this.$emit('comment', {data: this.origin})
			},
			likeBtn() {
				if(this.front == 1) return
				this.$emit('like', {data: this.origin, reply: this.reply})
			},
			deleteBtn() {
				if(this.front == 1) return
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: (res) => {
						if (res.confirm) {
							this.$emit('delete', {data: this.origin, reply: this.reply})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			gotodetail() {
				if(this.detail == 1 || this.reply == 1 || this.front == 1) return
				this.handleGoto({
					url: '/pages/index/dynamic/dynamic',
					params: {
						id: this.origin.id
					}
				})
			}
		}
	}
</script> 
<style lang="scss" scoped>
	.more-btns {
		width: 30px;
		height: 18px;
		border-radius: 4px;
		background-color: #eee;
		.custom-icon {
			color: #999;
		}
	}
	.more-w {
		position: absolute;
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		background-color: rgba(0,0,0,.8);
		border-radius: 4px;
	}
	.position-group {
		position: relative;
		background-color: #eee;
		color: #666;
		&:after {
			content: '';
			position: absolute;
			bottom: 100%;
			left: 10px;
			width: 0;
			height: 0;
			border-top: 0;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			border-bottom: 8px solid #eee;
		}
	}
</style>
