<script>
	export let text = 'AB'
	export { _class as class}
	let _class = ""

	const colors = ["#E284B3", "#FFED8B",  "#681313", "#F3C1C6",  "#735372",  "#009975", "#FFBD39", "#B1E8ED", "#52437B", "#F76262", "#216583", "#293462", "#DD9D52", "#936B93", "#6DD38D", "#888888", "#6F8190", "#BCA0F0", "#AAF4DD", "#96C2ED", "#3593CE", "#5EE2CD", "#96366E", "#E38080"];

	let fill = colors[ Math.floor( Math.random() * colors.length ) ] 
	let initials = text
		.replace(/\s+/g,' ')
		.split(' ')
		.filter((el,i)=>i<2)
		.map(el=>el[0])
		.join('')
		.toUpperCase()
</script>
<svg class="{_class}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<!-- 	<defs>
		<style type="text/css">@font-face {font-family: "montserratbold";src: url("https://cdn.oxro.io/fonts/montserrat-bold-webfont.woff2") format("woff2"),url("https://cdn.oxro.io/fonts/montserrat-bold-webfont.woff") format("woff");font-weight: normal;font-style: normal;}
		</style>
	</defs> -->
	<rect x="0" y="0" width="100%" height="100%" rx="0" style="fill: {fill};"/>
	<text x="50%" y="50%" dy=".1em" fill="#fff" text-anchor="middle" dominant-baseline="middle" style="font-size: 16px; line-height: 1; font-weight: bold;">
		{initials}
	</text>
</svg>