<template>
	<view>
		video
	</view>
</template>

<script>
	const VodUploader = require("./vod-wx-sdk-v2.js");
	// import VodUploader from "./vod-wx-sdk-v2.js"
	console.log(VodUploader)
	export default {
		name:"UploadVideo",
		data() {
			return {
				
			};
		},
		created() {
			console.log(VodUploader)
		}
	}
</script>

<style lang="scss">

</style>