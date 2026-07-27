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
		<h1>Brands We've<br />Helped Grow</h1>
		<p>
			From startups to established brands, here's a look at the businesses we've helped automate,
			create, and grow — across India, Saudi Arabia, UAE, UK and Australia.
		</p>
	</div>
</section>

<section class="clients-section">
	<div class="container">
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