<script lang="ts">
	import mg1 from '$lib/assets/mg1.png';
	import mg2 from '$lib/assets/mg2.png';
	import mg3 from '$lib/assets/mg3.png';
	import mg4 from '$lib/assets/mg4.png';
	import mg5 from '$lib/assets/mg5.png';
	import mg6 from '$lib/assets/mg6.png';
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

	<img alt="mg" src={mg1} class="img1" />
	<ul>
		<p>
			3. You will be directed to the page as below. Search for “Little Masters Club”, then select
			the project you want to donate to. If there is no specific project you can donate to, you can
			select the “LITTLE MASTERS CLUB”. Next, you need to input your volunteer date and the number
			of hours, then select “Company Match”. Please provide a brief description of your involvement
			at Little Masters Club and click “next” at the bottom.
		</p>
	</ul>
	<div class="after">
		<img alt="mg" src={mg2} class="img" />
		<img alt="mg" src={mg3} class="img" />
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
	<img alt="mg" src={mg4} class="img1" />
	<ul>
		<p>
			3. After adding Little Masters Club, select the donation type, amount and date. If you want to
			leave us a note, add a comment.
		</p>
		<p>4. Click “Submit Match Request” and be done!</p>
	</ul>
	<div class="after">
		<img alt="mg" src={mg5} class="img" />
		<img alt="mg" src={mg6} class="img" />
	</div>

	<h2>Appendix</h2>
	<p>
		Please do read the Microsoft volunteer Q&A here(CorpNet access required) by expanding Volunteer
		section, before you report your volunteer hours to ensure full compliance with Microsoft policy.
	</p>
</div>

<style lang="scss">
	.page {
		margin: auto;
		max-width: 55rem;
		padding: 0rem 1.5rem;
	}
	.img {
		float: left;
		width: 50%;
		padding: 5px;
		margin-bottom: 20px;
	}
	.after:after {
		content: '';
		display: table;
		clear: both;
	}
	.img1 {
		display: block;
		width: 100%;
		max-width: 55rem;
		height: auto;
		margin-left: auto;
		margin-right: auto;
		padding: 20px 1.5rem;
	}

	@media screen and (max-width: 700px) {
		.img {
			width: 100%;
		}
	}
</style>
