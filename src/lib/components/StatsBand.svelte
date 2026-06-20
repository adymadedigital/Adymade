<script lang="ts">
	import { statsband } from '$lib/data/industries';
</script>

<section class="stats-band">
	<div class="stats-glow" aria-hidden="true"></div>
	<div class="container">
		<div class="stats-grid">
			{#each statsband as stat}
				<div class="stat-box">
					<div class="stat-number">{stat.value}</div>
					<div class="stat-lbl">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>
