<script lang="ts">
	import { allClientChips } from '$lib/data/navigation';
</script>

<svelte:head>
	<title>All Clients | Adymade</title>
	<meta
		name="description"
		content="150+ businesses across India, Saudi Arabia, UAE, UK and Australia trust Adymade for AI automation and video production."
	/>
</svelte:head>

<section class="clients-hero">
	<div class="container">
		<div class="eyebrow">Our Clients</div>
		<h1>150+ Businesses<br />Trust Adymade</h1>
		<p>
			From startups to established brands, here's a look at the businesses we've helped automate,
			create, and grow — across India, Saudi Arabia, UAE, UK and Australia.
		</p>
	</div>
</section>

<section class="clients-section">
	<div class="container">
		<p class="results-count">{allClientChips.length} clients and counting</p>

		<div class="client-grid">
			{#each allClientChips as chip (chip.name)}
				<div class="logo-card">
					{#if chip.logo}
						<img src={chip.logo} alt={chip.name} class="logo-card-img" />
					{:else}
						<div class="logo-card-name">{chip.name}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* ── Hero ── */
	.clients-hero {
		padding: 150px 0 60px;
		text-align: center;
		position: relative;
		overflow: hidden;
	}
	.clients-hero::before {
		content: '';
		position: absolute;
		top: -20%;
		left: 50%;
		transform: translateX(-50%);
		width: 60vw;
		height: 42vw;
		max-width: 700px;
		max-height: 500px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(90, 20, 240, 0.18) 0%, transparent 65%);
		pointer-events: none;
	}
	.clients-hero .eyebrow {
		justify-content: center;
	}
	.clients-hero h1 {
		margin: 0 0 16px;
		position: relative;
		z-index: 1;
	}
	.clients-hero p {
		color: var(--color-body-text);
		font-size: clamp(15px, 1.6vw, 18px);
		max-width: 620px;
		margin: 0 auto;
		line-height: 1.7;
		position: relative;
		z-index: 1;
	}

	/* ── Client grid ── */
	.clients-section {
		padding: 20px 0 110px;
	}
	.results-count {
		text-align: center;
		color: var(--color-muted);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin-bottom: 36px;
	}
	.client-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}
	@media (min-width: 560px) {
		.client-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (min-width: 820px) {
		.client-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	@media (min-width: 1080px) {
		.client-grid {
			grid-template-columns: repeat(5, 1fr);
		}
	}

	.logo-card {
		background: var(--color-midnight);
		border: 1px solid var(--color-slate);
		border-radius: var(--radius-md);
		padding: 30px 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 110px;
		transition: all 0.25s ease;
	}
	.logo-card:hover {
		border-color: rgba(90, 20, 240, 0.55);
		transform: translateY(-4px);
		box-shadow: 0 16px 34px -18px rgba(90, 20, 240, 0.35);
	}
	.logo-card-img {
		max-height: 48px;
		max-width: 100%;
		width: auto;
		object-fit: contain;
	}
	.logo-card-name {
		font-size: 13px;
		font-weight: 700;
		color: #fff;
		text-align: center;
	}
</style>