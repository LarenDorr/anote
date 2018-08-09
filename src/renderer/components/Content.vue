<template>
	<md-content class="content">
		<keep-alive>
			<transition>
				<router-view></router-view>
			</transition>
		</keep-alive>
	</md-content>
</template>
<script>
	export default {
	}
</script>
<style>
	.content{
		height: calc(100% - 64px);
		width: calc(100% - 70px);
		display: inline-block;
		vertical-align:top; /* 解决inline-block高度bug（？）*/
		overflow: hidden;
		margin-left: -4px; /* 解决inline-block宽度bug（？）*/
	}
</style>
