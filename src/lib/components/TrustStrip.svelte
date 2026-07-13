<script lang="ts">
	import { clientChips, flagPills } from '$lib/data/navigation';
</script>

<section class="trust-section">
	<div class="container">
		<p class="trust-label">Trusted by 150+ businesses across</p>

		<div class="flag-pills">
			{#each flagPills as pill (pill.label)}
				<span class="flag-pill">
					<span class="fi fi-{pill.code}"></span>
					{pill.label}
				</span>
			{/each}
		</div>

		<div class="clients-row">
			{#each clientChips as chip (chip.name)}
				{#if chip.star}
					<div class="client-chip star">
						<div class="chip-name">{chip.name}</div>
						{#if chip.sub}
							<div class="chip-sub">{chip.sub}</div>
						{/if}
					</div>
				{:else}
					<div class="client-chip">
						{#if chip.logo}
							<img src={chip.logo} alt={chip.name} class="chip-logo" />
						{:else}
							{chip.name}
						{/if}
					</div>
				{/if}
			{/each}
		</div>

		<a href="/clients" class="show-more-link">Show More →</a>

		<p class="clients-caption"><b>150+ Clients Worldwide</b></p>
	</div>
</section>