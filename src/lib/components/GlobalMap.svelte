<script lang="ts">
	import { mapStats } from '$lib/data/industries';

	const indore = { x: 74.5, y: 22.2 };

	const cities = [
		{ name: 'Riyadh', flag: 'SA', x: 65.0, y: 20.4, labelOffset: 'translate(-65%,105px)' },
	    { name: 'Dubai', flag: 'AE', x: 66.8, y: 20.1, labelOffset: 'translate(-15px,80px)' },
	    { name: 'London', flag: 'GB', x: 49.0, y: 10.1, labelOffset: 'translate(-58%,53px)' },
	    { name: 'Melbourne', flag: 'AU', x: 94.5, y: 42.5, labelOffset: 'translate(-54%,215px)' },
	    { name: 'New York', flag: 'US', x: 24.5, y: 15.0, labelOffset: 'translate(-58%,53px)' },
	    { name: 'Amsterdam', flag: 'NL', x: 50.5, y: 9.5, labelOffset: 'translate(10px,-30px)' },
	    { name: 'Warsaw', flag: 'PL', x: 56.0, y: 10.5, labelOffset: 'translate(10px,25px)' },
	    { name: 'Stockholm', flag: 'SE', x: 55.0, y: 6.5, labelOffset: 'translate(10px,-30px)' },
	    { name: 'Suva', flag: 'FJ', x: 97.5, y: 39.0, labelOffset: 'translate(-20px,-30px)' }
	];
</script>

<section class="section section-alt map-section">
	<div class="container">
		<div class="section-header">
			<div class="eyebrow">Global Reach</div>
			<h2>Based in Indore. <span class="grad">Trusted Worldwide.</span></h2>
			<p>
				We work with clients across India, the GCC, United Kingdom, and Australia.<br />
				IST aligns within 1.5 hours of Gulf Standard Time — zero friction for GCC clients.
			</p>
		</div>

		<div class="world-map-wrap">
			<img src="/world.svg" alt="World map" class="world-map-img" />

			<svg class="world-map-overlay" viewBox="0 0 100 50" preserveAspectRatio="none">
				<defs>
					<radialGradient id="glowP" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stop-color="#7C3AED" stop-opacity="0.5" />
						<stop offset="100%" stop-color="#7C3AED" stop-opacity="0" />
					</radialGradient>
					<radialGradient id="glowC" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stop-color="#06B6D4" stop-opacity="0.45" />
						<stop offset="100%" stop-color="#06B6D4" stop-opacity="0" />
					</radialGradient>
				</defs>

				{#each cities as city}
					<line
						x1={indore.x} y1={indore.y}
						x2={city.x} y2={city.y}
						stroke="#9D5CFF" stroke-width="0.32"
						stroke-dasharray="0.8,0.6" opacity="0.95"
						vector-effect="non-scaling-stroke"
					/>
				{/each}

				<circle cx={indore.x} cy={indore.y} r="2.0" fill="url(#glowP)" />
				<circle cx={indore.x} cy={indore.y} r="0.55" fill="#7C3AED" stroke="#C4B5FD" stroke-width="0.15" vector-effect="non-scaling-stroke">
					<animate attributeName="r" values="0.45;0.68;0.45" dur="2.4s" repeatCount="indefinite" />
				</circle>

				{#each cities as city}
					<circle cx={city.x} cy={city.y} r="1.0" fill="url(#glowC)" />
					<circle cx={city.x} cy={city.y} r="0.35" fill="var(--theme-card-bg)" stroke="#06B6D4" stroke-width="0.15" vector-effect="non-scaling-stroke" />
				{/each}
			</svg>

			<div class="map-label map-label-hq" style="left:{indore.x}%; top:{indore.y}%; transform:translate(-24px,85px);">
				Indore HQ <span class="map-flag">IN</span>
			</div>
			{#each cities as city}
				<div class="map-label" style="left:{city.x}%; top:{city.y}%; transform:{city.labelOffset};">
					{city.name} <span class="map-flag">{city.flag}</span>
				</div>
			{/each}
		</div>

		<div class="map-stats-row">
			{#each mapStats as ms}
				<div class="map-stat">
					<div class="msn">{ms.value}</div>
					<div class="msl">{ms.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

