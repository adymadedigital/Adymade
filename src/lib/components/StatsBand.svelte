<script lang="ts">
	import { statsband } from '$lib/data/industries';

	let sectionEl: HTMLElement;
	let hasAnimated = $state(false);
	let displayValues: number[] = $state(statsband.map(() => 0));

	// Parse "236+" -> { number: 236, suffix: "+" }
	function parseStat(value: string) {
		const match = value.match(/^(\d+)(.*)$/);
		if (!match) return { number: 0, suffix: '' };
		return { number: parseInt(match[1], 10), suffix: match[2] };
	}

	function animateCount(index: number, target: number) {
		const duration = 1500; // ms
		const startTime = performance.now();

		function tick(now: number) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			// ease-out for a nicer feel
			const eased = 1 - Math.pow(1 - progress, 3);
			displayValues[index] = Math.floor(eased * target);

			if (progress < 1) {
				requestAnimationFrame(tick);
			} else {
				displayValues[index] = target;
			}
		}
		requestAnimationFrame(tick);
	}

	function startAllAnimations() {
		if (hasAnimated) return;
		hasAnimated = true;
		statsband.forEach((stat, i) => {
			const { number } = parseStat(stat.value);
			animateCount(i, number);
		});
	}

	$effect(() => {
		if (!sectionEl) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						startAllAnimations();
					}
				});
			},
			{ threshold: 0.3 }
		);

		observer.observe(sectionEl);

		return () => observer.disconnect();
	});
</script>

<section class="stats-band" bind:this={sectionEl}>
	<div class="stats-glow" aria-hidden="true"></div>
	<div class="container">
		<div class="stats-grid">
			{#each statsband as stat, i}
				{@const { suffix } = parseStat(stat.value)}
				<div class="stat-box">
					<div class="stat-number">{displayValues[i]}{suffix}</div>
					<div class="stat-lbl">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>