<template>
	<div class="home">
		<div class="tabs">
			<li >todo</li>
			<li >note</li>
		</div>
		<div class="content">
			llllll
		</div>
	</div>
</template>
<script>
export default {
}
</script>
<style>

html{
	box-sizing: border-box;
}
*{
	box-sizing: inherit;
}
.home{
	height: 100%;
}
.tabs{
	width: 15%;
	float: left;
	height: 100%;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
}
.tabs li {
	list-style: none;
	height: 50%;
	padding-top: 100%;
	border: 1px solid black;
}
.content{
	width: 85%;
	height: 100%;
	float: right;
	border: 1px solid black;
}
</style>
