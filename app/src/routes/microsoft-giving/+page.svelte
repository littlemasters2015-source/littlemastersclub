<script lang="ts">
	import Img from '@zerodevx/svelte-img';
	import mg1 from '$lib/assets/mg1.png?as=md';
	import mg2 from '$lib/assets/mg2.png?as=md';
	import mg3 from '$lib/assets/mg3.png?as=md';
	import mg4 from '$lib/assets/mg4.png?as=md';
	import mg5 from '$lib/assets/mg5.png?as=md';
	import mg6 from '$lib/assets/mg6.png?as=md';
</script>

<div class="page">
	<h1>Microsoft Giving</h1>
	<p>Microsoft employees can help the Little Master’s Club by either donating money, or time.</p>

	<h2>Giving Time</h2>
	<p>
		Each U.S. employees’ annual matching benefit includes a match for gifts of time as well as
		money. When Microsoft employees volunteer in the community, Microsoft will donate $25 per hour
		to the eligible organization they serve.
	</p>
	<p>
		If you have ever participated in a Little Masters Club event, you can claim your hours by
		following the instructions below.
	</p>

	<ul>
		<p>
			1. For details, <a
				href="https://microsoft.benevity.org/volunteer"
				target="_blank"
				rel="noopener noreferrer">https://microsoft.benevity.org/volunteer</a
			>
		</p>
		<p>2. Click “Track Time” icon, refer to below screenshot</p>
	</ul>

	<Img alt="Click “Track Time” icon" src={mg1} />
	<ul>
		<p>
			3. You will be directed to the page as below. Search for “Little Masters Club”, then select
			the project you want to donate to. If there is no specific project you can donate to, you can
			select the “LITTLE MASTERS CLUB”. Next, you need to input your volunteer date and the number
			of hours, then select “Company Match”. Please provide a brief description of your involvement
			at Little Masters Club and click “next” at the bottom.
		</p>
	</ul>
	<div class="columns">
		<Img alt="Select the project you want to donate to" src={mg2} />
		<Img
			alt="Input your volunteer date and the number of hours, then select “Company Match”"
			src={mg3}
		/>
	</div>
	<ul><p>4. Go to the next page and submit!</p></ul>

	<h2>Giving Money</h2>

	<p>
		Microsoft’s Matching Gifts program is year-round ,and when you donate cash, stock or Microsoft
		products to the institution of your choice Microsoft will match with an equivalent donation. Any
		donation you have made within the last 12 months is eligible to be matched!
	</p>
	<p>
		If you want to donate Cash/Stock/Microsoft Product to Little Masters Club, you can follow the
		instruction below:
	</p>
	<ul>
		<p>
			1. Go to <a
				href="https://microsoft.benevity.org/request-a-match"
				target="_blank"
				rel="noopener noreferrer">https://microsoft.benevity.org/request-a-match</a
			>
		</p>
		<p>
			2. Search for “Little Masters Club”. Click the “Add” button beside the Little Masters Club
			logo.
		</p>
	</ul>
	<Img alt="mg" src={mg4} />
	<ul>
		<p>
			3. After adding Little Masters Club, select the donation type, amount and date. If you want to
			leave us a note, add a comment.
		</p>
		<p>4. Click “Submit Match Request” and be done!</p>
	</ul>
	<div class="columns">
		<Img alt="mg" src={mg5} />
		<Img alt="mg" src={mg6} />
	</div>

	<h2>Appendix</h2>
	<p>
		Please do read the Microsoft volunteer Q&A here(CorpNet access required) by expanding Volunteer
		section, before you report your volunteer hours to ensure full compliance with Microsoft policy.
	</p>
</div>

<style lang="scss">
	.columns {
		display: flex;
		gap: 1.25rem;
	}
</style>
