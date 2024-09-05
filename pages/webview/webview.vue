<template> 
	<view>
		<web-view 
			:webview-styles="webviewStyles" 
			:src="webUrl"
		></web-view>
	</view> 
</template>

<script>
	export default {
		data() {
			return {
				webUrl: ''
			};
		},
		computed: {
			webviewStyles() {
				return {
					progress: {
						color: '#FF3333'
					}
				}
			}
		}, 
		onLoad(options) {
			if(options.hasOwnProperty('web')) { 
				this.webUrl = `https://www.sunmaxx.cn/${options.web}`
				console.log(this.webUrl, 1)
			} 
		},  
	}
</script>

<style lang="scss">

</style>
